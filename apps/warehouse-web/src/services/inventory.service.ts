import { warehouseRequest } from "@/services/api";
import type {
  InventoryDetail,
  InventoryItem,
  InventoryMovement,
} from "@/types/inventory";

export { WarehouseApiError as InventoryApiError } from "@/services/api";

function branchQuery(branchCode?: string) {
  return branchCode?.trim()
    ? `?branchCode=${encodeURIComponent(branchCode.trim())}`
    : "";
}

export function getInventory(branchCode?: string): Promise<InventoryItem[]> {
  return warehouseRequest<InventoryItem[]>(
    `/inventory${branchQuery(branchCode)}`,
  );
}

export function getInventoryByCode(
  code: string,
  branchCode?: string,
): Promise<InventoryDetail> {
  return warehouseRequest<InventoryDetail>(
    `/inventory/${encodeURIComponent(code)}${branchQuery(branchCode)}`,
  );
}

export function getInventoryAlerts(
  branchCode?: string,
): Promise<InventoryItem[]> {
  return warehouseRequest<InventoryItem[]>(
    `/inventory/alerts${branchQuery(branchCode)}`,
  );
}

export function getInventoryMovements(): Promise<InventoryMovement[]> {
  return warehouseRequest<InventoryMovement[]>("/inventory-movements");
}
