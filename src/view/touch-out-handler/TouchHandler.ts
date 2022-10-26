import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { PanResponder } from 'react-native';

type ShouldHandler = (
  evt: GestureResponderEvent,
  gestureState: PanResponderGestureState
) => boolean;

class TouchOutHandler {
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gs) =>
      this.onStartShouldSetPanResponder(evt, gs),
    onStartShouldSetPanResponderCapture: (evt, gs) =>
      this.onStartShouldSetPanResponderCapture(evt, gs),
  });

  private shouldCaptureHandlers: Set<ShouldHandler> = new Set();

  private static instance?: TouchOutHandler;

  private constructor() {
    //
  }

  static getInstance(): TouchOutHandler {
    if (!this.instance) this.instance = new TouchOutHandler();
    return this.instance;
  }

  addShouldCaptureHandler(h: ShouldHandler) {
    this.shouldCaptureHandlers.add(h);
  }

  removeShouldCaptureHandler(h: ShouldHandler) {
    const removed = this.shouldCaptureHandlers.delete(h);
    if (!removed) throw Error('Tried to remove unknown shouldCaptureHandler');
  }

  private onStartShouldSetPanResponder(
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const handlers = Array.from(this.shouldCaptureHandlers);
    const trues = handlers
      .map((h) => h(evt, gestureState))
      .filter((h) => h === true);
    return trues.length > 0;
  }

  private onStartShouldSetPanResponderCapture(
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    const handlers = Array.from(this.shouldCaptureHandlers);
    const trues = handlers
      .map((h) => h(evt, gestureState))
      .filter((h) => h === true);
    return trues.length > 0;
  }
}

export { TouchOutHandler };
