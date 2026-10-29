import InventoryDetailView from "@/components/inventory/inventory-detail";
import { getInventoryByCode, InventoryApiError } from "@/services/inventory.service";

export const dynamic = "force-dynamic";

export default async function InventoryDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  try {
    const inventory = await getInventoryByCode(code);
    const { id: _id, ...displayData } = inventory;
    return <InventoryDetailView inventory={displayData} />;
  } catch (error) {
    const notFound = error instanceof InventoryApiError && error.status === 404 && error.message.includes("Không tìm thấy nguyên vật liệu");
    return <InventoryDetailView code={code} error={notFound ? `Không tìm thấy nguyên vật liệu có mã ${code}.` : "Không thể tải dữ liệu tồn kho."} />;
  }
}
