import React, { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { theme } from '@/view/theme';

type AProps = {
  url: string;
  children: string;
};

function A({ url, children }: AProps) {
  const onPress = useCallback(() => Linking.openURL(url), [url]);
  return (
    <Text style={styles.link} onPress={onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: theme.colors.accent,
    textDecorationLine: 'underline',
  },
});

export { A };
