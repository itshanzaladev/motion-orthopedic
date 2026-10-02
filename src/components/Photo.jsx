// Responsive photo with reserved dimensions. `ratio` crops via CSS
// aspect-ratio + object-position from the asset manifest's focus point.
export default function Photo({ photo, sizes = '100vw', ratio, eager = false, className = '' }) {
  if (!photo) return null;
  return (
    <img
      className={`photo ${className}`}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      style={{ objectPosition: photo.focus, aspectRatio: ratio }}
    />
  );
}
