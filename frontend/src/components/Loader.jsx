import { useLanguage } from '../i18n/LanguageContext';
const Loader = ({ className = 'h-5 w-5 border-2', label = 'Loading' }) => {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
      <span
        className={`inline-block animate-spin rounded-full border-white/30 border-t-white ${className}`}
        aria-hidden="true"
      />
      <span>{t(label)}</span>
    </span>
  );
};

export default Loader;
