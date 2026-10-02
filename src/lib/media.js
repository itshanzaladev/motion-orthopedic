import { photos, photoWidths } from '../config/assets.js';
import { isPhotoAllowed } from '../config/publication.js';
import generated from '../generated/media.json';
import { isPreview } from './env.js';

const base = import.meta.env.BASE_URL;

/** Resolved photo for this build, or null when it is not allowed/available. */
export function getPhoto(name, lang) {
  const photo = photos[name];
  const files = generated.photos[name];
  if (!photo || !files || !isPhotoAllowed(photo, isPreview)) return null;
  const sources = photoWidths
    .filter((w) => files[w])
    .map((w) => `${base}media/${name}-${w}.webp ${w}w`);
  sources.push(`${base}media/${name}.webp ${files.full.width}w`);
  return {
    name,
    kind: photo.kind,
    src: `${base}media/${name}.webp`,
    srcSet: sources.join(', '),
    width: files.full.width,
    height: files.full.height,
    focus: photo.focus,
    alt: photo.alt[lang] || photo.alt.en,
  };
}

/** First allowed photo from a preference list. */
export function firstPhoto(names, lang) {
  for (const n of names) {
    const p = getPhoto(n, lang);
    if (p) return p;
  }
  return null;
}

export function reviewScreenshot(id) {
  const file = generated.reviews[id];
  return file ? { src: `${base}media/reviews/${id}.webp`, ...file } : null;
}
