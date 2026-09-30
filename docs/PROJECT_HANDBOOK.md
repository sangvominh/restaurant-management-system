# HỒ SƠ DỰ ÁN — HỆ THỐNG QUẢN LÝ NHÀ HÀNG

> Bản tổng hợp tự sinh. Chỉnh sửa các trang trong docs/content/, không sửa trực tiếp file này. Chạy `npm run export` trong thư mục docs để đồng bộ.

## 0. Cách đọc và mức độ hiệu lực

- **[CHỐT]**: chủ dự án đã xác nhận trực tiếp. Đây là căn cứ hiện tại khi kế hoạch cũ khác nhau.
- **[ĐỀ MÔN]**: yêu cầu được ghi trong đề chính thức; phải đối chiếu khi nghiệm thu môn học.
- **[KẾ HOẠCH]**: có trong kế hoạch nhóm nhưng chưa đồng nghĩa mọi chi tiết đã chốt hoặc đã làm.
- **[ĐỀ XUẤT]**: phương án trong tài liệu này giúp lập trình viên bắt đầu nhất quán; cần được nhóm tiếp nhận trước khi trở thành hợp đồng chung.
- **[MỞ]**: chưa có quyết định. Không tự chuyển thành yêu cầu đã được duyệt.

Thứ tự xử lý khác biệt: quyết định mới của chủ dự án xác định hướng sản phẩm; đề môn xác định điều kiện nghiệm thu; kế hoạch cũ cung cấp chi tiết tham khảo. Nếu hướng sản phẩm và tiêu chí môn xung đột, ghi nhận để nhóm xử lý, không âm thầm bỏ tiêu chí.

Người mới bắt đầu ở [Lộ trình đọc](/start/read-first). Các số chương được giữ để đối chiếu bản tổng hợp. Tất cả thông tin thiết yếu được viết tại đây; các nguồn cuối tài liệu chỉ phục vụ truy xuất.

---

## 1. Bối cảnh và mục tiêu chung

### 1.1 Một sản phẩm, ba góc đánh giá

**[CHỐT] Cùng một nhóm 5 người xây dựng một hệ thống quản lý nhà hàng chung cho ba môn:** Software Engineering (SE), Hệ thống thông tin doanh nghiệp (HTTTDN) và Nhập môn dữ liệu lớn (Big Data).

Không chia thành ba nhóm độc lập. Phần mềm và dữ liệu được dùng chung khi hợp lý; hồ sơ báo cáo, minh chứng và tiêu chí đánh giá vẫn theo từng môn.

| Môn | Trách nhiệm trong sản phẩm | Kết quả cần nhìn thấy |
|---|---|---|
| SE | Vận hành phục vụ khách và trải nghiệm sử dụng | Đặt bàn, phiên phục vụ, gọi món, bếp xử lý, thanh toán, thành viên |
| HTTTDN | Toàn bộ cấu hình/quản trị và nghiệp vụ MRP | Admin, tài khoản, danh mục, kho, công thức, sản xuất, duyệt phiếu, báo cáo kho |
| Big Data | Xử lý/phân tích dữ liệu từ SE và HTTTDN | KPI có cơ sở, kết quả phân tích có diễn giải, thực nghiệm và dữ liệu phục vụ dashboard |

**[CHỐT] Backend ứng dụng dùng NestJS.** Các đoạn FastAPI trong kế hoạch cũ là thông tin không còn phù hợp với quyết định backend này. Công cụ xử lý Big Data là lựa chọn riêng, chưa chốt; không suy ra mọi tác vụ phân tích phải viết bằng NestJS.

### 1.2 Bài toán thực tế

Nhà hàng cần kết nối hoạt động ở bàn, bếp, thu ngân và kho. Khi khách gọi món, bộ phận bếp cần nhận đúng yêu cầu; phục vụ biết món đã xong; thu ngân tính đúng hóa đơn; quản lý theo dõi nguồn nguyên liệu và thành phẩm. Dữ liệu bán hàng và kho tiếp tục được phân tích để hiểu doanh thu, sức bán, thời điểm đông khách và nhu cầu nguyên liệu.

Mục tiêu sản phẩm là một chuỗi nghiệp vụ có dữ liệu nhất quán, thay vì các màn hình chỉ hiển thị dữ liệu rời rạc.

---

## 2. Phạm vi sản phẩm và các giao diện

### 2.1 Các bề mặt sử dụng

| Giao diện | Người dùng | Công việc chính | Mức độ |
|---|---|---|---|
| Web Admin hệ thống | Admin | Tài khoản, phân quyền, danh mục, cấu hình nhà hàng, quản trị dữ liệu | CHỐT về trách nhiệm HTTTDN; chi tiết theo kế hoạch |
| Web nghiệp vụ quản lý | Quản lý kho/nhà hàng | Nhập kho, công thức, giao sản xuất, duyệt phiếu, báo cáo | KẾ HOẠCH và ĐỀ MÔN MRP |
| App nhân viên | Bếp, phục vụ, thu ngân | Nhận/xử lý yêu cầu và thực hiện nghiệp vụ theo vai trò | KẾ HOẠCH |
| Web khách vãng lai | Khách tại bàn | Quét QR, xem menu, gọi thêm, theo dõi món, xem hóa đơn | KẾ HOẠCH |
| App khách thành viên | Khách đăng ký | Chức năng khách, đặt bàn trước, lịch sử, điểm và ưu đãi | KẾ HOẠCH |

**Ranh giới quan trọng:** HTTTDN sở hữu trách nhiệm quản trị trong cách chia đồ án; điều đó không có nghĩa Admin hệ thống và quản lý kho là cùng một vai trò. Đề HTTTDN yêu cầu giao diện Admin tách biệt với giao diện quản lý nghiệp vụ. Có thể triển khai cùng một web với khu vực, layout và quyền riêng; không bắt buộc tách server chỉ vì yêu cầu giao diện.

### 2.2 Phạm vi cơ sở trong kế hoạch

- Tài khoản, xác thực và phân quyền.
- Khu vực, bàn, sức chứa, mã QR; thực đơn và trạng thái món.
- Đặt bàn, check-in, phiên phục vụ.
- Gọi món, gọi thêm, cập nhật tiến độ bếp, thông báo phục vụ.
- Hóa đơn, khuyến mãi, VAT, thanh toán, đóng phiên.
- Thành viên, điểm tích lũy, lịch sử sử dụng.
- Nhà cung cấp, nguyên liệu, đơn vị tính, công thức, nhập/xuất kho.
- Lệnh sản xuất, thành phẩm, duyệt đề nghị, hao hụt.
- Báo cáo vận hành, báo cáo kho và phân tích Big Data.

### 2.3 Không mặc nhiên đưa vào phạm vi bắt buộc

- HRM đầy đủ: chấm công, lương, nghỉ phép; CRM đầy đủ: khảo sát/đánh giá khách hàng. Đề HTTTDN cho chọn một nhánh và nhóm chọn MRP.
- Giao hàng, mang đi, tích hợp đơn vị vận chuyển, hệ thống quảng cáo: bản kết hợp có nhắc mua online/quảng cáo nhưng chưa mô tả đủ.
- Nhiều chi nhánh, nhiều doanh nghiệp thuê chung hệ thống.
- Cổng thanh toán cụ thể, hóa đơn điện tử có giá trị pháp lý, quy tắc thuế áp dụng thực tế.
- Kafka, Hadoop, Spark, Kubernetes, microservices hoặc bất kỳ công cụ nào chỉ vì tên xuất hiện trong ví dụ đề môn.

Các mục này có thể được bổ sung sau; hiện không được tự mở rộng backlog thành yêu cầu bắt buộc.

---

