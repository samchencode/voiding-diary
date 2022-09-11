import { theme } from '@/view/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RecordListEmptyComponent() {
  return (
    <View>
      <Text style={styles.title}>No records yet for today...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.fonts.sm,
  },
});

export { RecordListEmptyComponent };
