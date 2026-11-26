import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FloatingCartBar } from '@/components/cart/floating-cart-bar';
import { DishThumbnail } from '@/components/menu/dish-thumbnail';
import { MenuSkeleton } from '@/components/menu/menu-skeleton';
import { ProductCard } from '@/components/menu/product-card';
import { QuantityStepper } from '@/components/menu/quantity-stepper';
import { TableSelectorModal } from '@/components/menu/table-selector-modal';
import { PREVIEW_CATEGORIES, PREVIEW_PRODUCTS } from '@/constants/preview-menu';
import { BottomTabInset, Radius, Shadows, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTheme } from '@/hooks/use-theme';
import { getMenuCategories, getMenuProducts, lookupDiningTable } from '@/services/menu-api';
import type { MenuCategory, MenuProduct } from '@/types/menu';
import { formatVnd, isLowStock, isWeightOrVolumeUnit, parseDecimal } from '@/utils/format';
import { matchesVietnameseSearch } from '@/utils/search';

type SortOption = 'default' | 'price_asc' | 'price_desc';

const QUICK_SEARCH_TAGS = ['Sườn heo', 'Brisket', 'Xúc xích', 'Khoai tây', 'Đồ uống'];

function cleanCategoryLabel(name: string): string {
  return name.replace(/^\[BBQ mẫu\]\s*/i, '');
}

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Sắp xếp: Đề xuất',
  price_asc: 'Giá: Thấp → Cao',
  price_desc: 'Giá: Cao → Thấp',
};

