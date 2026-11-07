import InventoryList from "@/warehouse/components/inventory/inventory-list";
import { getInventory } from "@/warehouse/services/inventory.service";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  try {
    const inventory = await getInventory();
    return <InventoryList initialItems={inventory.map(({ id: _id, ...item }) => item)} />;
  } catch {
    return <InventoryList initialItems={[]} initialError="Không thể tải dữ liệu tồn kho." />;
  }
}
