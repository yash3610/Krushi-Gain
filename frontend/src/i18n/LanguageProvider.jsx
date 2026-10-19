import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { translate } from './translations';

const supported = ['en', 'hi', 'mr'];
const storageKey = 'krushi-gain-language';
const readLanguage = () => {
  try {
    const saved = localStorage.getItem(storageKey);
    return supported.includes(saved) ? saved : 'en';
  } catch { return 'en'; }
};

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem(storageKey, language); } catch { /* Storage may be disabled. */ }
  }, [language]);
  const changeLanguage = useCallback(value => {
    if (supported.includes(value)) setLanguage(value);
  }, []);
  const t = useCallback((text, params) => translate(language, text, params), [language]);
  const value = useMemo(() => ({ language, setLanguage: changeLanguage, t, locale: `${language}-IN` }), [language, changeLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
