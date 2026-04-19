import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div;

const CTASection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-emerald-500/20 via-cyan-400/10 to-violet-500/20 p-8 shadow-glass backdrop-blur-xl md:p-12"
      >
        <div className="absolute -left-8 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            Ready to maximize your mandi profits?
          </h3>
          <p className="mt-3 max-w-2xl text-slate-200">
            Start a smart analysis in seconds and discover the best market to sell your crop for higher net returns.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Login
            </Link>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
};

export default CTASection;
