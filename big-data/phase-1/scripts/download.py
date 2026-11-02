#!/usr/bin/env python3
"""Tải file NYC TLC Yellow Taxi tháng 01/2023 từ nguồn chính thức."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / 'data' / 'yellow_tripdata_2023-01.parquet'
URL = 'https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2023-01.parquet'

def valid(path):
    if not path.is_file() or path.stat().st_size < 8:
        return False
    with path.open('rb') as f:
        first = f.read(4)
        f.seek(-4, 2)
        return first == b'PAR1' and f.read(4) == b'PAR1'

if valid(DEST):
    print(f'Đã có file Parquet: {DEST} ({DEST.stat().st_size:,} bytes)')
    sys.exit(0)
DEST.parent.mkdir(parents=True, exist_ok=True)
tmp = DEST.with_suffix('.download')
try:
    print(f'Đang tải {URL}', flush=True)
    subprocess.run(['curl', '--fail', '--location', '--retry', '3', '--output', str(tmp), URL], check=True)
    if not valid(tmp):
        raise ValueError('File tải về không có dấu nhận dạng Parquet hợp lệ')
    tmp.replace(DEST)
    print(f'Đã tải: {DEST} ({DEST.stat().st_size:,} bytes)')
finally:
    tmp.unlink(missing_ok=True)
