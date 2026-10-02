import { heroInsetPhoto } from '../config/assets.js';
import { business } from '../config/business.js';
import { publication } from '../config/publication.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { getPhoto } from '../lib/media.js';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';

export default function Hero() {
  const { t, lang } = useI18n();
  const photo = getPhoto('clinicReception', lang);
  const inset = getPhoto(heroInsetPhoto, lang);
  const count = publication.reviewCount;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title">{t.hero.title}</h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg btn-shine" href="#appointment">
              <Icon name="calendar" />
              {t.common.requestAppointment}
            </a>
            <a className="btn btn-secondary btn-lg" href={business.phoneHref}>
              <Icon name="phone" />
              <span>
                {t.common.callClinic}
                <span className="btn-sub" dir="ltr">
                  {business.phoneDisplay}
                </span>
              </span>
            </a>
          </div>
          <p className="hero-note">
            <Icon name="chat" size={18} />
            {t.hero.note}
          </p>
        </div>
        {photo && (
          <figure className="hero-media">
            <div className="hero-photo">
              <Photo photo={photo} eager ratio="4 / 5" sizes="(min-width: 960px) 460px, (min-width: 600px) 70vw, 100vw" />
            </div>
            {inset && (
              <div className="hero-inset" aria-hidden="true">
                <img src={inset.srcSet.split(' ')[0]} width="480" height="640" alt="" loading="lazy" decoding="async" style={{ objectPosition: inset.focus }} />
              </div>
            )}
            {count.enabled && (
              <div className="hero-chip hero-chip--reviews" aria-hidden="true">
                <span className="hero-chip-icon">
                  <Icon name="quote" size={14} />
                </span>
                <strong dir="ltr">
                  {count.value}
                  {count.suffix}
                </strong>{' '}
                {t.trust.reviews}
              </div>
            )}
            <div className="hero-chip hero-chip--home" aria-hidden="true">
              <Icon name="home" size={18} />
              {t.trust.homeTitle}
            </div>
            <figcaption className="hero-tag">
              <Icon name="pin" size={18} />
              {t.common.city}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
