# Cấp NVL → sản xuất → nghiệm thu → hoàn/hao hụt

Mở Lệnh sản xuất → Thực hiện / Chi tiết.

1. Bếp nhận lệnh, yêu cầu cấp từng lô NVL thuộc BOM (`material:request`).
2. Kho duyệt cấp đủ hoặc từ chối (`material:approve`). Duyệt trừ tồn kho theo lô, không cho âm hoặc cấp lô hết hạn.
3. Bếp ghi từng lần sản xuất, nhập sản lượng và tiêu hao thực tế từ các dòng đã cấp (`production:perform`). Tổng sản lượng không vượt lệnh.
4. Người nghiệm thu nhập số lượng đạt và nhận xét (`production:inspect`). Chỉ số đạt mới nhập tồn thành phẩm; phần không đạt thể hiện bằng chênh lệch thực tế–đạt.
5. Bếp lập hoàn NVL dư (`material:request`) hoặc hao hụt NVL đã cấp (`waste:request`), có lý do. Kho duyệt hoàn (`material:approve`) hoặc hao hụt (`waste:approve`). Hoàn tăng tồn kho, hao hụt chuyển NVL đã cấp sang đã hủy. Lô hết hạn không được hoàn kho.
6. Quản lý hoàn thành lệnh khi đủ sản lượng ghi nhận, mọi lần đã nghiệm thu, NVL dư đã xử lý hết và không còn phiếu chờ.

Phiếu hoàn/hao hụt chờ duyệt giữ số lượng, từ chối giải phóng lại. Tiêu hao đã ghi không hoàn tác theo kết quả nghiệm thu. Không tự tạo tiêu hao theo BOM vì cần số dùng thực tế.

Hiện hỗ trợ hao hụt NVL đã cấp theo lệnh; hao hụt trực tiếp trong kho và hao hụt thành phẩm là luồng khác. Không thay Prisma/schema, không cần migration. Sổ thành phẩm dùng loại NHAP_SAN_XUAT; phần bán/xuất sau này phải dùng thống nhất loại biến động.
