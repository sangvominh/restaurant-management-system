# Tồn sẵn, bổ sung và phục vụ

Chạy trong backend rồi khởi động lại:

```sh
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Admin cấp quyền “Quyết định yêu cầu chế biến bổ sung” (production:request) cho vai trò quản lý nhà hàng; đăng nhập lại. Nhân viên ghi phục vụ dùng quyền sale:create hiện có.

1. Nghiệm thu 3 phần thành phẩm ở kho. Thực đơn hiện tồn 3.
2. Gửi đơn 5 phần: dòng món hiện có thể đáp ứng 3, thiếu 2.
3. Hóa đơn → Đề nghị xuất phần đang sẵn → kho duyệt 3. Bàn có thể ghi đã phục vụ 1 rồi 2; không được vượt lượng đã xuất.
4. Quản lý nhà hàng bấm Yêu cầu làm thêm 2. Kho → Lệnh chế biến → Yêu cầu bổ sung từ nhà hàng → chọn nhân viên → Lập lệnh bổ sung. Có thể từ chối với lý do.
5. Thực hiện sản xuất/nghiệm thu như trước. Trở lại bàn, dữ liệu tự cập nhật khoảng 15 giây. Đề nghị xuất phần còn lại, kho duyệt, ghi phục vụ đủ rồi thu tiền.

Lượng còn nhận mới = tồn đã nghiệm thu trừ nhu cầu chưa xuất của đơn đã gửi. Lượng ước tính đáp ứng từng dòng ưu tiên theo thời điểm gửi, không phải giữ hàng vật lý; kho vẫn kiểm tra tồn khi duyệt. Món chưa gửi không chiếm nhu cầu. Không cộng lại lượng đã xuất vào tồn sẵn.

Mỗi lần xác nhận phục vụ lưu số lượng, thời điểm và nhân viên. Phục vụ không trừ tồn lần nữa. Thanh toán yêu cầu đã phục vụ đủ.

ERD thêm Serving (id, quantity, servedAt, saleLineId FK, servedById FK Employee) và ReplenishmentRequest (id, quantity, requestedAt, status, note, saleLineId FK, requestedById FK Employee, productionOrderId FK nullable unique). Một dòng món có nhiều lần phục vụ và nhiều yêu cầu bổ sung trong lịch sử; một yêu cầu liên kết tối đa một lệnh.

Đợt này chưa có nghiệp vụ đổi/hủy một phần món đã gửi. Khi không thể bổ sung, cần hoàn thiện nghiệp vụ đó trước khi sử dụng thực tế; hiện chỉ có từ chối yêu cầu và hủy toàn đơn nếu chưa có xuất/chờ xuất.
