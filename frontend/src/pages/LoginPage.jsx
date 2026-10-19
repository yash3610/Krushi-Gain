import { useLanguage } from '../i18n/LanguageContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, sendOtpToPhone, verifyOtpAndLogin } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import OTPInput from '../components/OTPInput';

const LoginPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailFormData, setEmailFormData] = useState({ email: '', password: '' });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (event) => {
    setEmailFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setSuccessMessage('');
    setEmailLoading(true);

    try {
      const data = await loginUser(emailFormData);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (requestError) {
      setEmailError(requestError.response?.data?.message || 'Login failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setOtpError('');
    setSuccessMessage('');

    if (!phone.trim()) {
      setOtpError('Please enter your phone number with country code');
      return;
    }

    setSendOtpLoading(true);
    try {
      const data = await sendOtpToPhone({ phone });
      setOtpSent(true);
      setOtp('');
      setCooldown(data.resendInSeconds || 30);
      const message = data.devOtp
        ? `${data.message}. Use OTP: ${data.devOtp}`
        : data.message || 'OTP sent successfully on WhatsApp';
      setSuccessMessage(message);
    } catch (requestError) {
      setOtpError(requestError.response?.data?.message || 'Failed to send OTP');
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    setSuccessMessage('');

    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setVerifyOtpLoading(true);
    try {
      const data = await verifyOtpAndLogin({ phone, otp });
      login(data.token, data.user);
      setSuccessMessage('Login successful, redirecting...');
      navigate('/dashboard');
    } catch (requestError) {
      setOtpError(requestError.response?.data?.message || 'OTP verification failed');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-4 py-14 sm:px-0">
      <div className="w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-glass backdrop-blur-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{t("Login")}</h1>
        <p className="mb-6 text-sm text-slate-300">{t("Use email/password or WhatsApp OTP")}</p>

        {(successMessage && (
          <p className="mb-4 rounded-lg border border-emerald-200/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {t(successMessage)}
          </p>
        ))}

        <LoginForm
          formData={emailFormData}
          onChange={handleChange}
          onSubmit={handleEmailSubmit}
          loading={emailLoading}
          error={emailError}
        />

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
          <span className="h-px flex-1 bg-white/20" />
          <span>{t("OR")}</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <div className="space-y-3 rounded-2xl border border-emerald-300/30 bg-emerald-500/5 p-4">
          <input
            type="tel"
            name="phone"
            placeholder={t("Phone number (e.g. 919876543210)")}
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
            required
            className="w-full rounded-xl border border-emerald-300/40 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />

          <Button
            onClick={handleSendOtp}
            isLoading={sendOtpLoading}
            loadingText={t("Sending OTP...")}
            disabled={cooldown > 0}
            className="bg-green-500 text-green-950 hover:bg-green-400"
          >
            {t(otpSent ? (cooldown > 0 ? t('Resend OTP in {seconds}s', { seconds: cooldown }) : 'Resend OTP') : 'Send OTP')}
          </Button>

          {(otpSent && (
            <>
              <OTPInput value={otp} onChange={setOtp} disabled={verifyOtpLoading} />
              <Button
                onClick={handleVerifyOtp}
                isLoading={verifyOtpLoading}
                loadingText={t("Verifying OTP...")}
                className="bg-white text-slate-950 hover:bg-slate-100"
              >{t("Verify OTP")}</Button>
            </>
          ))}

          {(otpError && <p className="text-sm text-red-300">{t(otpError)}</p>)}
        </div>

        <p className="mt-5 text-sm text-slate-300">{t("New user?")}{t(' ')}
          <Link to="/signup" className="font-semibold text-emerald-200 hover:text-emerald-100">{t("Sign Up")}</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
