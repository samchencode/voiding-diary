import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Card, Button } from '../common';
import HistoryRow from './HistoryRow';
import { baseTheme } from '../theme';
import useSlider from './useSlider';

const ButtonSuccess = Animated.createAnimatedComponent(
  class extends React.Component {
    render = () => <Button.Success {...this.props} />;
  }
);

const ButtonDanger = Animated.createAnimatedComponent(
  class extends React.Component {
    render = () => <Button.Danger {...this.props} />;
  }
);

const BUTTON_VISIBLE_THRESHOLD = 40;
const BUTTON_MAX_WIDTH = 250;
const BUTTON_WIDTH = 70;
const BUTTON_MARGIN = baseTheme.spaces.sm;

function HistoryCard(props) {
  const { onSwipeStateChange, id } = props;
  const swiping = useRef(false);

  const { width } = useWindowDimensions();

  const [position, pr] = useSlider({
    dragOpenThreshold: BUTTON_WIDTH - 10,
    forceOpenThreshold: 120,
    maxOpenDistance: BUTTON_WIDTH + BUTTON_MARGIN,
    width: width,
    onMove: () => {
      if (swiping.current === true) return;
      swiping.current = true;
      onSwipeStateChange(true);
    },
    onFinish: () => {
      if (swiping.current === false) return;
      swiping.current = false;
      onSwipeStateChange(false);
    },
    onForceOpenLeft: () => {},
    onForceOpenRight: () => {},
  });

  return (
    <View style={[props.style, styles.container]}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: position }],
          },
        ]}
        {...pr.panHandlers}
      >
        <Card style={styles.card}>
          <HistoryRow />
        </Card>
      </Animated.View>
      <View style={styles.buttonGroup}>
        <ButtonSuccess
          title="Edit"
          style={[
            styles.button,
            {
              left: 0,
              opacity: position.interpolate({
                inputRange: [0, BUTTON_VISIBLE_THRESHOLD, BUTTON_MAX_WIDTH],
                outputRange: [0, 1, 0.25],
                extrapolate: 'clamp',
              }),
              width: position.interpolate({
                inputRange: [BUTTON_MARGIN, BUTTON_MAX_WIDTH],
                outputRange: [0, BUTTON_MAX_WIDTH - BUTTON_MARGIN],
                extrapolate: 'clamp',
              }),
            },
          ]}
          contentContainerStyle={styles.buttonContentContainer}
          titleStyle={styles.buttonText}
          onPress={() => {}}
        />
        <ButtonDanger
          title="Delete"
          contentContainerStyle={styles.buttonContentContainer}
          style={[
            styles.button,
            {
              right: 0,
              opacity: position.interpolate({
                inputRange: [-BUTTON_MAX_WIDTH, -BUTTON_VISIBLE_THRESHOLD, 0],
                outputRange: [0.25, 1, 0],
                extrapolate: 'clamp',
              }),
              width: position.interpolate({
                inputRange: [-BUTTON_MAX_WIDTH, -BUTTON_MARGIN],
                outputRange: [BUTTON_MAX_WIDTH - BUTTON_MARGIN, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
          titleStyle={styles.buttonText}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const { fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroup: {
    position: 'absolute',
    height: '100%',
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: -1,
  },
  buttonContentContainer: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    ...fonts.sm,
    width: BUTTON_WIDTH,
  },
});

export default class extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <HistoryCard {...this.props} />;
  }
}