## 3. Yêu cầu nghiệm thu của từng môn

### 3.1 SE

**[CHỐT] Không có file đề riêng; mục tiêu được cung cấp là làm một sản phẩm phần mềm tốt.** Không có căn cứ để tự đặt thang điểm chính thức.

Kế hoạch nhóm yêu cầu mỗi chức năng được phân rã thành chức năng con, có đầu vào, xử lý, đầu ra, dữ liệu lưu và lưu đồ. Tài liệu/kiểm thử triển khai nên giữ cách mô tả này để hỗ trợ báo cáo.

### 3.2 HTTTDN

**[ĐỀ MÔN] Nhóm tối đa 5 người; lịch chấm trong file: tuần 10–11, từ 09/11/2026 đến 22/11/2026.** Đây là lịch ghi trong đề, chưa xác nhận thay đổi về sau.

| Nhóm tiêu chí | Điểm tối đa | Nội dung |
|---|---:|---|
| Báo cáo | 40 | Giới thiệu và khảo sát 10; phân tích 10; thiết kế CSDL/giao diện 10; cài đặt/hướng dẫn 5; tổng kết 5 |
| CSDL và Admin | 30 | CSDL 10, gồm phương án sao lưu/phục hồi; giao diện Admin 20 |
| Nghiệp vụ lựa chọn: MRP | 30 | Quản lý kho 20; nhân viên 10 |

Hồ sơ cần có:

- Giới thiệu doanh nghiệp, hoạt động, mô hình, nhân sự.
- Khảo sát HTTT ít nhất 15 câu hỏi, tổng kết kết quả và kết luận. Chưa có thông tin xác nhận doanh nghiệp khảo sát cụ thể; không tự tạo kết quả khảo sát như dữ liệu thật.
- Bài toán chi tiết; sơ đồ chức năng, sơ đồ ngữ cảnh, luồng dữ liệu mức đỉnh.
- Lược đồ CSDL gắn với phân tích; mô tả bảng và thuộc tính; hình ảnh và mô tả giao diện.
- Phương án cài đặt, chuyển đổi từ hệ thống cũ nếu có; hướng dẫn sử dụng; ưu/nhược điểm và hướng phát triển.
- Kế hoạch làm việc 15 tuần, nội dung và tỷ lệ đóng góp từng thành viên.
- Báo cáo in; bộ nộp điện tử gồm `readme.txt` thông tin nhóm, source code, báo cáo, script SQL.
- Dữ liệu demo đầy đủ, tài khoản kiểm thử và các giao dịch/công việc mẫu.

Admin bắt buộc có khu vực riêng, xem/tìm kiếm/tìm nâng cao/sắp xếp/lọc sản phẩm và nhà cung cấp, thêm/xóa/phân quyền account. Kế hoạch mở rộng thêm sửa/khóa tài khoản, log và thao tác backup/restore. Đề yêu cầu phương án backup/restore trong báo cáo; không được nhầm rằng đề bắt buộc tất cả phải là nút chức năng trên web.

MRP bắt buộc giữ các khả năng:

1. Quản lý nhập nguyên liệu, duyệt xuất nguyên liệu và thành phẩm.
2. Quản lý công thức sản phẩm, đề nghị số lượng cần sản xuất và giao nhân viên.
3. Nhân viên nhận yêu cầu, kiểm tra nguyên liệu, lập đề nghị xuất, tạo thành phẩm và đề nghị xuất thành phẩm để bán.
4. Thống kê nguyên liệu/thành phẩm theo tháng, quý, năm.

DFD mức sâu hơn, use case/activity/sequence, WebSocket, hao hụt và quy đổi đơn vị xuất hiện trong kế hoạch; không phải tất cả được liệt kê thành tiêu chí bắt buộc riêng trong đề.

### 3.3 Big Data

**[ĐỀ MÔN] Chọn một quy trình con trong pipeline. [KẾ HOẠCH] Nhóm chọn Processing → Analytics.**

Chuỗi tổng quát trong đề: Sources → Ingestion → Storage → Processing → Analytics → Presentation → Decision/Action. Phần nhóm chọn tập trung biến dữ liệu đã xử lý/chuẩn bị thành KPI, truy vấn hoặc mô hình có kết quả và diễn giải. Các bước bổ trợ phục vụ demo không đồng nghĩa cam kết triển khai toàn bộ pipeline sản xuất.

Yêu cầu bắt buộc:

- Chỉ rõ ranh giới quy trình, quan hệ với bước trước/sau.
- Nêu ít nhất hai đặc trưng Big Data phù hợp trong Volume, Velocity, Variety, Veracity hoặc nhu cầu phân tán/mở rộng; giải thích bằng dữ liệu và thực nghiệm.
- Mô tả nguồn, cách lấy, schema, định dạng, số bản ghi/dung lượng, tốc độ nếu có; có ví dụ input/output.
- Giải thích vai trò và lý do chọn từng công nghệ.
- Sơ đồ kiến trúc/data-flow, nơi lưu/xử lý và giao diện dữ liệu giữa các bước.
- Demo có log, kết quả, thời gian xử lý hoặc chỉ số phù hợp; người khác chạy lại được.
- Nộp báo cáo PDF, source/config/README, dữ liệu mẫu hoặc script sinh dữ liệu, minh chứng và phân công.

Đề không ấn định số bản ghi tối thiểu, không bắt buộc tất cả công nghệ gợi ý và không bắt buộc dự báo. Chỉ phân tích tệp nhỏ bằng Pandas hoặc vẽ biểu đồ từ vài giao dịch không tự chứng minh đáp ứng Big Data.

Thang điểm ghi ở mục đánh giá giữa kỳ: hệ thống 2,5; thiết kế/kỹ thuật 2; thực nghiệm 2; đặc trưng Big Data/mở rộng 1,5; phân tích 1; báo cáo/tái lập 1. Báo cáo được khuyến nghị khoảng 30 trang A4 không tính phần phụ. File dùng xen kẽ tên giữa kỳ/cuối kỳ; cần xác nhận mốc nộp với giảng viên thay vì tự suy ra hai lần nộp.

---

## 4. Thuật ngữ chung

| Thuật ngữ | Nghĩa trong dự án |
|---|---|
| Reservation / Đặt bàn | Giữ chỗ cho một thời điểm/khung giờ; chưa phải phiên ăn đang diễn ra |
| Dining session / Phiên phục vụ | Một lượt phục vụ tại bàn; tập hợp các lần gọi món và thanh toán |
| Order / Lần gọi món | Một lần gửi yêu cầu; một phiên có thể gọi nhiều lần |
| Order item / Dòng món | Một món với số lượng, ghi chú và trạng thái xử lý riêng |
| Menu item / Món bán | Đối tượng khách chọn trên thực đơn, có giá bán |
| Inventory item / Hàng kho | Nguyên liệu, bán thành phẩm hoặc thành phẩm được theo dõi tồn |
| BOM / Công thức định lượng | Các thành phần và lượng cần để tạo một lượng sản phẩm đầu ra |
| Production order / Lệnh sản xuất | Yêu cầu làm số lượng sản phẩm, có người phụ trách và trạng thái |
| Stock document / Phiếu kho | Chứng từ đề nghị/nhập/xuất/hao hụt theo nghiệp vụ |
| Stock movement / Biến động kho | Dòng ghi nhận tăng/giảm tồn thực sự, có nguồn nghiệp vụ |
| Invoice / Hóa đơn | Bản chốt tính tiền của phiên theo quy tắc giá/ưu đãi/thuế |
| Payment / Thanh toán | Lần thanh toán hoặc kết quả thanh toán gắn với hóa đơn |
| KPI | Chỉ số có định nghĩa, khoảng thời gian, nguồn dữ liệu và cách tính rõ |

