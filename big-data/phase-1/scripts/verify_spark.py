from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('phase1-verify-raw-parquet').getOrCreate()
try:
    df = spark.read.parquet('hdfs://namenode:8020/data/raw/yellow_tripdata_2023-01.parquet')
    df.printSchema()
    print('PHASE1_ROW_COUNT=', df.count(), flush=True)
finally:
    spark.stop()
