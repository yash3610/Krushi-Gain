import api from './api';

export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};