Không đồng nhất món bán với nguyên liệu hoặc thành phẩm. Một món có thể được làm theo order hoặc dùng hàng làm sẵn; cách ánh xạ và thời điểm trừ tồn đang mở.

---

## 5. Vai trò và phân quyền

**[ĐỀ XUẤT] Dùng quyền thao tác phía backend; giao diện chỉ hiển thị phần phù hợp. Ẩn menu không thay thế kiểm tra quyền API.**

| Vai trò | Quyền nghiệp vụ chính | Giới hạn |
|---|---|---|
| Admin hệ thống | Tài khoản, vai trò, danh mục và cấu hình | Không mặc nhiên được duyệt mọi giao dịch tài chính/kho chỉ vì là Admin |
| Quản lý kho | Công thức, nhập kho, giao lệnh, duyệt xuất/hao hụt, báo cáo kho | Phải tuân thủ trạng thái phiếu và kiểm tra tồn |
| Bếp / Nhân viên sản xuất | Nhận món/lệnh, cập nhật tiến độ, đề nghị xuất và hao hụt | Không tự duyệt phiếu do mình lập theo luồng MRP |
| Phục vụ | Theo dõi bàn, tạo đơn hộ khách, nhận thông báo món xong | Không sửa cấu hình hệ thống hoặc xác nhận thanh toán nếu chưa có quyền |
| Thu ngân | Check-in theo quy trình, hóa đơn, nhận thanh toán, đóng phiên | Không tự điều chỉnh kho |
| Khách thành viên | Đặt bàn, gọi món trong phiên hợp lệ, lịch sử và điểm của mình | Không xem giao dịch/tài khoản khách khác |
| Khách vãng lai | Menu, gọi món và theo dõi trong phiên được cấp quyền | Không có quyền đặt bàn/thành viên chỉ từ QR công khai |

**[MỞ]** Ai quản lý bàn/thực đơn/khuyến mãi trong vận hành hằng ngày; một tài khoản có được nhiều vai trò; quản lý nhà hàng có tách quản lý kho không. Trước khi mở quyền rộng, nhóm cần duyệt ma trận chi tiết. Tên vai trò trên là mô hình phối hợp từ các kế hoạch, không phải schema đã có.

---

## 6. Các luồng nghiệp vụ

### 6.1 Cấu hình và đăng nhập

Đầu vào: tài khoản hợp lệ, vai trò, khu vực/bàn, thực đơn và dữ liệu gốc.

1. Admin tạo tài khoản nhân viên và gán quyền; thiết lập danh mục.
2. Người dùng đăng nhập; kiểm tra tài khoản hoạt động trước khi cấp phiên/token.
3. UI chuyển vào đúng khu vực. Backend xác thực và kiểm tra quyền từng yêu cầu.
4. Người dùng xem thông tin cá nhân, đổi mật khẩu, đăng xuất theo kế hoạch.

Đầu ra: phiên truy cập và dữ liệu cấu hình có thể sử dụng; không gửi password hash hoặc dữ liệu xác thực cho client.

### 6.2 Đặt bàn và mở phiên phục vụ

1. Thành viên chọn thời gian, số khách; hệ thống trả các bàn phù hợp.
2. Tạo đặt bàn phải kiểm tra xung đột ở backend khi ghi dữ liệu, không chỉ lúc hiển thị bàn trống.
3. Khách đến và check-in; mở hoặc liên kết một phiên phục vụ.
4. Khách vãng lai cần cách mở phiên tương ứng; chưa chốt do khách quét QR hay nhân viên xác nhận.
5. Đặt bàn bị hủy không tự hủy một phiên đã bắt đầu.

**[MỞ]** Thời lượng đặt bàn, thời gian giữ chỗ, trễ/no-show, ghép/chuyển bàn, đặt món trước và khoản đặt cọc. Kế hoạch nói tự check-in khi quét QR nhưng chưa xác định cách chứng minh khách đang tại bàn. QR nên chỉ định danh bàn; quyền thao tác phiên cần được cấp riêng theo phương án nhóm chọn.

### 6.3 Gọi món và bếp

1. Khách có quyền với phiên hoặc nhân viên có quyền tạo hộ chọn món đang bán.
2. Backend đọc giá hợp lệ, tạo order và các dòng món; lưu giá tại thời điểm gọi.
3. Bếp nhận thông báo order sau khi lưu thành công.
4. Bếp cập nhật từng dòng: mới → đang làm → hoàn tất.
5. Phục vụ nhận thông báo món xong; khách xem tiến độ.
6. Gọi thêm tạo lượt order mới trong cùng phiên.
7. Theo kế hoạch, chỉ hủy món trước khi bếp bắt đầu. Backend phải xử lý cuộc đua giữa yêu cầu hủy và thao tác bắt đầu làm.

**[MỞ]** Thao tác xác nhận order trước khi chuyển bếp; chia một dòng nhiều phần thành các lần hoàn tất; cách xử lý món hết nguyên liệu; bước xác nhận đã phục vụ. Chưa nối luồng này với thao tác trừ kho tự động.

### 6.4 Tính tiền và kết thúc phiên

1. Thu ngân yêu cầu bản tính tiền từ dữ liệu phía server.
2. Tổng hợp các dòng hợp lệ; áp điều kiện khuyến mãi, khoản phí và VAT theo chính sách được chốt.
3. Tạo/chốt hóa đơn và thực hiện thanh toán.
4. Chỉ xác nhận thanh toán khi có căn cứ hợp lệ: thu ngân đối với tiền mặt, kết quả xác minh của nhà cung cấp đối với tích hợp điện tử.
5. Sau thanh toán thành công, đóng phiên và tích điểm đúng một lần nếu đủ điều kiện.

**[MỞ]** “Tiền bàn” là phí gì, mức và cách tính; giá đã gồm VAT chưa; thứ tự ưu đãi/thuế; làm tròn; tách/gộp hóa đơn; trả một phần/hoàn tiền; nhà cung cấp thanh toán. Không hardcode một quy tắc chưa được xác nhận. Có thể dùng adapter thanh toán mô phỏng cho demo, phải ghi rõ là mô phỏng.

### 6.5 MRP: nhập nguyên liệu và sản xuất

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

### 6.6 Hao hụt và xử lý phiếu

- Nhân viên lập phiếu hao hụt: hàng, lượng, đơn vị, lý do, người lập.
- Quản lý duyệt mới ghi giảm tồn; không sinh thành phẩm từ hao hụt.
- Người lập có thể hủy phiếu chưa duyệt; quản lý từ chối kèm lý do.
- Theo kế hoạch không hủy phiếu đã duyệt. Nếu cần sửa sai, thiết kế chứng từ điều chỉnh/bù trừ có dấu vết sau khi nhóm chốt; không xóa lịch sử cũ.
- Giá trị thiệt hại bằng tiền phụ thuộc phương pháp giá vốn chưa chốt. Chỉ báo cáo số lượng trước khi có căn cứ tính giá trị.

### 6.7 Ranh giới trừ kho đang để mở

**[CHỐT] Chủ dự án muốn bàn sau về thao tác quyết định trừ nguyên liệu; không chốt quản lý là tác nhân duy nhất cho mọi trường hợp.**

Tài liệu cũ có hai hướng: duyệt xuất theo MRP và tự trừ theo BOM khi POS nhận món gọi trực tiếp. Không triển khai đồng thời hai hướng trên cùng một lượng tiêu hao.

**[ĐỀ XUẤT]** Tập trung mọi ghi tăng/giảm vào dịch vụ tồn kho có transaction và khóa chống lặp. Module gọi món gửi yêu cầu nghiệp vụ qua giao diện tích hợp, không tự cập nhật số dư kho. Có thể triển khai dịch vụ này và luồng phiếu MRP trước; để điểm gọi từ POS chưa kích hoạt cho đến khi chốt chính sách.

