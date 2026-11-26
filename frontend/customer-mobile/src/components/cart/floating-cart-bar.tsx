import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomTabInset, MaxContentWidth, Radius, Shadows, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';
import { formatVnd } from '@/utils/format';

export interface FloatingCartBarProps {
  onPress: () => void;
  bottomOffset?: number;
}

export function FloatingCartBar({ onPress, bottomOffset }: FloatingCartBarProps) {
  const theme = useTheme();
  const { lineCount, subtotal, selectedTable, hasStockIssues } = useCart();

  if (lineCount === 0) {
    return null;
  }

  const resolvedBottom =
    bottomOffset ??
    (Platform.OS === 'web' ? 14 : BottomTabInset + Spacing.two);

  const contextSubtitle = hasStockIssues
    ? 'Kiểm tra lại số lượng tồn kho'
    : selectedTable
      ? `Phục vụ tại Bàn ${selectedTable.name}`
      : 'Đơn mang đi · Chạm góc trên để chọn bàn';

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: resolvedBottom }]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Xem giỏ hàng gồm ${lineCount} món, tạm tính ${formatVnd(subtotal)}`}
        style={({ pressed }) => [
          styles.bar,
          Shadows.floating,
          {
            backgroundColor: hasStockIssues ? theme.dangerText : theme.heroBg,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          },
        ]}>
        <View style={styles.leftSection}>
          <View style={[styles.countBadge, { backgroundColor: theme.primarySoft }]}>
            <Text style={[styles.countText, { color: theme.primary }]}>
              {lineCount}
            </Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.title}>Xem giỏ hàng</Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {contextSubtitle}
            </Text>
          </View>
        </View>

        <View style={styles.rightPill}>
          <Text style={styles.totalText}>{formatVnd(subtotal)}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    alignItems: 'center',
    zIndex: 30,
  },
  bar: {
    width: '100%',
    maxWidth: MaxContentWidth - 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: Radius.xl,
    gap: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flex: 1,
    minWidth: 0,
  },
  countBadge: {
    minWidth: 34,
    height: 34,
    paddingHorizontal: 8,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
  },
  metaColumn: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.76)',
    fontSize: 11.5,
    marginTop: 1,
  },
  rightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  chevron: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '700',
  },
});
