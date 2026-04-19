import api from './api';

export const getSmartMandis = async ({ commodity, state }) => {
  const response = await api.get('/mandi/finder', {
    params: { commodity, state },
  });

  return response.data;
};

export const analyzeMandiProfit = async (payload) => {
  const response = await api.post('/mandi/analyze', payload);
  return response.data;
};

export const getMandiHistory = async () => {
  const response = await api.get('/mandi/history');
  return response.data;
};
