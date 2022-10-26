import { theme } from '@/view/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RecordListEmptyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No records yet for today...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spaces.sm,
    marginLeft: theme.spaces.lg,
    marginRight: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.sm,
  },
});

export { RecordListEmptyComponent };
