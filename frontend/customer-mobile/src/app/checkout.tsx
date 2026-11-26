import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Radius, Shadows, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity, formatVnd } from '@/utils/format';

/**
 * Màn hình điểm bàn giao dữ liệu giỏ hàng (`toOrderDraftPayload()`)
 * dành cho phần việc Ordering & Account (@Phát Tấn) tích hợp API `POST /api/public/orders`.
 */
export default function CheckoutHandoffScreen() {
  const theme = useTheme();
  const { items, selectedTable, subtotal, toOrderDraftPayload } = useCart();
  const draftPayload = toOrderDraftPayload();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/cart'))}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.backText, { color: theme.text }]}>← Quay lại giỏ hàng</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            Shadows.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <View style={[styles.badge, { backgroundColor: theme.primarySoft }]}>
            <Text style={[styles.badgeText, { color: theme.primary }]}>
              ĐIỂM NỐI ORDERING (@PHÁT TẤN)
            </Text>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            Xác nhận đặt món
          </Text>
          <Text style={[styles.desc, { color: theme.textSecondary }]}>
            Dữ liệu Giỏ hàng từ phần Menu & Cart đã sẵn sàng chuẩn định dạng API{' '}
            POST /api/public/orders:
          </Text>

          <View style={[styles.summaryBox, { backgroundColor: theme.background }]}>
            <Text style={[styles.metaLine, { color: theme.text }]}>
              • Hình thức:{' '}
              {selectedTable ? `Tại bàn (${selectedTable.code})` : 'Mang đi'}
            </Text>
            <Text style={[styles.metaLine, { color: theme.text }]}>
              • Tổng tạm tính: {formatVnd(subtotal)}
            </Text>
            {items.map(line => (
              <Text
                key={line.productId}
                style={[styles.itemLine, { color: theme.textSecondary }]}>
                - {line.name}: {formatQuantity(line.quantity)} {line.unitSymbol}
                {line.note ? ` (${line.note})` : ''}
              </Text>
            ))}
          </View>

          <View style={[styles.codeBlock, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.codeText, { color: theme.textSecondary }]}>
              {JSON.stringify(draftPayload, null, 2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  backBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  backText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  content: {
    padding: Spacing.three,
  },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
  },
  desc: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  summaryBox: {
    padding: 12,
    borderRadius: Radius.md,
    gap: 5,
  },
  metaLine: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  itemLine: {
    fontSize: 13,
    paddingLeft: 8,
  },
  codeBlock: {
    padding: 12,
    borderRadius: Radius.md,
  },
  codeText: {
    fontSize: 11.5,
    fontFamily: 'monospace',
  },
});
