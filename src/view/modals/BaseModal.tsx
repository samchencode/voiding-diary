import React from 'react';
import type { ViewStyle, StyleProp, LayoutChangeEvent } from 'react-native';
import { View, StyleSheet, Modal } from 'react-native';

type BaseModalProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  onCancel: () => void | undefined;
};

function BaseModal({
  children,
  style,
  onLayout,
  setModalVisible,
  visible,
  onCancel,
}: BaseModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
        if (onCancel !== undefined) onCancel();
      }}
      style={styles.modal}
    >
      <View style={styles.background}>
        <View style={[styles.modal, style]} onLayout={onLayout}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

BaseModal.defaultProps = {
  children: undefined,
  style: {},
  onLayout: undefined,
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export { BaseModal };
