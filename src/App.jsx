import { useEffect } from 'react';
import About from './components/About.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Location from './components/Location.jsx';
import MobileBar from './components/MobileBar.jsx';
import { PreviewBanner } from './components/Preview.jsx';
import Reviews, { hasPublicReviews } from './components/Reviews.jsx';
import Services from './components/Services.jsx';
import TrustStrip from './components/TrustStrip.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';
import { isPreview } from './lib/env.js';
import { prefersReducedMotion, useScrollEffects } from './lib/motion.js';

const showReviews = hasPublicReviews || isPreview;

// In-page links: scroll to the section and move keyboard focus to its heading.
function useInPageLinks() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute('href').slice(1);
      const target = id === 'top' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        const heading = target.matches('h2, input, select, textarea') ? target : target.querySelector('h2');
        heading?.focus({ preventScroll: true });
      }
      history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

export default function App() {
  const { t } = useI18n();
  useInPageLinks();
  useScrollEffects();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.common.skip}
      </a>
      <PreviewBanner />
      <Header showReviews={showReviews} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustStrip showReviews={showReviews} />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
