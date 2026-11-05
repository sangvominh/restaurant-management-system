-- Unambiguous receipts are tracked; legacy stock with prior activity remains unallocated.
CREATE TABLE staff_kitchen_sources (
 issue_detail_id uuid PRIMARY KEY REFERENCES staff_kitchen_receipts(issue_detail_id),
 branch_id uuid NOT NULL REFERENCES branches(id), material_lot_id uuid NOT NULL REFERENCES material_lots(id),
 received numeric(18,3) NOT NULL CHECK(received>0), available numeric(18,3) NOT NULL CHECK(available>=0 AND available<=received),
 received_at timestamptz(3) NOT NULL
);
CREATE INDEX staff_kitchen_sources_fifo_idx ON staff_kitchen_sources(branch_id,material_lot_id,received_at,issue_detail_id);
CREATE TABLE staff_kitchen_source_allocations (
 issue_detail_id uuid NOT NULL REFERENCES staff_kitchen_sources(issue_detail_id), event_type text NOT NULL CHECK(event_type IN ('ORDER','PRODUCTION','WASTE','RETURN')),
 event_key text NOT NULL, quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 PRIMARY KEY(issue_detail_id,event_type,event_key)
);
CREATE INDEX staff_kitchen_alloc_event_idx ON staff_kitchen_source_allocations(event_type,event_key);

-- No historical events, pending reservations or unexplained stock: exact attribution is known.
INSERT INTO staff_kitchen_sources(issue_detail_id,branch_id,material_lot_id,received,available,received_at)
SELECT r.issue_detail_id,r.branch_id,r.material_lot_id,r.quantity,r.quantity,r.created_at
FROM staff_kitchen_receipts r JOIN staff_kitchen_balances b ON b.branch_id=r.branch_id AND b.material_lot_id=r.material_lot_id
WHERE b.quantity=(SELECT SUM(x.quantity) FROM staff_kitchen_receipts x WHERE x.branch_id=r.branch_id AND x.material_lot_id=r.material_lot_id)
 AND b.reserved_waste=0 AND b.reserved_return=0
 AND NOT EXISTS (SELECT 1 FROM staff_kitchen_waste w WHERE w.branch_id=r.branch_id AND w.material_lot_id=r.material_lot_id)
 AND NOT EXISTS (SELECT 1 FROM staff_kitchen_order_consumptions c JOIN order_lines l ON l.id=c.order_line_id JOIN staff_orders o ON o.id=l.order_id JOIN invoices i ON i.id=o.invoice_id WHERE i.branch_id=r.branch_id AND c.material_lot_id=r.material_lot_id)
 AND NOT EXISTS (SELECT 1 FROM staff_kitchen_production_consumptions c JOIN staff_kitchen_production_starts p ON p.production_order_id=c.production_order_id WHERE p.branch_id=r.branch_id AND c.material_lot_id=r.material_lot_id)
 AND NOT EXISTS (SELECT 1 FROM staff_material_returns x JOIN material_issue_details d ON d.id=x.issue_detail_id WHERE x.branch_id=r.branch_id AND d.material_lot_id=r.material_lot_id);

CREATE FUNCTION staff_track_kitchen_receipt() RETURNS trigger AS $$
BEGIN
 INSERT INTO staff_kitchen_sources(issue_detail_id,branch_id,material_lot_id,received,available,received_at)
 VALUES(NEW.issue_detail_id,NEW.branch_id,NEW.material_lot_id,NEW.quantity,NEW.quantity,NEW.created_at);
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_track_kitchen_receipt AFTER INSERT ON staff_kitchen_receipts FOR EACH ROW EXECUTE FUNCTION staff_track_kitchen_receipt();

-- Called after the balance has been consumed or reserved. Old untraceable stock is consumed first.
CREATE FUNCTION staff_allocate_kitchen_source(p_branch uuid,p_lot uuid,p_quantity numeric,p_type text,p_key text) RETURNS void AS $$
DECLARE current_available numeric; tracked numeric; untracked numeric; remaining numeric; take numeric; source record;
BEGIN
 SELECT GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0)
 INTO current_available FROM staff_kitchen_balances b WHERE b.branch_id=p_branch AND b.material_lot_id=p_lot FOR UPDATE;
 IF current_available IS NULL THEN RAISE EXCEPTION 'Không tìm thấy tồn bếp'; END IF;
 PERFORM 1 FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot ORDER BY received_at,issue_detail_id FOR UPDATE;
 SELECT COALESCE(SUM(available),0) INTO tracked FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot;
 untracked:=GREATEST(current_available+p_quantity-tracked,0);
 remaining:=GREATEST(p_quantity-untracked,0);
 FOR source IN SELECT issue_detail_id,available FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot AND available>0 ORDER BY received_at,issue_detail_id LOOP
  EXIT WHEN remaining<=0;
  take:=LEAST(remaining,source.available);
  UPDATE staff_kitchen_sources SET available=available-take WHERE issue_detail_id=source.issue_detail_id;
  INSERT INTO staff_kitchen_source_allocations(issue_detail_id,event_type,event_key,quantity) VALUES(source.issue_detail_id,p_type,p_key,take);
  remaining:=remaining-take;
 END LOOP;
 IF remaining>0 THEN RAISE EXCEPTION 'Không đối chiếu được nguồn nguyên liệu'; END IF;
