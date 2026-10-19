import { useLanguage } from '../i18n/LanguageContext';
const LoadingScreen = () => {
  const { t } = useLanguage();
  return (
    <section className="animate-loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-lime-50 to-green-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-emerald-200/70 bg-white/70 p-8 text-center shadow-2xl backdrop-blur-md sm:p-10">
        <div className="mx-auto mb-6 flex h-40 items-end justify-center">
          <div className="relative h-36 w-36">
            <div className="absolute bottom-0 left-1/2 h-10 w-20 -translate-x-1/2 rounded-t-[22px] border border-amber-700/20 bg-gradient-to-b from-amber-500 to-amber-700 shadow-lg" />

            <div className="absolute bottom-9 left-1/2 h-16 w-2 origin-bottom -translate-x-1/2 rounded-full bg-emerald-600 animate-grow-stem" />

            <div className="absolute bottom-[4.5rem] left-[2.9rem] h-5 w-8 origin-right rounded-full bg-emerald-500/95 animate-leaf-left" />
            <div className="absolute bottom-[5rem] right-[2.8rem] h-5 w-8 origin-left rounded-full bg-emerald-400/95 animate-leaf-right" />

            <div className="absolute bottom-[6.1rem] left-[3.2rem] h-4 w-7 origin-bottom rounded-full bg-green-500/95 animate-leaf-top-left" />
            <div className="absolute bottom-[6.1rem] right-[3.1rem] h-4 w-7 origin-bottom rounded-full bg-green-400/95 animate-leaf-top-right" />

            <div className="absolute bottom-[7.1rem] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-lime-500 animate-seed-pop" />
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">{t("Krushi Gain")}</h1>
        <p className="mt-3 text-base font-medium text-emerald-700 sm:text-lg">{t("Analyzing Mandi Prices...")}</p>
      </div>
    </section>
  );
};

export default LoadingScreen;
