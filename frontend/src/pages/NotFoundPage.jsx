import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-slate-200">{t("The page you are looking for does not exist.")}</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >{t("Back to Home")}</Link>
    </div>
  );
};

export default NotFoundPage;
