import { useState } from 'react';
import { aboutPhotoOrder, galleryMax, galleryOrder } from '../config/assets.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { firstPhoto, getPhoto } from '../lib/media.js';
import Icon from './Icon.jsx';
import ImageDialog from './ImageDialog.jsx';
import Photo from './Photo.jsx';
import { PreviewBadge, PreviewNote } from './Preview.jsx';
import Section from './Section.jsx';

export default function Gallery() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(null);
  const aboutPhoto = firstPhoto(aboutPhotoOrder, lang)?.name;
  let items = galleryOrder
    .filter((name) => name !== aboutPhoto) // don't repeat the About photo
    .map((name) => getPhoto(name, lang))
    .filter(Boolean)
    .slice(0, galleryMax);
  // Keep complete rows on the three-column desktop grid.
  if (items.length > 3) items = items.slice(0, items.length - (items.length % 3));
  if (!items.length) return null;
  const hasPatientPhotos = items.some((p) => p.kind === 'patient');
  const hasPlaceholders = items.some((p) => p.kind === 'placeholder');

  return (
    <Section id="gallery" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead}>
      {hasPatientPhotos && <PreviewNote>{t.preview.patientPhotos}</PreviewNote>}
      {hasPlaceholders && <PreviewNote>{t.preview.placeholderPhotos}</PreviewNote>}
      <ul className="gallery-grid" data-stagger>
        {items.map((photo, i) => (
          <li key={photo.name} className={`gallery-item gallery-item--${i}`}>
            <button type="button" className="gallery-btn" onClick={() => setActive(i)} aria-label={t.gallery.open(photo.alt)}>
              <Photo photo={photo} sizes="(min-width: 960px) 360px, 50vw" />
              <span className="gallery-zoom" aria-hidden="true">
                <Icon name="expand" size={18} />
              </span>
              {(photo.kind === 'patient' || photo.kind === 'placeholder') && <PreviewBadge />}
            </button>
          </li>
        ))}
      </ul>
      <ImageDialog items={items} index={active} onIndex={setActive} onClose={() => setActive(null)} />
    </Section>
  );
}
