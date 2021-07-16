import { useRef, useMemo } from 'react';
import { PanResponder, Animated } from 'react-native';

function useSlider({
  dragOpenThreshold = 30,
  forceOpenThreshold = 120,
  maxOpenDistance = 60,
  width = 400,
  onMove = () => {},
  onFinish = () => {},
  onForceOpenLeft = () => {},
  onForceOpenRight = () => {},
}) {
  const scrollThreshold = width / 15;

  const aPosition = useRef(new Animated.Value(0));
  const position = useRef(0);
  aPosition.current.addListener((v) => (position.current = v.value));

  const pr = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          aPosition.current.setOffset(position.current);
          aPosition.current.setValue(0);
        },
        onPanResponderMove: (e, { dx }) => {
          if (dx >= scrollThreshold) {
            aPosition.current.setValue(dx - scrollThreshold);
            onMove(dx);
          } else if (dx <= -scrollThreshold) {
            aPosition.current.setValue(dx + scrollThreshold);
            onMove(dx);
          }
        },
        onPanResponderRelease: () => {
          aPosition.current.flattenOffset();
          let newPosition = 0;

          if (position.current >= forceOpenThreshold) {
            newPosition = width;
            onForceOpenLeft();
          } else if (position.current <= -forceOpenThreshold) {
            newPosition = -width;
            onForceOpenRight();
          } else if (position.current >= dragOpenThreshold) {
            newPosition = maxOpenDistance;
          } else if (position.current <= -dragOpenThreshold) {
            newPosition = -maxOpenDistance;
          }

          Animated.spring(aPosition.current, {
            toValue: newPosition,
            useNativeDriver: false,
          }).start();

          onFinish();
        },
        onPanResponderTerminate: () => {
          Animated.spring(aPosition.current, {
            toValue: 0,
            useNativeDriver: false,
          }).start();

          onFinish();
        },
      }),
    []
  );

  return [aPosition.current, pr];
}

export default useSlider;
