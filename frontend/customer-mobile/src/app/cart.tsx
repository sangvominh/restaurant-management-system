import { router } from 'expo-router';
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

import { CartItemCard } from '@/components/cart/cart-item-card';
import { TableSelectorModal } from '@/components/menu/table-selector-modal';
import { PREVIEW_PRODUCTS } from '@/constants/preview-menu';
import { Radius, Shadows, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';
import { getMenuProducts } from '@/services/menu-api';
import { MAX_ORDER_NOTE_LENGTH, formatVnd } from '@/utils/format';

function navigateBackToMenu() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

export default function CartScreen() {
  const theme = useTheme();
  const {
    items,
    selectedTable,
    orderNote,
    lineCount,
    subtotal,
    stockIssues,
    hasStockIssues,
    incrementItem,
    decrementItem,
    setItemNote,
    removeItem,
    clearCart,
    setSelectedTable,
    setOrderNote,
    syncWithMenuProducts,
    clampItemsToAvailable,
  } = useCart();

  const [checkingStock, setCheckingStock] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Tự động đối chiếu lại tồn kho cửa hàng mới nhất khi khách mở Giỏ hàng
  useEffect(() => {
    if (lineCount === 0) {
      return;
    }
    const controller = new AbortController();
    getMenuProducts(undefined, controller.signal)
      .then(liveProducts => {
        setIsPreviewMode(false);
        if (liveProducts.length > 0) {
          syncWithMenuProducts(liveProducts);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setIsPreviewMode(true);
          syncWithMenuProducts(PREVIEW_PRODUCTS);
        }
      });

    return () => controller.abort();
    // Chỉ chạy đối chiếu tự động 1 lần lúc mở màn hình Giỏ hàng
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const issueByProductId = useMemo(
    () => new Map(stockIssues.map(issue => [issue.productId, issue])),
    [stockIssues],
  );

  const handleOpenDetail = useCallback((productId: string) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: productId },
    });
  }, []);

  const handleIncrement = useCallback(
    (productId: string) => {
      const result = incrementItem(productId);
      if (result.message) {
        setToast(result.message);
      }
    },
    [incrementItem],
  );

  const handleProceedToCheckout = useCallback(async () => {
    if (lineCount === 0) {
      return;
    }
    if (hasStockIssues) {
      clampItemsToAvailable();
      setToast('Đã tự động điều chỉnh số lượng theo lượng còn tại quầy');
      return;
    }

    setCheckingStock(true);
    try {
      const liveProducts = await getMenuProducts();
      if (liveProducts.length > 0) {
        const issues = syncWithMenuProducts(liveProducts);
        if (issues.length > 0) {
          setToast('Tồn kho tại quầy vừa thay đổi, vui lòng kiểm tra lại giỏ hàng');
          return;
        }
      }
    } catch {
      // Nếu đang chạy thực đơn mẫu offline thì bỏ qua bước gọi máy chủ và chuyển tiếp sang màn xác nhận
    } finally {
      setCheckingStock(false);
    }

    router.push('/checkout');
  }, [clampItemsToAvailable, hasStockIssues, lineCount, syncWithMenuProducts]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        {/* Thanh tiêu đề Giỏ hàng */}
        <View
          style={[
            styles.headerBar,
            {
              backgroundColor: theme.surface,
              borderBottomColor: theme.border,
            },
          ]}>
          <Pressable
            onPress={navigateBackToMenu}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Quay lại thực đơn"
            style={[styles.backCircle, { backgroundColor: theme.background }]}>
            <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Giỏ hàng của bạn
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textMuted }]}>
              {lineCount > 0 ? `${lineCount} món đã chọn` : 'Chưa có món nào'}
            </Text>
          </View>

          {lineCount > 0 ? (
            <Pressable
              onPress={() => setConfirmingClear(prev => !prev)}
              hitSlop={8}
              style={[styles.clearHeaderBtn, { backgroundColor: theme.dangerBg }]}>
              <Text style={[styles.clearHeaderText, { color: theme.dangerText }]}>
                Xóa hết
              </Text>
            </Pressable>
          ) : (
            <View style={styles.headerPlaceholder} />
          )}
        </View>
      </SafeAreaView>

      {toast ? (
        <View style={[styles.toastPill, Shadows.elevated, { backgroundColor: theme.text }]}>
          <Text style={[styles.toastText, { color: theme.background }]}>{toast}</Text>
        </View>
      ) : null}

      {/* Hộp xác nhận xóa sạch giỏ hàng đồng nhất mọi nền tảng */}
      {confirmingClear && lineCount > 0 ? (
        <View
          style={[
            styles.clearConfirmBar,
            {
              backgroundColor: theme.dangerBg,
              borderColor: theme.dangerText,
            },
          ]}>
          <Text style={[styles.clearConfirmLabel, { color: theme.dangerText }]}>
            Xóa toàn bộ {lineCount} món trong giỏ?
          </Text>
          <View style={styles.clearConfirmActions}>
            <Pressable
              onPress={() => setConfirmingClear(false)}
              style={[styles.cancelMiniBtn, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cancelMiniText, { color: theme.textSecondary }]}>
                Giữ lại
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                clearCart();
                setConfirmingClear(false);
              }}
              style={[styles.confirmMiniBtn, { backgroundColor: theme.dangerText }]}>
              <Text style={styles.confirmMiniText}>Xóa ngay</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {lineCount === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: theme.primarySoft }]}>
            <Text style={styles.emptyEmoji}>🧺</Text>
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Giỏ hàng đang trống
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>
            Hãy khám phá thực đơn các món nướng hun khói và đồ uống sẵn có tại quầy nhé!
          </Text>
          <Pressable
            onPress={navigateBackToMenu}
            style={({ pressed }) => [
              styles.browseMenuBtn,
              {
                backgroundColor: theme.primary,
                opacity: pressed ? 0.88 : 1,
              },
            ]}>
            <Text style={styles.browseMenuBtnText}>Xem thực đơn chọn món</Text>
          </Pressable>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}>
            {/* Thẻ Hình thức dùng bữa (Bàn / Mang đi) */}
            <Pressable
              onPress={() => setTableModalVisible(true)}
              style={[
                styles.diningModeCard,
                Shadows.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: selectedTable ? theme.primary : theme.border,
                },
              ]}>
              <View
                style={[
                  styles.diningIconWrap,
                  { backgroundColor: theme.primarySoft },
                ]}>
                <Text style={styles.diningIcon}>
                  {selectedTable ? '🪑' : '🥡'}
                </Text>
              </View>

              <View style={styles.diningInfoCol}>
                <Text style={[styles.diningLabel, { color: theme.textMuted }]}>
                  HÌNH THỨC PHỤC VỤ
                </Text>
                <Text style={[styles.diningTitle, { color: theme.text }]}>
                  {selectedTable
                    ? `Dùng tại Bàn ${selectedTable.name} · ${selectedTable.area}`
                    : 'Đặt mang đi (Takeaway)'}
                </Text>
              </View>

              <View
                style={[
                  styles.changeTablePill,
                  { backgroundColor: theme.primarySoft },
                ]}>
                <Text style={[styles.changeTableText, { color: theme.primary }]}>
                  Đổi ▾
                </Text>
              </View>
            </Pressable>

            {/* Cảnh báo tổng hợp nếu có món vượt tồn kho */}
            {hasStockIssues ? (
              <View
                style={[
                  styles.stockAlertCard,
                  {
                    backgroundColor: theme.warningBg,
                    borderColor: theme.warningText,
                  },
                ]}>
                <View style={styles.stockAlertTextCol}>
                  <Text style={[styles.stockAlertTitle, { color: theme.warningText }]}>
                    ⚠️ Có {stockIssues.length} món vượt lượng tồn tại quầy
                  </Text>
                  <Text style={[styles.stockAlertSub, { color: theme.warningText }]}>
                    Bấm nút bên dưới để tự động giảm về mức tối đa còn bán được.
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    clampItemsToAvailable();
                    setToast('Đã cập nhật lại giỏ theo lượng hàng hiện còn');
                  }}
                  style={[styles.autoFixBtn, { backgroundColor: theme.warningText }]}>
                  <Text style={styles.autoFixBtnText}>Tự điều chỉnh theo tồn kho</Text>
                </Pressable>
              </View>
            ) : null}

            {/* Danh sách các dòng món */}
            <View style={styles.itemsList}>
              {items.map(item => (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  stockIssue={issueByProductId.get(item.productId)}
                  onOpenDetail={handleOpenDetail}
                  onIncrement={handleIncrement}
                  onDecrement={decrementItem}
                  onChangeNote={setItemNote}
                  onRemove={removeItem}
                />
              ))}
            </View>

            {/* Nút quay lại chọn thêm món */}
            <Pressable
              onPress={navigateBackToMenu}
              style={[
                styles.addMoreButton,
                {
                  borderColor: theme.primary,
                  backgroundColor: theme.primarySoft,
                },
              ]}>
              <Text style={[styles.addMoreButtonText, { color: theme.primary }]}>
                + Chọn thêm món khác
              </Text>
            </Pressable>

            {/* Ghi chú chung cho toàn bộ đơn */}
            <View
              style={[
                styles.sectionCard,
                Shadows.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}>
              <View style={styles.noteHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Ghi chú chung cho đơn hàng
                </Text>
                <Text style={[styles.charCounter, { color: theme.textMuted }]}>
                  {orderNote.length}/{MAX_ORDER_NOTE_LENGTH}
                </Text>
              </View>
              <TextInput
                value={orderNote}
                onChangeText={setOrderNote}
                placeholder="Ví dụ: Lên đồ uống trước, lấy thêm chén đũa..."
                placeholderTextColor={theme.textMuted}
                multiline
                maxLength={MAX_ORDER_NOTE_LENGTH}
                style={[
                  styles.orderNoteInput,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
              />
            </View>

            {/* Khối tổng kết chi phí */}
            <View
              style={[
                styles.sectionCard,
                Shadows.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Tóm tắt thanh toán
              </Text>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                  Số dòng món
                </Text>
                <Text style={[styles.summaryValue, { color: theme.text }]}>
                  {lineCount} món
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                  Hình thức
                </Text>
                <Text style={[styles.summaryValue, { color: theme.text }]}>
                  {selectedTable ? `Tại bàn (${selectedTable.name})` : 'Mang đi'}
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>
                  Tổng tạm tính
                </Text>
                <Text style={[styles.totalAmount, { color: theme.primary }]}>
                  {formatVnd(subtotal)}
                </Text>
              </View>

              <Text style={[styles.policyHint, { color: theme.textMuted }]}>
                Sau khi gửi yêu cầu, nhân viên phục vụ sẽ xác nhận đơn để giữ hàng tại quầy cho bạn.
              </Text>
            </View>
          </ScrollView>

          {/* Thanh hành động cố định dưới đáy */}
          <SafeAreaView
            edges={['bottom']}
            style={[
              styles.bottomCheckoutBar,
              Shadows.floating,
              {
                backgroundColor: theme.surface,
                borderTopColor: theme.border,
              },
            ]}>
            <View style={styles.bottomPriceCol}>
              <Text style={[styles.bottomPriceCaption, { color: theme.textMuted }]}>
                Tạm tính ({lineCount} món)
              </Text>
              <Text style={[styles.bottomPriceValue, { color: theme.primary }]}>
                {formatVnd(subtotal)}
              </Text>
            </View>

            <Pressable
              onPress={() => void handleProceedToCheckout()}
              disabled={checkingStock}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.checkoutCta,
                {
                  backgroundColor: hasStockIssues ? theme.warningText : theme.primary,
                  opacity: checkingStock ? 0.65 : pressed ? 0.88 : 1,
                },
              ]}>
              {checkingStock ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.checkoutCtaText}>
                  {hasStockIssues ? 'Điều chỉnh tồn kho' : 'Tiếp tục đặt món →'}
                </Text>
              )}
            </Pressable>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}

      <TableSelectorModal
        visible={tableModalVisible}
        selectedTable={selectedTable}
        isPreviewMode={isPreviewMode}
        onSelectTable={table => {
          setSelectedTable(table);
          setToast(
            table
              ? `Đã chuyển sang phục vụ tại Bàn ${table.name}`
              : 'Đã chuyển sang Đặt mang đi',
          );
        }}
        onClose={() => setTableModalVisible(false)}
      />
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
  topSafeArea: {
    zIndex: 10,
  },
  headerBar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    borderBottomWidth: 1,
  },
  backCircle: {
    width: 38,
    height: 38,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 19,
    fontWeight: '700',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16.5,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  clearHeaderBtn: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  clearHeaderText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerPlaceholder: {
    width: 58,
  },
  toastPill: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 68 : 108,
    left: Spacing.four,
    right: Spacing.four,
    zIndex: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  clearConfirmBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.three,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: 10,
  },
  clearConfirmLabel: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: '700',
  },
  clearConfirmActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelMiniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  cancelMiniText: {
    fontSize: 12,
    fontWeight: '700',
  },
  confirmMiniBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  confirmMiniText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyIconCircle: {
    width: 84,
    height: 84,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyEmoji: {
    fontSize: 38,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
  },
  emptyDesc: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
  },
  browseMenuBtn: {
    marginTop: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: Radius.pill,
  },
  browseMenuBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '800',
  },
  scrollContent: {
    padding: Spacing.three,
    gap: 14,
    paddingBottom: 28,
  },
  diningModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 12,
  },
  diningIconWrap: {
    width: 42,
    height: 42,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diningIcon: {
    fontSize: 20,
  },
  diningInfoCol: {
    flex: 1,
    gap: 2,
  },
  diningLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  diningTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  changeTablePill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  changeTableText: {
    fontSize: 12,
    fontWeight: '800',
  },
  stockAlertCard: {
    padding: 14,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 10,
  },
  stockAlertTextCol: {
    gap: 3,
  },
  stockAlertTitle: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  stockAlertSub: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
  autoFixBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  autoFixBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  itemsList: {
    gap: 12,
  },
  addMoreButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreButtonText: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  sectionCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  noteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  charCounter: {
    fontSize: 11.5,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  orderNoteInput: {
    minHeight: 68,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    lineHeight: 19,
    textAlignVertical: 'top',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13.5,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  totalAmount: {
    fontSize: 19,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  policyHint: {
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 2,
  },
  bottomCheckoutBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'web' ? 14 : 10,
  },
  bottomPriceCol: {
    gap: 2,
  },
  bottomPriceCaption: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  checkoutCta: {
    flex: 1,
    maxWidth: 220,
    height: 46,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  checkoutCtaText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '800',
  },
});
