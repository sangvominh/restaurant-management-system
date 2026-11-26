export interface MenuCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface ProductUnit {
  id: string;
  name: string;
  symbol: string;
}

export interface ProductCategoryRef {
  id: string;
  name: string;
}

export interface MenuProduct {
  id: string;
  code: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  sellingPrice: string;
  unit: ProductUnit;
  category: ProductCategoryRef;
  available: string;
  inStock: boolean;
}

export interface DiningTableInfo {
  id: string;
  code: string;
  name: string;
  area: string;
  status?: string;
}

export interface CartItem {
  productId: string;
  code: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  unitPrice: string;
  unitSymbol: string;
  unitName: string;
  categoryId: string;
  categoryName: string;
  available: string;
  inStock: boolean;
  quantity: number;
  note: string;
}

export type CartStockIssueReason = 'OUT_OF_STOCK' | 'EXCEEDS_AVAILABLE' | 'UNAVAILABLE';

export interface CartStockIssue {
  productId: string;
  productName: string;
  unitSymbol: string;
  requestedQuantity: number;
  availableQuantity: number;
  reason: CartStockIssueReason;
}

export interface AddToCartResult {
  ok: boolean;
  addedQuantity: number;
  newQuantity: number;
  cappedByStock: boolean;
  message?: string;
}

export interface OrderItemPayload {
  productId: string;
  quantity: number;
  note?: string;
}

export interface OrderDraftPayload {
  tableId?: string;
  tableCode?: string;
  note?: string;
  items: OrderItemPayload[];
}
