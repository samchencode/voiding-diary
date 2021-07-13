import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { baseTheme } from '../theme';
import { Card } from '../common';

function Modal(props) {
  const { onDismiss, children } = props;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onDismiss()}>
        <View style={styles.back}></View>
      </TouchableWithoutFeedback>
      <Card style={styles.contentContainer}>{children}</Card>
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

export default Modal;
