import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const keyStats = [
  { label: 'Trusted farmers', value: 12000, suffix: '+' },
  { label: 'Mandis connected', value: 120, suffix: '+' },
  { label: 'Avg uplift', value: 15, suffix: '%' },
  { label: 'States covered', value: 8, suffix: '' },
];

const formatStatValue = (value) => new Intl.NumberFormat('en-IN').format(value);

const AnimatedStatValue = ({ target, suffix = '', duration = 1400 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(progress * target));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, target]);

  return (
    <span>
      {formatStatValue(value)}
      {suffix}
    </span>
  );
};

const featureCards = [
  {
    title: 'Mandi Price Comparison',
    description: 'Compare crop prices in nearby mandis before you choose where to sell.',
    image:
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Transport Cost Accuracy',
    description: 'See final profit after logistics cost, not only mandi headline price.',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Smart Sell Timing',
    description: 'Track trends and pick the right day and location for better returns.',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Profit Snapshot',
    description: 'Get clear numbers on expected gain, best route, and action steps.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
];

const products = [
  { name: 'Organic Turmeric', price: '₹68/kg', rating: '4.8', image: '🧺' },
  { name: 'Fresh Honey', price: '₹280/ltr', rating: '4.7', image: '🍯' },
  { name: 'Dry Fruits Mix', price: '₹640/kg', rating: '4.9', image: '🥜' },
  { name: 'Green Vegetables', price: '₹32/kg', rating: '4.6', image: '🥬' },
];

const processSteps = [
  {
    title: 'Add your crop details',
    description: 'Enter crop quantity, current mandi and expected transport distance.',
  },
  {
    title: 'Compare mandi results',
    description: 'The platform shows rate differences and net payout estimates.',
  },
  {
    title: 'Pick best selling route',
    description: 'Choose mandi with strongest final margin and practical travel time.',
  },
  {
    title: 'Track earnings history',
    description: 'Review outcomes and improve selling strategy in future cycles.',
  },
];

const pricingPlans = [
  {
    name: 'Basic Farmer Plan',
    price: '₹99/month',
    details: ['Price comparison', '3 analyses per day', 'Simple profit summary'],
    popular: false,
  },
  {
    name: 'Smart Growth Plan',
    price: '₹199/month',
    details: ['Unlimited analyses', 'Transport-adjusted recommendations', 'Priority support'],
    popular: true,
  },
  {
    name: 'FPO / Group Plan',
    price: '₹699/month',
    details: ['Multi-user access', 'Shared dashboard', 'Bulk crop intelligence'],
    popular: false,
  },
];

const faqs = [
  {
    question: 'How does the platform calculate profit?',
    answer: 'It combines mandi price, quantity and estimated transport impact to show net return.',
  },
  {
    question: 'Can I use it for multiple crops?',
    answer: 'Yes, you can run separate analyses for each crop and compare opportunities quickly.',
  },
  {
    question: 'Is this useful for small farmers?',
    answer: 'Yes. Even small price improvements across a season can significantly improve income.',
  },
  {
    question: 'Do I need technical knowledge?',
    answer: 'No. The interface is simple and focused on clear recommendations in plain language.',
  },
];

const blogCards = [
  {
    title: 'How to read mandi trends before selling',
    image:
      'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Transport planning that protects crop margin',
    image:
      'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Data-first decisions for the next harvest',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
];

const getDelayClass = (index) => `fx-delay-${(index % 5) + 1}`;

const HomePage = () => {
  return (
    <div className="bg-amber-50/80 text-slate-900">
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1900&q=80"
          alt="Organic farming field"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative mx-auto grid min-h-[78vh] w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="fx-reveal fx-delay-1">
            <p className="inline-flex rounded-full bg-amber-300 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
              Discover the power of organic farming
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              Grow with confidence, sell with better margins.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
              Compare mandis, estimate true profit, and plan smarter selling decisions for every harvest.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900">
                Get started
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                Learn more
              </Link>
            </div>
          </div>

          <article className="fx-reveal fx-delay-2 fx-hover-lift overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-md">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
              alt="Farmer carrying fresh produce"
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="p-5 text-white">
              <p className="text-xs uppercase tracking-wide text-amber-200">Today&apos;s best opportunity</p>
              <h3 className="mt-2 text-lg font-semibold">Tomato batch can earn +₹18,000 extra in Pune mandi</h3>
            </div>
          </article>
        </div>
      </section>

      <section className="fx-reveal fx-delay-1 mx-auto -mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-lg sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {keyStats.map((item, index) => (
            <div key={item.label} className={`fx-reveal ${getDelayClass(index)} rounded-xl bg-amber-50 p-4`}>
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                <AnimatedStatValue target={item.value} suffix={item.suffix} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="fx-reveal mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80"
          alt="Farmer sorting vegetables"
          className="fx-hover-lift h-72 w-full rounded-3xl object-cover md:h-[420px]"
        />
        <div className="fx-reveal fx-delay-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">From soil to harvest</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Healthy markets for healthy farming outcomes.</h2>
          <p className="mt-4 text-slate-600">
            Farmers should not lose profit due to information gaps. Our tools reveal where and when to sell
            based on clear data.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Price visibility', 'Practical recommendations', 'Fast analysis', 'Seasonal intelligence'].map((item, index) => (
              <div key={item} className={`fx-reveal ${getDelayClass(index)} rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm font-medium text-slate-700`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h2 className="fx-reveal text-center text-3xl font-bold text-slate-900 md:text-4xl">Discover profitable tools</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature, index) => (
            <article key={feature.title} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift fx-card-premium rounded-2xl border border-slate-200 bg-white shadow-sm`}>
              <img src={feature.image} alt={feature.title} className="fx-card-image h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fx-reveal bg-slate-900 py-16 text-white lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">Committed to quality</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Reliable decisions for every season</h2>
            <p className="mt-4 text-slate-300">
              We blend agri-market data with practical planning so each selling decision is more predictable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Daily market refresh', value: '24x7' },
              { label: 'Recommendation confidence', value: '92%' },
              { label: 'Avg decision time', value: '<10 sec' },
            ].map((item, index) => (
              <div key={item.label} className={`fx-reveal ${getDelayClass(index)} rounded-xl border border-white/20 bg-white/10 p-4 text-center`}>
                <p className="text-xs text-slate-300">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-amber-300">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="fx-reveal text-center text-3xl font-bold text-slate-900 md:text-4xl">Discover products</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <article key={product.name} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift rounded-2xl border border-amber-100 bg-white p-4 text-center`}>
              <p className="text-5xl">{product.image}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{product.price}</p>
              <p className="mt-2 text-xs text-amber-700">Rating {product.rating}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fx-reveal bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">How we bring better outcomes</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className={`fx-reveal ${getDelayClass(index)} rounded-2xl border border-slate-200 bg-slate-50 p-5`}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-sm font-semibold text-slate-900">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal bg-slate-900 py-16 text-white lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Enjoy consistent value with simple plans</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <article
                key={plan.name}
                className={`fx-reveal ${getDelayClass(index)} fx-hover-lift rounded-2xl border p-6 ${
                  plan.popular ? 'border-amber-300 bg-amber-300 text-slate-900' : 'border-white/20 bg-white/10'
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold">{plan.price}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.details.map((detail) => (
                    <li key={detail}>• {detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8 lg:py-20">
        <div className="fx-reveal fx-delay-1">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Simple, clear answers</h2>
          <div className="mt-7 space-y-3">
            {faqs.map((item, index) => (
              <details key={item.question} className={`fx-reveal ${getDelayClass(index)} rounded-xl border border-slate-200 bg-white p-4`}>
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80"
          alt="Farmer in crop field"
          className="fx-hover-lift h-80 w-full rounded-3xl object-cover lg:h-full"
        />
      </section>

      <section className="fx-reveal bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">Dive into educational reads</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {blogCards.map((card, index) => (
              <article key={card.title} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift overflow-hidden rounded-2xl border border-slate-200 bg-white`}>
                <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                  <Link to="/blogs" className="mt-3 inline-block text-sm font-medium text-amber-700">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
