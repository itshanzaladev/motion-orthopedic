import { publication } from '../config/publication.js';
import { isPreview } from '../lib/env.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

// Owner-facing notes, shown only in the private preview and only while
// publication.showPreviewNotes is on.
const enabled = isPreview && publication.showPreviewNotes;

export function PreviewNote({ children, className = '' }) {
  const { t } = useI18n();
  if (!enabled) return null;
  return (
    <p className={`preview-note ${className}`}>
      <span className="preview-badge">{t.preview.badge}</span> {children}
    </p>
  );
}

export function PreviewBanner() {
  const { t } = useI18n();
  if (!enabled) return null;
  return (
    <div className="preview-banner" role="note">
      {t.preview.banner}
    </div>
  );
}

export function PreviewBadge() {
  const { t } = useI18n();
  if (!enabled) return null;
  return <span className="preview-badge preview-badge--overlay">{t.preview.badge}</span>;
}
