import { useLanguage } from '../i18n/LanguageContext';
const contactCards = [
  {
    title: 'Phone Number',
    value: '+91 98765 43210',
    hint: 'Mon to Sat, 8 AM - 7 PM',
    icon: '📞',
  },
  {
    title: 'Email Address',
    value: 'support@krushigain.com',
    hint: 'Replies within 24 hours',
    icon: '✉️',
  },
];

const supportTopics = [
  'Mandi price clarification',
  'Dashboard and login support',
  'Partnership and field outreach',
  'Product demo for FPOs',
];

const getDelayClass = (index) => `fx-delay-${(index % 5) + 1}`;

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-amber-50/80 text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="fx-reveal relative overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1800&q=80"
            alt={t("Farmers working in crop rows")}
            className="h-[260px] w-full object-cover object-center md:h-[340px]"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">{t("Contact Us")}</p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">{t("Let's grow together")}</h1>
            <p className="mt-3 text-sm text-white/90 md:text-base">{t("Home / Contact")}</p>
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">{t("Contact Us Today")}</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{t("Let's talk about fresh, healthy, and sustainable farming")}</h2>
          <p className="mt-4 text-slate-600">{t("From crop planning to mandi-level profit optimization, our team is ready to support your next decision.")}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="fx-reveal fx-delay-1 fx-hover-lift overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?auto=format&fit=crop&w=1400&q=80"
              alt={t("Team working in farm")}
              className="h-[420px] w-full object-cover"
            />
            <div className="grid gap-3 border-t border-amber-100 bg-slate-900 p-4 sm:grid-cols-2 sm:p-5">
              {contactCards.map((card, index) => (
                <div key={card.title} className={`fx-reveal ${getDelayClass(index)} rounded-2xl border border-white/20 bg-white/10 p-4 text-white`}>
                  <p className="text-lg">{t(card.icon)}</p>
                  <h3 className="mt-2 text-sm font-semibold">{t(card.title)}</h3>
                  <p className="mt-1 text-sm text-amber-200">{t(card.value)}</p>
                  <p className="mt-1 text-xs text-slate-300">{t(card.hint)}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="fx-reveal fx-delay-2 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-4xl font-bold text-slate-900">{t("Get In Touch")}</h3>
            <p className="mt-4 text-slate-600">{t("Share your crop, mandi, or pricing questions and we'll guide you with clear next steps.")}</p>

            <form className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t("First Name *")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder={t("Last Name *")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                />
                <input
                  type="email"
                  placeholder={t("Email Address *")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                />
                <input
                  type="tel"
                  placeholder={t("Phone Number *")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                />
              </div>

              <textarea
                rows="6"
                placeholder={t("Any Additional Message...")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
              />

              <button
                type="button"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >{t("Send Message ↗")}</button>
            </form>
          </article>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">{t("How to reach us")}</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{t("We're here to help with mandi planning and farm visits")}</h2>
        </div>

        <div className="fx-reveal fx-delay-1 mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <iframe
            title={t("Office location map")}
            src="https://www.google.com/maps?q=Pune%20Maharashtra%20India&z=11&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {supportTopics.map((topic, index) => (
            <div key={topic} className={`fx-reveal ${getDelayClass(index)} fx-hover-lift rounded-2xl border border-amber-100 bg-white p-4`}>
              <p className="text-sm font-medium text-slate-700">• {t(topic)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
