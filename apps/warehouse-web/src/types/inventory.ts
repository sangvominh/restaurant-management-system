export type StockStatus = "AVAILABLE" | "LOW_STOCK" | string;

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  minStock: number;
  totalStock: number;
  availableStock: number;
  stockStatus: StockStatus;
  status: "ACTIVE" | "INACTIVE";
}

export interface InventoryLocation {
  branchCode: string;
  branchName: string;
  locationName: string;
  quantity: number;
  availableQuantity: number;
}

export interface MaterialLot {
  lotCode: string;
  expiryDate: string | null;
  status: "ACTIVE" | "INACTIVE";
  isAvailable: boolean;
  locations: InventoryLocation[];
  totalStock: number;
  availableStock: number;
}

export interface InventoryDetail extends InventoryItem {
  lots: MaterialLot[];
}

export type InventoryListItem = Omit<InventoryItem, "id">;
export type InventoryDisplayDetail = Omit<InventoryDetail, "id">;

export interface InventoryMovement {
  materialCode: string;
  lotCode: string;
  locationName: string;
  orderCode: string | null;
  movementType: string;
  quantityBefore: string;
  quantityChange: string;
  quantityAfter: string;
  createdAt: string;
}
