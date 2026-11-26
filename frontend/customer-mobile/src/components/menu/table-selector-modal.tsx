import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { MaxContentWidth, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ApiError } from '@/services/api-client';
import { lookupDiningTable } from '@/services/menu-api';
import type { DiningTableInfo } from '@/types/menu';

const PRESET_TABLES: DiningTableInfo[] = [
  {
    id: '00000000-0000-4000-8000-000000000001',
    code: 'BBQ-A01',
    name: 'BBQ-A01',
    area: 'Trong nhà',
    status: 'ACTIVE',
  },
  {
    id: '00000000-0000-4000-8000-000000000002',
    code: 'BBQ-A02',
    name: 'BBQ-A02',
    area: 'Trong nhà',
    status: 'ACTIVE',
  },
  {
    id: '00000000-0000-4000-8000-000000000003',
    code: 'BBQ-B01',
    name: 'BBQ-B01',
    area: 'Sân vườn',
    status: 'ACTIVE',
  },
];

export interface TableSelectorModalProps {
  visible: boolean;
  selectedTable: DiningTableInfo | null;
  isPreviewMode: boolean;
  onSelectTable: (table: DiningTableInfo | null) => void;
  onClose: () => void;
}

export function TableSelectorModal({
  visible,
  selectedTable,
  isPreviewMode,
  onSelectTable,
  onClose,
}: TableSelectorModalProps) {
  const theme = useTheme();
  const [code, setCode] = useState<string>(selectedTable?.code ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleConfirmCode(rawCode?: string) {
    const target = (rawCode ?? code).trim();
    if (!target) {
      setErrorMessage('Vui lòng nhập mã bàn (ví dụ: BBQ-A01)');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const verified = await lookupDiningTable(target);
      onSelectTable(verified);
      onClose();
    } catch (error) {
      if (isPreviewMode) {
        const matchedPreset = PRESET_TABLES.find(
          t => t.code.toLowerCase() === target.toLowerCase(),
        );
        const fallbackTable: DiningTableInfo = matchedPreset ?? {
          id: `preview-${target.toUpperCase()}`,
          code: target.toUpperCase(),
          name: target.toUpperCase(),
          area: 'Khu phục vụ',
          status: 'ACTIVE',
        };
        onSelectTable(fallbackTable);
        onClose();
        return;
      }

      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Không kiểm tra được mã bàn. Vui lòng thử lại.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleSelectTakeaway() {
    setErrorMessage(null);
    onSelectTable(null);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            Shadows.floating,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}>
          <View style={styles.sheetHeader}>
            <View>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>
                Hình thức dùng bữa
              </Text>
              <Text style={[styles.sheetSubtitle, { color: theme.textSecondary }]}>
                Nhập mã bàn tại quán hoặc chọn đặt mang đi
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={[styles.closeButton, { backgroundColor: theme.mutedBg }]}>
              <Text style={[styles.closeIcon, { color: theme.textSecondary }]}>✕</Text>
            </Pressable>
          </View>

          {/* Tùy chọn Mua mang đi */}
          <Pressable
            onPress={handleSelectTakeaway}
            style={[
              styles.takeawayOption,
              {
                backgroundColor: !selectedTable ? theme.primarySoft : theme.background,
                borderColor: !selectedTable ? theme.primary : theme.border,
              },
            ]}>
            <Text style={styles.optionEmoji}>🥡</Text>
            <View style={styles.optionTextWrap}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Đặt mang đi (Takeaway)
              </Text>
              <Text style={[styles.optionDesc, { color: theme.textSecondary }]}>
                Nhận món đóng gói trực tiếp tại quầy nhà hàng
              </Text>
            </View>
            {!selectedTable ? (
              <Text style={[styles.activeCheck, { color: theme.primary }]}>✓</Text>
            ) : null}
          </Pressable>

          {/* Nhập mã bàn */}
          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: theme.text }]}>
              Ngồi dùng tại bàn
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                value={code}
                onChangeText={value => {
                  setCode(value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder="Nhập mã bàn (VD: BBQ-A01)"
                placeholderTextColor={theme.textMuted}
                autoCapitalize="characters"
                returnKeyType="done"
                onSubmitEditing={() => void handleConfirmCode()}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    borderColor: errorMessage ? theme.dangerText : theme.border,
                    color: theme.text,
                  },
                ]}
              />
              <Pressable
                onPress={() => void handleConfirmCode()}
                disabled={submitting}
                style={({ pressed }) => [
                  styles.confirmBtn,
                  {
                    backgroundColor: theme.primary,
                    opacity: submitting ? 0.6 : pressed ? 0.85 : 1,
                  },
                ]}>
                {submitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.confirmBtnText}>Chọn bàn</Text>
                )}
              </Pressable>
            </View>

            {errorMessage ? (
              <Text style={[styles.errorText, { color: theme.dangerText }]}>
                {errorMessage}
              </Text>
            ) : null}

            <View style={styles.quickPickRow}>
              {PRESET_TABLES.map(preset => {
                const isSelected = selectedTable?.code === preset.code;
                return (
                  <Pressable
                    key={preset.code}
                    onPress={() => {
                      setCode(preset.code);
                      void handleConfirmCode(preset.code);
                    }}
                    style={[
                      styles.presetChip,
                      {
                        backgroundColor: isSelected
                          ? theme.primarySoft
                          : theme.background,
                        borderColor: isSelected ? theme.primary : theme.border,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.presetChipText,
                        { color: isSelected ? theme.primary : theme.textSecondary },
                      ]}>
                      🪑 {preset.code}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(12, 22, 17, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.three,
  },
  sheet: {
    width: '100%',
    maxWidth: MaxContentWidth - 24,
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  sheetSubtitle: {
    fontSize: 12.5,
    marginTop: 3,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 13,
    fontWeight: '800',
  },
  takeawayOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 12,
  },
  optionEmoji: {
    fontSize: 22,
  },
  optionTextWrap: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  optionDesc: {
    fontSize: 12,
  },
  activeCheck: {
    fontSize: 17,
    fontWeight: '800',
  },
  inputSection: {
    gap: 10,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 13,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmBtn: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 96,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickPickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  presetChip: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
