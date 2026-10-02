import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';

export function LanguageSwitch() {
  const { t, lang, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      <button type="button" lang="en" dir="ltr" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        English
      </button>
      <button type="button" lang="ur" dir="rtl" aria-pressed={lang === 'ur'} onClick={() => setLang('ur')}>
        اردو
      </button>
    </div>
  );
}

export default function Header({ showReviews }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    ['services', t.nav.services],
    ['about', t.nav.about],
    ['gallery', t.nav.gallery],
    showReviews && ['reviews', t.nav.reviews],
    ['location', t.nav.location],
  ].filter(Boolean);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <span className="scroll-progress" aria-hidden="true" />
      <div className="container header-inner">
        <a className="wordmark" href="#top" aria-label={`${t.common.clinicName} – ${t.common.wordmarkSub}`}>
          <span className="wordmark-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="36" height="36">
              <rect width="32" height="32" rx="9" fill="currentColor" />
              <path d="M8.5 22V10.5l7.5 7.5 7.5-7.5V22" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="wordmark-text">
            <span className="wordmark-name" lang="en" dir="ltr">Motion Orthopedic</span>
            <span className="wordmark-sub">{t.common.wordmarkSub}</span>
          </span>
        </a>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} id="site-nav" aria-label={t.nav.label}>
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageSwitch />
          <a className="btn btn-primary header-cta" href="#appointment">
            {t.common.requestAppointment}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.menu}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