END $$ LANGUAGE plpgsql;

CREATE FUNCTION staff_allocate_order_consumption() RETURNS trigger AS $$
DECLARE branch uuid;
BEGIN
 SELECT i.branch_id INTO branch FROM order_lines l JOIN staff_orders o ON o.id=l.order_id JOIN invoices i ON i.id=o.invoice_id WHERE l.id=NEW.order_line_id;
 PERFORM staff_allocate_kitchen_source(branch,NEW.material_lot_id,NEW.quantity,'ORDER',NEW.order_line_id::text||':'||NEW.material_lot_id::text);
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_allocate_order_consumption AFTER INSERT ON staff_kitchen_order_consumptions FOR EACH ROW EXECUTE FUNCTION staff_allocate_order_consumption();
CREATE FUNCTION staff_allocate_production_consumption() RETURNS trigger AS $$
DECLARE branch uuid;
BEGIN
 SELECT branch_id INTO branch FROM staff_kitchen_production_starts WHERE production_order_id=NEW.production_order_id;
 PERFORM staff_allocate_kitchen_source(branch,NEW.material_lot_id,NEW.quantity,'PRODUCTION',NEW.production_order_id::text||':'||NEW.material_lot_id::text);
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_allocate_production_consumption AFTER INSERT ON staff_kitchen_production_consumptions FOR EACH ROW EXECUTE FUNCTION staff_allocate_production_consumption();
CREATE FUNCTION staff_allocate_waste() RETURNS trigger AS $$
BEGIN
 IF NEW.status='PENDING' THEN PERFORM staff_allocate_kitchen_source(NEW.branch_id,NEW.material_lot_id,NEW.quantity,'WASTE',NEW.id::text); END IF;
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_allocate_waste AFTER INSERT ON staff_kitchen_waste FOR EACH ROW EXECUTE FUNCTION staff_allocate_waste();
CREATE FUNCTION staff_release_waste_allocation() RETURNS trigger AS $$
BEGIN
 IF OLD.status='PENDING' AND NEW.status='REJECTED' THEN
  UPDATE staff_kitchen_sources s SET available=s.available+a.quantity FROM staff_kitchen_source_allocations a WHERE a.issue_detail_id=s.issue_detail_id AND a.event_type='WASTE' AND a.event_key=NEW.id::text;
  DELETE FROM staff_kitchen_source_allocations WHERE event_type='WASTE' AND event_key=NEW.id::text;
 END IF;
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_release_waste_allocation AFTER UPDATE OF status ON staff_kitchen_waste FOR EACH ROW EXECUTE FUNCTION staff_release_waste_allocation();

CREATE FUNCTION staff_allocate_return() RETURNS trigger AS $$
DECLARE updated integer;
BEGIN
 IF NEW.stock_reserved AND NEW.status='PENDING' THEN
  UPDATE staff_kitchen_sources SET available=available-NEW.quantity WHERE issue_detail_id=NEW.issue_detail_id AND branch_id=NEW.branch_id AND available>=NEW.quantity;
  GET DIAGNOSTICS updated=ROW_COUNT;
  IF updated<>1 THEN RAISE EXCEPTION 'Nguồn phiếu lĩnh không đủ hoặc chưa thể đối chiếu'; END IF;
  INSERT INTO staff_kitchen_source_allocations(issue_detail_id,event_type,event_key,quantity) VALUES(NEW.issue_detail_id,'RETURN',NEW.id::text,NEW.quantity);
 END IF;
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_allocate_return AFTER INSERT ON staff_material_returns FOR EACH ROW EXECUTE FUNCTION staff_allocate_return();
CREATE FUNCTION staff_release_return_allocation() RETURNS trigger AS $$
BEGIN
 IF OLD.status='PENDING' AND NEW.status='REJECTED' THEN
  UPDATE staff_kitchen_sources s SET available=s.available+a.quantity FROM staff_kitchen_source_allocations a WHERE a.issue_detail_id=s.issue_detail_id AND a.event_type='RETURN' AND a.event_key=NEW.id::text;
  DELETE FROM staff_kitchen_source_allocations WHERE event_type='RETURN' AND event_key=NEW.id::text;
 END IF;
 RETURN NEW;
END $$ LANGUAGE plpgsql;
CREATE TRIGGER staff_release_return_allocation AFTER UPDATE OF status ON staff_material_returns FOR EACH ROW EXECUTE FUNCTION staff_release_return_allocation();
