#!/usr/bin/env python3
"""Đưa Parquet lên HDFS qua Docker Compose và kiểm tra kích thước."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'data' / 'yellow_tripdata_2023-01.parquet'
DEST = '/data/raw/yellow_tripdata_2023-01.parquet'
BASE = ['docker', 'compose', '-f', str(ROOT / 'docker-compose.yml'), 'exec', '-T', 'namenode']

def run(*args, **kwargs):
    return subprocess.run([*BASE, 'hdfs', 'dfs', *args], check=True, **kwargs)

if not SOURCE.is_file():
    sys.exit('Chưa có dữ liệu. Chạy: python3 scripts/download.py')
run('-mkdir', '-p', '/data/raw')
exists = subprocess.run([*BASE, 'hdfs', 'dfs', '-test', '-e', DEST]).returncode == 0
if exists:
    sys.exit(f'File {DEST} đã tồn tại trên HDFS; không tự động ghi đè.')
try:
    with SOURCE.open('rb') as data:
        run('-put', '-', DEST, stdin=data)
    result = run('-stat', '%b', DEST, capture_output=True, text=True)
    size = int(result.stdout.strip().splitlines()[-1])
    if size != SOURCE.stat().st_size:
        raise RuntimeError(f'Kích thước không khớp: HDFS={size}, local={SOURCE.stat().st_size}')
except Exception:
    # A failed write may leave an incomplete file; remove only the newly-created target.
    subprocess.run([*BASE, 'hdfs', 'dfs', '-rm', '-f', DEST], check=False)
    raise
print(f'Đã đưa lên HDFS: hdfs://namenode:8020{DEST} ({size:,} bytes)')
run('-ls', '/data/raw')
