import { useEffect, useMemo, useRef, useState } from 'react';
import { business } from '../config/business.js';
import { serviceGroups } from '../content/services.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { checkPreferredDateTime, nowInKarachi } from '../lib/datetime.js';
import { useReveal } from '../lib/motion.js';
import { normalizePakistanMobile } from '../lib/phone.js';
import { buildMessage, requestRows, whatsappLink } from '../lib/whatsapp.js';
import Icon, { WhatsAppIcon } from './Icon.jsx';

// Form data lives only in component memory: never stored, logged or sent
// anywhere by the site. A reload clears it.
const EMPTY = { visitType: '', name: '', phone: '', date: '', time: '', area: '', service: '', note: '' };
const FIELD_ORDER = ['visitType', 'name', 'phone', 'date', 'time', 'area', 'service', 'note'];
const NOTE_MAX = 300;

function validate(form) {
  const e = {};
  if (form.visitType !== 'clinic' && form.visitType !== 'home') e.visitType = 'visitTypeRequired';
  const name = form.name.trim();
  if (!name) e.name = 'nameRequired';
  else if (name.length < 2) e.name = 'nameShort';
  if (!form.phone.trim()) e.phone = 'phoneRequired';
  else if (!normalizePakistanMobile(form.phone)) e.phone = 'phoneInvalid';
  Object.assign(e, checkPreferredDateTime(form.date, form.time));
  if (form.visitType === 'home' && !form.area.trim()) e.area = 'areaRequired';
  if (form.note.length > NOTE_MAX) e.note = 'noteLong';
  return e;
}

const fieldId = (name) => (name === 'visitType' ? 'bk-visitType-clinic' : `bk-${name}`);

function focusField(name) {
  const el = document.getElementById(fieldId(name));
  if (el) el.focus();
}

