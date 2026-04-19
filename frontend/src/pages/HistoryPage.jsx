import { useEffect, useState } from 'react';
import { getMandiHistory } from '../services/mandiService';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getMandiHistory();
        setHistory(data);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">My History</h1>
      <p className="mt-2 text-slate-200">View your previous mandi analysis reports.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-slate-800/70 text-slate-200">
            <tr>
              <th className="px-4 py-3">Crop</th>
              <th className="px-4 py-3">Current Mandi</th>
              <th className="px-4 py-3">Recommended</th>
              <th className="px-4 py-3">Profit</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-4 text-slate-300" colSpan="5">
                  Loading history...
                </td>
              </tr>
            )}
            {!loading && history.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-300" colSpan="5">
                  No analysis history found.
                </td>
              </tr>
            )}
            {!loading &&
              history.map((item) => (
                <tr key={item._id} className="border-t border-white/10 bg-slate-900/40 text-slate-100">
                  <td className="px-4 py-3">{item.crop}</td>
                  <td className="px-4 py-3">{item.currentMandi}</td>
                  <td className="px-4 py-3 text-emerald-300">{item.recommendedMandi}</td>
                  <td className="px-4 py-3">₹ {item.profit}</td>
                  <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
