-- Phiếu mẫu tách biệt, không đặt lại dữ liệu đã thao tác.
BEGIN;
DO $$
DECLARE branch uuid; actor uuid; cashier uuid; loc uuid; unit_uuid uuid; cat uuid; mat uuid; lot uuid; issue uuid; menu uuid; invoice uuid; ord uuid; line uuid; defect uuid; fgissue uuid;
BEGIN
 IF EXISTS (SELECT 1 FROM products WHERE code='TP-102') THEN RAISE NOTICE 'Phiếu mẫu đã tồn tại.'; RETURN; END IF;
 SELECT id INTO STRICT branch FROM branches WHERE code='TEST-CN01';
 SELECT id INTO STRICT actor FROM staff_users WHERE code='DEMO-KITCHEN' AND branch_id=branch;
 SELECT id INTO STRICT cashier FROM staff_users WHERE code='DEMO-CASHIER' AND branch_id=branch;
 SELECT id INTO STRICT loc FROM warehouse_locations WHERE branch_id=branch AND name='Kho lạnh';
 SELECT id INTO STRICT unit_uuid FROM units WHERE name='kg';
 SELECT id INTO STRICT cat FROM categories WHERE name='Thịt' AND category_type='MATERIAL';
 INSERT INTO products(code,name,category,price,unit,updated_at) VALUES('TP-102','Cá sốt cà','Món mẫu',1000,'phần',now());
 INSERT INTO finished_goods_balances(product_code,location_id,quantity) VALUES('TP-102',loc,5);
 INSERT INTO finished_goods_defects(code,branch_id,product_code,quantity,reason,deduct_from_stock,status) VALUES('LO-104I-001',branch,'TP-102',1,'Bao bì bị rách',true,'PENDING') RETURNING id INTO defect;
 INSERT INTO staff_audits(id,actor_id,action,target_id,detail) VALUES(gen_random_uuid(),actor,'FINISHED_DEFECT_REQUEST',defect::text,'LO-104I-001');
 INSERT INTO finished_goods_issues(code,branch_id,shift_code,status,note) VALUES('PXTP-101',branch,'CHUA-CO-CA','PENDING','Phiếu mẫu') RETURNING id INTO fgissue;
 INSERT INTO finished_goods_issue_details(issue_id,product_code,requested_quantity) VALUES(fgissue,'TP-102',1);
 INSERT INTO staff_audits(id,actor_id,action,target_id,detail) VALUES(gen_random_uuid(),actor,'FINISHED_ISSUE_REQUEST',fgissue::text,'PXTP-101');
 INSERT INTO materials(code,name,unit_id,category_id) VALUES('NVL-104','Cá phi lê',unit_uuid,cat) RETURNING id INTO mat;
 INSERT INTO material_lots(material_id,lot_code,expiry_date) VALUES(mat,'LO-104',(now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date+30) RETURNING id INTO lot;
 INSERT INTO material_balances(location_id,material_lot_id,quantity) VALUES(loc,lot,5);
 INSERT INTO material_issues(issue_code,branch_id,note) VALUES('PX-105',branch,'Phiếu mẫu') RETURNING id INTO issue;
 INSERT INTO staff_audits(id,actor_id,action,target_id,detail) VALUES(gen_random_uuid(),actor,'MATERIAL_REQUEST',issue::text,'PX-105');
 INSERT INTO material_issue_details(issue_id,material_id,material_lot_id,location_id,unit_id,quantity) VALUES(issue,mat,lot,loc,unit_uuid,2);
 UPDATE material_balances SET quantity=quantity-2 WHERE location_id=loc AND material_lot_id=lot;
 UPDATE material_issues SET status='APPROVED' WHERE id=issue;
 INSERT INTO menu_items(id,branch_id,name,category,price,recipe_configured) VALUES(gen_random_uuid(),branch,'Cá sốt cà','Món mẫu',1000,true) RETURNING id INTO menu;
 INSERT INTO staff_demo_order_recipes(menu_item_id,material_id,quantity) VALUES(menu,mat,1);
 INSERT INTO invoices(id,branch_id,table_id,guest_name,status) SELECT gen_random_uuid(),branch,id,'Khách bàn 01','OPEN' FROM restaurant_tables WHERE branch_id=branch AND code='B01' RETURNING id INTO invoice;
 INSERT INTO staff_orders(id,invoice_id,created_by_id,request_key) VALUES(gen_random_uuid(),invoice,cashier,gen_random_uuid()) RETURNING id INTO ord;
 INSERT INTO order_lines(id,order_id,menu_item_id,name,unit_price,quantity,status) VALUES(gen_random_uuid(),ord,menu,'Cá sốt cà',1000,1,'COOKING') RETURNING id INTO line;
 UPDATE staff_kitchen_balances SET reserved_waste=reserved_waste+0.5 WHERE branch_id=branch AND material_lot_id=lot;
 INSERT INTO staff_processing_defects(code,actor_id,branch_id,order_line_id,quantity,reason,status) VALUES('SC-101',actor,branch,line,1,'Nguyên liệu bị đổ','PENDING') RETURNING id INTO defect;
 INSERT INTO staff_kitchen_waste(code,actor_id,branch_id,material_lot_id,order_line_id,quantity,reason,status,processing_defect_id) VALUES('HH-NVL-101',actor,branch,lot,line,0.5,'Nguyên liệu bị đổ','PENDING',defect);
 RAISE NOTICE 'Đã tạo phiếu mẫu.';
END $$;
COMMIT;
