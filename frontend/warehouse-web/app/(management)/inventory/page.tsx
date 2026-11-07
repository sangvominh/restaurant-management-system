'use client';
import { useEffect, useState } from 'react';
import InventoryList from '@/components/inventory/inventory-list';
import { getInventory } from '@/services/inventory.service';
import type { InventoryItem } from '@/types/inventory';
export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; getInventory().then(data => { if (active) setItems(data); })
    .catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; }; }, []);
  if (loading) return <p>Đang tải tồn kho…</p>;
  return <InventoryList initialItems={items} initialError={error} />;
}
