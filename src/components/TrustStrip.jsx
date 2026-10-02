import { publication } from '../config/publication.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useReveal } from '../lib/motion.js';
import CountUp from './CountUp.jsx';
import Icon from './Icon.jsx';
import { PreviewNote } from './Preview.jsx';

export default function TrustStrip({ showReviews }) {
  const { t } = useI18n();
  const revealRef = useReveal();
  const count = publication.reviewCount;
  const finalText = `${count.value}${count.suffix}`;

  const countBody = (
    <>
      <CountUp value={count.value} suffix={count.suffix} srText={t.trust.reviewsSr(finalText)} />
      <span className="trust-count-label" aria-hidden="true">
        {t.trust.reviews}
      </span>
    </>
  );

  return (
    <section className="trust" aria-label={t.trust.label}>
      <div className="container" ref={revealRef}>
        <ul className="trust-grid" data-stagger>
          {count.enabled && (
            <li className="trust-item trust-item--count">
              {showReviews ? (
                <a className="trust-count" href="#reviews">
                  {countBody}
                </a>
              ) : (
                <span className="trust-count">{countBody}</span>
              )}
            </li>
          )}
          <li className="trust-item">
            <Icon name="clinic" size={24} />
            <span>
              <strong>{t.trust.clinicTitle}</strong>
              <span>{t.trust.clinicText}</span>
            </span>
          </li>
          <li className="trust-item">
            <Icon name="home" size={24} />
            <span>
              <strong>{t.trust.homeTitle}</strong>
              <span>{t.trust.homeText}</span>
            </span>
          </li>
          <li className="trust-item">
            <Icon name="chat" size={24} />
            <span>
              <strong>{t.trust.confirmTitle}</strong>
              <span>{t.trust.confirmText}</span>
            </span>
          </li>
        </ul>
        {count.enabled && !count.sourceConfirmed && <PreviewNote>{t.preview.reviewCount}</PreviewNote>}
      </div>
    </section>
  );
}
