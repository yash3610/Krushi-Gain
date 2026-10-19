import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const sidebarMenu = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Smart Mandi Finder', to: '/dashboard/smart-mandi' },
  { label: 'Mandi Analysis', to: '/dashboard/analysis' },
  { label: 'My History', to: '/dashboard/history' },
  { label: 'Profile', to: '/dashboard/profile' },
];

const DashboardLayout = () => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-[1400px] gap-6 p-3 sm:p-4 md:p-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-72 flex-col rounded-3xl border border-white/15 bg-slate-900/80 p-6 shadow-glass backdrop-blur-xl md:flex md:top-6 md:h-[calc(100vh-3rem)]">
          <div>
            <Link
              to="/"
              className="inline-flex rounded-md text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 transition hover:text-emerald-200"
            >{t("KG")}</Link>
            <h2 className="mt-2 text-xl font-bold">{t("Krushi Gain Dashboard")}</h2>
            <p className="mt-1 text-sm text-slate-300">{t("Smart mandi intelligence")}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">{t("Logged in as")}</p>
            <p className="mt-1 text-sm font-semibold text-white">{user?.name || t('Farmer')}</p>
            <p className="text-xs text-slate-300">{user?.email || 'user@krushigain.app'}</p>
          </div>

          <nav className="mt-6 flex-1 space-y-2">
            {sidebarMenu.map((item) => (
              <NavLink
                key={item.to}
                end={item.to === '/dashboard'}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20'
                      : 'text-slate-200 hover:bg-white/10'
                  }`
                }
              >
                {t(item.label)}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-red-300/30 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-400/10"
          >{t("Logout")}</button>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 space-y-3 md:hidden">
            <div className="rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 shadow-glass backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Link
                    to="/"
                    className="inline-flex rounded-md text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 transition hover:text-emerald-200"
                  >{t("KG")}</Link>
                  <p className="mt-1 text-sm font-semibold text-white">{user?.name || t('Farmer')}</p>
                  <p className="text-xs text-slate-300">{user?.email || 'user@krushigain.app'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-300/30 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-400/10"
                >{t("Logout")}</button>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-slate-900/70 p-2 shadow-glass backdrop-blur-xl">
              {sidebarMenu.map((item) => (
                <NavLink
                  key={item.to}
                  end={item.to === '/dashboard'}
                  to={item.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition ${
                      isActive ? 'bg-emerald-500 text-slate-900' : 'text-slate-200 hover:bg-white/10'
                    }`
                  }
                >
                  {t(item.label)}
                </NavLink>
              ))}
            </nav>
          </div>

          <header className="mb-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-glass backdrop-blur-xl md:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{t("Overview")}</p>
                <h1 className="text-xl font-bold text-white">{t("Profit Command Center")}</h1>
              </div>
              <LanguageSwitcher />
              <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">{t("Today's market window is active")}</div>
            </div>
          </header>

          <main className="rounded-3xl border border-white/15 bg-slate-900/50 p-4 shadow-glass backdrop-blur-xl sm:p-5 md:p-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