function Field({ name, label, optional, hint, error, children }) {
  const { t } = useI18n();
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`bk-${name}`}>
        {label}
        {optional && <span className="optional"> ({t.booking.optional})</span>}
      </label>
      {hint && (
        <p className="hint" id={`bk-${name}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="error" id={`bk-${name}-error`}>
          <span className="sr-only">!</span>
          {error}
        </p>
      )}
      {children}
    </div>
  );
}

function describedBy(name, hasHint, hasError) {
  return [hasHint && `bk-${name}-hint`, hasError && `bk-${name}-error`].filter(Boolean).join(' ') || undefined;
}

function Steps({ current }) {
  const { t } = useI18n();
  const b = t.booking;
  return (
    <ol className="steps" aria-label={b.stepsLabel}>
      {b.steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? 'done' : n === current ? 'current' : 'todo';
        return (
          <li key={label} className={`step step--${state}`} aria-current={n === current ? 'step' : undefined}>
            <span className="step-num" aria-hidden="true">
              {state === 'done' ? <Icon name="check" size={16} /> : n}
            </span>
            <span className="step-label">
              <span className="sr-only">{b.stepStatus(n, b.steps.length)}: </span>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function Booking() {
  const { t, lang } = useI18n();
  const b = t.booking;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'review'
  const [handoff, setHandoff] = useState(false);
  const [copyState, setCopyState] = useState(''); // '' | 'copied' | 'failed'
  const summaryRef = useRef(null);
  const [summaryFocus, setSummaryFocus] = useState(0); // bumped to move focus to the error summary
  const reviewHeadingRef = useRef(null);
  const handoffRef = useRef(null);
  const revealRef = useReveal();
  const today = nowInKarachi().date;

  // Message and summary are rebuilt in the current language, so switching
  // language keeps everything the patient has entered.
  const message = useMemo(() => (step === 'review' ? buildMessage(form, t, lang) : ''), [step, form, t, lang]);
  const rows = useMemo(() => (step === 'review' ? requestRows(form, t, lang) : []), [step, form, t, lang]);

  useEffect(() => {
    if (step === 'review' && !handoff) reviewHeadingRef.current?.focus();
  }, [step, handoff]);
  useEffect(() => {
    if (handoff) handoffRef.current?.focus();
  }, [handoff]);
  useEffect(() => {
    if (summaryFocus) summaryRef.current?.focus();
  }, [summaryFocus]);

  const update = (name, value) => {
    const next = { ...form, [name]: value };
    setForm(next);
    setCopyState('');
    // Clear or update an existing error as soon as the field changes.
    if (errors[name] || (name === 'visitType' && errors.area) || ((name === 'date' || name === 'time') && (errors.date || errors.time))) {
      const all = validate(next);
      setErrors((prev) => {
        const out = { ...prev };
        const touched = name === 'visitType' ? ['visitType', 'area'] : name === 'date' || name === 'time' ? ['date', 'time'] : [name];
        for (const f of touched) {
          if (all[f] && prev[f]) out[f] = all[f];
          else delete out[f];
        }
        return out;
      });
    }
  };

  const onBlur = (name) => {
    if (!String(form[name]).trim()) return; // don't nag while tabbing past empty fields
    const err = validate(form)[name];
    setErrors((prev) => {
      const out = { ...prev };
      if (err) out[name] = err;
      else delete out[name];
      return out;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const invalid = FIELD_ORDER.filter((f) => errs[f]);
    if (invalid.length) {
      setShowSummary(true);
      setSummaryFocus((n) => n + 1);
      return;
    }
    setShowSummary(false);
    setHandoff(false);
    setStep('review');
  };

  const backToForm = (fieldToFocus = 'visitType') => {
    setStep('form');
    setHandoff(false);
    setCopyState('');
    requestAnimationFrame(() => focusField(fieldToFocus));
  };

  const onContinue = (e) => {
    // Re-check the date/time: it may have passed while on the review step.
    const errs = validate(form);
    if (Object.keys(errs).length) {
      e.preventDefault();
      setErrors(errs);
      setShowSummary(true);
      setStep('form');
      setSummaryFocus((n) => n + 1);
      return;
    }
    setHandoff(true);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState('copied');
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = message;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        setCopyState(ok ? 'copied' : 'failed');
      } catch {
        setCopyState('failed');
      }
    }
  };

  const startOver = () => {
    setForm(EMPTY);
    setErrors({});
    setShowSummary(false);
    setHandoff(false);
    setCopyState('');
    setStep('form');
    requestAnimationFrame(() => focusField('visitType'));
  };

  const err = (name) => (errors[name] ? b.errors[errors[name]] : null);
  const invalidFields = FIELD_ORDER.filter((f) => errors[f]);
  const waUrl = step === 'review' ? whatsappLink(message) : business.whatsappUrl;
  const currentStep = step === 'form' ? 1 : handoff ? 3 : 2;

  return (
    <section id="appointment" className="section section--booking" aria-labelledby="appointment-title">
      <div className="container booking-grid" ref={revealRef}>
        <header className="booking-intro">
          <p className="eyebrow">{b.eyebrow}</p>
          <h2 id="appointment-title" tabIndex={-1}>
            {b.title}
          </h2>
          <p className="lead">{b.lead}</p>
          <Steps current={currentStep} />
          <div className="booking-alt">
            <Icon name="phone" />
            <p>
              {t.common.callClinic}:{' '}
              <a href={business.phoneHref} dir="ltr">
                {business.phoneDisplay}
              </a>
            </p>
          </div>
        </header>

        <div className="card booking-card">
          {step === 'form' && (
            <form noValidate onSubmit={onSubmit} aria-labelledby="appointment-title">
              {showSummary && invalidFields.length > 0 && (
                <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
                  <p className="error-summary-title">{b.errors.summary(invalidFields.length)}</p>
                  <ul>
                    {invalidFields.map((f) => (
                      <li key={f}>
                        <a
                          href={`#${fieldId(f)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            focusField(f);
                          }}
                        >
                          {b.errors[errors[f]]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <fieldset
                className={`field ${errors.visitType ? 'has-error' : ''}`}
                aria-describedby={errors.visitType ? 'bk-visitType-error' : undefined}
              >
                <legend>{b.fields.visitType}</legend>
                {errors.visitType && (
                  <p className="error" id="bk-visitType-error">
                    {err('visitType')}
                  </p>
                )}
                <div className="choice-grid">
                  {[
                    ['clinic', b.clinic, b.clinicHint, 'clinic'],
                    ['home', b.home, b.homeHint, 'home'],
                  ].map(([value, label, hint, icon]) => (
                    <label key={value} className="choice">
                      <input
                        type="radio"
                        name="visitType"
                        id={`bk-visitType-${value}`}
                        value={value}
                        checked={form.visitType === value}
                        onChange={() => update('visitType', value)}
                        aria-invalid={errors.visitType ? 'true' : undefined}
                      />
                      <span className="choice-body">
                        <Icon name={icon} size={24} />
                        <span>
                          <strong>{label}</strong>
                          <span className="choice-hint">{hint}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field name="name" label={b.fields.name} error={err('name')}>
                <input
                  id="bk-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  maxLength={80}
                  onChange={(e) => update('name', e.target.value)}
                  onBlur={() => onBlur('name')}
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={describedBy('name', false, errors.name)}
                />
              </Field>

              <Field name="phone" label={b.fields.phone} hint={b.hints.phone} error={err('phone')}>
                <input
                  id="bk-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  value={form.phone}
                  maxLength={20}
                  onChange={(e) => update('phone', e.target.value)}
                  onBlur={() => onBlur('phone')}
                  aria-invalid={errors.phone ? 'true' : undefined}
                  aria-describedby={describedBy('phone', true, errors.phone)}
                />
              </Field>

              <div className="field-row">
                <Field name="date" label={b.fields.date} error={err('date')}>
                  <input
                    id="bk-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    onBlur={() => onBlur('date')}
                    aria-invalid={errors.date ? 'true' : undefined}
                    aria-describedby={describedBy('date', false, errors.date) ? `${describedBy('date', false, errors.date)} bk-datetime-hint` : 'bk-datetime-hint'}
                  />
                </Field>
                <Field name="time" label={b.fields.time} error={err('time')}>
                  <input
                    id="bk-time"
                    type="time"
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    onBlur={() => onBlur('time')}
                    aria-invalid={errors.time ? 'true' : undefined}
                    aria-describedby={describedBy('time', false, errors.time) ? `${describedBy('time', false, errors.time)} bk-datetime-hint` : 'bk-datetime-hint'}
                  />
                </Field>
              </div>
              <p className="hint hint--block" id="bk-datetime-hint">
                <Icon name="calendar" size={18} />
                {b.hints.dateTime}
              </p>

              {form.visitType === 'home' && (
                <Field name="area" label={b.fields.area} hint={b.hints.area} error={err('area')}>
                  <input
                    id="bk-area"
                    type="text"
                    autoComplete="address-level3"
                    value={form.area}
                    maxLength={80}
                    onChange={(e) => update('area', e.target.value)}
                    onBlur={() => onBlur('area')}
                    aria-invalid={errors.area ? 'true' : undefined}
                    aria-describedby={describedBy('area', true, errors.area)}
                  />
                </Field>
              )}

              <Field name="service" label={b.fields.service} optional error={null}>
                <div className="select-wrap">
                  <select id="bk-service" value={form.service} onChange={(e) => update('service', e.target.value)}>
                    <option value="">{b.notSure}</option>
                    {serviceGroups.map((g) => (
                      <optgroup key={g.id} label={t.services.groups[g.id].title}>
                        {g.services.map((id) => (
                          <option key={id} value={id}>
                            {t.services.items[id].name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <Icon name="chevron" className="select-icon" />
                </div>
              </Field>

              <Field name="note" label={b.fields.note} optional hint={b.hints.note} error={err('note')}>
                <textarea
                  id="bk-note"
                  rows={3}
                  maxLength={NOTE_MAX}
                  value={form.note}
                  onChange={(e) => update('note', e.target.value)}
                  aria-invalid={errors.note ? 'true' : undefined}
                  aria-describedby={`${describedBy('note', true, errors.note)} bk-note-count`}
                />
                <p className="char-count" id="bk-note-count">
                  {b.hints.charsLeft(NOTE_MAX - form.note.length)}
                </p>
              </Field>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                {b.reviewButton}
                <Icon name="arrow" className="flip-rtl" />
              </button>
            </form>
          )}

          {step === 'review' && (
            <div className="review-step">
              {handoff && (
                <div className="handoff" ref={handoffRef} tabIndex={-1} role="status">
                  <h3>
                    <WhatsAppIcon size={22} />
                    {b.handoffTitle}
                  </h3>
                  <p className="handoff-main">{b.handoffBody}</p>
                  <p>{b.handoffNote}</p>
                </div>
              )}

              <h3 className="summary-title" ref={reviewHeadingRef} tabIndex={-1}>
                {b.summaryTitle}
              </h3>
              <dl className="summary">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" className="btn btn-ghost" onClick={() => backToForm()}>
                <Icon name="back" className="flip-rtl" />
                {b.edit}
              </button>

              <p className="notice">
                <Icon name="shield" size={20} />
                <span>{b.disclaimer}</span>
              </p>

              <div className="message-preview">
                <p className="message-preview-label" id="bk-message-label">
                  {b.messagePreview}
                </p>
                <div className="message-bubble" aria-labelledby="bk-message-label" tabIndex={0} dir={lang === 'ur' ? 'rtl' : 'ltr'} lang={lang}>
                  {message}
                </div>
              </div>

              <a className="btn btn-whatsapp btn-lg btn-block" href={waUrl} target="_blank" rel="noopener noreferrer" onClick={onContinue}>
                <WhatsAppIcon size={22} />
                {handoff ? b.openAgain : b.continue}
                <span className="sr-only">{t.common.opensNewTab}</span>
              </a>
              <p className="hint hint--center">{b.tapSendNote}</p>

              <div className="fallback">
                <p className="fallback-title">{b.fallbackTitle}</p>
                <p>{b.fallbackText}</p>
                <div className="fallback-actions">
                  <button type="button" className="btn btn-secondary" onClick={copyMessage}>
                    <Icon name="copy" />
                    {b.copy}
                  </button>
                  <a className="btn btn-secondary" href={business.phoneHref}>
                    <Icon name="phone" />
                    {t.common.call} <span dir="ltr">{business.phoneDisplay}</span>
                  </a>
                </div>
                <p className={`copy-status ${copyState}`} aria-live="polite">
                  {copyState === 'copied' ? b.copied : copyState === 'failed' ? b.copyFailed : ''}
                </p>
              </div>

              {handoff && (
                <button type="button" className="btn btn-ghost" onClick={startOver}>
                  {b.startOver}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
