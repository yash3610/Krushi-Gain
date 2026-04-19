import api from './api';

export const sendAnalysisResultOnWhatsApp = async (payload) => {
  const response = await api.post('/whatsapp/send-result', payload);
  return response.data;
};

export const sendSmartMandiResultOnWhatsApp = async (payload) => {
  const response = await api.post('/whatsapp/send-smart-mandi', payload);
  return response.data;
};
