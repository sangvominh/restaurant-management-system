import '@/global.css';

import { Platform, type ViewStyle } from 'react-native';

export const Colors = {
  light: {
    text: '#16211B',
    textSecondary: '#58675E',
    textMuted: '#88968D',
    background: '#F5F6F2',
    backgroundElement: '#EAEee9',
    backgroundSelected: '#DAE5DD',
    surface: '#FFFFFF',
    border: '#E2E8E3',
    heroBg: '#1B3F2D',
    heroSurface: '#25523B',
    primary: '#23533B',
    primaryPressed: '#193D2B',
    primarySoft: '#E6F0EA',
    accent: '#D47A27',
    accentSoft: '#FFF2E2',
    onPrimary: '#FFFFFF',
    successBg: '#E6F4EC',
    successText: '#1E6B41',
    warningBg: '#FFF3DF',
    warningText: '#9A5B0A',
    dangerBg: '#FDECE9',
    dangerText: '#B43C32',
    mutedBg: '#ECEFED',
    mutedText: '#738078',
  },
  dark: {
    text: '#EFF4F0',
    textSecondary: '#A2B2A8',
    textMuted: '#728278',
    background: '#0F1512',
    backgroundElement: '#18211C',
    backgroundSelected: '#23322A',
    surface: '#17201B',
    border: '#26342C',
    heroBg: '#152E22',
    heroSurface: '#1E4030',
    primary: '#4C9570',
    primaryPressed: '#3B7A5A',
    primarySoft: '#1D3328',
    accent: '#E89543',
    accentSoft: '#332415',
    onPrimary: '#FFFFFF',
    successBg: '#173023',
    successText: '#6AD095',
    warningBg: '#332612',
    warningText: '#F3BA52',
    dangerBg: '#361C1A',
    dangerText: '#F2847B',
    mutedBg: '#222A25',
    mutedText: '#8A968E',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const Shadows: Record<'card' | 'elevated' | 'floating', ViewStyle> = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#10241A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
    },
    android: {
      elevation: 2,
    },
    default: {
      boxShadow: '0 2px 10px rgba(20, 45, 32, 0.05)',
    } as ViewStyle,
  }),
  elevated: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#10241A',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 18,
    },
    android: {
      elevation: 5,
    },
    default: {
      boxShadow: '0 8px 24px rgba(18, 42, 30, 0.10)',
    } as ViewStyle,
  }),
  floating: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0B1C14',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.24,
      shadowRadius: 20,
    },
    android: {
      elevation: 10,
    },
    default: {
      boxShadow: '0 12px 28px rgba(12, 32, 22, 0.26)',
    } as ViewStyle,
  }),
};

export const BottomTabInset = Platform.select({ ios: 50, android: 76, default: 68 }) ?? 68;
export const MaxContentWidth = 460;