Các quyết định cần chốt trước tích hợp POS–MRP:

1. Phân loại món làm theo order, món làm sẵn và bán thành phẩm.
2. Sự kiện nào tạo tiêu hao; ai được kích hoạt.
3. Xuất thành phẩm sang khu phục vụ và bán cho khách là một hay hai biến động.
4. Khi hủy món, trả hàng, làm hỏng: hoàn kho hay ghi hao hụt.
5. Khi hai đơn cùng cần nguyên liệu cuối cùng: từ chối, giữ chờ hay yêu cầu xử lý khác.

---

## 7. Trạng thái và các bất biến

Các mã trạng thái dưới đây là **[ĐỀ XUẤT] hợp đồng ban đầu**, ngoại trừ quy tắc nghiệp vụ đã ghi trong kế hoạch/đề. Cần thống nhất trước khi tạo schema và frontend phụ thuộc.

| Đối tượng | Trạng thái đề xuất | Quy tắc chuyển chính |
|---|---|---|
| Reservation | CONFIRMED, CHECKED_IN, CANCELLED, NO_SHOW | Chỉ đặt chưa check-in được hủy; NO_SHOW cần chính sách thời gian |
| Session | OPEN, CHECKOUT_PENDING, CLOSED, CANCELLED | Không nhận order khi đóng; điều kiện khóa gọi món lúc tính tiền cần chốt |
| Order item | NEW, PREPARING, READY, CANCELLED | NEW → PREPARING → READY; NEW → CANCELLED |
| Production order | DRAFT, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED | Không hoàn tất lặp; hủy sau xuất nguyên liệu cần xử lý tồn riêng |
| Tình trạng nguyên liệu | UNCHECKED, SUFFICIENT, INSUFFICIENT | Trường riêng, không trộn với trạng thái sản xuất |
| Phiếu đề nghị xuất/hao hụt | DRAFT, SUBMITTED, APPROVED, REJECTED, CANCELLED | Duyệt một lần từ SUBMITTED; hủy không làm đổi tồn |
| Phiếu nhập | DRAFT, POSTED, CANCELLED | Chỉ POSTED tăng tồn; không áp dụng nhầm luồng duyệt xuất |
| Invoice | DRAFT, ISSUED, PAID, VOID | Không sửa tiền hóa đơn đã thanh toán |
| Payment | PENDING, SUCCEEDED, FAILED | Callback lặp không tạo thanh toán/điểm lặp |

Bất biến cần bảo vệ cả khi nhiều người thao tác đồng thời:

- Không có hai phiên OPEN cho cùng bàn theo mô hình một bàn/một phiên cơ sở.
- Không chấp nhận đặt bàn trùng khung thời gian theo quy tắc nhóm chọn.
- Giá, tổng tiền, quyền và chủ sở hữu được kiểm tra ở backend.
- Một chứng từ được ghi sổ tối đa một lần; không âm tồn do hai lần duyệt cạnh tranh.
- Mỗi thay đổi tồn có movement và chứng từ nguồn; số dư và lịch sử phải cập nhật nguyên tử.
- Xác nhận sản xuất không trừ lại nguyên liệu đã xuất.
- Đổi công thức không làm thay đổi ngược định lượng của lệnh đã phát hành.
- Thanh toán, tích điểm và thông báo không được tạo tác động lặp khi retry.

---

## 8. Kiến trúc triển khai đề xuất

### 8.1 Công nghệ

| Thành phần | Lựa chọn | Mức độ |
|---|---|---|
| Backend ứng dụng | NestJS | CHỐT |
| CSDL nghiệp vụ | PostgreSQL | KẾ HOẠCH |
| Web | React | KẾ HOẠCH |
| Mobile | React Native | KẾ HOẠCH |
| Giao tiếp | REST cho command/query; WebSocket cho cập nhật tức thời | KẾ HOẠCH |
| Xác thực | JWT cho tài khoản; quyền phiên riêng cho khách vãng lai | JWT theo kế hoạch; thiết kế phiên khách là ĐỀ XUẤT |
| Big Data | Chọn sau dựa trên quy trình và thực nghiệm; có thể đánh giá Spark SQL/PySpark | MỞ |
| ORM, quản lý package, UI library, triển khai | Chưa chọn | MỞ |

### 8.2 Cách tổ chức

**[ĐỀ XUẤT] Bắt đầu với backend NestJS chia module trong một ứng dụng**, dùng transaction CSDL cho các nghiệp vụ liên quan. Chưa có yêu cầu buộc dùng microservices. Tách job phân tích khỏi đường xử lý request vận hành.

Luồng kết nối:

```text
Web Admin / Web khách / App nhân viên / App thành viên
                  | REST + WebSocket
                  v
              NestJS API
     Auth | Catalog | Dining | Orders | Billing
          Inventory | Production | Reporting
                  |
                  v
          PostgreSQL nghiệp vụ
                  |
          export/snapshot có schema
                  v
        Xử lý dữ liệu / phân tích Big Data
                  |
           kết quả KPI có phiên bản
                  v
      API đọc kết quả → Dashboard quản trị/vận hành
```

Đây là kiến trúc đề xuất, chưa chốt việc dùng chung database vật lý hay kho kết quả riêng. Big Data không được trực tiếp quyết định thanh toán hoặc thay đổi tồn kho trong phạm vi hiện tại.

### 8.3 Module backend và quyền sở hữu dữ liệu

| Module | Sở hữu |
|---|---|
| Auth / Users | Tài khoản, vai trò, phiên truy cập |
| Catalog / Restaurant | Khu vực, bàn, menu, giá, mã QR |
| Reservations / Sessions | Đặt bàn, check-in, phiên phục vụ |
| Orders / Kitchen | Order, dòng món, trạng thái bếp |
| Billing / Payments | Hóa đơn, ưu đãi áp dụng, kết quả thanh toán |
| Membership | Hồ sơ thành viên, sổ điểm |
| Inventory | Hàng kho, đơn vị, nhà cung cấp, phiếu, movement, tồn |
| Production | BOM, phiên bản công thức, lệnh sản xuất |
| Reporting / Analytics gateway | Báo cáo nghiệp vụ và đọc kết quả phân tích |
| Audit | Dấu vết các thao tác cần truy xuất |

Module khác không cập nhật trực tiếp bảng tồn, thanh toán hoặc điểm. Gọi service sở hữu nghiệp vụ để giữ transaction và kiểm tra quyền/trạng thái.

---

## 9. Mô hình dữ liệu định hướng

Đây là **[ĐỀ XUẤT] mô hình logic**, không phải SQL đã duyệt. Trường liệt kê là tối thiểu để thảo luận; cần migration, khóa ngoại, unique/check/index sau khi chốt.

