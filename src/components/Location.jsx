import { business } from '../config/business.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon, { WhatsAppIcon } from './Icon.jsx';
import Section from './Section.jsx';

export default function Location() {
  const { t } = useI18n();
  const l = t.location;
  return (
    <Section id="location" eyebrow={l.eyebrow} title={l.title}>
      <div className="location-grid">
        <div className="card location-card">
          <div className="location-place">
            <span className="location-pin">
              <Icon name="pin" size={28} />
            </span>
            <div>
              <p className="location-name">{t.common.clinicName}</p>
              <p className="muted">{t.common.city}</p>
            </div>
          </div>
          <p>{l.body}</p>
          <a className="btn btn-location btn-block" href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" />
            {l.button}
            <span className="sr-only">{t.common.opensNewTab}</span>
          </a>

          <dl className="contact-list">
            <div>
              <dt>
                <Icon name="phone" size={18} />
                {l.phoneLabel}
              </dt>
              <dd>
                <a href={business.phoneHref} dir="ltr">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <WhatsAppIcon size={18} />
                {l.whatsappLabel}
              </dt>
              <dd>
                <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" dir="ltr">
                  {business.phoneInternational}
                </a>
              </dd>
            </div>
            <div>
              <dt>{l.feesLabel}</dt>
              <dd>{t.common.fees}</dd>
            </div>
            <div>
              <dt>{l.hoursLabel}</dt>
              <dd>{t.common.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="faq">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h3-size">
            {t.faq.title}
          </h2>
          <div className="faq-list" data-stagger>
            {t.faq.items.map((item) => (
              <details key={item.q} className="disclosure disclosure--faq">
                <summary>
                  <span>{item.q}</span>
                  <Icon name="chevron" className="disclosure-icon" />
                </summary>
                <div className="disclosure-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
