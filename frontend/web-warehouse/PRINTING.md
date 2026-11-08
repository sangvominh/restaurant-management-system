# Mã vạch và bản in

- Phiếu nhập: CODE128 từ số phiếu. Lệnh chế biến và phiếu xuất: CODE128 từ ID đầy đủ. Đơn bán (web Restaurant): ID đầy đủ; số đơn vẫn hiển thị riêng trên bản in.
- Mã vạch hiển thị ở chi tiết và bản in, không hiển thị trên card. Không lưu ảnh hoặc thêm bảng mã vạch.
- Mở chi tiết → In phiếu / PDF. Cho phép cửa sổ bật lên nếu trình duyệt chặn. Có thể bấm In / Lưu PDF ngay trong cửa sổ bản in nếu hộp thoại không tự mở.
- Bản in A4 có tất cả dòng hàng (không giới hạn theo phân trang danh sách), trạng thái tại lúc in, ghi chú và chỗ ký. Phiếu/đơn nháp có dấu NHÁP. In không làm đổi trạng thái hay ghi sổ.
- Đây là chứng từ nội bộ, chưa tích hợp hóa đơn điện tử hoặc chữ ký số. Chưa có chức năng quét để tự tìm/mở phiếu. Dùng mã vạch ở chi tiết/bản in để quét và kiểm tra với thiết bị thực tế.
- Đã kiểm tra kiểu TypeScript, cú pháp CSS và tính ổn định chuỗi CODE128. Chưa kiểm tra bằng máy quét, máy in hoặc hộp thoại in thực tế.

## Tem dán vật lý

- Danh mục NVL/Thành phẩm → In tem: tem mặt hàng, dùng nhận diện mặt hàng/kệ/thùng, không phân biệt các lô/HSD.
- Tồn nguyên liệu → Xem lô → In tem lô: tên nguyên liệu, mã lô và HSD; dùng dán bao/thùng hàng thuộc lô đó.
- Mã vạch tem dựng từ ID mặt hàng/lô sẵn có, không thêm bảng. Mã chữ vẫn hiển thị để đọc bằng mắt. Không dùng số phiếu nhập làm tem nhận diện mặt hàng.
- Chọn 1–100 bản, A4 để cắt/dán hoặc giấy cuộn 100 × 50 mm; chọn đúng giấy và tỷ lệ 100%, tắt header/footer của trình duyệt. Đây không phải mẫu canh sẵn cho mọi loại decal A4 có bế khuôn.
- In thử và quét một tem trước khi in nhiều. Chưa có màn hình nhận mã quét để tra cứu hoặc cập nhật tồn tự động.
