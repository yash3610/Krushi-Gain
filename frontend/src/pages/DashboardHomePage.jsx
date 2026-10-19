import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const stats = [
  { label: 'Today Expected Profit', value: '₹ 99,680', delta: '+12.4%' },
  { label: 'Best Performing Crop', value: 'Tomato', delta: '+8.1%' },
  { label: 'Mandis Tracked', value: '18', delta: '+3 today' },
  { label: 'Recommendation Accuracy', value: '92%', delta: '+1.3%' },
];

const trendData = [
  { day: 'Mon', profit: 62000, predicted: 65000 },
  { day: 'Tue', profit: 69000, predicted: 70000 },
  { day: 'Wed', profit: 71000, predicted: 73000 },
  { day: 'Thu', profit: 76000, predicted: 78500 },
  { day: 'Fri', profit: 84000, predicted: 86000 },
  { day: 'Sat', profit: 93000, predicted: 95000 },
  { day: 'Sun', profit: 99680, predicted: 101200 },
];

const topMandis = [
  { mandi: 'Mumbai', crop: 'Tomato', netProfit: '₹ 99,680', distance: '110 km' },
  { mandi: 'Pune', crop: 'Onion', netProfit: '₹ 1,12,050', distance: '45 km' },
  { mandi: 'Nagpur', crop: 'Soybean', netProfit: '₹ 2,14,300', distance: '160 km' },
];

const DashboardHomePage = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{t("Dashboard")}</h2>
        <p className="mt-1 text-slate-300">{t("Monitor profits, compare mandi opportunities, and plan smarter selling decisions.")}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-sm text-slate-300">{t(item.label)}</p>
            <p className="mt-2 text-2xl font-bold text-white">{t(item.value)}</p>
            <p className="mt-1 text-sm font-medium text-emerald-300">{t(item.delta)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">{t("Weekly Profit Trend")}</h3>
            <span className="text-xs text-slate-400">{t("Last 7 days")}</span>
          </div>
          <div className="h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" tickFormatter={t} stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#34d399"
                  fill="url(#profitColor)"
                  name={t("Net Profit")}
                />
                <Area type="monotone" dataKey="predicted" stroke="#38bdf8" fillOpacity={0} name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <h3 className="text-base font-semibold text-white">{t("Action Center")}</h3>
          <p className="mt-1 text-sm text-slate-300">{t("Quick actions for daily operations.")}</p>

          <div className="mt-4 space-y-3">
            <Link
              to="/dashboard/analysis"
              className="block rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20"
            >{t("Start new mandi analysis")}</Link>
            <Link
              to="/dashboard/history"
              className="block rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >{t("Review analysis history")}</Link>
            <Link
              to="/dashboard/profile"
              className="block rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >{t("Update profile details")}</Link>
          </div>

          <div className="mt-5 rounded-xl border border-white/15 bg-slate-900/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">{t("Recommendation")}</p>
            <p className="mt-1 text-sm text-white">{t("Tomato is trending higher in Mumbai today.")}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{t("Top Mandi Opportunities")}</h3>
          <span className="text-xs text-slate-400">{t("Live snapshot")}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-300">
              <tr>
                <th className="pb-2 pr-4 font-medium">{t("Mandi")}</th>
                <th className="pb-2 pr-4 font-medium">{t("Crop")}</th>
                <th className="pb-2 pr-4 font-medium">{t("Distance")}</th>
                <th className="pb-2 pr-4 font-medium">{t("Estimated Net Profit")}</th>
              </tr>
            </thead>
            <tbody>
              {topMandis.map((item) => (
                <tr key={`${item.mandi}-${item.crop}`} className="border-t border-white/10 text-slate-100">
                  <td className="py-3 pr-4 font-medium">{t(item.mandi)}</td>
                  <td className="py-3 pr-4">{t(item.crop)}</td>
                  <td className="py-3 pr-4">{t(item.distance)}</td>
                  <td className="py-3 pr-4 text-emerald-300">{t(item.netProfit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;
