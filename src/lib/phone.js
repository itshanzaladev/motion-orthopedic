// Pakistani mobile numbers (WhatsApp). Accepts common ways people type them:
//   0303 0507991, 03030507991, 303-0507991, +92 303 0507991,
//   923030507991, 0092 303 0507991, and Urdu/Arabic-Indic digits.

const DIGIT_MAP = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
};

export function toWesternDigits(value) {
  return String(value).replace(/[۰-۹٠-٩]/g, (d) => DIGIT_MAP[d]);
}

/**
 * Returns { e164: '+923030507991', display: '+92 303 0507991' } for a valid
 * Pakistani mobile number, or null.
 */
export function normalizePakistanMobile(input) {
  const raw = toWesternDigits(input || '').trim();
  if (!raw) return null;
  // Only digits, spaces, dashes, dots, brackets and a leading + are allowed.
  if (!/^\+?[\d\s\-().]+$/.test(raw)) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0092')) digits = digits.slice(4);
  else if (digits.startsWith('92') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0')) digits = digits.slice(1);
  // Mobile numbers: 3XX XXXXXXX (10 digits after the country code).
  if (!/^3\d{9}$/.test(digits)) return null;
  return {
    e164: `+92${digits}`,
    display: `+92 ${digits.slice(0, 3)} ${digits.slice(3)}`,
  };
}
