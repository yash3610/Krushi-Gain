import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const SectionHeading = ({ title, subtitle, centered = true }) => {
  const { t } = useLanguage();
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <h2 className="text-3xl font-bold text-white md:text-4xl">{t(title)}</h2>
      {(subtitle && <p className="mt-3 text-slate-300 md:text-lg">{t(subtitle)}</p>)}
    </MotionDiv>
  );
};

export default SectionHeading;
