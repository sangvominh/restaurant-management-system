"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  formatServingUnit,
  getMaxOrderableQty,
  parseMoney,
} from "@/lib/format";
import type { CartItem, ProductItem } from "@/lib/types";

const STORAGE_KEY = "rms_customer_cart_v1";
const SERVER_SNAPSHOT: CartItem[] = [];

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function sanitizeCartItems(input: unknown): CartItem[] {
  if (!Array.isArray(input)) return SERVER_SNAPSHOT;
  const valid: CartItem[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const rec = raw as Record<string, unknown>;
    const productId = typeof rec.productId === "string" ? rec.productId.trim() : "";
    const name = typeof rec.name === "string" ? rec.name.trim() : "";
    const unitPrice = parseMoney(rec.unitPrice as string | number);
    const qtyRaw = Number(rec.quantity);
    const quantity = Number.isFinite(qtyRaw) ? Math.max(1, Math.floor(qtyRaw)) : 0;
    if (!productId || !name || quantity < 1) continue;

    const maxRaw = rec.maxQuantity;
    const maxQuantity =
      typeof maxRaw === "number" && Number.isFinite(maxRaw) && maxRaw >= 1
        ? Math.floor(maxRaw)
        : null;

    const normalizedUnit = formatServingUnit({
      name: typeof rec.unitName === "string" ? rec.unitName : null,
      symbol: typeof rec.unitSymbol === "string" ? rec.unitSymbol : null,
    });

    valid.push({
      productId,
      code: typeof rec.code === "string" ? rec.code : "",
      name,
      imageUrl: typeof rec.imageUrl === "string" ? rec.imageUrl : null,
      unitPrice,
      unitName: normalizedUnit.capitalized,
      unitSymbol: normalizedUnit.label,
      categoryName: typeof rec.categoryName === "string" ? rec.categoryName : "",
      quantity: maxQuantity ? Math.min(quantity, maxQuantity) : quantity,
      maxQuantity,
    });
  }
  return valid;
}

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedItems;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedItems = SERVER_SNAPSHOT;
      return cachedItems;
    }
    cachedItems = sanitizeCartItems(JSON.parse(raw));
    return cachedItems;
  } catch {
    cachedItems = SERVER_SNAPSHOT;
    return cachedItems;
  }
}

function writeCartItems(nextItems: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(nextItems);
    cachedRaw = serialized;
    cachedItems = nextItems;
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    cachedItems = nextItems;
  }
  for (const listener of listeners) {
    listener();
  }
}

function subscribeCart(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedRaw = null;
      listener();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getServerSnapshot(): CartItem[] {
  return SERVER_SNAPSHOT;
}

function subscribeNoop() {
  return () => {};
}

function getClientHydratedTrue() {
  return true;
}

function getServerHydratedFalse() {
  return false;
}

export interface CartActionsContextValue {
  addItem: (product: ProductItem, quantity?: number) => boolean;
  setItemQuantity: (productId: string, nextQuantity: number) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export interface CartContextValue extends CartActionsContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartActionsContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const addItem = useCallback((product: ProductItem, quantity = 1): boolean => {
    const maxOrderable = getMaxOrderableQty(product);
    if (maxOrderable < 1) return false;

    const addQty = Math.max(1, Math.floor(quantity));
    const current = readStoredItems();
    const existingIndex = current.findIndex(
      (item) => item.productId === product.id,
    );
    const unitPrice = parseMoney(product.sellingPrice);
    const servingUnit = formatServingUnit(product.unit);

    if (existingIndex >= 0) {
      const existing = current[existingIndex];
      const nextQty = Math.min(maxOrderable, existing.quantity + addQty);
      const updated: CartItem = {
        ...existing,
        code: product.code,
        name: product.name,
        imageUrl: product.imageUrl,
        unitPrice,
        unitName: servingUnit.capitalized,
        unitSymbol: servingUnit.label,
        categoryName: product.category.name,
        quantity: nextQty,
        maxQuantity: maxOrderable,
      };
      const nextList = [...current];
      nextList[existingIndex] = updated;
      writeCartItems(nextList);
      return true;
    }

    const nextItem: CartItem = {
      productId: product.id,
      code: product.code,
      name: product.name,
      imageUrl: product.imageUrl,
      unitPrice,
      unitName: servingUnit.capitalized,
      unitSymbol: servingUnit.label,
      categoryName: product.category.name,
      quantity: Math.min(maxOrderable, addQty),
      maxQuantity: maxOrderable,
    };
    writeCartItems([...current, nextItem]);
    return true;
  }, []);

  const setItemQuantity = useCallback((productId: string, nextQuantity: number) => {
    const current = readStoredItems();
    const qty = Math.floor(nextQuantity);
    if (qty <= 0) {
      writeCartItems(current.filter((item) => item.productId !== productId));
      return;
    }
    writeCartItems(
      current.map((item) => {
        if (item.productId !== productId) return item;
        const capped = item.maxQuantity ? Math.min(qty, item.maxQuantity) : Math.min(qty, 99);
        return { ...item, quantity: Math.max(1, capped) };
      }),
    );
  }, []);

  const incrementItem = useCallback((productId: string) => {
    const current = readStoredItems();
    writeCartItems(
      current.map((item) => {
        if (item.productId !== productId) return item;
        const cap = item.maxQuantity ?? 99;
        return { ...item, quantity: Math.min(cap, item.quantity + 1) };
      }),
    );
  }, []);

  const decrementItem = useCallback((productId: string) => {
    const current = readStoredItems();
    const target = current.find((item) => item.productId === productId);
    if (!target) return;
    if (target.quantity <= 1) {
      writeCartItems(current.filter((item) => item.productId !== productId));
      return;
    }
    writeCartItems(
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    const current = readStoredItems();
    writeCartItems(current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    writeCartItems([]);
  }, []);

  const actions = useMemo<CartActionsContextValue>(
    () => ({
      addItem,
      setItemQuantity,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    }),
    [
      addItem,
      setItemQuantity,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={actions}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const actions = useContext(CartContext);
  if (!actions) {
    throw new Error("useCart cần được đặt bên trong CartProvider");
  }

  // Đảm bảo từng component nằm trong bất kỳ <Suspense> boundary nào cũng khớp HTML SSR khi hydrate
  const isHydrated = useSyncExternalStore(
    subscribeNoop,
    getClientHydratedTrue,
    getServerHydratedFalse,
  );

  const storedItems = useSyncExternalStore(
    subscribeCart,
    readStoredItems,
    getServerSnapshot,
  );

  const items = isHydrated ? storedItems : SERVER_SNAPSHOT;

  const getItemQuantity = useCallback(
    (productId: string) => {
      const found = items.find((item) => item.productId === productId);
      return found ? found.quantity : 0;
    },
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  return {
    ...actions,
    items,
    totalQuantity,
    subtotal,
    getItemQuantity,
  };
}
