import { business } from '../config/business.js';
import { formatDate, formatTime } from './datetime.js';
import { normalizePakistanMobile } from './phone.js';

// Keeps numbers left-to-right inside an Urdu (RTL) message.
const ltr = (s) => `⁦${s}⁩`;

/** Ordered [label, value] rows describing the request in the current language. */
export function requestRows(form, t, lang) {
  const f = t.booking.fields;
  const phone = normalizePakistanMobile(form.phone);
  const phoneText = phone ? phone.display : form.phone.trim();
  const rows = [
    [f.visitType, form.visitType === 'home' ? t.booking.home : t.booking.clinic],
    [f.name, form.name.trim()],
    [f.phone, lang === 'ur' ? ltr(phoneText) : phoneText],
    [f.date, formatDate(form.date, lang)],
    [f.time, formatTime(form.time, lang)],
  ];
  if (form.visitType === 'home') rows.push([f.area, form.area.trim()]);
  rows.push([f.service, form.service ? t.services.items[form.service].name : t.booking.notSure]);
  if (form.note.trim()) rows.push([f.note, form.note.trim()]);
  return rows;
}

export function buildMessage(form, t, lang) {
  const m = t.booking.message;
  const lines = requestRows(form, t, lang).map(([label, value]) => `${label}: ${value}`);
  return [m.greeting, '', ...lines, '', m.closing].join('\n');
}

export function whatsappLink(message) {
  return `${business.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