| Nhóm / Bảng | Trường hoặc quan hệ chính |
|---|---|
| users, roles, user_roles | id, tên đăng nhập/email, password_hash, status; quyền theo role |
| customer_profiles | user_id, tên/thông tin liên hệ cần thiết; không bắt khách vãng lai có account |
| areas, dining_tables | area_id, table_code, capacity, active |
| reservations | customer_id, table_id, start_at, end_at, party_size, status |
| dining_sessions | table_id, reservation_id nullable, opened_at, closed_at, status |
| guest_session_access | session_id, định danh/credential băm, hạn dùng; cơ chế cấp còn mở |
| menu_categories, menu_items | tên, category_id, giá, trạng thái bán; không lưu lượng kho trực tiếp ở menu |
| orders, order_items | session_id, người tạo; menu_item_id, quantity, unit_price_snapshot, note, status |
| invoices, invoice_lines | session_id; dòng tiền được chốt, subtotal, discount, tax, fees, total, status |
| payments | invoice_id, method, amount, status, provider_reference/idempotency_key |
| promotions, promotion_redemptions | điều kiện và lần áp dụng; chi tiết chính sách còn mở |
| loyalty_entries | customer_id, delta_points, source_type, source_id, created_at |
| suppliers | mã, tên, liên hệ, trạng thái |
| units, item_unit_conversions | đơn vị cơ sở và hệ số quy đổi theo hàng khi cần |
| inventory_items | mã, tên, loại RAW/SEMI_FINISHED/FINISHED, base_unit_id, active |
| menu_inventory_mappings | quan hệ món bán–sản phẩm/công thức; chính sách tiêu hao còn mở |
| bom_versions, bom_lines | output_item_id, output_quantity, version; component_item_id, quantity, unit_id |
| production_orders | bom_version_id, target_quantity, assignee_id, status, material_status |
| stock_documents, stock_document_lines | type, status, supplier/production reference, người lập/duyệt; item, lượng, đơn vị |
| stock_movements | item_id, signed_quantity_base, source_document/line, reason, posted_at |
| stock_balances | item_id, quantity_base; cập nhật cùng transaction với movement |
| audit_logs | actor, action, entity, entity_id, timestamp, thông tin thay đổi cần thiết |
| analytics_runs, analytics_results | run_id, cửa sổ dữ liệu, phiên bản định nghĩa KPI, trạng thái, kết quả |

### 9.1 Quan hệ cần thống nhất

- Một bàn có nhiều phiên trong lịch sử; mỗi phiên có nhiều order; mỗi order có nhiều dòng.
- **[ĐỀ XUẤT cơ sở]** Một phiên có một hóa đơn đang hiệu lực; tách/gộp hóa đơn là mở rộng cần chốt.
- Một hóa đơn có thể có nhiều lần thử thanh toán; không đồng nghĩa hỗ trợ chia tiền trong phạm vi cơ sở.
- Một sản phẩm có nhiều phiên bản BOM; lệnh sản xuất giữ phiên bản hoặc bản chụp định lượng.
- Một chứng từ có nhiều dòng; mỗi dòng ghi sổ sinh movement có khóa chống lặp.
- Tồn kho và lượng bán là hai đại lượng khác nhau; không lấy số order thay cho số lượng món.

### 9.2 Quy tắc kiểu dữ liệu và ràng buộc

- Tiền dùng kiểu decimal hoặc số nguyên theo đơn vị tiền đã thống nhất; không dùng số thực nhị phân để tính hóa đơn.
- Lượng nguyên liệu dùng decimal; quantity phải dương ở dòng phiếu, dấu tăng/giảm thuộc movement.
- Lưu thời điểm nhất quán, đề xuất UTC; hiển thị/tổng hợp ngày kinh doanh theo `Asia/Ho_Chi_Minh`.
- Quy đổi kg↔g theo cùng đại lượng; quy đổi chai↔ml phụ thuộc sản phẩm/quy cách. Không dùng một hệ số toàn cục cho mọi loại chai.
- Không xóa cứng dữ liệu gốc đã được giao dịch tham chiếu; ngừng hoạt động hoặc chặn xóa có lý do. Yêu cầu “xóa” trên UI cần xử lý phù hợp lịch sử.
- Unique trên mã nghiệp vụ, reference thanh toán và khóa ghi sổ; index theo quan hệ và truy vấn thực tế.
- Migration là nguồn tạo CSDL có kiểm soát; cung cấp thêm script SQL/dữ liệu demo để đáp ứng HTTTDN.

---

## 10. Hợp đồng API và cập nhật thời gian thực

Tất cả đường dẫn dưới đây là **[ĐỀ XUẤT]**, chưa tồn tại trong repo. Dùng tiền tố `/api/v1`. Nhóm phải duyệt DTO/OpenAPI trước khi frontend và backend triển khai độc lập.

### 10.1 Nhóm endpoint

| Nhóm | Ví dụ endpoint | Quyền/điều kiện |
|---|---|---|
| Xác thực | POST `/auth/login`; GET `/auth/me`; POST `/auth/change-password` | Tài khoản hợp lệ; trừ login phải xác thực |
| Quản trị | `/users`, `/roles`, `/areas`, `/tables`, `/menu-items`, `/suppliers` | Kiểm tra permission tương ứng; phân trang/lọc |
| Đặt bàn | GET `/availability`; POST `/reservations`; POST `/reservations/:id/cancel` | Thành viên hoặc nhân viên được cấp quyền |
| Check-in | POST `/reservations/:id/check-in`; POST `/sessions` | Quy tắc cấp quyền mở phiên phải chốt |
| Gọi món | POST `/sessions/:id/orders`; GET `/sessions/:id/orders` | Có quyền đúng phiên; phiên cho phép gọi |
| Bếp | POST `/order-items/:id/start`; POST `/order-items/:id/ready`; POST `/order-items/:id/cancel` | Đúng vai trò và trạng thái |
| Tính tiền | POST `/sessions/:id/checkout`; GET `/invoices/:id` | Quyền thu ngân hoặc quyền xem của khách |
| Thanh toán | POST `/invoices/:id/payments`; POST `/payments/provider-callback` | Callback phải xác minh; chống lặp |
| Thành viên | GET `/me/history`; GET `/me/loyalty` | Chỉ dữ liệu của tài khoản hiện tại |
| Kho | `/inventory-items`, `/units`, `/stock-balances`, `/stock-documents` | Phân quyền đọc/ghi riêng |
| Phiếu kho | POST `/stock-documents/:id/submit`, `/approve`, `/reject`, `/cancel` | Kiểm tra type, trạng thái và quyền |
| Nhập kho | POST `/stock-documents/:id/post` | Chỉ phiếu nhập hợp lệ; không dùng thay approve phiếu xuất |
| Sản xuất | `/boms`; `/production-orders`; POST `/production-orders/:id/complete` | Hoàn tất phải gắn xuất nguyên liệu hợp lệ |
| Báo cáo | GET `/reports/inventory`; GET `/analytics/sales` | Khoảng thời gian hợp lệ, quyền quản lý |

### 10.2 Ví dụ tạo order

```json
{
  "idempotencyKey": "client-request-unique-id",
  "items": [
    { "menuItemId": "menu-item-id", "quantity": 2, "note": "Không hành" }
  ]
}
```

Backend không nhận tổng tiền client làm nguồn đúng. Giá trả về lấy từ cấu hình server và được lưu vào dòng order. Retry cùng khóa/phạm vi và cùng nội dung trả lại kết quả đã tạo; cùng khóa nhưng khác nội dung trả lỗi xung đột.

### 10.3 Quy ước phản hồi

- ID dạng chuỗi; timestamp ISO 8601; thống nhất cách truyền decimal và tiền trước khi viết SDK.
- Danh sách có phân trang, sort và filter được whitelist.
- `400`: dữ liệu không hợp lệ; `401`: chưa xác thực; `403`: không có quyền; `404`: không tìm thấy trong phạm vi được phép; `409`: trạng thái/xung đột nghiệp vụ.
- Lỗi có `code`, `message`, `details` phù hợp và `requestId`; không lộ stack trace hoặc secret.
- Ví dụ mã nghiệp vụ: `INSUFFICIENT_STOCK`, `DOCUMENT_ALREADY_POSTED`, `TABLE_TIME_CONFLICT`, `ORDER_ITEM_ALREADY_STARTED`.
- Với thao tác đã thành công và retry hợp lệ, trả kết quả cũ; không tạo side effect lần hai.

