export interface CategoryItem {
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

export interface ProductItem {
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

export interface CartItem {
  productId: string;
  code: string;
  name: string;
  imageUrl: string | null;
  unitPrice: number;
  unitName: string;
  unitSymbol: string;
  categoryName: string;
  quantity: number;
  maxQuantity: number | null;
}
