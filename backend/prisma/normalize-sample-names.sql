-- Chỉ đổi tên và mã của dữ liệu mẫu đã tạo; giữ nguyên ID, số lượng và trạng thái.
BEGIN;
UPDATE materials m SET code=v.new_code,name=v.new_name FROM (VALUES
 ('FBTEST-FIFO','NVL-T101','Thịt bò tươi'),('FBTEST-LOSS','NVL-T102','Ức gà'),('FBTEST-EXP','NVL-T103','Rau củ hỗn hợp'),('FBVIEW-NVL','NVL-T104','Cá phi lê')
) v(old_code,new_code,new_name) WHERE m.code=v.old_code;
UPDATE material_lots l SET lot_code=v.new_code FROM (VALUES
 ('FBTEST-FIFO-LO','LO-T101'),('FBTEST-LOSS-LO','LO-T102'),('FBTEST-CON-HAN','LO-T103A'),('FBTEST-SAP-HET','LO-T103B'),('FBTEST-HET-HAN','LO-T103C'),('FBTEST-KHONG-HAN','LO-T103D'),('FBVIEW-LO','LO-T104')
) v(old_code,new_code) WHERE l.lot_code=v.old_code;
UPDATE products p SET code=v.new_code,name=v.new_name FROM (VALUES ('FBTEST-TP','TP-T101','Gà sốt tiêu'),('FBVIEW-TP','TP-T102','Cá sốt cà')) v(old_code,new_code,new_name) WHERE p.code=v.old_code;
UPDATE material_issues i SET issue_code=v.new_code FROM (VALUES ('FBTEST-FIFO-A','PX-T101'),('FBTEST-FIFO-B','PX-T102'),('FBTEST-LOSS-CAP','PX-T103'),('FBTEST-HAN-CAP','PX-T104'),('FBVIEW-CAP-001','PX-T105')) v(old_code,new_code) WHERE i.issue_code=v.old_code;
UPDATE boms SET code='BOM-T101' WHERE code='FBTEST-BOM';
UPDATE production_orders SET code='LSX-T101',note='Lệnh sản xuất mẫu' WHERE code='FBTEST-LSX-01';
UPDATE menu_items m SET name=v.new_name FROM (VALUES ('[FBTEST] Món kiểm tra FIFO','Bò xào rau củ'),('[FBTEST] Món kiểm tra lỗi giữa chừng','Gà sốt tiêu'),('[MẪU] Món chế biến','Cá sốt cà')) v(old_name,new_name) WHERE m.name=v.old_name;
UPDATE order_lines l SET name=v.new_name FROM (VALUES ('[FBTEST] Món kiểm tra FIFO','Bò xào rau củ'),('[FBTEST] Món kiểm tra lỗi giữa chừng','Gà sốt tiêu'),('[MẪU] Món chế biến','Cá sốt cà')) v(old_name,new_name) WHERE l.name=v.old_name;
UPDATE invoices SET guest_name='Khách bàn 01' WHERE guest_name IN ('[FBTEST] Bàn kiểm thử','[MẪU] Khách thử');
UPDATE staff_processing_defects SET code='SC-T101' WHERE code='FBVIEW-SUCO-001';
UPDATE staff_kitchen_waste SET code='HH-NVL-T101' WHERE code='FBVIEW-HH-001';
UPDATE finished_goods_issues SET code='PXTP-T101' WHERE code='FBVIEW-XUAT-001';
UPDATE finished_goods_defects SET code='HH-TP-T101' WHERE code='FBVIEW-LOI-001';
UPDATE staff_audits a SET detail=v.new_code FROM (VALUES ('FBTEST-FIFO-A','PX-T101'),('FBTEST-FIFO-B','PX-T102'),('FBTEST-LOSS-CAP','PX-T103'),('FBTEST-HAN-CAP','PX-T104'),('FBVIEW-CAP-001','PX-T105'),('FBVIEW-XUAT-001','PXTP-T101'),('FBVIEW-LOI-001','HH-TP-T101')) v(old_code,new_code) WHERE a.detail=v.old_code;
-- Bỏ hậu tố đánh dấu dữ liệu thử khỏi các mã mẫu cố định.
UPDATE materials SET code=replace(code,'-T','-') WHERE code IN ('NVL-T101','NVL-T102','NVL-T103','NVL-T104');
UPDATE material_lots SET lot_code=replace(lot_code,'-T','-') WHERE lot_code IN ('LO-T101','LO-T102','LO-T103A','LO-T103B','LO-T103C','LO-T103D','LO-T104');
UPDATE products SET code=replace(code,'-T','-') WHERE code IN ('TP-T101','TP-T102');
UPDATE material_issues SET issue_code=replace(issue_code,'-T','-') WHERE issue_code IN ('PX-T101','PX-T102','PX-T103','PX-T104','PX-T105');
UPDATE boms SET code='BOM-101' WHERE code='BOM-T101';
UPDATE production_orders SET code='LSX-101' WHERE code='LSX-T101';
UPDATE staff_processing_defects SET code='SC-101' WHERE code='SC-T101';
UPDATE staff_kitchen_waste SET code='HH-NVL-101' WHERE code='HH-NVL-T101';
UPDATE finished_goods_issues SET code='PXTP-101' WHERE code='PXTP-T101';
UPDATE finished_goods_defects SET code='HH-TP-101' WHERE code='HH-TP-T101';
UPDATE staff_audits SET detail=replace(detail,'-T','-') WHERE detail IN ('PX-T101','PX-T102','PX-T103','PX-T104','PX-T105','PXTP-T101','HH-TP-T101');
COMMIT;
