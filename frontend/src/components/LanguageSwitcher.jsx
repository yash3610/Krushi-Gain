import { useId } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const id = useId();
  return (
    <div className="flex shrink-0 items-center gap-2 text-sm text-slate-200">
      <label htmlFor={id} className="sr-only">{t('Language')}</label>
      <select
        id={id}
        aria-label={t('Language')}
        value={language}
        onChange={event => setLanguage(event.target.value)}
        className="max-w-full rounded-lg border border-emerald-300/40 bg-slate-900 px-2 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <option value="en" lang="en">English</option>
        <option value="hi" lang="hi">हिंदी</option>
        <option value="mr" lang="mr">मराठी</option>
      </select>
    </div>
  );
}
