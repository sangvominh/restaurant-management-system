import { StyleSheet, Text, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity, isLowStock, parseDecimal } from '@/utils/format';

export interface StockBadgeProps {
  available: string | number;
  unitSymbol: string;
  inStock: boolean;
  compact?: boolean;
}

export function StockBadge({
  available,
  unitSymbol,
  inStock,
  compact = false,
}: StockBadgeProps) {
  const theme = useTheme();
  const qty = parseDecimal(available);

  if (!inStock || qty <= 0) {
    return (
      <View style={[styles.badge, { backgroundColor: theme.mutedBg }]}>
        <View style={[styles.dot, { backgroundColor: theme.mutedText }]} />
        <Text style={[styles.label, { color: theme.mutedText }]}>Tạm hết món</Text>
      </View>
    );
  }

  const formattedQty = `${formatQuantity(qty)} ${unitSymbol}`;
  const low = isLowStock(unitSymbol, qty);

  if (low) {
    return (
      <View style={[styles.badge, { backgroundColor: theme.warningBg }]}>
        <View style={[styles.dot, { backgroundColor: theme.warningText }]} />
        <Text style={[styles.label, { color: theme.warningText }]}>
          Chỉ còn {formattedQty}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, { backgroundColor: theme.successBg }]}>
      <View style={[styles.dot, { backgroundColor: theme.successText }]} />
      <Text style={[styles.label, { color: theme.successText }]}>
        {compact ? `Còn ${formattedQty}` : `Còn sẵn ${formattedQty} tại quầy`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Radius.pill,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
