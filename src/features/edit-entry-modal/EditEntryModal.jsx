import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme, baseTheme } from '../theme';
import { Card } from '../common';

function EditEntryModal(props) {
  const { navigation } = props;

  const handleDismiss = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => handleDismiss()}
      >
        <View style={styles.back}></View>
      </TouchableWithoutFeedback>
      <Card style={styles.contentContainer}>
        <Text>Hi</Text>
      </Card>
    </View>
  );
}

const { spaces } = baseTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  back: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    margin: spaces.lg,
    padding: spaces.lg,
  },
});

export default EditEntryModal;
