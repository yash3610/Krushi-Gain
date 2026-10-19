import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const FeatureCard = ({ title, description }) => {
  const { t } = useLanguage();
  return (
    <MotionDiv
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-glass backdrop-blur-lg"
    >
      <h3 className="mb-3 text-xl font-semibold text-white">{t(title)}</h3>
      <p className="text-sm leading-relaxed text-slate-200">{t(description)}</p>
    </MotionDiv>
  );
};

export default FeatureCard;
