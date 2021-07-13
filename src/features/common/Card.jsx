import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, baseTheme } from '../theme';

function Card(props) {
  const { colors } = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        { backgroundColor: colors.light, shadowColor: colors.dark },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

const { br } = baseTheme;

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: br,
  },
});

export default Card;
