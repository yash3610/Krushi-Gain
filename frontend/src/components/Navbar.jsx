import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const publicMenu = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap gap-3 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-white sm:text-xl">{t("Krushi Gain")}</Link>

        <div className="hidden items-center gap-6 md:flex">
          {publicMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-emerald-300' : 'text-slate-200 hover:text-white'}`
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LanguageSwitcher />
          {(!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-emerald-300/40 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/10"
              >{t("Login")}</Link>
              <Link
                to="/signup"
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >{t("Sign Up")}</Link>
            </>
          ))}
          {(isAuthenticated && (
            <Link
              to="/dashboard"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >{t("Dashboard")}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
