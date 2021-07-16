import React from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { Card } from '../common';
import HistoryRow from './HistoryRow';
import { baseTheme } from '../theme';

const AnimatedCard = Animated.createAnimatedComponent(
  class extends React.Component {
    render = () => <Card {...this.props} />;
  }
);

class HistoryCard extends React.Component {
  constructor() {
    super();

    this.animatedPosition = new Animated.ValueXY(0, 0);
    this.position = { x: 0, y: 0 };
    this.animatedPosition.addListener((p) => (this.position = p));
    this.scrollStopped = false;

    const DRAG_OPEN_THRESHOLD = 50;
    const DRAG_OPEN_OFFSET = 60;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;

    this.pr = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        this.animatedPosition.setOffset({
          x: this.position.x,
          y: this.position.y,
        });
        this.animatedPosition.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, { dx }) => {
        if(dx > SCROLL_THRESHOLD) {
          this.animatedPosition.setValue({ x: dx - SCROLL_THRESHOLD, y: 0 })
        } else if(dx < -SCROLL_THRESHOLD) {
          this.animatedPosition.setValue({ x: dx + SCROLL_THRESHOLD, y: 0 })
        }
      },
      onPanResponderRelease: () => {
        this.animatedPosition.flattenOffset();

        if (this.position.x >= DRAG_OPEN_THRESHOLD) {
          Animated.spring(this.animatedPosition, {
            toValue: { x: DRAG_OPEN_OFFSET, y: 0 },
            useNativeDriver: false,
          }).start();
        } else if (this.position.x <= -DRAG_OPEN_THRESHOLD) {
          Animated.spring(this.animatedPosition, {
            toValue: { x: -DRAG_OPEN_OFFSET, y: 0 },
            useNativeDriver: false,
          }).start()
        } else {
          Animated.spring(this.animatedPosition, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  render() {
    return (
      <View style={[this.props.style, { height: 60 }]}>
        <Animated.View
          style={[
            styles.leftButtonContainer,
            {
              opacity: this.animatedPosition.x.interpolate({
                inputRange: [0, 40],
                outputRange: [0, 1],
                clamp: true,
              }),
              width: this.animatedPosition.x,
            },
          ]}
        ></Animated.View>
        <Animated.View style={styles.rightButtonContainer}></Animated.View>
        <AnimatedCard
          style={{
            transform: this.animatedPosition.getTranslateTransform(),
            zIndex: 1,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          {...this.pr.panHandlers}
        >
          <HistoryRow />
        </AnimatedCard>
      </View>
    );
  }
}

const { spaces, br } = baseTheme;

const styles = StyleSheet.create({
  container: {
    padding: spaces.sm,
  },
  leftButtonContainer: {
    width: 60,
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    borderRadius: br,
  },
  rightButtonContainer: {
    width: 60,
    height: '100%',
    backgroundColor: 'green',
    position: 'absolute',
    right: 0,
    borderRadius: br,
  },
});

export default HistoryCard;
