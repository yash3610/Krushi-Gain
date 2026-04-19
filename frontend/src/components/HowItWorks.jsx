import { motion } from 'framer-motion';

const steps = [
  'Farmer selects crop and current mandi.',
  'System collects mandi price data.',
  'Machine learning predicts prices.',
  'Nearby mandis are compared.',
  'Best mandi recommendation is generated.',
];

const HowItWorks = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">How It Works</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center shadow-glass backdrop-blur-lg"
          >
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-bold text-slate-900">
              {index + 1}
            </span>
            <p className="text-sm text-slate-200">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
