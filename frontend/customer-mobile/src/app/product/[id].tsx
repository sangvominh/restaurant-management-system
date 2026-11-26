import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DishThumbnail } from '@/components/menu/dish-thumbnail';
import { QuantityStepper } from '@/components/menu/quantity-stepper';
import { StockBadge } from '@/components/menu/stock-badge';
import { findPreviewProductById } from '@/constants/preview-menu';
import { Radius, Shadows, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';
import { ApiError } from '@/services/api-client';
import { getMenuProductById } from '@/services/menu-api';
import type { MenuProduct } from '@/types/menu';
import {
  MAX_ITEM_NOTE_LENGTH,
  calculateLineTotal,
  clampQuantityToAvailable,
  formatQuantity,
  formatVnd,
  getDefaultAddQuantity,
  getQuantityStep,
  getQuickQuantityPresets,
  isWeightOrVolumeUnit,
  parseDecimal,
  roundQuantity,
} from '@/utils/format';

const FOOD_NOTE_SUGGESTIONS = [
  'Cắt sẵn vừa ăn',
  'Để riêng sốt',
  'Ít sốt',
  'Ít cay',
  'Dùng nóng ngay',
];

const DRINK_NOTE_SUGGESTIONS = ['Ít đá', 'Đá để riêng', 'Không đá', 'Ướp thật lạnh'];

function isDrinkItem(product: MenuProduct): boolean {
  const haystack = `${product.name} ${product.category.name} ${product.unit.symbol}`.toLocaleLowerCase(
    'vi',
  );
  return ['đồ uống', 'nước', 'trà', 'coca', 'pepsi', 'bia', 'lon', 'chai', 'ly'].some(kw =>
    haystack.includes(kw),
  );
}

function cleanCategoryLabel(name: string): string {
  return name.replace(/^\[BBQ mẫu\]\s*/i, '');
}

function navigateBackToMenu() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

export default function ProductDetailScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ id: string }>();
  const productId = Array.isArray(params.id) ? (params.id[0] ?? '') : (params.id ?? '');

  const {
    lineCount,
    selectedTable,
    getItem,
    addItem,
    setItemQuantity,
    setItemNote,
    removeItem,
  } = useCart();

  const existingCartItem = getItem(productId);
  const previewFallback = useMemo(() => findPreviewProductById(productId), [productId]);

  const [product, setProduct] = useState<MenuProduct | null>(previewFallback ?? null);
  const [loading, setLoading] = useState<boolean>(!previewFallback);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Giữ null khi người dùng chưa chỉnh tay để tự động kế thừa số lượng/ghi chú đang có trong giỏ
  const [userQuantity, setUserQuantity] = useState<number | null>(null);
  const [userNote, setUserNote] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      return;
    }
    const controller = new AbortController();
    getMenuProductById(productId, controller.signal)
      .then(liveProduct => {
        setProduct(liveProduct);
        setErrorMessage(null);
        setLoading(false);
      })
      .catch(error => {
        if (controller.signal.aborted) {
          return;
        }
        const fallback = findPreviewProductById(productId);
        if (fallback) {
          setProduct(fallback);
          setErrorMessage(null);
        } else if (error instanceof ApiError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Không tải được chi tiết món ăn.');
        }
        setLoading(false);
      });

    return () => controller.abort();
  }, [productId]);

  const maxAvailable = useMemo(
    () => (product ? roundQuantity(parseDecimal(product.available)) : 0),
    [product],
  );
  const isAvailable = Boolean(product && product.inStock && maxAvailable > 0);

  const defaultQty = useMemo(() => {
    if (!product) {
      return 0;
    }
    if (existingCartItem) {
      return clampQuantityToAvailable(existingCartItem.quantity, maxAvailable);
    }
    return getDefaultAddQuantity(product.unit.symbol, maxAvailable);
  }, [existingCartItem, maxAvailable, product]);

  const effectiveQuantity = useMemo(() => {
    if (!isAvailable) {
      return 0;
    }
    if (userQuantity !== null) {
      if (userQuantity <= 0) {
        return existingCartItem ? 0 : defaultQty;
      }
      return clampQuantityToAvailable(userQuantity, maxAvailable);
    }
    return defaultQty;
  }, [defaultQty, existingCartItem, isAvailable, maxAvailable, userQuantity]);

  const effectiveNote =
    userNote !== null ? userNote : (existingCartItem?.note ?? '');

  const quickPresets = useMemo(
    () =>
      product
        ? getQuickQuantityPresets(product.unit.symbol, product.available)
        : [],
    [product],
  );

  const noteSuggestions = useMemo(
    () =>
      product && isDrinkItem(product)
        ? DRINK_NOTE_SUGGESTIONS
        : FOOD_NOTE_SUGGESTIONS,
    [product],
  );

  const stepSize = product ? getQuantityStep(product.unit.symbol) : 1;
  const lineTotal = product
    ? calculateLineTotal(product.sellingPrice, effectiveQuantity)
    : 0;

  const handleStepIncrement = useCallback(() => {
    if (!product || !isAvailable) {
      return;
    }
    const nextTarget = roundQuantity(effectiveQuantity + stepSize);
    if (nextTarget > maxAvailable) {
      setFeedback(
        `Tại quầy hiện chỉ còn tối đa ${formatQuantity(maxAvailable)} ${product.unit.symbol}`,
      );
      setUserQuantity(maxAvailable);
      return;
    }
    setFeedback(null);
    setUserQuantity(nextTarget);
  }, [effectiveQuantity, isAvailable, maxAvailable, product, stepSize]);

  const handleStepDecrement = useCallback(() => {
    if (!product || !isAvailable) {
      return;
    }
    const minAllowed = existingCartItem ? 0 : Math.min(stepSize, maxAvailable);
    const nextTarget = roundQuantity(effectiveQuantity - stepSize);
    setFeedback(null);
    setUserQuantity(nextTarget <= minAllowed ? minAllowed : nextTarget);
  }, [effectiveQuantity, existingCartItem, isAvailable, maxAvailable, product, stepSize]);

  const handleToggleSuggestionChip = useCallback(
    (suggestion: string) => {
      const parts = effectiveNote
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      const exists = parts.some(
        part => part.toLocaleLowerCase('vi') === suggestion.toLocaleLowerCase('vi'),
      );
      const nextParts = exists
        ? parts.filter(
            part => part.toLocaleLowerCase('vi') !== suggestion.toLocaleLowerCase('vi'),
          )
        : [...parts, suggestion];
      const joined = nextParts.join(', ').slice(0, MAX_ITEM_NOTE_LENGTH);
      setUserNote(joined);
    },
    [effectiveNote],
  );

  const handleConfirmAction = useCallback(() => {
    if (!product) {
      return;
    }
    if (existingCartItem) {
      if (effectiveQuantity <= 0) {
        removeItem(product.id);
        navigateBackToMenu();
        return;
      }
      setItemQuantity(product.id, effectiveQuantity);
      setItemNote(product.id, effectiveNote.trim());
      navigateBackToMenu();
      return;
    }

    if (!isAvailable || effectiveQuantity <= 0) {
      return;
    }
    const result = addItem(product, effectiveQuantity, effectiveNote.trim());
    if (!result.ok && result.message) {
      setFeedback(result.message);
      return;
    }
    navigateBackToMenu();
  }, [
    addItem,
    effectiveNote,
    effectiveQuantity,
    existingCartItem,
    isAvailable,
    product,
    removeItem,
    setItemNote,
    setItemQuantity,
  ]);

  if (loading && !product) {
    return (
      <SafeAreaView style={[styles.centerScreen, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingLabel, { color: theme.textSecondary }]}>
          Đang tải thông tin món ăn...
        </Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={[styles.centerScreen, { backgroundColor: theme.background }]}>
        <Text style={styles.notFoundEmoji}>🍽️</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>
          {errorMessage || 'Không tìm thấy món ăn'}
        </Text>
        <Pressable
          onPress={navigateBackToMenu}
          style={[styles.primaryBackBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.primaryBackBtnText}>Quay lại thực đơn</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isRemovingFromCart = Boolean(existingCartItem && effectiveQuantity <= 0);
  const showUnitInStepper = isWeightOrVolumeUnit(product.unit.symbol);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>
          {/* Ảnh Hero tràn đầu trang + Thanh điều hướng nổi */}
          <View style={styles.heroWrap}>
            <DishThumbnail
              name={product.name}
              code={product.code}
              categoryName={product.category.name}
              imageUrl={product.imageUrl}
              inStock={product.inStock}
              variant="hero"
              style={styles.heroImage}
            />

            <SafeAreaView
              edges={['top']}
              pointerEvents="box-none"
              style={styles.floatingTopBar}>
              <Pressable
                onPress={navigateBackToMenu}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Quay lại thực đơn"
                style={({ pressed }) => [
                  styles.floatingCircleBtn,
                  Shadows.elevated,
                  { opacity: pressed ? 0.85 : 1 },
                ]}>
                <Text style={styles.floatingBackIcon}>←</Text>
              </Pressable>

              {lineCount > 0 ? (
                <Pressable
                  onPress={() => router.push('/cart')}
                  accessibilityRole="button"
                  accessibilityLabel="Mở giỏ hàng"
                  style={({ pressed }) => [
                    styles.floatingCartChip,
                    Shadows.elevated,
                    { opacity: pressed ? 0.85 : 1 },
                  ]}>
                  <Text style={styles.floatingCartIcon}>🛒</Text>
                  <Text style={styles.floatingCartCount}>{lineCount}</Text>
                </Pressable>
              ) : null}
            </SafeAreaView>
          </View>

          {/* Thân thông tin bo cong nổi trên chân ảnh */}
          <View
            style={[
              styles.sheetCard,
              {
                backgroundColor: theme.background,
              },
            ]}>
            <View
              style={[
                styles.infoSection,
                Shadows.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}>
              <View style={styles.metaTopRow}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: theme.primarySoft },
                  ]}>
                  <Text style={[styles.categoryBadgeText, { color: theme.primary }]}>
                    {cleanCategoryLabel(product.category.name)}
                  </Text>
                </View>

                <Text style={[styles.codeText, { color: theme.textMuted }]}>
                  Mã: {product.code}
                </Text>
              </View>

              <Text style={[styles.productTitle, { color: theme.text }]}>
                {product.name}
              </Text>

              <View style={styles.priceAndStockRow}>
                <View style={styles.priceRow}>
                  <Text style={[styles.priceValue, { color: theme.primary }]}>
                    {formatVnd(product.sellingPrice)}
                  </Text>
                  <Text style={[styles.priceUnit, { color: theme.textSecondary }]}>
                    / {product.unit.name.toLocaleLowerCase('vi')} ({product.unit.symbol})
                  </Text>
                </View>

                <StockBadge
                  available={product.available}
                  unitSymbol={product.unit.symbol}
                  inStock={product.inStock}
                />
              </View>

              {existingCartItem ? (
                <View
                  style={[
                    styles.inCartNotice,
                    {
                      backgroundColor: theme.primarySoft,
                      borderColor: theme.primary,
                    },
                  ]}>
                  <Text style={[styles.inCartNoticeText, { color: theme.primary }]}>
                    ✓ Món này đang có {formatQuantity(existingCartItem.quantity)}{' '}
                    {product.unit.symbol} trong giỏ hàng · Bạn có thể chỉnh lại số lượng hoặc ghi chú bên dưới.
                  </Text>
                </View>
              ) : null}

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <Text style={[styles.blockTitle, { color: theme.text }]}>
                Giới thiệu món ăn
              </Text>
              <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
                {product.description?.trim() ||
                  `${product.name} được chế biến sẵn theo tiêu chuẩn chất lượng của bếp trung tâm và bảo quản theo lô tại quầy phục vụ, đảm bảo lên món nhanh chóng ngay khi xác nhận.`}
              </Text>
            </View>

            {/* Chọn nhanh mức định lượng */}
            {isAvailable && quickPresets.length > 0 ? (
              <View
                style={[
                  styles.infoSection,
                  Shadows.card,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}>
                <View style={styles.sectionHeadingBetween}>
                  <Text style={[styles.blockTitle, { color: theme.text }]}>
                    Chọn nhanh định lượng
                  </Text>
                  <Text style={[styles.stepHint, { color: theme.textMuted }]}>
                    Bước chỉnh {formatQuantity(stepSize)} {product.unit.symbol}
                  </Text>
                </View>

                <View style={styles.presetRow}>
                  {quickPresets.map(preset => {
                    const active = effectiveQuantity === preset;
                    return (
                      <Pressable
                        key={preset}
                        onPress={() => {
                          setFeedback(null);
                          setUserQuantity(preset);
                        }}
                        style={[
                          styles.presetPill,
                          active
                            ? {
                                backgroundColor: theme.primary,
                                borderColor: theme.primary,
                              }
                            : {
                                backgroundColor: theme.background,
                                borderColor: theme.border,
                              },
                        ]}>
                        <Text
                          style={[
                            styles.presetPillText,
                            { color: active ? theme.onPrimary : theme.text },
                          ]}>
                          {formatQuantity(preset)} {product.unit.symbol}
                        </Text>
                        <Text
                          style={[
                            styles.presetPriceHint,
                            {
                              color: active
                                ? 'rgba(255, 255, 255, 0.82)'
                                : theme.textMuted,
                            },
                          ]}>
                          {formatVnd(calculateLineTotal(product.sellingPrice, preset))}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Ghi chú món ăn + Gợi ý 1 chạm */}
            <View
              style={[
                styles.infoSection,
                Shadows.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}>
              <View style={styles.sectionHeadingBetween}>
                <Text style={[styles.blockTitle, { color: theme.text }]}>
                  Ghi chú cho nhà hàng
                </Text>
                <Text style={[styles.charCounter, { color: theme.textMuted }]}>
                  {effectiveNote.length}/{MAX_ITEM_NOTE_LENGTH}
                </Text>
              </View>

              <View style={styles.suggestionWrap}>
                {noteSuggestions.map(chip => {
                  const selectedChip = effectiveNote
                    .toLocaleLowerCase('vi')
                    .includes(chip.toLocaleLowerCase('vi'));
                  return (
                    <Pressable
                      key={chip}
                      onPress={() => handleToggleSuggestionChip(chip)}
                      style={[
                        styles.noteChip,
                        selectedChip
                          ? {
                              backgroundColor: theme.primarySoft,
                              borderColor: theme.primary,
                            }
                          : {
                              backgroundColor: theme.background,
                              borderColor: theme.border,
                            },
                      ]}>
                      <Text
                        style={[
                          styles.noteChipText,
                          {
                            color: selectedChip ? theme.primary : theme.textSecondary,
                          },
                        ]}>
                        {selectedChip ? `✓ ${chip}` : `+ ${chip}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <TextInput
                value={effectiveNote}
                onChangeText={text =>
                  setUserNote(text.slice(0, MAX_ITEM_NOTE_LENGTH))
                }
                placeholder="Nhập yêu cầu riêng (ví dụ: cắt nhỏ, để riêng sốt...)"
                placeholderTextColor={theme.textMuted}
                multiline
                maxLength={MAX_ITEM_NOTE_LENGTH}
                style={[
                  styles.noteInput,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
              />

              {selectedTable ? (
                <Text style={[styles.tableContextHint, { color: theme.textMuted }]}>
                  🪑 Món sẽ được phục vụ cho Bàn {selectedTable.name} ({selectedTable.area})
                </Text>
              ) : null}
            </View>

            {feedback ? (
              <View
                style={[
                  styles.feedbackBox,
                  { backgroundColor: theme.warningBg },
                ]}>
                <Text style={[styles.feedbackText, { color: theme.warningText }]}>
                  {feedback}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>

        {/* Thanh hành động cố định dưới đáy */}
        <SafeAreaView
          edges={['bottom']}
          style={[
            styles.bottomActionContainer,
            Shadows.floating,
            {
              backgroundColor: theme.surface,
              borderTopColor: theme.border,
            },
          ]}>
          <View style={styles.bottomActionInner}>
            {isAvailable ? (
              <QuantityStepper
                quantity={effectiveQuantity}
                available={product.available}
                unitSymbol={product.unit.symbol}
                inStock={product.inStock}
                size="regular"
                collapseWhenZero={false}
                showUnit={showUnitInStepper}
                onIncrement={handleStepIncrement}
                onDecrement={handleStepDecrement}
              />
            ) : null}

            <Pressable
              onPress={handleConfirmAction}
              disabled={!isAvailable && !existingCartItem}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.ctaButton,
                {
                  backgroundColor: !isAvailable && !existingCartItem
                    ? theme.mutedBg
                    : isRemovingFromCart
                      ? theme.dangerText
                      : theme.primary,
                  opacity: pressed && (isAvailable || existingCartItem) ? 0.88 : 1,
                },
              ]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.ctaButtonText,
                  {
                    color:
                      !isAvailable && !existingCartItem
                        ? theme.mutedText
                        : theme.onPrimary,
                  },
                ]}>
                {!isAvailable && !existingCartItem
                  ? 'Món tạm hết tại quầy'
                  : isRemovingFromCart
                    ? 'Xóa khỏi giỏ hàng'
                    : existingCartItem
                      ? `Cập nhật · ${formatVnd(lineTotal)}`
                      : `Thêm vào giỏ · ${formatVnd(lineTotal)}`}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  centerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    gap: 12,
  },
  loadingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  notFoundEmoji: {
    fontSize: 42,
  },
  notFoundTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryBackBtn: {
    marginTop: 6,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: Radius.pill,
  },
  primaryBackBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 28,
  },
  heroWrap: {
    position: 'relative',
    width: '100%',
    height: 264,
  },
  heroImage: {
    width: '100%',
    height: 264,
    borderRadius: 0,
  },
  floatingTopBar: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 14 : 8,
    left: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(20, 32, 25, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBackIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  floatingCartChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: 13,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(20, 32, 25, 0.78)',
  },
  floatingCartIcon: {
    fontSize: 15,
  },
  floatingCartCount: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  sheetCard: {
    marginTop: -24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    gap: 14,
  },
  infoSection: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  metaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  categoryBadgeText: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  codeText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  priceAndStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceValue: {
    fontSize: 21,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  priceUnit: {
    fontSize: 13,
    fontWeight: '600',
  },
  inCartNotice: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  inCartNoticeText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  descriptionText: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  sectionHeadingBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  stepHint: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetPill: {
    flex: 1,
    minWidth: 92,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: 2,
  },
  presetPillText: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  presetPriceHint: {
    fontSize: 11,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  charCounter: {
    fontSize: 11.5,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  suggestionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noteChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  noteChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteInput: {
    minHeight: 78,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    lineHeight: 19,
    textAlignVertical: 'top',
  },
  tableContextHint: {
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackBox: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.md,
  },
  feedbackText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  bottomActionContainer: {
    borderTopWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'web' ? 14 : 10,
  },
  bottomActionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaButton: {
    flex: 1,
    height: 46,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  ctaButtonText: {
    fontSize: 14.5,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
