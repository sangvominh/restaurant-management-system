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
  stockStatus: StockStatus;
}

export interface InventoryLocation {
  branchName: string;
  locationName: string;
  quantity: number;
}

export interface MaterialLot {
  lotCode: string;
  expiryDate: string;
  locations: InventoryLocation[];
  totalStock: number;
}

export interface InventoryDetail extends InventoryItem {
  lots: MaterialLot[];
}

export type InventoryListItem = Omit<InventoryItem, "id">;
export type InventoryDisplayDetail = Omit<InventoryDetail, "id">;
