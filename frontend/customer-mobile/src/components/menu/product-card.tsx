import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { MenuProduct } from '@/types/menu';
import { formatQuantity, formatVnd, isWeightOrVolumeUnit } from '@/utils/format';

import { DishThumbnail } from './dish-thumbnail';
import { QuantityStepper } from './quantity-stepper';
import { StockBadge } from './stock-badge';

export interface ProductCardProps {
  product: MenuProduct;
  quantityInCart: number;
  onPress: (product: MenuProduct) => void;
  onIncrement: (product: MenuProduct) => void;
  onDecrement: (product: MenuProduct) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onPress,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const theme = useTheme();
  const selected = quantityInCart > 0;
  const showUnitInStepper = isWeightOrVolumeUnit(product.unit.symbol);

  return (
    <Pressable
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`Xem chi tiết món ${product.name}`}
      style={({ pressed }) => [
        styles.card,
        Shadows.card,
        {
          backgroundColor: theme.surface,
          borderColor: selected ? theme.primary : theme.border,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}>
      <View style={styles.imageWrap}>
        <DishThumbnail
          name={product.name}
          code={product.code}
          categoryName={product.category.name}
          imageUrl={product.imageUrl}
          inStock={product.inStock}
          size={104}
        />
        {selected ? (
          <View style={[styles.inCartBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.inCartBadgeText}>
              {formatQuantity(quantityInCart)}
              {showUnitInStepper ? ` ${product.unit.symbol}` : ''}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={styles.topMeta}>
          <Text
            numberOfLines={1}
            style={[styles.categoryTag, { color: theme.textMuted }]}>
            {product.category.name.replace(/^\[BBQ mẫu\]\s*/i, '')}
          </Text>
          <StockBadge
            available={product.available}
            unitSymbol={product.unit.symbol}
            inStock={product.inStock}
            compact
          />
        </View>

        <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
          {product.name}
        </Text>

        {product.description?.trim() ? (
          <Text
            numberOfLines={2}
            style={[styles.description, { color: theme.textSecondary }]}>
            {product.description.trim()}
          </Text>
        ) : null}

        <View style={styles.footerRow}>
          <View style={styles.priceGroup}>
            <Text style={[styles.price, { color: theme.primary }]}>
              {formatVnd(product.sellingPrice)}
            </Text>
            <Text style={[styles.unit, { color: theme.textMuted }]}>
              /{product.unit.symbol}
            </Text>
          </View>

          <QuantityStepper
            quantity={quantityInCart}
            available={product.available}
            unitSymbol={product.unit.symbol}
            inStock={product.inStock}
            size="compact"
            showUnit={showUnitInStepper}
            onIncrement={() => onIncrement(product)}
            onDecrement={() => onDecrement(product)}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 14,
    alignItems: 'stretch',
  },
  imageWrap: {
    position: 'relative',
    alignSelf: 'center',
  },
  inCartBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  inCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'space-between',
    gap: 4,
  },
  topMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
  },
  title: {
    fontSize: 15.5,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexShrink: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  unit: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
});