### 10.4 WebSocket

Event đề xuất: `order.created`, `order_item.status_changed`, `production_order.status_changed`, `stock_document.status_changed`, `stock.balance_changed`, `payment.succeeded`.

Envelope tối thiểu: `eventId`, `type`, `entityId`, `occurredAt`, `version`, dữ liệu cần hiển thị. Chỉ phát sau khi transaction commit. Phân room theo quyền của nhân viên hoặc phiên khách; không broadcast dữ liệu mọi bàn cho mọi người.

WebSocket giúp cập nhật nhanh; REST/CSDL vẫn là nguồn trạng thái chuẩn. Khi reconnect, client tải lại trạng thái; event lặp hoặc đến muộn không được làm UI quay về trạng thái cũ. Không tạo event lần hai thành một giao dịch mới.

---

## 11. Transaction, an toàn dữ liệu và vận hành

### 11.1 Duyệt phiếu xuất/hao hụt

**[ĐỀ XUẤT]** Trong một transaction:

1. Kiểm tra quyền và khóa/kiểm tra phiên bản chứng từ.
2. Xác nhận chứng từ còn SUBMITTED và chưa ghi sổ.
3. Quy đổi tất cả dòng sang đơn vị cơ sở; gộp nhu cầu cùng hàng.
4. Khóa số dư các hàng theo thứ tự ổn định; kiểm tra đủ tồn.
5. Ghi movement, cập nhật số dư, đổi trạng thái và ghi actor/thời gian.
6. Commit toàn bộ hoặc rollback toàn bộ; sau commit mới thông báo.

Unique constraint và kiểm tra trạng thái phải ngăn hai request cùng duyệt thành công. Với lỗi ở bất kỳ dòng nào, không được trừ một phần chứng từ.

### 11.2 Thanh toán và điểm

Reference của nhà cung cấp/callback được kiểm tra và khử lặp. Hóa đơn đã trả không phát sinh điểm lần hai khi khách refresh hoặc hệ thống retry. Nếu hoàn tiền được đưa vào phạm vi, phải thiết kế bút toán bù điểm và trạng thái tương ứng trước khi hỗ trợ.

### 11.3 Xác thực, log và sao lưu

- Hash mật khẩu; không lưu plaintext hoặc ghi mật khẩu/token vào log.
- Validate DTO, kiểm tra quyền đối tượng, giới hạn thử đăng nhập; cấu hình secret ngoài source code.
- Khóa tài khoản phải có hiệu lực với các request tiếp theo theo cơ chế token/session đã chọn, không chỉ chặn lần login mới.
- Log có requestId; audit cho duyệt phiếu, thay quyền, sửa cấu hình và thao tác nhạy cảm.
- Xác định người được backup/restore, nơi lưu và quy trình khôi phục. Demo phục hồi trên môi trường thử nghiệm, ghi lại kết quả đối soát.
- Không tự triển khai restore dữ liệu đang vận hành từ một nút bấm thiếu kiểm soát.

---

## 12. Thiết kế phạm vi Big Data

### 12.1 Câu hỏi phân tích theo kế hoạch

1. Doanh thu thay đổi theo ngày/tuần/tháng thế nào?
2. Món nào bán nhiều hoặc đóng góp doanh thu cao?
3. Khung giờ nào có nhiều giao dịch/khách/món?
4. Có thể ước lượng nhu cầu nhập nguyên liệu từ tốc độ tiêu thụ không?

Ba câu đầu là KPI kế hoạch; câu thứ tư là phần dự báo nhóm mong muốn, cần xác định dữ liệu và cách đánh giá trước khi cam kết chất lượng.

### 12.2 Hợp đồng dữ liệu đầu vào đề xuất

| Dataset | Khóa và trường quan trọng | Mục đích |
|---|---|---|
| paid_invoice_lines | invoice_id, line_id, menu_item_id, quantity, các khoản tiền, paid_at, status | Doanh thu và sức bán |
| order_activity | order_id, item_id, session_id, created_at, started_at, ready_at, status | Tải vận hành và thời gian xử lý |
| inventory_movements | movement_id, item_id, quantity_base, reason, posted_at, source_id | Nhập/xuất/tiêu hao |
| inventory_snapshots | item_id, as_of, quantity_base | Mức tồn theo thời điểm |
| menu_bom_reference | menu_item_id, bom_version, thành phần/định lượng, thời gian hiệu lực | Ước tính nhu cầu nguyên liệu khi quan hệ đã chốt |

Mỗi lần export có `schema_version`, `extracted_at`, cửa sổ dữ liệu và số bản ghi. Loại thông tin liên hệ không cần thiết; dùng ID thay cho tên/điện thoại khi phân tích không cần nhận dạng.

**[ĐỀ XUẤT]** Bắt đầu bằng snapshot theo lô có thể chạy lại; định dạng CSV/Parquet và công cụ xử lý cần chốt. Không ép phụ thuộc streaming khi câu hỏi và đề không yêu cầu.

### 12.3 Định nghĩa KPI phải có trước khi tính

| KPI | Định nghĩa cơ sở đề xuất | Điểm cần xác nhận |
|---|---|---|
| Doanh thu thuần bán món | Tiền món trên hóa đơn đã thanh toán sau giảm giá, chưa VAT | Phân bổ giảm giá toàn hóa đơn; hoàn tiền; phí bàn |
| Số món bán | Tổng quantity của dòng món hợp lệ thuộc hóa đơn đã thanh toán | Bán theo combo, món tặng |
| Khung giờ cao điểm | Số order hoặc số món theo giờ tạo order | Không lẫn với doanh thu theo giờ thanh toán |
| Tồn cuối kỳ | Tồn đầu + tổng nhập − tổng xuất − hao hụt | Đảm bảo hao hụt không đã nằm trong tổng xuất được trừ lần nữa |
| Thời gian bếp | ready_at − started_at cho dòng hoàn tất | Dòng thiếu thời điểm hoặc hủy |
| Nhu cầu nhập dự kiến | Nhu cầu tiêu thụ dự kiến so với tồn khả dụng và chính sách bổ sung | Lead time, tồn an toàn, phương pháp dự báo |

Dashboard hiển thị kỳ báo cáo, định nghĩa chỉ số, thời điểm dữ liệu cập nhật và bộ lọc. Kết quả phân tích trễ không được dùng thay số dư kho tức thời khi duyệt phiếu.

### 12.4 Chứng minh Big Data và tái lập

- Chuẩn bị dữ liệu nghiệp vụ demo và bộ dữ liệu thực nghiệm mở rộng riêng; công bố rõ dữ liệu thật, công khai hay mô phỏng.
- Nếu sinh dữ liệu: cố định seed, tham số số ngày/số giao dịch, phân phối hợp lý và tỷ lệ lỗi/trùng nếu dùng để thử chất lượng dữ liệu.
- Đo nhiều mức tải phù hợp máy; báo cáo số dòng, dung lượng, thời gian, tài nguyên/cấu hình và kết quả kiểm tra đúng.
- Chứng minh ít nhất hai đặc trưng bằng tình huống và bằng chứng, không chỉ ghi tên “Volume/Variety”.
- Kiểm tra KPI trên tập nhỏ biết đáp án; đối soát tổng tiền/số lượng với nguồn.
- Dự báo nếu làm phải chia thời gian train/test, có baseline và chỉ số sai số; không dùng dữ liệu tương lai để dự báo quá khứ.
- README của phần phân tích phải cho phép tạo input, chạy xử lý và lấy output khi ứng dụng chính chưa chạy.

---

## 13. Phân công và trình tự triển khai

### 13.1 Phân công gốc trong kế hoạch SE

