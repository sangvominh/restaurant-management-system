# Big Data — Phase 1: Hạ tầng và dữ liệu thô

Phase 1 dựng Spark Standalone (1 master, 1 worker) và HDFS (1 NameNode, 1 DataNode) bằng Docker Compose; tải dữ liệu NYC TLC Yellow Taxi tháng 01/2023 ở định dạng Parquet và đưa nguyên bản lên HDFS. Đây là môi trường thực hành trên một máy, không phải cụm phân tán nhiều máy. Không thay đổi Docker Compose hoặc PostgreSQL của ứng dụng nhà hàng.

## Chuẩn bị

- Docker Desktop đang chạy và có Docker Compose; Python 3.8+, `curl`, mạng Internet và ít nhất vài GB đĩa trống để tải image. Cấp Docker tối thiểu 4 GB RAM nếu có thể.
- Image Hadoop phiên bản này dùng kiến trúc `linux/amd64`; máy Apple Silicon cần Docker Desktop hỗ trợ giả lập amd64 và có thể chạy chậm hơn.
- Lệnh bên dưới chạy từ thư mục `big-data/phase-1`. Cổng 18080 (Spark UI) và 9870 (HDFS UI) cần trống; chỉ mở trên localhost.

## Cách chạy

```bash
docker compose up -d
python3 scripts/download.py
# Đợi HDFS khởi động (xem hướng dẫn kiểm tra bên dưới) rồi chạy:
python3 scripts/upload.py
docker compose exec -T namenode hdfs dfs -ls /data/raw
docker compose exec -T namenode hdfs dfsadmin -report
```

Nếu upload báo HDFS chưa sẵn sàng, đợi NameNode và DataNode đăng ký xong rồi chạy lại. Script không ghi đè file đã tồn tại; muốn nạp lại phải chủ động xóa file HDFS đó bằng `docker compose exec -T namenode hdfs dfs -rm /data/raw/yellow_tripdata_2023-01.parquet` trước khi chạy lại script.

Mở [Spark Master UI](http://localhost:18080) và xác nhận có 1 worker trạng thái ALIVE; mở [HDFS NameNode UI](http://localhost:9870) xác nhận 1 live DataNode. Kiểm tra Spark đọc và đếm file trực tiếp từ HDFS:

```bash
docker compose exec -T spark-master /opt/spark/bin/spark-submit \
  --master spark://spark-master:7077 \
  --conf spark.driver.host=spark-master \
  --executor-memory 512m --total-executor-cores 1 \
  /phase1-scripts/verify_spark.py
```

Lệnh in schema và `PHASE1_ROW_COUNT`. Lưu log hoặc chụp màn hình kết quả, cùng trang Spark UI và HDFS UI, làm minh chứng. Lần đầu tải image và đếm dữ liệu có thể mất vài phút.

Dừng dịch vụ: `docker compose down` (giữ dữ liệu HDFS). Chỉ dùng `docker compose down -v` nếu muốn **xóa toàn bộ dữ liệu HDFS của Phase 1**.

## Nguồn và dữ liệu

Nguồn: [NYC Taxi & Limousine Commission — TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page). File: [Yellow Taxi, tháng 01/2023](https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2023-01.parquet), tải từ máy chủ công bố dữ liệu TLC. Parquet thô được lưu trên máy tại `data/yellow_tripdata_2023-01.parquet`, rồi trên HDFS tại `hdfs://namenode:8020/data/raw/yellow_tripdata_2023-01.parquet`. Script kiểm tra dấu Parquet đầu/cuối và so sánh kích thước file trên HDFS với file tải về. Dataset và Docker volume không được đưa vào Git; script cho phép tải lại.

Các trường thường dùng gồm thời gian đón/trả, mã vùng, số hành khách, quãng đường, giá cước, tiền tip và hình thức thanh toán. Dữ liệu do TLC công bố, không phải dữ liệu của nhà hàng; cần thống nhất với nhóm nếu muốn đổi dataset. Phase 1 giữ nguyên dữ liệu, chưa làm sạch hay tính KPI. Những công việc đó thuộc giai đoạn sau theo tài liệu hướng dẫn.

## Các file nộp

Nén thư mục này (trừ dữ liệu tải về nếu form không yêu cầu kèm; có thể tải lại từ URL). Kèm ảnh/log thực tế Spark UI, HDFS UI, danh sách file HDFS và kết quả `PHASE1_ROW_COUNT`. Không dùng ảnh hoặc số liệu chưa kiểm chứng. Form cho tối đa 5 file, 100 MB mỗi file; xác nhận với nhóm/giảng viên nếu có yêu cầu khác.
