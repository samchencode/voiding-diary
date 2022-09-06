import React from 'react';
import type { ViewStyle, StyleProp, LayoutChangeEvent } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';

type CardProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
};

function Card({ children, style, onLayout }: CardProps) {
  return (
    <View style={[styles.card, style]} onLayout={onLayout}>
      {children}
    </View>
  );
}

Card.defaultProps = {
  children: undefined,
  style: {},
  onLayout: undefined,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.br,
    // shadow for Android
    elevation: 5,
    // shadow for iOS
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
});

export { Card };
