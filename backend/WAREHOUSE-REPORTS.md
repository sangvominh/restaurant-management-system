# Báo cáo điều hành kho

Quyền `report:stock`, không thêm schema/migration và không tự ghi nghiệp vụ.

## Trong kỳ / hiện tại

- Nhập–xuất–tồn: chỉ biến động đã ghi sổ, đầu/cuối kỳ theo ngày Việt Nam. Cấp NVL là xuất khỏi kho; hoàn là nhập; tiêu hao/hao hụt tại bếp không trừ kho lần nữa.
- So sánh xuất: cửa sổ liền trước dài bằng kỳ chọn; nếu kỳ hiện tại chưa kết thúc thì chỉ lấy cùng số ngày đã quan sát của cửa sổ trước. Ngày hiện tại còn đang phát sinh nên so sánh chỉ mang tính tham khảo.
- Giá trị nhập NCC = lượng × đơn giá các dòng phiếu POSTED trong kỳ. Không phải tiền đã trả NCC, giá vốn hay lợi nhuận.
- Chế biến: lấy các lần recordedAt trong kỳ. Số đạt/không đạt dùng kết quả nghiệm thu hiện có khi xem. Lần đang chờ không tính là không đạt. Vì vậy báo cáo có thể cập nhật sau khi nghiệm thu muộn.
- BOM: đối chiếu đúng phiên bản trên lệnh, định mức × sản lượng thực tế / đầu ra BOM. So với tiêu hao thực tế, không cộng phiếu hao hụt. Nhóm theo món–phiên bản–NVL. Ít hơn 3 lần chỉ là mẫu nhỏ; lệch >10% là bộ lọc rà soát, không phải kết luận chất lượng.
- Hao hụt: chỉ phiếu APPROVED, theo approvedAt; tách tại kho / tại bếp / TP. Có người duyệt, lý do, mã lô và phiếu.

Các cột tồn hiện tại, đơn cần giao và lệnh đang mở là ảnh chụp **lúc xem**, không phải dữ liệu lịch sử cuối kỳ. Các mặt hàng giữ đơn vị riêng, không cộng kg với phần/ly.

## Gợi ý kế hoạch, không tự động quyết định

1. Dự kiến xuất cho 7/14/30 ngày = xuất bán bình quân trong các ngày đã quan sát của kỳ × số ngày tới. Bao gồm ngày không có phát sinh; chưa có mùa vụ/ngày trong tuần. Kỳ không có xuất cho dự kiến 0, không có nghĩa thị trường không có nhu cầu.
2. Gợi ý làm thêm = max(đơn đã gửi còn cần, dự kiến xuất) − tồn TP − phần chưa làm của lệnh mở − sản lượng chờ nghiệm thu, chặn dưới 0. Giả định phần đang làm/chờ nghiệm thu sẽ đạt; cần xem lại nếu rủi ro không đạt. Món không có công thức khả dụng phải xử lý công thức trước.
3. Nhu cầu NVL lệnh mở = định mức cho sản lượng chưa làm − NVL còn dùng được tại bếp của chính lệnh đó. Phần chờ hoàn/hao hụt được giữ lại nên không tính là dùng được.
4. Gợi ý nhập = nhu cầu lệnh mở + định mức theo công thức hiện hành cho lượng TP gợi ý làm thêm + tồn tối thiểu − tồn NVL còn hạn, chặn dưới 0. Lô không HSD tính là còn dùng được theo dữ liệu hiện có, không thay kiểm tra chất lượng. Chưa trừ đơn mua dự kiến vì chưa có quản lý mua hàng.
   Món thiếu BOM hiệu lực hoặc BOM có NVL ngừng dùng được cảnh báo và chưa quy đổi vào gợi ý nhập, tránh hiển thị một kế hoạch nguyên liệu thiếu như đã đầy đủ.
5. Số ngày còn đủ = NVL còn hạn / tiêu hao bình quân của kỳ. Nếu chưa có tiêu hao thì không ước tính. Không phải cam kết đủ hàng trong tương lai.

Xuất CSV theo góc nhìn và bộ lọc, gồm toàn bộ dòng phù hợp chứ không chỉ trang đang xem. Chi tiết mặt hàng có biểu đồ nhập/xuất theo ngày hoặc tháng và phân loại nguồn phát sinh.

## Kiểm tra khi bạn chạy

- Phiếu nháp không vào báo cáo; ghi sổ vào đúng ngày Việt Nam.
- Nhập 10, cấp 3, hoàn 0,5: nhập 10,5, xuất 3, cuối 7,5. Ghi tiêu hao ở bếp không đổi số này.
- Một lần làm 10, đạt 9: định mức theo 10, tỷ lệ đạt 90%, nhập TP 9.
- Hai BOM khác phiên bản phải ra các dòng phân tích riêng.
- Kỳ chưa kết thúc: bình quân không chia cho các ngày tương lai.
- Gợi ý nhập không dùng hàng hết hạn. Nhu cầu đã có lệnh không được tính thêm vào gợi ý sản xuất lần nữa.
- Xuất CSV và mở biểu đồ một mặt hàng; không cộng sai đơn vị.

Chưa chạy build/test hoặc truy cập DB trong đợt này.
