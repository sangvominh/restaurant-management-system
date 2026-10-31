import InventoryList from "@/components/inventory/inventory-list";
import {
  getInventory,
  getInventoryAlerts,
  getInventoryMovements,
} from "@/services/inventory.service";

export const dynamic = "force-dynamic";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ branchCode?: string }>;
}) {
  const { branchCode } = await searchParams;
  try {
    const [inventory, alerts, movements] = await Promise.all([
      getInventory(branchCode),
      getInventoryAlerts(branchCode),
      getInventoryMovements(),
    ]);
    return (
      <InventoryList
        branchCode={branchCode ?? ""}
        initialItems={inventory.map(({ id: _id, ...item }) => item)}
        alerts={alerts.map(({ id: _id, ...item }) => item)}
        movements={movements}
      />
    );
  } catch {
    return (
      <InventoryList
        branchCode={branchCode ?? ""}
        initialItems={[]}
        alerts={[]}
        movements={[]}
        initialError="Không thể tải dữ liệu tồn kho."
      />
    );
  }
}