export default function HomeScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ table?: string }>();
  const {
    lineCount,
    selectedTable,
    getItemQuantity,
    addItem,
    incrementItem,
    decrementItem,
    setSelectedTable,
    syncWithMenuProducts,
  } = useCart();

  const [allProducts, setAllProducts] = useState<MenuProduct[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [tableModalVisible, setTableModalVisible] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const handledTableParamRef = useRef<string | null>(null);

  // Tải danh mục & toàn bộ thực đơn ban đầu từ Backend (hoặc fallback sang thực đơn mẫu)
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      getMenuCategories(controller.signal),
      getMenuProducts(undefined, controller.signal),
    ])
      .then(([liveCategories, liveProducts]) => {
        setCategories(liveCategories);
        setAllProducts(liveProducts);
        setIsPreviewMode(false);
        if (liveProducts.length > 0) {
          syncWithMenuProducts(liveProducts);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setCategories(PREVIEW_CATEGORIES);
          setAllProducts(PREVIEW_PRODUCTS);
          setIsPreviewMode(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setInitialLoading(false);
        }
      });

    return () => controller.abort();
  }, [syncWithMenuProducts]);

  // Đồng bộ tồn kho từ API Backend mỗi khi người dùng lọc/tìm kiếm (debounce 300ms) ở chế độ online
  useEffect(() => {
    if (initialLoading || isPreviewMode) {
      return;
    }
    if (!selectedCategoryId && !debouncedQuery.trim()) {
      return;
    }

    const controller = new AbortController();
    getMenuProducts(
      {
        categoryId: selectedCategoryId || undefined,
        q: debouncedQuery.trim() || undefined,
      },
      controller.signal,
    )
      .then(freshMatches => {
        if (freshMatches.length === 0) {
          return;
        }
        setAllProducts(prev => {
          const freshMap = new Map(freshMatches.map(item => [item.id, item]));
          return prev.map(existing => freshMap.get(existing.id) ?? existing);
        });
      })
      .catch(() => {
        // Giữ dữ liệu hiện có nếu mạng chập chờn tạm thời
      });

    return () => controller.abort();
  }, [debouncedQuery, initialLoading, isPreviewMode, selectedCategoryId]);

  // Tự động nhận diện mã bàn nếu mở từ QR / Deep Link (?table=BBQ-A01)
  useEffect(() => {
    const tableParam =
      typeof params.table === 'string' ? params.table.trim() : '';
    if (!tableParam || handledTableParamRef.current === tableParam) {
      return;
    }
    handledTableParamRef.current = tableParam;

    const controller = new AbortController();
    lookupDiningTable(tableParam, controller.signal)
      .then(verifiedTable => {
        setSelectedTable(verifiedTable);
        setToast(`Đã nhận diện Bàn ${verifiedTable.name} (${verifiedTable.area})`);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setSelectedTable({
            id: `qr-${tableParam.toUpperCase()}`,
            code: tableParam.toUpperCase(),
            name: tableParam.toUpperCase(),
            area: 'Tại bàn',
            status: 'ACTIVE',
          });
          setToast(`Đang chọn Bàn ${tableParam.toUpperCase()}`);
        }
      });

    return () => controller.abort();
  }, [params.table, setSelectedTable]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [liveCategories, liveProducts] = await Promise.all([
        getMenuCategories(),
        getMenuProducts(),
      ]);
      setCategories(liveCategories);
      setAllProducts(liveProducts);
      setIsPreviewMode(false);
      if (liveProducts.length > 0) {
        syncWithMenuProducts(liveProducts);
      }
      setToast('Đã cập nhật thực đơn & tồn kho mới nhất');
    } catch {
      setCategories(PREVIEW_CATEGORIES);
      setAllProducts(PREVIEW_PRODUCTS);
      setIsPreviewMode(true);
      setToast('Máy chủ chưa bật · Đang hiển thị thực đơn mẫu');
    } finally {
      setRefreshing(false);
    }
  }, [syncWithMenuProducts]);

  const handleIncrement = useCallback(
    (product: MenuProduct) => {
      const currentQty = getItemQuantity(product.id);
      const result = currentQty > 0 ? incrementItem(product.id) : addItem(product);
      if (result.message) {
        setToast(result.message);
      }
    },
    [addItem, getItemQuantity, incrementItem],
  );

  const handleDecrement = useCallback(
    (product: MenuProduct) => {
      decrementItem(product.id);
    },
    [decrementItem],
  );

  const handleOpenProduct = useCallback((product: MenuProduct) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  }, []);

  const handleOpenCart = useCallback(() => {
    router.push('/cart');
  }, []);

  const cycleSortOption = useCallback(() => {
    setSortOption(prev =>
      prev === 'default'
        ? 'price_asc'
        : prev === 'price_asc'
          ? 'price_desc'
          : 'default',
    );
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategoryId('');
    setOnlyInStock(false);
    setSortOption('default');
  }, []);

  const filteredProducts = useMemo(() => {
    const matched = allProducts.filter(product => {
      if (selectedCategoryId && product.category.id !== selectedCategoryId) {
        return false;
      }
      if (onlyInStock && (!product.inStock || parseDecimal(product.available) <= 0)) {
        return false;
      }
      if (
        searchQuery.trim() &&
        !matchesVietnameseSearch(
          searchQuery,
          product.name,
          product.code,
          product.category.name,
          product.description,
        )
      ) {
        return false;
      }
      return true;
    });

    return [...matched].sort((a, b) => {
      // Luôn ưu tiên món còn hàng nằm trước món tạm hết
      if (a.inStock !== b.inStock) {
        return a.inStock ? -1 : 1;
      }
      if (sortOption === 'price_asc') {
        return parseDecimal(a.sellingPrice) - parseDecimal(b.sellingPrice);
      }
      if (sortOption === 'price_desc') {
        return parseDecimal(b.sellingPrice) - parseDecimal(a.sellingPrice);
      }
      return 0;
    });
  }, [allProducts, onlyInStock, searchQuery, selectedCategoryId, sortOption]);

  const featuredProducts = useMemo(
    () => allProducts.filter(p => p.inStock && parseDecimal(p.available) > 0).slice(0, 4),
    [allProducts],
  );

  const hasActiveFilter =
    Boolean(selectedCategoryId) ||
    Boolean(searchQuery.trim()) ||
    onlyInStock ||
    sortOption !== 'default';

  const showFeaturedSection =
    !initialLoading &&
    !selectedCategoryId &&
    !searchQuery.trim() &&
    featuredProducts.length > 0;

  const listBottomPadding =
    (Platform.OS === 'web' ? 32 : BottomTabInset + 28) + (lineCount > 0 ? 78 : 0);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {toast ? (
          <View style={[styles.toastPill, Shadows.elevated, { backgroundColor: theme.text }]}>
            <Text style={[styles.toastText, { color: theme.background }]}>{toast}</Text>
          </View>
        ) : null}

        <FlatList
          data={initialLoading ? [] : filteredProducts}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: listBottomPadding }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => void handleRefresh()}
              tintColor={theme.primary}
            />
          }
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              {/* Hero Banner Xanh Rêu */}
              <View style={[styles.heroBanner, { backgroundColor: theme.heroBg }]}>
                <View
                  style={[
                    styles.heroDecorCircleLarge,
                    { backgroundColor: theme.heroSurface },
                  ]}
                />
                <View
                  style={[
                    styles.heroDecorCircleSmall,
                    { backgroundColor: theme.heroSurface },
                  ]}
                />

                <View style={styles.heroTopRow}>
                  <View style={styles.brandBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.brandEyebrow}>SMOKEHOUSE & GRILL</Text>
                  </View>

                  <Pressable
                    onPress={() => setTableModalVisible(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Chọn bàn hoặc mua mang đi"
                    style={({ pressed }) => [
                      styles.tablePill,
                      { opacity: pressed ? 0.85 : 1 },
                    ]}>
                    <Text style={styles.tablePillIcon}>
                      {selectedTable ? '🪑' : '🥡'}
                    </Text>
                    <Text style={styles.tablePillText}>
                      {selectedTable ? `Bàn ${selectedTable.name}` : 'Mang đi'}
                    </Text>
                    <Text style={styles.tableChevron}>▾</Text>
                  </Pressable>
                </View>

                <Text style={styles.heroTitle}>Thưởng thức món ngon nóng hổi</Text>
                <Text style={styles.heroSubtitle}>
                  {selectedTable
                    ? `Đang đặt món cho Bàn ${selectedTable.name} · ${selectedTable.area}`
                    : 'Chế biến chuẩn vị trong ngày · Đặt tại bàn hoặc mang đi'}
                </Text>
              </View>

              {/* Thanh Tìm Kiếm Nổi (Hỗ trợ gõ không dấu) */}
              <View style={styles.searchWrapper}>
                <View
                  style={[
                    styles.searchBox,
                    Shadows.elevated,
                    {
                      backgroundColor: theme.surface,
                      borderColor: searchQuery ? theme.primary : theme.border,
                    },
                  ]}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Tìm món (gõ có dấu hoặc không dấu)..."
                    placeholderTextColor={theme.textMuted}
                    returnKeyType="search"
                    style={[styles.searchInput, { color: theme.text }]}
                  />
                  {searchQuery.length > 0 ? (
                    <Pressable
                      onPress={() => setSearchQuery('')}
                      hitSlop={8}
                      accessibilityLabel="Xóa từ khóa tìm kiếm"
                      style={[styles.clearSearchBtn, { backgroundColor: theme.mutedBg }]}>
                      <Text style={[styles.clearSearchIcon, { color: theme.textSecondary }]}>
                        ✕
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              {/* Thông báo trạng thái dữ liệu mẫu nếu Backend chưa bật */}
              {isPreviewMode ? (
                <View
                  style={[
                    styles.previewNotice,
                    {
                      backgroundColor: theme.primarySoft,
                      borderColor: theme.border,
                    },
                  ]}>
                  <Text style={[styles.previewNoticeText, { color: theme.primary }]}>
                    Đang hiển thị thực đơn mẫu (máy chủ chưa bật)
                  </Text>
                  <Pressable onPress={() => void handleRefresh()} hitSlop={6}>
                    <Text style={[styles.retryLink, { color: theme.primary }]}>
                      Kết nối lại ↻
                    </Text>
                  </Pressable>
                </View>
              ) : null}

              {/* Dải Chip Danh Mục Ngang */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}>
                <Pressable
                  onPress={() => setSelectedCategoryId('')}
                  style={[
                    styles.categoryChip,
                    selectedCategoryId === ''
                      ? { backgroundColor: theme.primary, borderColor: theme.primary }
                      : { backgroundColor: theme.surface, borderColor: theme.border },
                  ]}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      {
                        color:
                          selectedCategoryId === '' ? theme.onPrimary : theme.textSecondary,
                      },
                    ]}>
                    Tất cả ({allProducts.length})
                  </Text>
                </Pressable>

                {categories.map(cat => {
                  const active = selectedCategoryId === cat.id;
                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setSelectedCategoryId(active ? '' : cat.id)}
                      style={[
                        styles.categoryChip,
                        active
                          ? { backgroundColor: theme.primary, borderColor: theme.primary }
                          : { backgroundColor: theme.surface, borderColor: theme.border },
                      ]}>
                      <Text
                        style={[
                          styles.categoryChipText,
                          { color: active ? theme.onPrimary : theme.textSecondary },
                        ]}>
                        {cleanCategoryLabel(cat.name)} ({cat.productCount})
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Thanh lọc phụ: Chỉ còn hàng & Sắp xếp giá */}
              <View style={styles.filterToolbar}>
                <Pressable
                  onPress={() => setOnlyInStock(prev => !prev)}
                  style={[
                    styles.subFilterChip,
                    {
                      backgroundColor: onlyInStock ? theme.successBg : theme.surface,
                      borderColor: onlyInStock ? theme.successText : theme.border,
                    },
                  ]}>
                  <View
                    style={[
                      styles.stockFilterDot,
                      {
                        backgroundColor: onlyInStock
                          ? theme.successText
                          : theme.textMuted,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.subFilterText,
                      {
                        color: onlyInStock ? theme.successText : theme.textSecondary,
                      },
                    ]}>
                    Còn hàng
                  </Text>
                </Pressable>

                <Pressable
                  onPress={cycleSortOption}
                  style={[
                    styles.subFilterChip,
                    {
                      backgroundColor:
                        sortOption !== 'default' ? theme.primarySoft : theme.surface,
                      borderColor:
                        sortOption !== 'default' ? theme.primary : theme.border,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.subFilterText,
                      {
                        color:
                          sortOption !== 'default'
                            ? theme.primary
                            : theme.textSecondary,
                      },
                    ]}>
                    {SORT_LABELS[sortOption]}
                  </Text>
                </Pressable>

                {hasActiveFilter ? (
                  <Pressable onPress={resetAllFilters} style={styles.resetFilterBtn}>
                    <Text style={[styles.resetFilterText, { color: theme.dangerText }]}>
                      Bỏ lọc
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              {/* Carousel Món Ngon Nổi Bật */}
              {showFeaturedSection ? (
                <View style={styles.featuredSection}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                      Gợi ý đặc sắc hôm nay
                    </Text>
                    <Text style={[styles.sectionBadge, { color: theme.primary }]}>
                      Phục vụ ngay
                    </Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.featuredScroll}>
                    {featuredProducts.map(item => {
                      const qty = getItemQuantity(item.id);
                      const low = isLowStock(item.unit.symbol, item.available);
                      return (
                        <Pressable
                          key={item.id}
                          onPress={() => handleOpenProduct(item)}
                          style={({ pressed }) => [
                            styles.featuredCard,
                            Shadows.card,
                            {
                              backgroundColor: theme.surface,
                              borderColor: qty > 0 ? theme.primary : theme.border,
                              opacity: pressed ? 0.94 : 1,
                            },
                          ]}>
                          <View style={styles.featuredImageWrap}>
                            <DishThumbnail
                              name={item.name}
                              categoryName={item.category.name}
                              imageUrl={item.imageUrl}
                              inStock={item.inStock}
                              variant="cardTop"
                            />
                            {low ? (
                              <View
                                style={[
                                  styles.featuredTag,
                                  { backgroundColor: theme.accent },
                                ]}>
                                <Text style={styles.featuredTagText}>Sắp hết</Text>
                              </View>
                            ) : null}
                          </View>

                          <View style={styles.featuredBody}>
                            <Text
                              numberOfLines={1}
                              style={[styles.featuredTitle, { color: theme.text }]}>
                              {item.name}
                            </Text>
                            <View style={styles.featuredFooter}>
                              <View>
                                <Text
                                  style={[styles.featuredPrice, { color: theme.primary }]}>
                                  {formatVnd(item.sellingPrice)}
                                </Text>
                                <Text
                                  style={[styles.featuredUnit, { color: theme.textMuted }]}>
                                  Tính theo {item.unit.symbol}
                                </Text>
                              </View>
                              <QuantityStepper
                                quantity={qty}
                                available={item.available}
                                unitSymbol={item.unit.symbol}
                                inStock={item.inStock}
                                size="compact"
                                showUnit={isWeightOrVolumeUnit(item.unit.symbol)}
                                onIncrement={() => handleIncrement(item)}
                                onDecrement={() => handleDecrement(item)}
                              />
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : null}

              {/* Tiêu đề danh sách thực đơn */}
              {!initialLoading ? (
                <View style={[styles.sectionHeaderRow, styles.menuListHeading]}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    {selectedCategoryId
                      ? cleanCategoryLabel(
                          categories.find(c => c.id === selectedCategoryId)?.name ??
                            'Thực đơn',
                        )
                      : searchQuery.trim()
                        ? `Kết quả tìm kiếm (${filteredProducts.length})`
                        : 'Thực đơn món ăn'}
                  </Text>
                  <Text style={[styles.countMeta, { color: theme.textMuted }]}>
                    {filteredProducts.length} món
                  </Text>
                </View>
              ) : null}

              {initialLoading ? <MenuSkeleton /> : null}
            </View>
          }
          ListEmptyComponent={
            initialLoading ? undefined : (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyEmoji}>🍲</Text>
                <Text style={[styles.emptyTitle, { color: theme.text }]}>
                  Không tìm thấy món phù hợp
                </Text>
                <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                  Thử tìm bằng từ khóa gợi ý bên dưới hoặc bỏ bộ lọc hiện tại:
                </Text>
                <View style={styles.suggestionTagsRow}>
                  {QUICK_SEARCH_TAGS.map(tag => (
                    <Pressable
                      key={tag}
                      onPress={() => {
                        setSelectedCategoryId('');
                        setOnlyInStock(false);
                        setSearchQuery(tag);
                      }}
                      style={[
                        styles.suggestionChip,
                        {
                          backgroundColor: theme.surface,
                          borderColor: theme.border,
                        },
                      ]}>
                      <Text style={[styles.suggestionText, { color: theme.primary }]}>
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )
          }
          ItemSeparatorComponent={() => <View style={styles.cardGap} />}
          renderItem={({ item }) => (
            <View style={styles.cardHorizontalPadding}>
              <ProductCard
                product={item}
                quantityInCart={getItemQuantity(item.id)}
                onPress={handleOpenProduct}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </View>
          )}
        />

        <FloatingCartBar onPress={handleOpenCart} />

        <TableSelectorModal
          visible={tableModalVisible}
          selectedTable={selectedTable}
          isPreviewMode={isPreviewMode}
          onSelectTable={table => {
            setSelectedTable(table);
            setToast(
              table
                ? `Đã chọn phục vụ tại Bàn ${table.name}`
                : 'Đã chuyển sang chế độ Đặt mang đi',
            );
          }}
          onClose={() => setTableModalVisible(false)}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  toastPill: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 14 : 56,
    left: Spacing.four,
    right: Spacing.four,
    zIndex: 50,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerContainer: {
    marginBottom: 12,
  },
  heroBanner: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 42,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  heroDecorCircleLarge: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 999,
    top: -60,
    right: -45,
    opacity: 0.55,
  },
  heroDecorCircleSmall: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 999,
    bottom: -35,
    left: -25,
    opacity: 0.4,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#5EE290',
  },
  brandEyebrow: {
    color: '#E5F2EA',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tablePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  tablePillIcon: {
    fontSize: 13,
  },
  tablePillText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  tableChevron: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    color: 'rgba(235, 245, 239, 0.82)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  searchWrapper: {
    paddingHorizontal: Spacing.three,
    marginTop: -24,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: Radius.lg,
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchIcon: {
    fontSize: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearSearchBtn: {
    width: 22,
    height: 22,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSearchIcon: {
    fontSize: 11,
    fontWeight: '800',
  },
  previewNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.three,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: 8,
  },
  previewNoticeText: {
    fontSize: 11.5,
    fontWeight: '600',
    flex: 1,
  },
  retryLink: {
    fontSize: 12,
    fontWeight: '800',
  },
  categoryScroll: {
    paddingHorizontal: Spacing.three,
    paddingTop: 14,
    paddingBottom: 6,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  subFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  stockFilterDot: {
    width: 6,
    height: 6,
    borderRadius: Radius.pill,
  },
  subFilterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  resetFilterBtn: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  resetFilterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  featuredSection: {
    marginTop: 16,
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
  },
  sectionTitle: {
    fontSize: 17.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  countMeta: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  featuredScroll: {
    paddingHorizontal: Spacing.three,
    gap: 12,
    paddingBottom: 4,
  },
  featuredCard: {
    width: 204,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  featuredImageWrap: {
    position: 'relative',
  },
  featuredTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  featuredBody: {
    padding: 12,
    gap: 10,
  },
  featuredTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  featuredPrice: {
    fontSize: 15,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  featuredUnit: {
    fontSize: 11,
    marginTop: 1,
  },
  menuListHeading: {
    marginTop: 18,
    marginBottom: 2,
  },
  cardHorizontalPadding: {
    paddingHorizontal: Spacing.three,
  },
  cardGap: {
    height: 12,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 42,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 38,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  suggestionTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  suggestionChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
});
