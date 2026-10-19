import { useLanguage } from '../i18n/LanguageContext';
import { useMemo, useState } from 'react';
import { getSmartMandis } from '../services/mandiService';
import { sendSmartMandiResultOnWhatsApp } from '../services/whatsappService';

const INITIAL_FORM = {
  commodity: '',
  state: 'Maharashtra',
  sortOption: 'high-to-low',
};



const sortMandis = (list, mode) => {
  const sorted = [...list];

  if (mode === 'low-to-high') {
    sorted.sort((a, b) => a.modal_price - b.modal_price);
  } else {
    sorted.sort((a, b) => b.modal_price - a.modal_price);
  }

  return sorted;
};

const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.52 3.48A11.84 11.84 0 0 0 12.06 0C5.48 0 .1 5.37.1 11.95c0 2.1.55 4.15 1.58 5.96L0 24l6.26-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.95-5.37 11.95-11.95 0-3.19-1.24-6.19-3.5-8.41Zm-8.45 18.34h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.72.98 1-3.63-.23-.37a9.9 9.9 0 0 1-1.51-5.25C2.18 6.46 6.62 2 12.06 2c2.65 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7c0 5.44-4.44 9.92-9.89 9.92Zm5.44-7.4c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.3-.79.99-.96 1.2-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.51a8.96 8.96 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.66-.94-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.53 0 1.5 1.08 2.94 1.23 3.15.15.2 2.11 3.22 5.1 4.52.71.31 1.27.5 1.7.64.71.22 1.35.19 1.86.12.57-.09 1.8-.74 2.06-1.45.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.58-.35Z" />
  </svg>
);

