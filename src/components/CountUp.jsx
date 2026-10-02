import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/**
 * Counts from 0 to `value` once, the first time it scrolls into view.
 * - Space is reserved by an invisible copy of the final text (no layout jump).
 * - Screen readers only get the final value (`srText`).
 * - Reduced motion or no IntersectionObserver: final value immediately.
 */
export default function CountUp({ value, suffix = '', srText, duration = 1200 }) {
  const ref = useRef(null);
  const [n, setN] = useState(() =>
    prefersReducedMotion() || typeof IntersectionObserver === 'undefined' ? value : 0,
  );
  const animate = useRef(n !== value);

  useEffect(() => {
    if (!animate.current) return;
    let raf = 0;
    let fallback = 0;
    const run = () => {
      let start;
      const step = (ts) => {
        start ??= ts;
        const p = Math.min(1, (ts - start) / duration);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) raf = requestAnimationFrame(step);
        else animate.current = false;
      };
      raf = requestAnimationFrame(step);
      // If animation frames are throttled (background tab), still finish.
      fallback = setTimeout(() => setN(value), duration + 800);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [value, duration]);

  const done = n === value;
  return (
    <span className="countup" ref={ref} dir="ltr">
      <span className="countup-sizer" aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="countup-value" aria-hidden="true">
        {n}
        <span style={{ visibility: done ? 'visible' : 'hidden' }}>{suffix}</span>
      </span>
      <span className="sr-only">{srText}</span>
    </span>
  );
}
