import { useEffect, useState } from 'react';
import { serviceGroups } from '../content/services.js';
import generated from '../generated/media.json';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';

const base = import.meta.env.BASE_URL;

/** Clinic logo (from images/*logo*). Falls back to a text wordmark. */
export function Logo({ variant = 'navy', className = '' }) {
  const { t } = useI18n();
  const logo = generated.logo;
  if (!logo) {
    return (
      <span className={`wordmark-name ${className}`} lang="en" dir="ltr">
        Motion Orthopedic
      </span>
    );
  }
  return (
    <img
      className={`logo ${className}`}
      src={`${base}media/${variant === 'white' ? 'logo-white' : 'logo'}.webp`}
      width={logo.width}
      height={logo.height}
      alt={`${t.common.clinicName} – Keep Moving`}
      decoding="async"
    />
  );
}

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

/**
 * Services dropdown: opens on hover and on keyboard focus (CSS
 * :hover / :focus-within). Each group has a flyout with its services.
 * In the mobile menu the groups are listed inline instead.
 */
function ServicesMenu({ onNavigate }) {
  const { t } = useI18n();
  const s = t.services;
  return (
    <li className="has-dropdown">
      <a href="#services" onClick={onNavigate}>
        {t.nav.services}
        <Icon name="chevron" size={16} className="nav-caret" />
      </a>
      <ul className="dropdown">
        {serviceGroups.map((group) => (
          <li key={group.id} className="has-flyout">
            <a href={`#service-${group.id}`} onClick={onNavigate}>
              <span>{s.groups[group.id].title}</span>
              <Icon name="chevron" size={14} className="flyout-caret" />
            </a>
            <ul className="flyout">
              {group.services.map((id) => (
                <li key={id}>
                  <a href={`#service-${group.id}`} onClick={onNavigate}>
                    {s.items[id].name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="dropdown-all">
          <a href="#services" onClick={onNavigate}>
            {s.fullListTitle}
            <Icon name="arrow" size={14} className="flip-rtl" />
          </a>
        </li>
      </ul>
    </li>
  );
}

export default function Header({ showReviews }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    // Drop focus from the dropdown so it closes after a click.
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest('.dropdown')) {
      document.activeElement.blur();
    }
  };

  const links = [
    ['about', t.nav.about],
    ['gallery', t.nav.gallery],
    showReviews && ['reviews', t.nav.reviews],
    ['location', t.nav.location],
  ].filter(Boolean);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest('.has-dropdown')) {
        active.closest('.has-dropdown').querySelector('a')?.focus();
        active.closest('.has-dropdown').classList.add('is-closed');
      }
    };
    const reopen = (e) => e.target.closest?.('.has-dropdown')?.classList.remove('is-closed');
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerover', reopen);
    document.addEventListener('focusout', reopen);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerover', reopen);
      document.removeEventListener('focusout', reopen);
    };
  }, []);

  return (
    <header className="site-header">
      <span className="scroll-progress" aria-hidden="true" />
      <div className="container header-inner">
        <a className="wordmark" href="#top">
          <Logo />
        </a>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} id="site-nav" aria-label={t.nav.label}>
          <ul>
            <ServicesMenu onNavigate={close} />
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={close}>
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
