const BEFORE_START = 'before-start';
const TICKING = 'ticking';
const PAUSED = 'paused';

class Timer {
  state = BEFORE_START;
  endTime = null;
  onTick = () => {};
  onEnd = () => {};
  onPause = () => {};
  onResume = () => {};

  _onTickProcessId = null;
  _onEndProcessId = null;
  _remainingMilliseconds = 0;
  _totalMilliseconds = 0;
  _lastTick = null;

  _findRemainingMilliseconds(seconds) {
    return seconds - Date.now();
  }

  _handleEnd() {
    this.onEnd();
    this.reset();
  }

  _handleTick() {
    const dt = Date.now() - this._lastTick;
    this._remainingMilliseconds = this._findRemainingMilliseconds(this.endTime);
    this.onTick({
      timeRemaining: new Date(this._remainingMilliseconds),
      timeElapsed: new Date(
        this._totalMilliseconds - this._remainingMilliseconds
      ),
      dt,
    });
    this._lastTick = new Date();
  }

  start({ endTime, milliseconds }) {
    if (endTime && !endTime instanceof Date) {
      throw new Error('endTime should be a Date');
    }
    if (!endTime && milliseconds < 0)
      throw new Error('timer.start needs endTime or milliseconds');
    if (endTime) {
      this.endTime = endTime;
      this._totalMilliseconds = endTime - Date.now();
    } else if (milliseconds >= 0) {
      this.endTime = new Date(Date.now() + milliseconds);
      this._totalMilliseconds = milliseconds;
    }
    if (this.state !== BEFORE_START) {
      throw new Error('timer.start while in state: ' + this.state)
    }

    this._remainingMilliseconds = this._findRemainingMilliseconds(this.endTime);
    this._startTimeout(this._remainingMilliseconds);
    this._lastTick = Date.now();
    this.state = TICKING;
  }

  _startTimeout(milliseconds) {
    this._onTickProcessId = setInterval(this._handleTick.bind(this), 1000);
    this._onEndProcessId = setTimeout(this._handleEnd.bind(this), milliseconds);
  }

  pause() {
    if (this.state !== TICKING)
      throw new Error('timer.pause when ' + this.state);
    this._remainingMilliseconds = this._findRemainingMilliseconds(this.endTime);
    this._pauseTimeout();
    this._lastTick = null;
    this.state = PAUSED;
    this.onPause();
  }

  _pauseTimeout() {
    clearInterval(this._onTickProcessId);
    clearTimeout(this._onEndProcessId);
  }

  resume() {
    if (this.state !== PAUSED)
      throw new Error('timer.resume when ' + this.state);
    this.start({ milliseconds: this._remainingMilliseconds });
    this.onResume();
  }

  reset() {
    clearInterval(this._onTickProcessId);
    clearTimeout(this._onEndProcessId);
    this._onTickProcessId = null;
    this._onEndProcessId = null;
    this.endTime = null;
    this.elapsedTime = null;
    this._totalMilliseconds = 0;
    this._remainingMilliseconds = 0;
    this._lastTick = null;
    this.state = BEFORE_START;
  }

  setOnTick(onTick) {
    this.onTick = onTick;
  }

  setOnEnd(onEnd) {
    this.onEnd = onEnd;
  }

  setOnPause(onPause) {
    this.onPause = onPause;
  }

  setOnResume(onResume) {
    this.onResume = onResume;
  }
}

Object.assign(Timer, {
  BEFORE_START,
  TICKING,
  PAUSED,
})

export default Timer;
