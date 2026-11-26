import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';

import type {
  AddToCartResult,
  CartItem,
  CartStockIssue,
  DiningTableInfo,
  MenuProduct,
  OrderDraftPayload,
} from '@/types/menu';
import {
  MAX_CART_LINES,
  MAX_ITEM_NOTE_LENGTH,
  MAX_ORDER_NOTE_LENGTH,
  calculateLineTotal,
  clampQuantityToAvailable,
  formatQuantity,
  getDefaultAddQuantity,
  getQuantityStep,
  parseDecimal,
  roundQuantity,
} from '@/utils/format';

const STORAGE_KEY = 'rms_customer_mobile_cart_v1';

interface PersistedCartState {
  items: CartItem[];
  selectedTable: DiningTableInfo | null;
  orderNote: string;
}

function readPersistedCart(): PersistedCartState | null {
  if (Platform.OS !== 'web' || typeof globalThis.localStorage === 'undefined') {
    return null;
  }
  try {
    const raw = globalThis.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<PersistedCartState>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      selectedTable: parsed.selectedTable ?? null,
      orderNote: typeof parsed.orderNote === 'string' ? parsed.orderNote : '',
    };
  } catch {
    return null;
  }
}

function writePersistedCart(state: PersistedCartState): void {
  if (Platform.OS !== 'web' || typeof globalThis.localStorage === 'undefined') {
    return;
  }
  try {
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Bỏ qua nếu bộ nhớ trình duyệt đầy hoặc chế độ ẩn danh chặn ghi
  }
}

function sanitizeNote(note: string | undefined, maxLength: number): string {
  if (!note) {
    return '';
  }
  return note.slice(0, maxLength);
}

function evaluateStockIssues(items: CartItem[]): CartStockIssue[] {
  const issues: CartStockIssue[] = [];
  for (const item of items) {
    const availableQty = roundQuantity(parseDecimal(item.available));
    if (!item.inStock || availableQty <= 0) {
      issues.push({
        productId: item.productId,
        productName: item.name,
        unitSymbol: item.unitSymbol,
        requestedQuantity: item.quantity,
        availableQuantity: 0,
        reason: 'OUT_OF_STOCK',
      });
    } else if (item.quantity > availableQty) {
      issues.push({
        productId: item.productId,
        productName: item.name,
        unitSymbol: item.unitSymbol,
        requestedQuantity: item.quantity,
        availableQuantity: availableQty,
        reason: 'EXCEEDS_AVAILABLE',
      });
    }
  }
  return issues;
}

