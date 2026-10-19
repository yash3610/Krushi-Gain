import { useLanguage } from '../i18n/LanguageContext';
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-300 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()}{t("Krushi Gain")}</p>
        <p>{t("Empowering farmers with smart mandi decisions.")}</p>
      </div>
    </footer>
  );
};

export default Footer;
