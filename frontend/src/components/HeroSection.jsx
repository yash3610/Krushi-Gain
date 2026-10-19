import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-hero-pattern">
      <div className="absolute -left-12 top-16 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="mx-auto grid min-h-[92vh] w-full max-w-7xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 inline-block rounded-full border border-emerald-200/30 bg-emerald-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">{t("Smart Agri Intelligence")}</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight text-white md:text-7xl">{t("Krushi Gain")}</h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-200 md:text-xl">{t("A smart platform that helps farmers maximize their crop profits by finding the best mandi using price comparison and smart analysis.")}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >{t("Get Started")}</Link>
            <Link
              to="/about"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >{t("Learn More")}</Link>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: 'Mandis Tracked', value: '120+' },
              { label: 'Avg Profit Uplift', value: '15%' },
              { label: 'Analysis Speed', value: '< 10 sec' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
                <p className="text-xs text-slate-300">{t(item.label)}</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">{t(item.value)}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="animate-float overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-glass backdrop-blur-xl"
        >
          <div className="relative h-64 md:h-72">
            <img
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
              alt={t("Farmer in field")}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-slate-900/50 p-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-emerald-200">{t("Farmer Success Story")}</p>
              <p className="mt-1 text-sm text-white">{t("\"Data-based mandi selection increased my net returns this season.\"")}</p>
            </div>
          </div>

          <div className="p-7">
            <h3 className="mb-4 text-lg font-semibold text-white">{t("Profit Snapshot")}</h3>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex justify-between rounded-lg bg-slate-900/50 p-3">
                <span>{t("Current mandi value")}</span>
                <span className="font-semibold text-white">₹ 2,10,000</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-900/50 p-3">
                <span>{t("Best mandi value")}</span>
                <span className="font-semibold text-emerald-300">₹ 2,37,000</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-900/50 p-3">
                <span>{t("Estimated extra profit")}</span>
                <span className="font-semibold text-emerald-300">+₹ 27,000</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm text-emerald-100">{t("Suggested action: Route Tomato stock to Mumbai mandi this week.")}</div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
