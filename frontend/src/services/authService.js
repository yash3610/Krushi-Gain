import api from './api';

export const signupUser = async (payload) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const sendOtpToPhone = async (payload) => {
  const response = await api.post('/auth/send-otp', payload);
  return response.data;
};

export const verifyOtpAndLogin = async (payload) => {
  const response = await api.post('/auth/verify-otp', payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};
