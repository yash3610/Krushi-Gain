import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{t("Profile")}</h1>
      <p className="mt-2 text-slate-200">{t("Manage your account information.")}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">{t("Name")}</p>
          <p className="mt-1 text-lg font-semibold text-white">{user?.name || '-'}</p>
        </div>
        <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">{t("Email")}</p>
          <p className="mt-1 text-lg font-semibold text-white">{user?.email || '-'}</p>
        </div>
        <div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">{t("Phone")}</p>
          <p className="mt-1 text-lg font-semibold text-white">{user?.phone || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
