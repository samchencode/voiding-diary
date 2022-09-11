import React from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '@/view/components';
import { BeerSvg, PassingBySvg } from '@/view/home-screen/svg';
import { theme } from '@/view/theme';

type LoggerButtonGroupProps = {
  onPressIntake: (e: GestureResponderEvent) => void;
  onPressVoid: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

function LoggerButtonGroup({
  onPressIntake,
  onPressVoid,
  style,
}: LoggerButtonGroupProps) {
  // const [openModal, setOpenModal] = useState(true);
  return (
    <View style={[styles.container, style]}>
      <Card style={[styles.card, styles.cardLeft]}>
        <TouchableOpacity onPress={onPressIntake} style={styles.button}>
          <BeerSvg width="80%" height="100%" style={styles.cardLeftSvg} />
          <Text style={styles.buttonTitle}>+Intake</Text>
        </TouchableOpacity>
      </Card>
      <Card style={[styles.card, styles.cardRight]}>
        <TouchableOpacity onPress={onPressVoid} style={styles.button}>
          <PassingBySvg width="60%" height="100%" style={styles.cardRightSvg} />
          <Text style={styles.buttonTitle}>+Void</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

LoggerButtonGroup.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    height: 120,
  },
  button: {
    flex: 1,
  },
  cardLeft: {
    marginRight: theme.spaces.lg / 2,
  },
  cardLeftSvg: {
    position: 'absolute',
    top: -24,
    right: -8,
    transform: [{ scaleX: -1 }],
  },
  cardRight: {
    marginLeft: theme.spaces.lg / 2,
  },
  cardRightSvg: {
    position: 'absolute',
    right: 0,
    top: -24,
  },
  buttonTitle: {
    ...theme.fonts.mdBold,
    position: 'absolute',
    left: 16,
    bottom: 16,
    zIndex: 1,
  },
});

export { LoggerButtonGroup };