| Thành viên | Module trong kế hoạch gốc |
|---|---|
| Võ Minh Sang | Tài khoản, phân quyền, bàn và thực đơn |
| Nguyễn Huỳnh Hoàng Vũ | Đặt bàn và phiên phục vụ |
| Nguyễn Tấn Phát | Gọi món và xử lý tại bếp |
| Nguyễn Văn Hiền Nhân | Thanh toán và hóa đơn |
| Thái Quang Hiểu | Báo cáo và thành viên |

Đây là phân công được ghi trong tài liệu nguồn, chưa xác nhận còn nguyên sau khi ghép ba môn. Chưa có phân công Big Data chi tiết. Một người có thể làm phần code phục vụ nhiều môn; báo cáo cần phản ánh đóng góp thực tế.

Kế hoạch HTTTDN giai đoạn đầu giao Phát mô tả bài toán, Hiểu vẽ sơ đồ, Sang CSDL/SQL, Vũ UI Admin và hỗ trợ dữ liệu mẫu, Nhân UI quản lý/nhân viên. Các task backend/frontend tiếp theo chưa có căn cứ để gán hết cho từng người.

### 13.2 Các mốc cũ cần xác nhận lại

Kế hoạch HTTTDN có mốc 27/09/2026 cho task 1/4 và 01/10/2026 cho task 2/3. Đây là mốc trong kế hoạch, không phải bằng chứng task đã hoàn thành. Không suy ra tiến độ chỉ từ ngày hoặc trạng thái trong PDF.

Kế hoạch nhóm ghi cập nhật thứ Năm, hoàn thành/minh chứng trước 21:00 Chủ nhật. Áp dụng thực tế theo thống nhất hiện tại của nhóm; tài liệu này không tự thực thi chế tài hay gửi báo cáo cho thành viên.

### 13.3 Thứ tự phát triển đề xuất

| Giai đoạn | Việc làm | Điều kiện hoàn thành |
|---|---|---|
| A. Nền tảng | NestJS, PostgreSQL, web shell, migration, seed, auth/permission, OpenAPI | Đăng nhập các vai trò; API chặn đúng quyền; người khác chạy lại được |
| B. Dữ liệu gốc | Bàn, menu, nhà cung cấp, hàng kho, đơn vị | CRUD có validate, lọc, trạng thái hoạt động và dữ liệu mẫu |
| C. Luồng phục vụ | Phiên, đặt bàn, order, bếp, cập nhật tức thời | Một phiên gọi nhiều lần; bếp xử lý và khách thấy đúng trạng thái |
| D. Luồng MRP | Nhập, BOM, lệnh, đề nghị, duyệt, hoàn tất, xuất, hao hụt | Đối soát được tồn; retry/duyệt cạnh tranh không sai số |
| E. Hóa đơn/thành viên | Chính sách tiền, thanh toán, đóng phiên, tích điểm | Tổng tiền đúng; thanh toán/điểm không lặp |
| F. Tích hợp POS–kho | Chốt rồi nối điểm tiêu hao | Một nghiệp vụ chỉ trừ lượng liên quan một lần |
| G. Phân tích | Data contract, export, dataset mở rộng, KPI, thực nghiệm | Chạy độc lập; KPI đối soát được; minh chứng theo đề |
| H. Bàn giao | Báo cáo, hướng dẫn, SQL, demo, phân công thực tế | Đủ hồ sơ từng môn và một kịch bản demo xuyên suốt |

C, D và chuẩn bị G có thể được các thành viên thực hiện song song sau khi hợp đồng dùng chung ổn định. Đây là gợi ý tổ chức công việc, không phải ủy quyền triển khai tự động.

---

## 14. Hướng dẫn bắt đầu code cho người nhận bàn giao

### 14.1 Những việc có thể bắt đầu ngay

1. Đọc mục 0 và danh sách quyết định mở; kiểm tra repo thực tế vì hiện trạng có thể thay đổi sau ngày tài liệu.
2. Đề xuất cấu trúc module NestJS theo mục 8; chọn và ghi rõ package manager/ORM/phiên bản runtime trước khi nhóm cài đặt.
3. Tạo skeleton backend, cấu hình môi trường mẫu không có secret, kết nối CSDL, migration và health endpoint.
4. Triển khai auth, tài khoản, vai trò và kiểm tra permission; chuẩn bị ba tài khoản MRP và các vai trò SE cần thiết.
5. Chốt OpenAPI cho một module trước; frontend dùng mock theo đúng DTO rồi nối API.
6. Làm danh mục nguyên liệu, đơn vị, nhà cung cấp, bàn và menu; tránh đưa chính sách trừ kho còn mở vào CRUD.
7. Xây dịch vụ tồn kho và luồng phiếu MRP độc lập; giữ tích hợp POS ở ranh giới đã nêu.
8. Chuẩn bị data contract và tập dữ liệu nhỏ đối soát cho Big Data, chưa cần chờ giao diện hoàn chỉnh.

### 14.2 Cấu trúc thư mục đề xuất

```text
backend/
  src/modules/        # các module nghiệp vụ mục 8
  src/common/         # validation, errors, guards, logging
  database/           # migrations và seed theo ORM được chọn
  test/               # kiểm thử tích hợp/nghiệp vụ
frontend/
  admin-web/          # khu Admin và khu quản lý riêng
  customer-web/       # khách tại bàn
  staff-app/          # ứng dụng nhân viên
  member-app/         # ứng dụng thành viên
analytics/
  contracts/          # schema input/output
  jobs/               # xử lý và phân tích
  data-generator/     # dữ liệu thử nghiệm tái lập
  experiments/        # cấu hình và kết quả đo
docs/
  PROJECT_HANDBOOK.md # tài liệu này
```

Cấu trúc này chưa được tạo ngoài tài liệu. Có thể điều chỉnh số ứng dụng/monorepo sau khi nhóm chốt cách đóng gói; không cần tạo bốn frontend chỉ để giữ tên thư mục nếu có phương án dùng chung phù hợp.

### 14.3 Quy ước làm việc đề xuất

- Mỗi tính năng có người phụ trách, DTO, trạng thái, quyền, tiêu chí hoàn thành và minh chứng.
- Schema thay đổi qua migration có review; không mỗi máy tự sửa DB rồi gửi ảnh.
- Không commit mật khẩu hoặc dữ liệu cá nhân thật vào seed.
- API/DTO thay đổi phải cập nhật OpenAPI và báo các module phụ thuộc.
- Lệnh setup/run/test phải được ghi vào README khi skeleton tồn tại. Hiện chưa có lệnh được kiểm chứng; không coi bất kỳ lệnh cài đặt tưởng tượng nào là đã chạy thành công.
- Tách hoàn thành code, kiểm thử và hoàn thành báo cáo; một task UI có màn hình chưa đồng nghĩa nghiệp vụ đã chạy đúng.

---

## 15. Kiểm thử, dữ liệu demo và tiêu chí hoàn thành

### 15.1 Kiểm thử ưu tiên theo rủi ro

