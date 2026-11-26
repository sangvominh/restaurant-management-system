import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Ảnh ẩm thực chất lượng cao dùng làm minh họa mặc định theo từ khóa món / nhóm món
 * khi dữ liệu trong DB chưa được Quản lý nhà hàng cập nhật `imageUrl`.
 */
const CURATED_FOOD_PHOTOS: { keywords: string[]; url: string }[] = [
  {
    keywords: ['sườn', 'ribs', 'má heo', 'heo'],
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
  {
    keywords: ['bò', 'brisket', 'steak', 'thăn'],
    url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
  },
  {
    keywords: ['xúc xích', 'sausage', 'lạp xưởng'],
    url: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=600&q=80',
  },
  {
    keywords: ['gà', 'chicken', 'cánh'],
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
  },
  {
    keywords: ['coca', 'coke', 'pepsi', 'nước', 'trà', 'đồ uống', 'bia', 'lon', 'chai'],
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    keywords: ['khoai', 'salad', 'bánh mì', 'bắp', 'kèm'],
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
  },
];

const DEFAULT_CULINARY_PHOTO =
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80';

function pickFallbackPhoto(name: string, categoryName?: string): string {
  const haystack = `${name} ${categoryName ?? ''}`.toLocaleLowerCase('vi');
  for (const entry of CURATED_FOOD_PHOTOS) {
    if (entry.keywords.some(kw => haystack.includes(kw))) {
      return entry.url;
    }
  }
  return DEFAULT_CULINARY_PHOTO;
}

export interface DishThumbnailProps {
  name: string;
  code?: string;
  categoryName?: string;
  imageUrl?: string | null;
  inStock?: boolean;
  size?: number;
  variant?: 'square' | 'cardTop' | 'hero';
  style?: StyleProp<ViewStyle>;
}

export function DishThumbnail({
  name,
  categoryName,
  imageUrl,
  inStock = true,
  size = 104,
  variant = 'square',
  style,
}: DishThumbnailProps) {
  const scheme = useColorScheme();
  const [failedPrimaryUrl, setFailedPrimaryUrl] = useState<string | null>(null);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const primaryUrl = imageUrl && failedPrimaryUrl !== imageUrl ? imageUrl : null;
  const fallbackUrl = pickFallbackPhoto(name, categoryName);
  const resolvedUri = primaryUrl ?? (!fallbackFailed ? fallbackUrl : null);

  const dimensionsStyle: ViewStyle =
    variant === 'hero'
      ? { width: '100%', height: 230, borderRadius: Radius.lg }
      : variant === 'cardTop'
        ? { width: '100%', height: 132, borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg }
        : { width: size, height: size, borderRadius: Radius.md };

  const placeholderBg = scheme === 'dark' ? '#1E3127' : '#E3EFE7';
  const placeholderText = scheme === 'dark' ? '#8BD0A9' : '#23533B';

  return (
    <View
      style={[
        styles.container,
        dimensionsStyle,
        { backgroundColor: placeholderBg },
        !inStock && styles.dimmed,
        style,
      ]}>
      {resolvedUri ? (
        <Image
          source={{ uri: resolvedUri }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={220}
          onError={() => {
            if (primaryUrl) {
              setFailedPrimaryUrl(primaryUrl);
            } else {
              setFallbackFailed(true);
            }
          }}
          accessibilityLabel={name}
        />
      ) : (
        <View style={styles.offlineFallback}>
          <Text style={styles.offlineEmoji}>🍖</Text>
          <Text numberOfLines={1} style={[styles.offlineCaption, { color: placeholderText }]}>
            {categoryName || 'Món ngon'}
          </Text>
        </View>
      )}

      <View style={styles.innerBorder} pointerEvents="none" />

      {!inStock ? (
        <View style={styles.soldOutOverlay}>
          <View style={styles.soldOutPill}>
            <Text style={styles.soldOutText}>Tạm hết</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimmed: {
    opacity: 0.72,
  },
  innerBorder: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: Radius.md,
  },
  offlineFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 8,
  },
  offlineEmoji: {
    fontSize: 28,
  },
  offlineCaption: {
    fontSize: 11,
    fontWeight: '700',
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(15, 22, 18, 0.52)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  soldOutPill: {
    backgroundColor: 'rgba(20, 29, 24, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  soldOutText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
