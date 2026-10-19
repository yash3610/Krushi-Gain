import { useLanguage } from '../i18n/LanguageContext';
const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.52 3.48A11.84 11.84 0 0 0 12.06 0C5.48 0 .1 5.37.1 11.95c0 2.1.55 4.15 1.58 5.96L0 24l6.26-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.95-5.37 11.95-11.95 0-3.19-1.24-6.19-3.5-8.41Zm-8.45 18.34h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.72.98 1-3.63-.23-.37a9.9 9.9 0 0 1-1.51-5.25C2.18 6.46 6.62 2 12.06 2c2.65 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7c0 5.44-4.44 9.92-9.89 9.92Zm5.44-7.4c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.3-.79.99-.96 1.2-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.51a8.96 8.96 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.66-.94-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.53 0 1.5 1.08 2.94 1.23 3.15.15.2 2.11 3.22 5.1 4.52.71.31 1.27.5 1.7.64.71.22 1.35.19 1.86.12.57-.09 1.8-.74 2.06-1.45.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.58-.35Z" />
  </svg>
);

const WhatsAppShareButton = ({
  analysisData,
  phoneNumber = '',
  onShare,
  isSending = false,
  statusMessage = '',
  statusType = 'success',
}) => {
  const { t } = useLanguage();
  const handleWhatsAppShare = async () => {
    if (!onShare || isSending) {
      return;
    }

    await onShare(analysisData);
  };

  const statusColorClass = statusType === 'error' ? 'text-red-300' : 'text-emerald-200';

  return (
    <div className="w-full rounded-2xl border border-emerald-300/30 bg-emerald-500/5 p-4">
      <p className="mb-3 text-sm text-emerald-100">{t("Send to my WhatsApp")}{t(phoneNumber ? `(${phoneNumber})` : '')}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleWhatsAppShare}
          disabled={isSending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/40 bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-400 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {(isSending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
          ) : (
            <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          ))}
          <span>{t(isSending ? 'Sending...' : 'Send Result on WhatsApp')}</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppShare}
          disabled={isSending}
          aria-label={t("Share result on WhatsApp")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/20 text-white transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </button>
      </div>

      {(statusMessage ? <p className={`mt-2 text-xs ${statusColorClass}`}>{t(statusMessage)}</p> : null)}
    </div>
  );
};

export default WhatsAppShareButton;