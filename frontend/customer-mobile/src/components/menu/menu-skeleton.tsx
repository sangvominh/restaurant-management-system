import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MenuSkeleton() {
  const theme = useTheme();
  const [pulse] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.9,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.wrapper}>
      {[0, 1, 2].map(index => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              opacity: pulse,
            },
          ]}>
          <View
            style={[styles.thumb, { backgroundColor: theme.backgroundElement }]}
          />
          <View style={styles.lines}>
            <View
              style={[
                styles.lineShort,
                { backgroundColor: theme.backgroundElement },
              ]}
            />
            <View
              style={[
                styles.lineLong,
                { backgroundColor: theme.backgroundElement },
              ]}
            />
            <View
              style={[
                styles.lineMedium,
                { backgroundColor: theme.backgroundElement },
              ]}
            />
            <View style={styles.bottomRow}>
              <View
                style={[
                  styles.priceBlock,
                  { backgroundColor: theme.backgroundElement },
                ]}
              />
              <View
                style={[
                  styles.circleBlock,
                  { backgroundColor: theme.backgroundElement },
                ]}
              />
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.three,
    gap: 12,
    paddingTop: 8,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 14,
  },
  thumb: {
    width: 104,
    height: 104,
    borderRadius: Radius.md,
  },
  lines: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  lineShort: {
    width: '42%',
    height: 11,
    borderRadius: Radius.pill,
  },
  lineLong: {
    width: '86%',
    height: 16,
    borderRadius: Radius.sm,
  },
  lineMedium: {
    width: '68%',
    height: 12,
    borderRadius: Radius.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceBlock: {
    width: 84,
    height: 18,
    borderRadius: Radius.sm,
  },
  circleBlock: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
  },
});
