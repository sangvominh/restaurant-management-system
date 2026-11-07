'use client';
import { use, useEffect, useState } from 'react';
import InventoryDetail from '@/components/inventory/inventory-detail';
import { getInventoryByCode } from '@/services/inventory.service';
import type { InventoryDetail as InventoryData } from '@/types/inventory';
export default function InventoryDetailPage({ params }: { params: Promise<{code:string}> }) {
  const {code} = use(params);
  const [data, setData] = useState<InventoryData>();
  const [error, setError] = useState<string>();
  useEffect(() => { let active = true; getInventoryByCode(code).then(d => {if(active)setData(d);})
    .catch(e => {if(active)setError(e.message);}); return () => {active=false;}; }, [code]);
  if (!data && !error) return <p>Đang tải chi tiết tồn kho…</p>;
  return <InventoryDetail inventory={data} code={code} error={error} />;
}
