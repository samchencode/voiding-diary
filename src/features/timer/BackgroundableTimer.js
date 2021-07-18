import { AppState, LogBox } from 'react-native';
import BaseTimer, { TIMER_STATE } from './BaseTimer';

// Dismiss long timer warning
// https://github.com/facebook/react-native/issues/12981
LogBox.ignoreLogs(['Setting a timer']);

const APP_STATE = {
  ACTIVE: 'active',
  BACKGROUND: 'background',
  INACTIVE: 'inactive',
};

const DESTROYED = 'destroyed';

class BackgroundableTimer extends BaseTimer {
  _currentAppState = AppState.currentState;

  constructor() {
    super();
    this._handleChangeAppState = this._handleChangeAppState.bind(this);
    AppState.addEventListener('change', this._handleChangeAppState);
  }

  _handleChangeAppState(newAppState) {
    if (
      (newAppState === APP_STATE.BACKGROUND ||
        newAppState === APP_STATE.INACTIVE) &&
      this._currentAppState === APP_STATE.ACTIVE &&
      this.state === TIMER_STATE.TICKING
    ) {
      this._pauseTimeout();
    } else if (
      newAppState === APP_STATE.ACTIVE &&
      (this._currentAppState === APP_STATE.INACTIVE ||
        this._currentAppState === APP_STATE.BACKGROUND) &&
      this.state === TIMER_STATE.TICKING
    ) {
      this._remainingMilliseconds = this._findRemainingMilliseconds(
        this.endTime
      );
      this._startTimeout(this._remainingMilliseconds);
    }
    this._currentAppState = newAppState;
  }

  destroy() {
    AppState.removeEventListener('change', this._handleChangeAppState);
    this.state = DESTROYED;
  }
}

export default BackgroundableTimer;