export interface CartContextValue {
  items: CartItem[];
  selectedTable: DiningTableInfo | null;
  orderNote: string;
  isHydrated: boolean;
  lineCount: number;
  totalQuantity: number;
  subtotal: number;
  stockIssues: CartStockIssue[];
  hasStockIssues: boolean;
  getItem: (productId: string) => CartItem | undefined;
  getItemQuantity: (productId: string) => number;
  addItem: (product: MenuProduct, quantity?: number, note?: string) => AddToCartResult;
  setItemQuantity: (productId: string, quantity: number) => void;
  incrementItem: (productId: string) => AddToCartResult;
  decrementItem: (productId: string) => void;
  setItemNote: (productId: string, note: string) => void;
  removeItem: (productId: string) => void;
  clearCart: (options?: { clearTable?: boolean }) => void;
  setSelectedTable: (table: DiningTableInfo | null) => void;
  setOrderNote: (note: string) => void;
  syncWithMenuProducts: (latestProducts: MenuProduct[]) => CartStockIssue[];
  clampItemsToAvailable: () => void;
  toOrderDraftPayload: () => OrderDraftPayload;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTableState] = useState<DiningTableInfo | null>(null);
  const [orderNote, setOrderNoteState] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState<boolean>(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      const restored = readPersistedCart();
      if (restored) {
        setItems(restored.items);
        setSelectedTableState(restored.selectedTable);
        setOrderNoteState(restored.orderNote);
      }
      setIsHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    writePersistedCart({ items, selectedTable, orderNote });
  }, [items, selectedTable, orderNote, isHydrated]);

  const getItem = useCallback(
    (productId: string) => items.find(item => item.productId === productId),
    [items],
  );

  const getItemQuantity = useCallback(
    (productId: string) => items.find(item => item.productId === productId)?.quantity ?? 0,
    [items],
  );

  const addItem = useCallback(
    (product: MenuProduct, requestedQuantity?: number, note?: string): AddToCartResult => {
      const maxAvailable = roundQuantity(parseDecimal(product.available));
      if (!product.inStock || maxAvailable <= 0) {
        return {
          ok: false,
          addedQuantity: 0,
          newQuantity: 0,
          cappedByStock: true,
          message: `Món ${product.name} hiện tạm hết tại quầy`,
        };
      }

      const desiredDelta =
        requestedQuantity !== undefined
          ? roundQuantity(requestedQuantity)
          : getDefaultAddQuantity(product.unit.symbol, product.available);

      if (desiredDelta <= 0) {
        return {
          ok: false,
          addedQuantity: 0,
          newQuantity: 0,
          cappedByStock: false,
          message: 'Số lượng thêm vào giỏ phải lớn hơn 0',
        };
      }

      const existing = items.find(i => i.productId === product.id);
      if (!existing && items.length >= MAX_CART_LINES) {
        return {
          ok: false,
          addedQuantity: 0,
          newQuantity: 0,
          cappedByStock: false,
          message: `Giỏ hàng tối đa ${MAX_CART_LINES} món khác nhau trong một lần đặt`,
        };
      }

      const currentQty = existing?.quantity ?? 0;
      const targetQty = roundQuantity(currentQty + desiredDelta);
      const nextQty = clampQuantityToAvailable(targetQty, maxAvailable);
      const addedQty = roundQuantity(nextQty - currentQty);
      const capped = nextQty < targetQty;

      if (addedQty <= 0) {
        return {
          ok: false,
          addedQuantity: 0,
          newQuantity: currentQty,
          cappedByStock: true,
          message: `Chỉ còn tối đa ${formatQuantity(maxAvailable)} ${product.unit.symbol} tại quầy`,
        };
      }

      const cleanedNote =
        note !== undefined ? sanitizeNote(note.trim(), MAX_ITEM_NOTE_LENGTH) : undefined;

      setItems(prev => {
        const index = prev.findIndex(i => i.productId === product.id);
        if (index >= 0) {
          const updated = [...prev];
          const target = updated[index];
          updated[index] = {
            ...target,
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl,
            unitPrice: product.sellingPrice,
            unitSymbol: product.unit.symbol,
            unitName: product.unit.name,
            categoryId: product.category.id,
            categoryName: product.category.name,
            available: product.available,
            inStock: product.inStock,
            quantity: nextQty,
            note: cleanedNote !== undefined ? cleanedNote : target.note,
          };
          return updated;
        }

        return [
          ...prev,
          {
            productId: product.id,
            code: product.code,
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl,
            unitPrice: product.sellingPrice,
            unitSymbol: product.unit.symbol,
            unitName: product.unit.name,
            categoryId: product.category.id,
            categoryName: product.category.name,
            available: product.available,
            inStock: product.inStock,
            quantity: nextQty,
            note: cleanedNote ?? '',
          },
        ];
      });

      return {
        ok: true,
        addedQuantity: addedQty,
        newQuantity: nextQty,
        cappedByStock: capped,
        message: capped
          ? `Đã điều chỉnh về mức tối đa còn tại quầy (${formatQuantity(maxAvailable)} ${product.unit.symbol})`
          : undefined,
      };
    },
    [items],
  );

  const setItemQuantity = useCallback((productId: string, quantity: number) => {
    const rounded = roundQuantity(quantity);
    if (rounded <= 0) {
      setItems(prev => prev.filter(item => item.productId !== productId));
      return;
    }

    setItems(prev =>
      prev.flatMap(item => {
        if (item.productId !== productId) {
          return [item];
        }
        const maxAvailable = roundQuantity(parseDecimal(item.available));
        if (maxAvailable <= 0) {
          return [];
        }
        const clamped = clampQuantityToAvailable(rounded, maxAvailable);
        return clamped > 0 ? [{ ...item, quantity: clamped }] : [];
      }),
    );
  }, []);

  const incrementItem = useCallback(
    (productId: string): AddToCartResult => {
      const existing = items.find(i => i.productId === productId);
      if (!existing) {
        return { ok: false, addedQuantity: 0, newQuantity: 0, cappedByStock: false };
      }

      const maxAvailable = roundQuantity(parseDecimal(existing.available));
      const step = getQuantityStep(existing.unitSymbol);
      const targetQty = roundQuantity(existing.quantity + step);
      const nextQty = clampQuantityToAvailable(targetQty, maxAvailable);
      const addedQty = roundQuantity(nextQty - existing.quantity);

      if (addedQty <= 0) {
        return {
          ok: false,
          addedQuantity: 0,
          newQuantity: existing.quantity,
          cappedByStock: true,
          message: `Chỉ còn tối đa ${formatQuantity(maxAvailable)} ${existing.unitSymbol} tại quầy`,
        };
      }

      setItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity: nextQty } : item,
        ),
      );

      return {
        ok: true,
        addedQuantity: addedQty,
        newQuantity: nextQty,
        cappedByStock: nextQty < targetQty,
      };
    },
    [items],
  );

  const decrementItem = useCallback((productId: string) => {
    setItems(prev =>
      prev.flatMap(item => {
        if (item.productId !== productId) {
          return [item];
        }
        const step = getQuantityStep(item.unitSymbol);
        const nextQty = roundQuantity(item.quantity - step);
        return nextQty > 0 ? [{ ...item, quantity: nextQty }] : [];
      }),
    );
  }, []);

  const setItemNote = useCallback((productId: string, note: string) => {
    const cleaned = sanitizeNote(note, MAX_ITEM_NOTE_LENGTH);
    setItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, note: cleaned } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const clearCart = useCallback((options?: { clearTable?: boolean }) => {
    setItems([]);
    setOrderNoteState('');
    if (options?.clearTable) {
      setSelectedTableState(null);
    }
  }, []);

  const setSelectedTable = useCallback((table: DiningTableInfo | null) => {
    setSelectedTableState(table);
  }, []);

  const setOrderNote = useCallback((note: string) => {
    setOrderNoteState(sanitizeNote(note, MAX_ORDER_NOTE_LENGTH));
  }, []);

  const syncWithMenuProducts = useCallback(
    (latestProducts: MenuProduct[]): CartStockIssue[] => {
      const productMap = new Map(latestProducts.map(p => [p.id, p]));
      const detectedIssues: CartStockIssue[] = [];

      for (const currentItem of items) {
        const latest = productMap.get(currentItem.productId);
        if (!latest) {
          detectedIssues.push({
            productId: currentItem.productId,
            productName: currentItem.name,
            unitSymbol: currentItem.unitSymbol,
            requestedQuantity: currentItem.quantity,
            availableQuantity: 0,
            reason: 'UNAVAILABLE',
          });
          continue;
        }

        const availableQty = roundQuantity(parseDecimal(latest.available));
        if (!latest.inStock || availableQty <= 0) {
          detectedIssues.push({
            productId: currentItem.productId,
            productName: latest.name,
            unitSymbol: latest.unit.symbol,
            requestedQuantity: currentItem.quantity,
            availableQuantity: 0,
            reason: 'OUT_OF_STOCK',
          });
        } else if (currentItem.quantity > availableQty) {
          detectedIssues.push({
            productId: currentItem.productId,
            productName: latest.name,
            unitSymbol: latest.unit.symbol,
            requestedQuantity: currentItem.quantity,
            availableQuantity: availableQty,
            reason: 'EXCEEDS_AVAILABLE',
          });
        }
      }

      setItems(prev =>
        prev.map(item => {
          const latest = productMap.get(item.productId);
          if (!latest) {
            return { ...item, available: '0', inStock: false };
          }
          return {
            ...item,
            name: latest.name,
            description: latest.description,
            imageUrl: latest.imageUrl,
            unitPrice: latest.sellingPrice,
            unitSymbol: latest.unit.symbol,
            unitName: latest.unit.name,
            categoryId: latest.category.id,
            categoryName: latest.category.name,
            available: latest.available,
            inStock: latest.inStock,
          };
        }),
      );

      return detectedIssues;
    },
    [items],
  );

  const clampItemsToAvailable = useCallback(() => {
    setItems(prev =>
      prev.flatMap(item => {
        const availableQty = roundQuantity(parseDecimal(item.available));
        if (!item.inStock || availableQty <= 0) {
          return [];
        }
        const nextQty = clampQuantityToAvailable(item.quantity, availableQty);
        return nextQty > 0 ? [{ ...item, quantity: nextQty }] : [];
      }),
    );
  }, []);

  const toOrderDraftPayload = useCallback((): OrderDraftPayload => {
    const trimmedOrderNote = orderNote.trim();
    return {
      ...(selectedTable ? { tableId: selectedTable.id, tableCode: selectedTable.code } : {}),
      ...(trimmedOrderNote ? { note: trimmedOrderNote } : {}),
      items: items.map(item => {
        const trimmedLineNote = item.note.trim();
        return {
          productId: item.productId,
          quantity: roundQuantity(item.quantity),
          ...(trimmedLineNote ? { note: trimmedLineNote } : {}),
        };
      }),
    };
  }, [items, orderNote, selectedTable]);

  const lineCount = items.length;
  const totalQuantity = useMemo(
    () => roundQuantity(items.reduce((sum, item) => sum + item.quantity, 0)),
    [items],
  );
  const subtotal = useMemo(
    () =>
      Math.round(
        (items.reduce(
          (sum, item) => sum + calculateLineTotal(item.unitPrice, item.quantity),
          0,
        ) +
          Number.EPSILON) *
          100,
      ) / 100,
    [items],
  );
  const stockIssues = useMemo(() => evaluateStockIssues(items), [items]);
  const hasStockIssues = stockIssues.length > 0;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      selectedTable,
      orderNote,
      isHydrated,
      lineCount,
      totalQuantity,
      subtotal,
      stockIssues,
      hasStockIssues,
      getItem,
      getItemQuantity,
      addItem,
      setItemQuantity,
      incrementItem,
      decrementItem,
      setItemNote,
      removeItem,
      clearCart,
      setSelectedTable,
      setOrderNote,
      syncWithMenuProducts,
      clampItemsToAvailable,
      toOrderDraftPayload,
    }),
    [
      items,
      selectedTable,
      orderNote,
      isHydrated,
      lineCount,
      totalQuantity,
      subtotal,
      stockIssues,
      hasStockIssues,
      getItem,
      getItemQuantity,
      addItem,
      setItemQuantity,
      incrementItem,
      decrementItem,
      setItemNote,
      removeItem,
      clearCart,
      setSelectedTable,
      setOrderNote,
      syncWithMenuProducts,
      clampItemsToAvailable,
      toOrderDraftPayload,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }
  return context;
}
