const coreValues = [
  {
    title: 'Farmer First',
    description: 'Every workflow is built to save farmer time and improve real take-home profit.',
    icon: '🌾',
  },
  {
    title: 'Data Driven',
    description: 'Price recommendations are based on mandi trends, seasonality, and transport impact.',
    icon: '📈',
  },
  {
    title: 'Practical Advice',
    description: 'Simple decisions, clear numbers, and actions that can be applied on the same day.',
    icon: '🧭',
  },
];

const impactStats = [
  { label: 'Mandis monitored', value: '120+' },
  { label: 'Avg extra profit', value: '15%' },
  { label: 'Daily analyses', value: '5,000+' },
  { label: 'Farmer trust score', value: '4.8/5' },
];

const team = [
  {
    name: 'Aarav Kulkarni',
    role: 'Product Lead',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Meera Joshi',
    role: 'Data Scientist',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rohan Patil',
    role: 'Market Analyst',
    image:
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Anita More',
    role: 'Farmer Outreach',
    image:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=800&q=80',
  },
];

const getDelayClass = (index) => `fx-delay-${(index % 5) + 1}`;

const AboutPage = () => {
  return (
    <div className="bg-amber-50/80 text-slate-900">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="fx-reveal fx-delay-1">
          <p className="inline-flex rounded-full bg-amber-200 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
            About our mission
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            From soil to selling, we help farmers earn better.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
            Krushi Gain helps growers compare mandi prices, estimate transport impact,
            and choose the location that gives the best final return instead of guessing.
          </p>
          <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {impactStats.map((item, index) => (
              <div key={item.label} className={`fx-reveal ${getDelayClass(index)} rounded-xl border border-amber-200 bg-white p-3`}>
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fx-reveal fx-delay-2 fx-hover-lift overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1400&q=80"
            alt="Farmer harvesting fresh vegetables"
            className="h-[340px] w-full object-cover md:h-[500px]"
          />
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-3xl border border-amber-100 bg-white p-6 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900">What drives our platform</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            We focus on clear, useful intelligence that farmers can trust in real market situations.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {coreValues.map((value, index) => (
              <div key={value.title} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift rounded-2xl border border-slate-200 bg-slate-50 p-5`}>
                <p className="text-2xl">{value.icon}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal bg-slate-900 py-14 text-white lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">Committed to rural growth</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Our goal is to make mandi planning simple and accessible, so farmers can increase confidence in
            selling decisions and protect seasonal income.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'Real-time comparisons between nearby mandis',
              'Profit views with transport-adjusted outcomes',
              'Actionable recommendations in simple language',
            ].map((item, index) => (
              <div key={item} className={`fx-reveal ${getDelayClass(index)} rounded-2xl border border-white/20 bg-white/10 p-5`}>
                <p className="text-sm text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Meet the team</h2>
          <p className="max-w-xl text-slate-600">Engineers and analysts building practical tools for farmers.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <article key={member.name} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift overflow-hidden rounded-2xl border border-slate-200 bg-white`}>
              <img src={member.image} alt={member.name} className="h-52 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fx-reveal bg-amber-100 py-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Our promise</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Better decisions for every harvest season.
            </h3>
          </div>
          <p className="max-w-2xl text-slate-700">
            We continue improving the platform so every farmer can confidently pick the mandi that delivers
            the highest net return.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
