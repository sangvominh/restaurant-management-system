import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Colors, MaxContentWidth } from '@/constants/theme';
import { CartProvider } from '@/context/cart-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = Colors[isDark ? 'dark' : 'light'];

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  const navigator = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="product/[id]"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <CartProvider>
        {Platform.OS === 'web' ? (
          <View
            style={[
              styles.webBackdrop,
              { backgroundColor: isDark ? '#080C0A' : '#DFE7E2' },
            ]}>
            <View
              style={[
                styles.webPhoneFrame,
                {
                  backgroundColor: themeColors.background,
                  borderColor: themeColors.border,
                },
              ]}>
              {navigator}
            </View>
          </View>
        ) : (
          navigator
        )}
      </CartProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  webBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webPhoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
