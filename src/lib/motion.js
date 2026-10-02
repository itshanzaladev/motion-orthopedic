import { useEffect, useRef } from 'react';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * One-time scroll reveal. Children of any `[data-stagger]` list inside the
 * element animate in one after another. Content is visible by default: the
 * hidden state is only added once IntersectionObserver is available, and a
 * timer reveals everything anyway, so nothing stays hidden if something fails.
 */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    el.querySelectorAll('[data-stagger]').forEach((list) => {
      [...list.children].forEach((child, i) => child.style.setProperty('--i', Math.min(i, 8)));
    });
    el.classList.add('reveal');
    const show = () => el.classList.add('reveal--in');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    const fallback = setTimeout(show, 5000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  return ref;
}

/** Adds `is-scrolled` to <html> and drives the reading-progress bar. */
export function useScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      root.classList.toggle('is-scrolled', y > 12);
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
