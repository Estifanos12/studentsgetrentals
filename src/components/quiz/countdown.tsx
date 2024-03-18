'use client';

import { formatTime } from '@/lib/formatTime';
import { useCountdown } from '@/hooks/useCountdown';
import { Button } from '../ui/button';

export const Countdown = () => {
  const { countdown, startCountdown } = useCountdown(3600);

  return (
    <div>
      <p>{formatTime(countdown as number)}</p>
      <Button onClick={() => startCountdown()}>Start countdown</Button>
    </div>
  );
};
