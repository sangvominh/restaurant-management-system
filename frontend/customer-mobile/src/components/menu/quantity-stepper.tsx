import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity, parseDecimal, roundQuantity } from '@/utils/format';

export interface QuantityStepperProps {
  quantity: number;
  available: string | number;
  unitSymbol: string;
  inStock?: boolean;
  size?: 'compact' | 'regular';
  collapseWhenZero?: boolean;
  showUnit?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({
  quantity,
  available,
  unitSymbol,
  inStock = true,
  size = 'compact',
  collapseWhenZero,
  showUnit = false,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const theme = useTheme();
  const maxAvailable = roundQuantity(parseDecimal(available));
  const currentQty = roundQuantity(quantity);
  const shouldCollapse = (collapseWhenZero ?? size === 'compact') && currentQty <= 0;

  const canDecrement = currentQty > 0;
  const canIncrement = inStock && maxAvailable > 0 && currentQty < maxAvailable;
  const isRegular = size === 'regular';

  if (shouldCollapse) {
    return (
      <Pressable
        onPress={onIncrement}
        disabled={!canIncrement}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Thêm vào giỏ hàng"
        style={({ pressed }) => [
          styles.addOnlyButton,
          {
            backgroundColor: canIncrement ? theme.primary : theme.mutedBg,
            opacity: pressed && canIncrement ? 0.85 : 1,
          },
        ]}>
        <Text
          style={[
            styles.addOnlyIcon,
            { color: canIncrement ? theme.onPrimary : theme.mutedText },
          ]}>
          +
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.stepperContainer,
        isRegular ? styles.regularContainer : styles.compactContainer,
        {
          backgroundColor: theme.primarySoft,
          borderColor: theme.border,
        },
      ]}>
      <Pressable
        onPress={onDecrement}
        disabled={!canDecrement}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel="Giảm số lượng"
        style={({ pressed }) => [
          styles.stepButton,
          isRegular ? styles.regularButton : styles.compactButton,
          {
            backgroundColor: theme.surface,
            opacity: !canDecrement ? 0.4 : pressed ? 0.75 : 1,
          },
        ]}>
        <Text style={[styles.stepSymbol, { color: theme.primary }]}>−</Text>
      </Pressable>

      <Text
        numberOfLines={1}
        style={[
          styles.valueText,
          isRegular ? styles.regularValueText : styles.compactValueText,
          { color: theme.text },
        ]}>
        {formatQuantity(currentQty)}
        {showUnit ? ` ${unitSymbol}` : ''}
      </Text>

      <Pressable
        onPress={onIncrement}
        disabled={!canIncrement}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel="Tăng số lượng"
        style={({ pressed }) => [
          styles.stepButton,
          isRegular ? styles.regularButton : styles.compactButton,
          {
            backgroundColor: canIncrement ? theme.primary : theme.mutedBg,
            opacity: !canIncrement ? 0.45 : pressed ? 0.82 : 1,
          },
        ]}>
        <Text
          style={[
            styles.stepSymbol,
            { color: canIncrement ? theme.onPrimary : theme.mutedText },
          ]}>
          +
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addOnlyButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addOnlyIcon: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  compactContainer: {
    padding: 3,
    gap: 6,
  },
  regularContainer: {
    padding: 4,
    gap: 10,
  },
  stepButton: {
    borderRadius: Radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactButton: {
    width: 28,
    height: 28,
  },
  regularButton: {
    width: 36,
    height: 36,
  },
  stepSymbol: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
  },
  valueText: {
    fontWeight: '700',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  compactValueText: {
    minWidth: 28,
    fontSize: 13,
    paddingHorizontal: 2,
  },
  regularValueText: {
    minWidth: 54,
    fontSize: 15,
    paddingHorizontal: 4,
  },
});
