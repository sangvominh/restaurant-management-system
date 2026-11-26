import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { DishThumbnail } from '@/components/menu/dish-thumbnail';
import { QuantityStepper } from '@/components/menu/quantity-stepper';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { CartItem, CartStockIssue } from '@/types/menu';
import {
  MAX_ITEM_NOTE_LENGTH,
  calculateLineTotal,
  formatQuantity,
  formatVnd,
  isWeightOrVolumeUnit,
} from '@/utils/format';

export interface CartItemCardProps {
  item: CartItem;
  stockIssue?: CartStockIssue;
  onOpenDetail: (productId: string) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onChangeNote: (productId: string, note: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemCard({
  item,
  stockIssue,
  onOpenDetail,
  onIncrement,
  onDecrement,
  onChangeNote,
  onRemove,
}: CartItemCardProps) {
  const theme = useTheme();
  const [editingNote, setEditingNote] = useState(false);

  const lineTotal = calculateLineTotal(item.unitPrice, item.quantity);
  const showUnitInStepper = isWeightOrVolumeUnit(item.unitSymbol);

  return (
    <View
      style={[
        styles.card,
        Shadows.card,
        {
          backgroundColor: theme.surface,
          borderColor: stockIssue ? theme.dangerText : theme.border,
        },
      ]}>
      <View style={styles.mainRow}>
        <Pressable
          onPress={() => onOpenDetail(item.productId)}
          accessibilityRole="button"
          accessibilityLabel={`Mở chi tiết món ${item.name}`}>
          <DishThumbnail
            name={item.name}
            code={item.code}
            categoryName={item.categoryName}
            imageUrl={item.imageUrl}
            inStock={item.inStock}
            size={78}
          />
        </Pressable>

        <View style={styles.infoCol}>
          <View style={styles.titleRow}>
            <Pressable
              onPress={() => onOpenDetail(item.productId)}
              style={styles.titlePressable}>
              <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
                {item.name}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onRemove(item.productId)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Xóa ${item.name} khỏi giỏ`}
              style={[styles.removeBtn, { backgroundColor: theme.mutedBg }]}>
              <Text style={[styles.removeIcon, { color: theme.textSecondary }]}>✕</Text>
            </Pressable>
          </View>

          <Text style={[styles.unitPriceText, { color: theme.textSecondary }]}>
            Đơn giá: {formatVnd(item.unitPrice)}/{item.unitSymbol}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={[styles.lineTotalText, { color: theme.primary }]}>
              {formatVnd(lineTotal)}
            </Text>

            <QuantityStepper
              quantity={item.quantity}
              available={item.available}
              unitSymbol={item.unitSymbol}
              inStock={item.inStock}
              size="compact"
              collapseWhenZero={false}
              showUnit={showUnitInStepper}
              onIncrement={() => onIncrement(item.productId)}
              onDecrement={() => onDecrement(item.productId)}
            />
          </View>
        </View>
      </View>

      {/* Cảnh báo nếu món vừa hết hàng hoặc vượt lượng còn tại quầy */}
      {stockIssue ? (
        <View style={[styles.issueBanner, { backgroundColor: theme.dangerBg }]}>
          <Text style={[styles.issueText, { color: theme.dangerText }]}>
            {stockIssue.reason === 'EXCEEDS_AVAILABLE'
              ? `Tại quầy hiện chỉ còn ${formatQuantity(stockIssue.availableQuantity)} ${item.unitSymbol} (đang chọn ${formatQuantity(item.quantity)} ${item.unitSymbol}).`
              : 'Món này vừa tạm hết tại quầy, vui lòng xóa khỏi giỏ.'}
          </Text>
        </View>
      ) : null}

      {/* Khu vực xem / sửa nhanh ghi chú từng món */}
      {editingNote ? (
        <View style={styles.noteEditorBox}>
          <TextInput
            value={item.note}
            onChangeText={text => onChangeNote(item.productId, text)}
            placeholder="Ghi chú riêng cho món này..."
            placeholderTextColor={theme.textMuted}
            maxLength={MAX_ITEM_NOTE_LENGTH}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={() => setEditingNote(false)}
            style={[
              styles.noteInput,
              {
                backgroundColor: theme.background,
                borderColor: theme.primary,
                color: theme.text,
              },
            ]}
          />
          <Pressable
            onPress={() => setEditingNote(false)}
            style={[styles.doneNoteBtn, { backgroundColor: theme.primary }]}>
            <Text style={styles.doneNoteText}>Xong</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => setEditingNote(true)}
          style={[
            styles.noteDisplayRow,
            {
              backgroundColor: item.note.trim()
                ? theme.primarySoft
                : theme.background,
            },
          ]}>
          <Text
            numberOfLines={2}
            style={[
              styles.noteDisplayText,
              {
                color: item.note.trim() ? theme.primary : theme.textMuted,
              },
            ]}>
            {item.note.trim()
              ? `📝 Ghi chú: ${item.note.trim()}`
              : '+ Thêm ghi chú cho món này (ít cay, để riêng sốt...)'}
          </Text>
          <Text style={[styles.editNoteHint, { color: theme.primary }]}>
            {item.note.trim() ? 'Sửa' : ''}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  mainRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  titlePressable: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  removeBtn: {
    width: 24,
    height: 24,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 11,
    fontWeight: '800',
  },
  unitPriceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  lineTotalText: {
    fontSize: 15.5,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  issueBanner: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: Radius.sm,
  },
  issueText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  noteDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: Radius.sm,
    gap: 8,
  },
  noteDisplayText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  editNoteHint: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteEditorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noteInput: {
    flex: 1,
    height: 38,
    borderRadius: Radius.sm,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  doneNoteBtn: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneNoteText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
});
