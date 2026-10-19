import { useLanguage } from '../i18n/LanguageContext';
import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { analyzeMandiProfit } from '../services/mandiService';
import { sendAnalysisResultOnWhatsApp } from '../services/whatsappService';
import { useAuth } from '../hooks/useAuth';
import WhatsAppShareButton from '../components/WhatsAppShareButton';

const crops = ['Tomato', 'Onion', 'Wheat', 'Soybean'];
const mandis = ['Nashik', 'Pune', 'Mumbai', 'Nagpur'];

const ResultCard = ({ title, value }) => {
  const { t } = useLanguage();
  return (<div className="rounded-xl border border-white/20 bg-slate-900/40 p-4">
    <p className="text-sm text-slate-300">{t(title)}</p>
    <p className="mt-1 text-lg font-semibold text-white">{t(value)}</p>
  </div>);
};

const MandiAnalysisPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    currentMandi: 'Nashik',
    quantity: '',
    transportCostPerKm: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const [whatsAppStatus, setWhatsAppStatus] = useState('');
  const [whatsAppStatusType, setWhatsAppStatusType] = useState('success');

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    setWhatsAppStatus('');

    try {
      const data = await analyzeMandiProfit(formData);
      setResult(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Analysis failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResultOnWhatsApp = async () => {
    if (!result) {
      return;
    }

    setWhatsAppStatus('');
    setWhatsAppStatusType('success');

    const payload = {
      phone: user?.phone || '',
      crop: formData.crop,
      quantity: Number(formData.quantity),
      currentMandi: formData.currentMandi,
      currentPrice: result.currentMandiPrice,
      recommendedMandi: result.recommendedMandi,
      predictedPrice: result.predictedPrice,
      distance: result.distance,
      transportCost: result.transportCost,
      profit: result.expectedProfit,
    };

    setIsSendingWhatsApp(true);
    try {
      const response = await sendAnalysisResultOnWhatsApp(payload);
      setWhatsAppStatus(response.message || 'Result sent on WhatsApp');
      setWhatsAppStatusType('success');
    } catch (requestError) {
      setWhatsAppStatus(requestError.response?.data?.message || 'Failed to send result on WhatsApp');
      setWhatsAppStatusType('error');
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{t("Mandi Analysis")}</h1>
      <p className="mt-2 text-slate-200">{t("Enter crop and mandi details to compute expected profit.")}</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-200">{t("Crop Name")}</label>
          <select
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white focus:border-emerald-300 focus:outline-none"
          >
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {t(crop)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-200">{t("Current Mandi")}</label>
          <select
            name="currentMandi"
            value={formData.currentMandi}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white focus:border-emerald-300 focus:outline-none"
          >
            {mandis.map((mandi) => (
              <option key={mandi} value={mandi}>
                {t(mandi)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-200">{t("Quantity")}</label>
          <input
            type="number"
            min="1"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-200">{t("Transport Cost per KM")}</label>
          <input
            type="number"
            min="0"
            name="transportCostPerKm"
            value={formData.transportCostPerKm}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {t(loading ? 'Analyzing...' : 'Analyze Profit')}
          </button>
        </div>
      </form>

      {(error && <p className="mt-4 text-sm text-red-300">{t(error)}</p>)}

      {(result && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard title={t("Crop Name")} value={formData.crop} />
            <ResultCard title={t("Quantity")} value={`${formData.quantity} ${t('Quintal')}`} />
            <ResultCard title={t("Current Mandi")} value={formData.currentMandi} />
            <ResultCard title={t("Current Mandi Price")} value={`₹ ${result.currentMandiPrice}`} />
            <ResultCard title={t("Predicted Price")} value={`₹ ${result.predictedPrice}`} />
            <ResultCard title={t("Recommended Mandi")} value={result.recommendedMandi} />
            <ResultCard title={t("Distance")} value={`${result.distance} ${t('km')}`} />
            <ResultCard title={t("Transport Cost")} value={`₹ ${result.transportCost}`} />
            <ResultCard title={t("Expected Profit")} value={`₹ ${result.expectedProfit}`} />
          </div>

          <WhatsAppShareButton
            analysisData={result}
            phoneNumber={user?.phone || ''}
            onShare={handleSendResultOnWhatsApp}
            isSending={isSendingWhatsApp}
            statusMessage={whatsAppStatus}
            statusType={whatsAppStatusType}
          />

          <div className="h-72 w-full min-w-0 rounded-2xl border border-white/20 bg-slate-900/40 p-4">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
              <BarChart data={result.comparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="mandi" tickFormatter={t} stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend />
                <Bar dataKey="netProfit" fill="#34d399" name={t("Net Profit")} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MandiAnalysisPage;
