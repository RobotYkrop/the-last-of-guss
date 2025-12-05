import { useState, useEffect } from "react";

export const useCountdown = (
  targetTime: string | null,
  /** false – таймер полностью отключён (например, после FINISHED) */
  isActive: boolean = true
) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!targetTime || !isActive) {
      setTimeLeft(0);
      return;
    }

    const calculate = () => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((new Date(targetTime).getTime() - now) / 1000));
      setTimeLeft(left);
    };

    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetTime, isActive]);

  return timeLeft;
};