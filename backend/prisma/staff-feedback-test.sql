-- Dữ liệu riêng để kiểm thử 5 feedback. Không đặt lại khi chạy lại.
BEGIN;
DO $$
DECLARE branch uuid; actor uuid; cashier uuid; location uuid; unit_uuid uuid; category_uuid uuid;
 fifo uuid; loss uuid; exp uuid; lot_fifo uuid; lot_loss uuid; rec record; issue_uuid uuid;
 menu_fifo uuid; menu_loss uuid; inv uuid; ord uuid; product_code text := 'TP-101'; bom_uuid uuid;
 today date := (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;
BEGIN
 IF EXISTS (SELECT 1 FROM material_issues WHERE issue_code='PX-101') THEN
   RAISE NOTICE 'Bộ dữ liệu mẫu đã tồn tại; giữ nguyên dữ liệu và trạng thái hiện tại.'; RETURN;
 END IF;
 SELECT id INTO STRICT branch FROM branches WHERE code='TEST-CN01';
 SELECT id INTO STRICT actor FROM staff_users WHERE code='DEMO-KITCHEN' AND branch_id=branch;
 SELECT id INTO STRICT cashier FROM staff_users WHERE code='DEMO-CASHIER' AND branch_id=branch;
 SELECT id INTO STRICT location FROM warehouse_locations WHERE branch_id=branch AND name='Kho lạnh';
 SELECT id INTO STRICT unit_uuid FROM units WHERE name='kg';
 SELECT id INTO STRICT category_uuid FROM categories WHERE name='Thịt' AND category_type='MATERIAL';
 INSERT INTO materials(code,name,unit_id,category_id) VALUES ('NVL-101','Thịt bò tươi',unit_uuid,category_uuid) RETURNING id INTO fifo;
 INSERT INTO materials(code,name,unit_id,category_id) VALUES ('NVL-102','Ức gà',unit_uuid,category_uuid) RETURNING id INTO loss;
 INSERT INTO materials(code,name,unit_id,category_id) VALUES ('NVL-103','Rau củ hỗn hợp',unit_uuid,category_uuid) RETURNING id INTO exp;
 INSERT INTO material_lots(material_id,lot_code,expiry_date) VALUES(fifo,'LO-101',today+30) RETURNING id INTO lot_fifo;
 INSERT INTO material_lots(material_id,lot_code,expiry_date) VALUES(loss,'LO-102',today+30) RETURNING id INTO lot_loss;
 INSERT INTO material_lots(material_id,lot_code,expiry_date) VALUES (exp,'LO-103A',today+20),(exp,'LO-103B',today+2),(exp,'LO-103C',today-1),(exp,'LO-103D',NULL);
 INSERT INTO material_balances(location_id,material_lot_id,quantity) SELECT location,id,CASE WHEN material_id=fifo THEN 30 WHEN material_id=loss THEN 15 ELSE 5 END FROM material_lots WHERE material_id IN(fifo,loss,exp);
 FOR rec IN SELECT * FROM (VALUES ('PX-101',lot_fifo,10::numeric),('PX-102',lot_fifo,10::numeric),('PX-103',lot_loss,5::numeric)) AS x(code,lot,amount) LOOP
  INSERT INTO material_issues(issue_code,branch_id,note) VALUES(rec.code,branch,'Mẫu: phiếu cấp mẫu') RETURNING id INTO issue_uuid;
  INSERT INTO staff_audits(id,actor_id,action,target_id,detail) VALUES(gen_random_uuid(),actor,'MATERIAL_REQUEST',issue_uuid::text,rec.code);
  INSERT INTO material_issue_details(issue_id,material_id,material_lot_id,location_id,unit_id,quantity) SELECT issue_uuid,material_id,id,location,unit_uuid,rec.amount FROM material_lots WHERE id=rec.lot;
  UPDATE material_balances SET quantity=quantity-rec.amount WHERE location_id=location AND material_lot_id=rec.lot;
  UPDATE material_issues SET status='APPROVED' WHERE id=issue_uuid;
  IF rec.code='PX-101' THEN UPDATE staff_kitchen_sources SET received_at=now()-interval '1 second' WHERE issue_detail_id IN (SELECT id FROM material_issue_details WHERE issue_id=issue_uuid); END IF;
 END LOOP;
 -- Các lô cũ hết hạn / thiếu hạn đã được cấp trước đó: dựng lịch sử để thử chặn tại bếp.
 INSERT INTO material_issues(issue_code,branch_id,note) VALUES('PX-104',branch,'Mẫu: lô lịch sử tại bếp') RETURNING id INTO issue_uuid;
 INSERT INTO staff_audits(id,actor_id,action,target_id,detail) VALUES(gen_random_uuid(),actor,'MATERIAL_REQUEST',issue_uuid::text,'PX-104');
 INSERT INTO material_issue_details(issue_id,material_id,material_lot_id,location_id,unit_id,quantity) SELECT issue_uuid,exp,id,location,unit_uuid,3 FROM material_lots WHERE material_id=exp;
 UPDATE material_balances SET quantity=quantity-3 WHERE location_id=location AND material_lot_id IN (SELECT id FROM material_lots WHERE material_id=exp);
 UPDATE material_issues SET status='APPROVED' WHERE id=issue_uuid;
 INSERT INTO menu_items(id,branch_id,name,category,price,recipe_configured) VALUES(gen_random_uuid(),branch,'Bò xào rau củ','Món mẫu',1000,true) RETURNING id INTO menu_fifo;
 INSERT INTO menu_items(id,branch_id,name,category,price,recipe_configured) VALUES(gen_random_uuid(),branch,'Gà sốt tiêu','Món mẫu',1000,true) RETURNING id INTO menu_loss;
 INSERT INTO staff_demo_order_recipes(menu_item_id,material_id,quantity) VALUES(menu_fifo,fifo,1),(menu_loss,loss,1);
 INSERT INTO invoices(id,branch_id,table_id,guest_name,status) SELECT gen_random_uuid(),branch,id,'Khách bàn 01','OPEN' FROM restaurant_tables WHERE branch_id=branch AND code='B01' RETURNING id INTO inv;
 INSERT INTO staff_orders(id,invoice_id,created_by_id,request_key) VALUES(gen_random_uuid(),inv,cashier,gen_random_uuid()) RETURNING id INTO ord;
 INSERT INTO order_lines(id,order_id,menu_item_id,name,unit_price,quantity,status) VALUES (gen_random_uuid(),ord,menu_fifo,'Bò xào rau củ',1000,12,'QUEUED'),(gen_random_uuid(),ord,menu_loss,'Gà sốt tiêu',1000,2,'QUEUED');
 INSERT INTO products(code,name,category,price,unit,updated_at) VALUES(product_code,'Gà sốt tiêu','Món mẫu',1000,'phần',now());
 INSERT INTO boms(code,product_code,version,output_quantity,status) VALUES('BOM-101',product_code,1,1,'ACTIVE') RETURNING id INTO bom_uuid;
 INSERT INTO bom_details(bom_id,material_id,unit_id,quantity) VALUES(bom_uuid,loss,unit_uuid,1);
 INSERT INTO production_orders(code,bom_id,branch_id,production_mode,quantity,status,material_status,assigned_employee_code,note) VALUES('LSX-101',bom_uuid,branch,'MAKE_TO_STOCK',2,'PENDING','UNCHECKED','DEMO-KITCHEN','Mẫu: lệnh mẫu dùng tồn bếp');
 INSERT INTO finished_goods_balances(product_code,location_id,quantity) VALUES(product_code,location,5);
 RAISE NOTICE 'Đã tạo dữ liệu mẫu tại chi nhánh TEST-CN01.';
END $$;
COMMIT;
