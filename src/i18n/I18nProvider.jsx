import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import ur from './ur.js';

const dictionaries = { en, ur };
const STORAGE_KEY = 'mo-lang'; // the only thing this site stores
const URDU_FONT =
  'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap';

const I18nContext = createContext(null);

function initialLang() {
  return document.documentElement.lang === 'ur' ? 'ur' : 'en';
}

function ensureUrduFont() {
  if (document.getElementById('font-ur')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'font-ur';
  link.href = URDU_FONT;
  document.head.appendChild(link);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const t = dictionaries[lang];

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    if (lang === 'ur') ensureUrduFont();
  }, [lang, t]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable – language still switches for this visit */
    }
  }, []);

  const value = useMemo(() => ({ lang, t, setLang, dir: lang === 'ur' ? 'rtl' : 'ltr' }), [lang, t, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
