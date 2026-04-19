import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const MotionDiv = motion.div;

const highlightData = [
  { mandi: 'Mumbai', crop: 'Tomato', gain: '+18%', trend: 85 },
  { mandi: 'Pune', crop: 'Onion', gain: '+11%', trend: 70 },
  { mandi: 'Nagpur', crop: 'Soybean', gain: '+14%', trend: 78 },
];

const MarketHighlights = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        title="Live Market Pulse"
        subtitle="Track high-potential mandi opportunities and act quickly when profits peak."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {highlightData.map((item, index) => (
          <MotionDiv
            key={`${item.mandi}-${item.crop}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-glass backdrop-blur-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Top Mandi</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{item.mandi}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.crop}</p>
              </div>
              <span className="rounded-lg bg-emerald-400/20 px-3 py-1 text-sm font-semibold text-emerald-300">
                {item.gain}
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-slate-300">
                <span>Profit confidence</span>
                <span>{item.trend}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700/60">
                <MotionDiv
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.trend}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                />
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default MarketHighlights;
