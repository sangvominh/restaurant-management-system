---
id: "HDB-06"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "Luồng nghiệp vụ chung"
---

# 6. Các luồng nghiệp vụ

<DocMeta />

## 6.1 Cấu hình và đăng nhập

Đầu vào: tài khoản hợp lệ, vai trò, khu vực/bàn, thực đơn và dữ liệu gốc.

1. Admin tạo tài khoản nhân viên và gán quyền; thiết lập danh mục.
2. Người dùng đăng nhập; kiểm tra tài khoản hoạt động trước khi cấp phiên/token.
3. UI chuyển vào đúng khu vực. Backend xác thực và kiểm tra quyền từng yêu cầu.
4. Người dùng xem thông tin cá nhân, đổi mật khẩu, đăng xuất theo kế hoạch.

Đầu ra: phiên truy cập và dữ liệu cấu hình có thể sử dụng; không gửi password hash hoặc dữ liệu xác thực cho client.

## 6.2 Đặt bàn và mở phiên phục vụ

1. Thành viên chọn thời gian, số khách; hệ thống trả các bàn phù hợp.
2. Tạo đặt bàn phải kiểm tra xung đột ở backend khi ghi dữ liệu, không chỉ lúc hiển thị bàn trống.
3. Khách đến và check-in; mở hoặc liên kết một phiên phục vụ.
4. Khách vãng lai cần cách mở phiên tương ứng; chưa chốt do khách quét QR hay nhân viên xác nhận.
5. Đặt bàn bị hủy không tự hủy một phiên đã bắt đầu.

**[MỞ]** Thời lượng đặt bàn, thời gian giữ chỗ, trễ/no-show, ghép/chuyển bàn, đặt món trước và khoản đặt cọc. Kế hoạch nói tự check-in khi quét QR nhưng chưa xác định cách chứng minh khách đang tại bàn. QR nên chỉ định danh bàn; quyền thao tác phiên cần được cấp riêng theo phương án nhóm chọn.

## 6.3 Gọi món và bếp

1. Khách có quyền với phiên hoặc nhân viên có quyền tạo hộ chọn món đang bán.
2. Backend đọc giá hợp lệ, tạo order và các dòng món; lưu giá tại thời điểm gọi.
3. Bếp nhận thông báo order sau khi lưu thành công.
4. Bếp cập nhật từng dòng: mới → đang làm → hoàn tất.
5. Phục vụ nhận thông báo món xong; khách xem tiến độ.
6. Gọi thêm tạo lượt order mới trong cùng phiên.
7. Theo kế hoạch, chỉ hủy món trước khi bếp bắt đầu. Backend phải xử lý cuộc đua giữa yêu cầu hủy và thao tác bắt đầu làm.

**[MỞ]** Thao tác xác nhận order trước khi chuyển bếp; chia một dòng nhiều phần thành các lần hoàn tất; cách xử lý món hết nguyên liệu; bước xác nhận đã phục vụ. Chưa nối luồng này với thao tác trừ kho tự động.

## 6.4 Tính tiền và kết thúc phiên

1. Thu ngân yêu cầu bản tính tiền từ dữ liệu phía server.
2. Tổng hợp các dòng hợp lệ; áp điều kiện khuyến mãi, khoản phí và VAT theo chính sách được chốt.
3. Tạo/chốt hóa đơn và thực hiện thanh toán.
4. Chỉ xác nhận thanh toán khi có căn cứ hợp lệ: thu ngân đối với tiền mặt, kết quả xác minh của nhà cung cấp đối với tích hợp điện tử.
5. Sau thanh toán thành công, đóng phiên và tích điểm đúng một lần nếu đủ điều kiện.

**[MỞ]** “Tiền bàn” là phí gì, mức và cách tính; giá đã gồm VAT chưa; thứ tự ưu đãi/thuế; làm tròn; tách/gộp hóa đơn; trả một phần/hoàn tiền; nhà cung cấp thanh toán. Không hardcode một quy tắc chưa được xác nhận. Có thể dùng adapter thanh toán mô phỏng cho demo, phải ghi rõ là mô phỏng.

## 6.5 MRP: nhập nguyên liệu và sản xuất

Luồng từ kế hoạch phù hợp đề môn:

1. Quản lý tạo phiếu nhập nguyên liệu từ nhà cung cấp; khi ghi nhận nhập hợp lệ, tăng tồn và tạo lịch sử.
2. Quản lý khai báo BOM: sản phẩm đầu ra, định lượng đầu ra, nguyên liệu/định lượng, đơn vị.
3. Quản lý tạo lệnh sản xuất và giao nhân viên.
4. Nhân viên kiểm tra nhu cầu so với tồn; thiếu thì hiển thị cảnh báo.
5. Nhân viên lập đề nghị xuất nguyên liệu theo lệnh.
6. Quản lý duyệt; kiểm tra tồn lại trong transaction; trừ nguyên liệu một lần.
7. Nhân viên xác nhận sản phẩm đã tạo; cộng thành phẩm một lần, không trừ nguyên liệu lần nữa.
8. Nhân viên đề nghị xuất thành phẩm để bán; quản lý duyệt và giảm thành phẩm một lần.

Kiểm tra “đủ” tại bước 4 chỉ là thông tin ở thời điểm kiểm tra, không đảm bảo nguyên liệu còn đủ tại bước 6. Cơ chế giữ tồn cho lệnh chưa được chốt.

## 6.6 Hao hụt và xử lý phiếu

- Nhân viên lập phiếu hao hụt: hàng, lượng, đơn vị, lý do, người lập.
- Quản lý duyệt mới ghi giảm tồn; không sinh thành phẩm từ hao hụt.
- Người lập có thể hủy phiếu chưa duyệt; quản lý từ chối kèm lý do.
- Theo kế hoạch không hủy phiếu đã duyệt. Nếu cần sửa sai, thiết kế chứng từ điều chỉnh/bù trừ có dấu vết sau khi nhóm chốt; không xóa lịch sử cũ.
- Giá trị thiệt hại bằng tiền phụ thuộc phương pháp giá vốn chưa chốt. Chỉ báo cáo số lượng trước khi có căn cứ tính giá trị.

## 6.7 Ranh giới trừ kho đang để mở

**[CHỐT] Chủ dự án muốn bàn sau về thao tác quyết định trừ nguyên liệu; không chốt quản lý là tác nhân duy nhất cho mọi trường hợp.**

Tài liệu cũ có hai hướng: duyệt xuất theo MRP và tự trừ theo BOM khi POS nhận món gọi trực tiếp. Không triển khai đồng thời hai hướng trên cùng một lượng tiêu hao.

**[ĐỀ XUẤT]** Tập trung mọi ghi tăng/giảm vào dịch vụ tồn kho có transaction và khóa chống lặp. Module gọi món gửi yêu cầu nghiệp vụ qua giao diện tích hợp, không tự cập nhật số dư kho. Có thể triển khai dịch vụ này và luồng phiếu MRP trước; để điểm gọi từ POS chưa kích hoạt cho đến khi chốt chính sách.

Các quyết định cần chốt trước tích hợp POS–MRP:

1. Phân loại món làm theo order, món làm sẵn và bán thành phẩm.
2. Sự kiện nào tạo tiêu hao; ai được kích hoạt.
3. Xuất thành phẩm sang khu phục vụ và bán cho khách là một hay hai biến động.
4. Khi hủy món, trả hàng, làm hỏng: hoàn kho hay ghi hao hụt.
5. Khi hai đơn cùng cần nguyên liệu cuối cùng: từ chối, giữ chờ hay yêu cầu xử lý khác.
