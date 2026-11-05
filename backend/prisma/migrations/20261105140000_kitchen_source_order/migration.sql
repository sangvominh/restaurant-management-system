ALTER TABLE staff_kitchen_sources ADD COLUMN source_seq bigserial;
CREATE UNIQUE INDEX staff_kitchen_sources_sequence_idx ON staff_kitchen_sources(source_seq);
CREATE OR REPLACE FUNCTION staff_allocate_kitchen_source(p_branch uuid,p_lot uuid,p_quantity numeric,p_type text,p_key text) RETURNS void AS $$
DECLARE current_available numeric; tracked numeric; untracked numeric; remaining numeric; take numeric; source record;
BEGIN
 SELECT GREATEST(b.quantity-b.reserved_waste-b.reserved_return-COALESCE((SELECT SUM(r.quantity) FROM staff_material_returns r JOIN material_issue_details d ON d.id=r.issue_detail_id WHERE r.branch_id=b.branch_id AND d.material_lot_id=b.material_lot_id AND r.status='PENDING' AND NOT r.stock_reserved),0),0)
 INTO current_available FROM staff_kitchen_balances b WHERE b.branch_id=p_branch AND b.material_lot_id=p_lot FOR UPDATE;
 IF current_available IS NULL THEN RAISE EXCEPTION 'Không tìm thấy tồn bếp'; END IF;
 PERFORM 1 FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot ORDER BY received_at,source_seq FOR UPDATE;
 SELECT COALESCE(SUM(available),0) INTO tracked FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot;
 untracked:=GREATEST(current_available+p_quantity-tracked,0);
 remaining:=GREATEST(p_quantity-untracked,0);
 FOR source IN SELECT issue_detail_id,available FROM staff_kitchen_sources WHERE branch_id=p_branch AND material_lot_id=p_lot AND available>0 ORDER BY received_at,source_seq LOOP
  EXIT WHEN remaining<=0;
  take:=LEAST(remaining,source.available);
  UPDATE staff_kitchen_sources SET available=available-take WHERE issue_detail_id=source.issue_detail_id;
  INSERT INTO staff_kitchen_source_allocations(issue_detail_id,event_type,event_key,quantity) VALUES(source.issue_detail_id,p_type,p_key,take);
  remaining:=remaining-take;
 END LOOP;
 IF remaining>0 THEN RAISE EXCEPTION 'Không đối chiếu được nguồn nguyên liệu'; END IF;
END $$ LANGUAGE plpgsql;

