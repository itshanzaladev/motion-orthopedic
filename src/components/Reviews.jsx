import { useState } from 'react';
import { business } from '../config/business.js';
import { isScreenshotAllowed, publication } from '../config/publication.js';
import { reviews, reviewsInitial, showReviewerNames } from '../content/reviews.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { isPreview } from '../lib/env.js';
import { reviewScreenshot } from '../lib/media.js';
import Icon from './Icon.jsx';
import ImageDialog from './ImageDialog.jsx';
import { PreviewNote } from './Preview.jsx';
import Section from './Section.jsx';

export const hasPublicReviews = reviews.length > 0;

function ReviewCard({ review, number, onScreenshot }) {
  const { t, lang } = useI18n();
  const r = t.reviews;
  const translation = review.language !== lang ? review.translations?.[lang] : null;
  const shownText = translation || review.text;
  const textLang = translation ? lang : review.language === 'ur' ? 'ur' : 'en';
  const name = showReviewerNames && review.reviewer ? review.reviewer : null;
  const shot = isScreenshotAllowed(review, isPreview) ? reviewScreenshot(review.id) : null;

  return (
    <li className="card review-card">
      <div className="review-head">
        <span className="avatar" aria-hidden="true">
          {name ? name.trim().charAt(0) : <Icon name="quote" size={18} />}
        </span>
        <div>
          <p className="review-name">{name ? <bdi>{name}</bdi> : r.patient}</p>
          {review.rating ? (
            <p className="stars" role="img" aria-label={r.rating(review.rating)}>
              {Array.from({ length: review.rating }, (_, i) => (
                <Icon key={i} name="star" size={16} />
              ))}
            </p>
          ) : null}
        </div>
      </div>

      {(review.excerpt || translation) && (
        <p className="review-tags">
          {review.excerpt && <span className="tag">{r.excerpt}</span>}
          {translation && <span className="tag tag--soft">{r.translatedFrom[review.language] || r.translated}</span>}
        </p>
      )}

      {review.needsTranscription || !shownText ? (
        <p className="muted">{r.needsTranscription}</p>
      ) : (
        <blockquote lang={textLang} dir={textLang === 'ur' ? 'rtl' : 'ltr'}>
          <p>{shownText}</p>
        </blockquote>
      )}

      {translation && review.text && (
        <details className="review-original">
          <summary>{r.originalText}</summary>
          <p lang={review.language === 'ur' ? 'ur' : 'en'} dir={review.language === 'ur' ? 'rtl' : 'ltr'}>
            {review.text}
          </p>
        </details>
      )}

      {shot && (
        <button type="button" className="link-btn" onClick={() => onScreenshot({ ...shot, alt: r.screenshotAlt(number) })}>
          <Icon name="expand" size={16} />
          {r.viewScreenshot}
        </button>
      )}
      {!shot && review.screenshot && isPreview && <PreviewNote>{t.preview.screenshotPending}</PreviewNote>}
    </li>
  );
}

export default function Reviews() {
  const { t } = useI18n();
  const r = t.reviews;
  const [expanded, setExpanded] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

  if (!hasPublicReviews && !isPreview) return null;

  const shown = expanded ? reviews : reviews.slice(0, reviewsInitial);
  const hiddenCount = reviews.length - reviewsInitial;
  const count = publication.reviewCount;

  return (
    <Section id="reviews" className="section--tint" eyebrow={r.eyebrow} title={r.title} lead={r.lead}>
      {count.enabled && (
        <p className="review-total">
          <span dir="ltr">
            {count.value}
            {count.suffix}
          </span>{' '}
          {r.countText}
        </p>
      )}
      {!hasPublicReviews && <PreviewNote>{t.preview.reviewsMissing}</PreviewNote>}
      {hasPublicReviews && <PreviewNote>{t.preview.reviewSource}</PreviewNote>}

      {hasPublicReviews && (
        <>
          <ul className="review-list" id="review-list" data-stagger>
            {shown.map((review) => (
              <ReviewCard key={review.id} review={review} number={reviews.indexOf(review) + 1} onScreenshot={setScreenshot} />
            ))}
          </ul>
          <div className="review-footer">
            {hiddenCount > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                aria-expanded={expanded}
                aria-controls="review-list"
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? r.viewLess : r.viewMore(hiddenCount)}
                <Icon name="chevron" className={expanded ? 'rotate-180' : ''} />
              </button>
            )}
            {business.reviewDestinationUrl && (
              <a className="btn btn-ghost" href={business.reviewDestinationUrl} target="_blank" rel="noopener noreferrer">
                {r.sourceLink}
                <Icon name="external" size={16} />
                <span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            )}
          </div>
          <p className="review-disclaimer">{r.disclaimer}</p>
        </>
      )}

      <ImageDialog
        items={screenshot ? [screenshot] : []}
        index={screenshot ? 0 : null}
        onIndex={() => {}}
        onClose={() => setScreenshot(null)}
        label={screenshot?.alt}
      />
    </Section>
  );
}
