import { useEffect, useState } from "react";

type Props = {
  value: number;
  active: boolean;
};

export default function AnimatedStat({ value, active }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number;
    let startedAt: number | undefined;

    const finish = () => {
      cancelAnimationFrame(frame);
      setCount(value);
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) finish();
    };
    const animate = (now: number) => {
      startedAt ??= now;
      const progress = Math.min((now - startedAt) / 1400, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * easedProgress));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    if (reducedMotion.matches) {
      setCount(value);
    } else {
      frame = requestAnimationFrame(animate);
    }
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [active, value]);

  return (
    <span className="inline-grid text-center tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {count}
      </span>
    </span>
  );
}
