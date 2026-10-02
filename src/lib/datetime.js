// Date/time helpers that use the clinic's time zone (Asia/Karachi),
// regardless of the visitor's device time zone.
export const CLINIC_TZ = 'Asia/Karachi';

/** Current date and time in Karachi as { date: 'YYYY-MM-DD', time: 'HH:MM' }. */
export function nowInKarachi(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: CLINIC_TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

export function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value || '');
}

/** Validates a preferred date/time. Returns an error code or null. */
export function checkPreferredDateTime(date, time, now = new Date()) {
  const errors = {};
  const today = nowInKarachi(now);
  if (!date) errors.date = 'dateRequired';
  else if (!isValidIsoDate(date)) errors.date = 'dateInvalid';
  else if (date < today.date) errors.date = 'datePast';

  if (!time) errors.time = 'timeRequired';
  else if (!isValidTime(time)) errors.time = 'timeInvalid';
  else if (!errors.date && date === today.date && time <= today.time) errors.time = 'timePast';
  return errors;
}

// Formatting uses UTC on purpose: the values are wall-clock preferences,
// not instants, so no time-zone conversion should happen.
export function formatDate(isoDate, lang) {
  if (!isValidIsoDate(isoDate)) return isoDate;
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'ur' ? 'ur-PK' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    numberingSystem: 'latn',
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

// Urdu uses a time-of-day word before the 12-hour time, e.g. "شام 4:30".
function urduDayPeriod(h) {
  if (h >= 4 && h < 12) return 'صبح';
  if (h >= 12 && h < 16) return 'دوپہر';
  if (h >= 16 && h < 19) return 'شام';
  return 'رات';
}

export function formatTime(time, lang) {
  if (!isValidTime(time)) return time;
  const [h, min] = time.split(':').map(Number);
  if (lang === 'ur') {
    const h12 = h % 12 || 12;
    return `${urduDayPeriod(h)} ⁦${h12}:${String(min).padStart(2, '0')}⁩`;
  }
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
    numberingSystem: 'latn',
  }).format(new Date(Date.UTC(2000, 0, 1, h, min)));
}
