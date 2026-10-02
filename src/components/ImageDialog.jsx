import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';

/**
 * Accessible image viewer built on <dialog>: focus is kept inside, Escape
 * closes, arrow keys move between images, and focus returns to the opener.
 * items: [{ src, srcSet?, width, height, alt, caption? }]
 */
export default function ImageDialog({ items, index, onIndex, onClose, label }) {
  const { t, dir } = useI18n();
  const ref = useRef(null);
  const opener = useRef(null);
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;
  const many = items.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    opener.current?.focus?.();
  };

  const go = (delta) => onIndex((index + delta + items.length) % items.length);

  const onKeyDown = (e) => {
    if (!many) return;
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === forward) go(1);
    if (e.key === back) go(-1);
  };

  return (
    <dialog
      ref={ref}
      className="image-dialog"
      aria-label={label || t.gallery.dialogLabel}
      onClose={handleClose}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && handleClose()}
    >
      {item && (
        <div className="image-dialog-inner">
          <div className="image-dialog-bar">
            {many && (
              <p className="image-dialog-count" aria-live="polite">
                {t.gallery.counter(index + 1, items.length)}
              </p>
            )}
            <button type="button" className="icon-btn" onClick={handleClose} autoFocus>
              <Icon name="close" size={22} />
              <span>{t.gallery.close}</span>
            </button>
          </div>
          <figure>
            <img src={item.src} srcSet={item.srcSet} sizes="(min-width: 900px) 800px, 100vw" width={item.width} height={item.height} alt={item.alt} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
          {many && (
            <div className="image-dialog-nav">
              <button type="button" className="icon-btn" onClick={() => go(-1)}>
                <Icon name="back" className="flip-rtl" />
                <span>{t.gallery.prev}</span>
              </button>
              <button type="button" className="icon-btn" onClick={() => go(1)}>
                <span>{t.gallery.next}</span>
                <Icon name="arrow" className="flip-rtl" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
