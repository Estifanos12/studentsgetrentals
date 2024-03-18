import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);

  const startCountdown = useCallback(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          return prevCountdown;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  }, []);

  return {
    countdown,
    startCountdown,
  };
};
