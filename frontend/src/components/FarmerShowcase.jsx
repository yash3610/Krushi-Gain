import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const MotionDiv = motion.div;

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    title: 'Field Readiness',
    desc: 'Farmers capture crop health and expected yield before mandi planning.',
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
    title: 'Smart Harvest Selling',
    desc: 'Market-linked decisions help maximize returns at the right mandi.',
  },
  {
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    title: 'Data-Driven Growth',
    desc: 'Technology empowers villages with transparent pricing insights.',
  },
];

const FarmerShowcase = () => {
  const { t } = useLanguage();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        title={t("Built for Real Farmers")}
        subtitle={t("From field to market, every decision is supported with live pricing and profit-focused analysis.")}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {gallery.map((item, index) => (
          <MotionDiv
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-glass backdrop-blur-md"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={item.src}
                alt={t(item.title)}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white">{t(item.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{t(item.desc)}</p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default FarmerShowcase;