const SmartMandiFinderPage = () => {
  const { t, locale } = useLanguage();
  const formatPrice = value => `₹ ${Number(value || 0).toLocaleString(locale)}/${t('quintal')}`;
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: 'info' });
  const [results, setResults] = useState([]);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const sortedResults = useMemo(() => sortMandis(results, formData.sortOption), [results, formData.sortOption]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const commodity = formData.commodity.trim();
    const state = formData.state.trim() || 'Maharashtra';

    if (!commodity) {
      setStatus({ message: 'Please enter a crop name.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', type: 'info' });
    setResults([]);

    try {
      const data = await getSmartMandis({ commodity, state });
      const mandiList = Array.isArray(data?.mandis) ? data.mandis : [];

      if (!mandiList.length) {
        setStatus({ message: 'No data found for {commodity} in {state}.', params: { commodity, state }, type: 'error' });
        return;
      }

      setResults(mandiList);
      setStatus({
        message: 'Showing top {count} mandis for {commodity} in {state}.',
        params: { count: mandiList.length, commodity, state },
        type: 'success',
      });
    } catch (error) {
      setStatus({
        message: error?.response?.data?.message || error.message || 'Something went wrong while fetching data.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setResults([]);
    setStatus({ message: 'Ready for next search.', type: 'success' });
    setFormData((prev) => ({ ...prev, commodity: '' }));
  };

  const handleShareWhatsApp = () => {
    if (!sortedResults.length || isSendingWhatsApp) {
      return;
    }

    const payload = {
      commodity: formData.commodity.trim(),
      state: formData.state.trim() || 'Maharashtra',
      mandis: sortedResults.slice(0, 5).map((mandi) => ({
        market: mandi.market,
        district: mandi.district,
        modal_price: mandi.modal_price,
      })),
    };

    setIsSendingWhatsApp(true);

    sendSmartMandiResultOnWhatsApp(payload)
      .then((response) => {
        setStatus({ message: response?.message || 'Smart mandi result sent on WhatsApp.', type: 'success' });
      })
      .catch((error) => {
        setStatus({
          message: error?.response?.data?.message || 'Failed to send smart mandi result on WhatsApp',
          type: 'error',
        });
      })
      .finally(() => {
        setIsSendingWhatsApp(false);
      });
  };

  return (
    <section className="space-y-6 text-slate-100">
      <div className="rounded-2xl border border-emerald-300/25 bg-emerald-500/10 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">{t("Market Intelligence")}</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">{t("Smart Mandi Finder")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">{t("Enter a crop name, compare current mandi prices, and choose the best selling option.")}</p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4 shadow-glass md:p-6">
        <form className="grid gap-4 md:grid-cols-4 md:items-end" onSubmit={handleSearch}>
          <div className="md:col-span-1">
            <label htmlFor="commodity" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">{t("Crop Name")}</label>
            <input
              id="commodity"
              name="commodity"
              type="text"
              placeholder={t("e.g. Tomato, Onion")}
              required
              value={formData.commodity}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/20 bg-slate-950/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="state" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">{t("State")}</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full rounded-xl border border-white/20 bg-slate-950/80 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="sortOption" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">{t("Sort By")}</label>
            <select
              id="sortOption"
              name="sortOption"
              value={formData.sortOption}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/20 bg-slate-950/80 px-3 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
            >
              <option value="high-to-low">{t("Price: High to Low")}</option>
              <option value="low-to-high">{t("Price: Low to High")}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-[46px] rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-70"
          >
            {t(isLoading ? 'Finding...' : 'Find Best Mandi')}
          </button>
        </form>

        {(status.message ? (
          <p
            className={`mt-3 text-sm ${
              status.type === 'error' ? 'text-red-300' : status.type === 'success' ? 'text-emerald-300' : 'text-slate-300'
            }`}
          >
            {t(status.message, status.params)}
          </p>
        ) : null)}
      </div>

      {(isLoading ? (
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/60 p-4 text-sm text-slate-300">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-300/40 border-t-emerald-400" />{t("Fetching latest mandi prices...")}</div>
      ) : null)}

      {(!!sortedResults.length && (
        <div className="space-y-4 rounded-2xl border border-white/15 bg-slate-900/60 p-4 md:p-6" aria-live="polite">
          <div className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-4">
            <h3 className="text-base font-semibold text-emerald-200">{t("Top 1 Best Mandi")}</h3>
            <p className="mt-1 text-sm text-slate-200">
              <strong>{t(sortedResults[0].market)}</strong>, {t(sortedResults[0].district)}, {t(sortedResults[0].state)}
              <br />{t("Best modal price:")}{' '}<strong>{formatPrice(sortedResults[0].modal_price)}</strong>
            </p>
          </div>

          <h3 className="text-lg font-semibold text-white">{t("Top 5 Best Mandis")}</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sortedResults.map((mandi, index) => (
              <article
                key={`${mandi.market}-${mandi.district}-${index}`}
                className={`rounded-xl border p-4 transition hover:-translate-y-0.5 ${
                  index === 0
                    ? 'border-emerald-300/40 bg-emerald-500/10'
                    : 'border-white/15 bg-slate-950/50 hover:border-emerald-300/25'
                }`}
              >
                <h4 className="text-base font-semibold text-white">{t(mandi.market)}</h4>
                <p className="mt-1 text-xs text-slate-400">
                  {t(mandi.district)}, {t(mandi.state)}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-200">
                  <li>
                    <strong>{t("Min:")}</strong> {formatPrice(mandi.min_price)}
                  </li>
                  <li>
                    <strong>{t("Max:")}</strong> {formatPrice(mandi.max_price)}
                  </li>
                  <li>
                    <strong>{t("Modal:")}</strong> {formatPrice(mandi.modal_price)}
                  </li>
                </ul>
              </article>
            ))}
          </div>

          <div className="rounded-xl border border-white/15 bg-slate-950/50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-300">{t("Price Comparison")}</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {sortedResults.map((mandi, index) => (
                <li key={`${mandi.market}-${index}`}>
                  {index + 1}. {t(mandi.market)} ({t(mandi.district)}) - {formatPrice(mandi.modal_price)}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              disabled={isSendingWhatsApp}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-green-400"
            >
              {isSendingWhatsApp ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              ) : (
                <WhatsAppIcon className="h-4 w-4" />
              )}
              {isSendingWhatsApp ? 'Sending...' : 'Send to WhatsApp'}
            </button>

            <button
              type="button"
              onClick={handleSearchAgain}
              className="h-[46px] rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >{t("Search Again")}</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SmartMandiFinderPage;
