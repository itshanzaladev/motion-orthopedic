import { aboutPhotoOrder } from '../config/assets.js';
import { business } from '../config/business.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { firstPhoto } from '../lib/media.js';
import Photo from './Photo.jsx';
import { PreviewBadge, PreviewNote } from './Preview.jsx';
import Section from './Section.jsx';

export default function About() {
  const { t, lang } = useI18n();
  const a = t.about;
  const photo = firstPhoto(aboutPhotoOrder, lang);
  const isDoctorPhoto = photo?.kind === 'doctor' || photo?.kind === 'placeholder';
  const note = photo?.kind === 'placeholder' ? t.preview.placeholderDoctor : t.preview.portrait;

  return (
    <Section id="about" eyebrow={a.eyebrow} title={a.title}>
      <div className="about-grid">
        {photo && (
          <figure className="about-media">
            <div className="media-frame">
              <Photo photo={photo} ratio="4 / 5" sizes="(min-width: 960px) 420px, 100vw" />
              {isDoctorPhoto && <PreviewBadge />}
            </div>
            {isDoctorPhoto ? (
              <PreviewNote>{note}</PreviewNote>
            ) : (
              <figcaption>{a.photoCaption}</figcaption>
            )}
          </figure>
        )}
        <div className="about-copy">
          <p className="about-lead">{a.p1}</p>
          <p>{a.p2}</p>
          <p>{a.p3}</p>
          <dl className="facts" aria-label={a.factsLabel} data-stagger>
            <div>
              <dt>{a.facts.clinic}</dt>
              <dd>{t.common.clinicName}</dd>
            </div>
            <div>
              <dt>{a.facts.location}</dt>
              <dd>{t.common.city}</dd>
            </div>
            <div>
              <dt>{a.facts.visits}</dt>
              <dd>{a.facts.visitsValue}</dd>
            </div>
            <div>
              <dt>{a.facts.fees}</dt>
              <dd>{t.common.fees}</dd>
            </div>
            <div>
              <dt>{a.facts.hours}</dt>
              <dd>{t.common.hours}</dd>
            </div>
            <div>
              <dt>{t.location.phoneLabel}</dt>
              <dd>
                <a href={business.phoneHref} dir="ltr">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
