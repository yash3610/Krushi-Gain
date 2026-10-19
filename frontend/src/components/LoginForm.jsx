import { useLanguage } from '../i18n/LanguageContext';
import Button from './Button';

const LoginForm = ({ formData, onChange, onSubmit, loading, error }) => {
  const { t } = useLanguage();
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder={t("Email")}
        value={formData.email}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder={t("Password")}
        value={formData.password}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
      />
      {(error && <p className="text-sm text-red-300">{t(error)}</p>)}
      <Button type="submit" isLoading={loading} loadingText={t("Logging in...")}>{t("Login")}</Button>
    </form>
  );
};

export default LoginForm;
