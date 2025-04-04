import axiosClient from './axiosClient';

const authAPI = {
  login: async (credentials) => {
    const response = await axiosClient.post('/users/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  register: async (userData) => {
    const response = await axiosClient.post('/users/register', userData);
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await axiosClient.get('/users/me');
    return response;
  },

  getAllUsers: async () => {
    const response = await axiosClient.get('/users');
    return response;
  },

  deleteUser: async (userId) => {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response;
  },

  uploadImage: async (formData) => {
    const response = await axiosClient.post('/users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};

export default authAPI;
