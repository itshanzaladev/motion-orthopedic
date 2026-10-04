import { servicePhotos } from '../config/assets.js';
import { publication } from '../config/publication.js';
import { allServiceIds, serviceGroups, ukCertifiedServices } from '../content/services.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { getPhoto } from '../lib/media.js';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';
import Section from './Section.jsx';

function CertBadge({ id }) {
  const { t } = useI18n();
  if (!publication.ukCertifiedApproved || !ukCertifiedServices.includes(id)) return null;
  return <span className="cert-badge">{t.services.ukCertified}</span>;
}

export default function Services() {
  const { t, lang } = useI18n();
  const s = t.services;
  return (
    <Section id="services" className="section--tint" eyebrow={s.eyebrow} title={s.title} lead={s.lead}>
      <ul className="service-grid" data-stagger>
        {serviceGroups.map((group) => {
          const photo = getPhoto(servicePhotos[group.id], lang);
          return (
          <li key={group.id} id={`service-${group.id}`} className="card service-card">
            {photo && (
              <div className="service-media">
                <Photo photo={photo} sizes="(min-width: 1024px) 360px, (min-width: 700px) 50vw, 100vw" />
              </div>
            )}
            <span className="service-icon">
              <Icon name={group.icon} size={26} />
            </span>
            <h3 tabIndex={-1}>{s.groups[group.id].title}</h3>
            <p>{s.groups[group.id].desc}</p>
            <p className="service-includes">{s.includes}</p>
            <ul className="chip-list">
              {group.services.map((id) => (
                <li key={id} className="chip">
                  {s.items[id].name}
                  <CertBadge id={id} />
                </li>
              ))}
            </ul>
          </li>
          );
        })}
        <li className="card service-card service-card--cta">
          <Icon name="chat" size={28} />
          <p>{s.notSureText}</p>
          <a className="btn btn-light" href="#appointment">
            {t.common.requestAppointment}
            <Icon name="arrow" className="flip-rtl" />
          </a>
        </li>
      </ul>

      <details className="disclosure">
        <summary>
          <span>
            {s.fullListTitle} <span className="muted">· {s.fullListCount(allServiceIds.length)}</span>
          </span>
          <Icon name="chevron" className="disclosure-icon" />
        </summary>
        <div className="disclosure-body">
          {serviceGroups.map((group) => (
            <div key={group.id} className="service-list-group">
              <h3 tabIndex={-1}>{s.groups[group.id].title}</h3>
              <dl className="service-list">
                {group.services.map((id) => (
                  <div key={id}>
                    <dt>
                      {s.items[id].name}
                      <CertBadge id={id} />
                    </dt>
                    <dd>{s.items[id].desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </details>
    </Section>
  );
}
