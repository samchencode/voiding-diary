import { useState, useEffect } from 'react';

function useTimer({ timer, handleVoid, notification }) {
  const [time, setTime] = useState({
    timeRemaining: null,
    timeElapsed: null,
    ticking: false,
  });

  useEffect(() => {
    timer.setOnTick(({ timeRemaining, timeElapsed }) =>
      setTime({ timeRemaining, timeElapsed, ticking: true })
    );

    timer.setOnEnd(() => {
      setTime({ timeRemaining: null, timeElapsed: null, ticking: false });
    });

    notification.setNotificationInteractionListener(() => handleVoid(60));

    return () => {
      timer.destroy();
      notification.destroy();
    };
  }, []);

  return time;
}

export default useTimer;