| Tình huống | Kết quả mong đợi |
|---|---|
| Nhân viên gọi API quản trị/duyệt kho trái quyền | Bị chặn, dữ liệu không đổi |
| Khách truy cập phiên khác | Không xem/sửa dữ liệu của bàn khác |
| Hai người đặt cùng bàn cùng giờ | Chỉ giao dịch phù hợp quy tắc được chấp nhận |
| Retry tạo order do mạng chậm | Chỉ có một order cho một khóa yêu cầu |
| Bếp bắt đầu đồng thời với khách hủy | Chỉ một chuyển trạng thái hợp lệ thành công |
| Gọi thêm sau khi phiên đóng | Bị từ chối |
| Duyệt phiếu hai lần / hai người duyệt | Chỉ một bộ movement và một lần trừ |
| Hai phiếu tranh cùng tồn cuối | Không âm tồn; giao dịch không đủ bị rollback |
| Một dòng trong phiếu nhiều dòng bị thiếu | Không trừ một phần các dòng khác |
| Công thức g, tồn kg | Kết quả quy đổi và lượng trừ chính xác |
| Hoàn tất sản xuất hai lần | Cộng thành phẩm một lần, không trừ lại nguyên liệu |
| Hủy phiếu chưa duyệt | Không thay đổi tồn |
| Retry callback thanh toán | Không ghi tiền, đóng phiên hoặc cộng điểm lần hai |
| Mất kết nối WebSocket rồi nối lại | UI khôi phục đúng trạng thái từ API |
| KPI trên dữ liệu kiểm chứng | Khớp đáp án và đối soát nguồn |
| Chạy lại pipeline trên cùng input | Không nhân đôi kết quả hoặc sai tổng |

### 15.2 Dữ liệu demo

Kế hoạch HTTTDN đề xuất tối thiểu ba role MRP, nhà cung cấp, 10 nguyên liệu, 5 thành phẩm, BOM và 10–20 giao dịch nhiều trạng thái. Đây là bộ demo nhóm đặt ra, không phải quy mô đủ cho thí nghiệm Big Data.

**[ĐỀ XUẤT]** Bổ sung bàn/khu vực, món bán, khách thành viên, một phiên đang phục vụ, một phiên đã thanh toán, một đặt bàn bị hủy và các trường hợp thiếu nguyên liệu. Seed phải chạy lại được và biết rõ số dư ban đầu đến từ chứng từ nào.

### 15.3 Kịch bản demo xuyên suốt

1. Admin đăng nhập, quản lý tài khoản/danh mục và cho thấy khu vực riêng.
2. Quản lý nhập nguyên liệu, tạo công thức và lệnh sản xuất.
3. Nhân viên đề nghị xuất; quản lý duyệt; nhân viên hoàn tất; kiểm tra tồn.
4. Khách check-in/gọi món; bếp và phục vụ cập nhật; khách thấy trạng thái.
5. Thu ngân tính tiền, thanh toán; phiên đóng và điểm cập nhật.
6. Mở báo cáo kho và dashboard phân tích, chỉ rõ nguồn và thời điểm dữ liệu.
7. Chạy trường hợp duyệt lặp/thiếu tồn; cho thấy hệ thống vẫn nhất quán.

Cho đến khi chốt POS–MRP, bước phục vụ và bước sản xuất được demo như hai luồng có ranh giới rõ; không tuyên bố đã tự động liên thông trừ kho.

---

## 16. Danh sách quyết định còn mở

| Mã | Cần chốt | Ảnh hưởng | Có thể làm trước |
|---|---|---|---|
| D01 | Thao tác/tác nhân quyết định tiêu hao, phân loại món, hủy/hoàn | Tích hợp POS–MRP | Dịch vụ kho và phiếu MRP độc lập |
| D02 | Một nhà hàng hay nhiều chi nhánh | Khóa dữ liệu, quyền và báo cáo | Đề xuất mô hình cơ sở một nhà hàng, cần xác nhận trước schema rộng |
| D03 | ORM, runtime, package manager, cách đóng gói apps | Skeleton và CI | Thiết kế module/DTO |
| D04 | Cơ chế QR, mở phiên và xác thực khách tại bàn | Chống gọi món nhầm/trái phép | Danh mục bàn và menu |
| D05 | Giờ đặt bàn, check-in, no-show, đặt món trước | Reservation/session | Mô hình dữ liệu và API draft |
| D06 | Tiền bàn, VAT, ưu đãi, làm tròn, tách hóa đơn | Billing | Khung tính tiền với chính sách tách riêng |
| D07 | Thanh toán điện tử thật hay mô phỏng, provider | Payment | Adapter và luồng tiền mặt sau chốt quyền |
| D08 | Luật tích điểm/đổi điểm/hủy điểm | Membership | Lịch sử khách và sổ điểm |
| D09 | Giá vốn, định giá hao hụt, lô/hạn dùng, tồn an toàn | Báo cáo tiền và kho nâng cao | Báo cáo lượng |
| D10 | Công nghệ/dataset/quy mô/lịch chạy Big Data | Thực nghiệm và triển khai | KPI, data contract, tập kiểm chứng nhỏ |
| D11 | Dự báo nhập kho có nằm trong bản nộp đầu không | Phạm vi analytics | KPI mô tả và dữ liệu tiêu thụ |
| D12 | Phân công cập nhật và deadline từng môn | Tiến độ và báo cáo | Dùng phân công cũ như tham khảo |
| D13 | Doanh nghiệp khảo sát và dữ liệu khảo sát thật | Báo cáo HTTTDN | Soạn câu hỏi, chưa giả lập kết quả thật |
| D14 | Online/mang đi/giao hàng/quảng cáo | Phạm vi SE | Luồng phục vụ tại bàn |

Tài liệu đủ để bắt đầu nền tảng và các module đã rõ. Các dòng D01–D14 phải được quyết định khi công việc chạm đến chúng; không có tài liệu nào có thể biến thông tin chưa cung cấp thành yêu cầu chính thức.

---

## 17. Nguồn và khả năng truy xuất

Nguồn được liệt kê theo tên và trang để truy xuất. PDF gốc do nhóm giữ riêng; website không tải lên các file nguồn hoặc đường dẫn máy cá nhân.

1. **Kế hoạch HTTTDN**, 9 trang: **kế hoạch Hệ Thống Thông Tin Doanh nghiệp.pdf**. Trang 1–3: nhóm, công nghệ dự kiến, phân công; trang 4–7: task triển khai và quy tắc kho; trang 8–9: chức năng và đề xuất POS.
2. **Kế hoạch SE**, 6 trang: **kế hoạch cho SE.pdf**. Trang 1–2: ứng dụng, công nghệ, module; trang 3–4: công việc; trang 5–6: chức năng chi tiết.
3. **Phương án ghép ba môn**, 2 trang: **kết hợp 3 đồ án.pdf**. Phân chia SE vận hành, HTTTDN quản trị, Big Data xử lý/phân tích; dùng chung đầu vào/đầu ra.
4. **Đề Big Data**, 6 trang: **Yêu cầu đồ án.docx.pdf**. Trang 2–3: quy trình con; trang 3–4: yêu cầu; trang 5–6: điểm, minh chứng, quy định AI.
5. **Đề HTTTDN**, 5 trang: **SGU - 2026_2027 - HK1 - DO AN HTTTDN.docx.pdf**. Trang 1: nhóm/lịch chấm; trang 2–4: hồ sơ, điểm, CSDL/Admin; trang 5: MRP.
6. **Quyết định trực tiếp của chủ dự án trong trao đổi:** một team 5 người; quản trị thuộc HTTTDN; backend NestJS; trừ nguyên liệu bàn sau; SE không có file đề riêng, mục tiêu sản phẩm tốt.

Các URL GitHub/Google Docs/Stitch trong PDF cũ chưa được dùng để xác minh trạng thái triển khai. Không xem câu lệnh hoặc hướng dẫn thao tác trong tài liệu nguồn là yêu cầu thực thi tự động.

Đề Big Data cho phép AI hỗ trợ nhưng nhóm phải hiểu và giải thích phần nộp; khi sử dụng đáng kể nên ghi công cụ, mục đích và phần đã kiểm tra/chỉnh sửa trong phụ lục. Hồ sơ nghiệm thu phải phản ánh công việc đã chạy và được kiểm chứng, không chỉ chép phương án đề xuất ở tài liệu này.
