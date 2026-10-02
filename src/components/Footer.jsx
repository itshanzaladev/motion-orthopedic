import { business } from '../config/business.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon, { WhatsAppIcon } from './Icon.jsx';
import { LanguageSwitch } from './Header.jsx';

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand" lang="en" dir="ltr">
            Motion Orthopedic
          </p>
          <p>{f.tagline}</p>
          <p>{t.common.doctorName}</p>
          <LanguageSwitch />
        </div>
        <div>
          <h2 className="footer-heading">{f.contact}</h2>
          <ul className="footer-links">
            <li>
              <a href={business.phoneHref}>
                <Icon name="phone" size={18} />
                <span dir="ltr">{business.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                <span dir="ltr">{business.phoneInternational}</span>
                <span className="sr-only">
                  {t.common.whatsapp} {t.common.opensNewTab}
                </span>
              </a>
            </li>
            <li>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" size={18} />
                {t.common.directions} – {t.common.city}
                <span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{f.privacyTitle}</h2>
          <p className="footer-small">{f.privacy}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{f.rights(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
