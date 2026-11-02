# Minh chứng thực tế — 01/11/2026 (giờ Việt Nam)

- `containers.txt`: trạng thái bốn container.
- `spark-master.json`: phản hồi Spark Master UI, có 1 worker hoạt động.
- `hdfs-report.txt`: báo cáo HDFS, có 1 DataNode hoạt động.
- `hdfs-files.txt`: danh sách file thô trên HDFS, 47.673.370 byte.
- `spark-verify.log`: log chạy `verify_spark.py` trên Spark Standalone, đọc Parquet từ HDFS và đếm `PHASE1_ROW_COUNT= 3066766`. Đây là số dòng thô, chưa làm sạch.

Dữ liệu và thông số kiểm tra là kết quả của lần chạy thực tế trên máy thực hiện; chạy lại trên máy khác có thể khác thời gian và tên container.
