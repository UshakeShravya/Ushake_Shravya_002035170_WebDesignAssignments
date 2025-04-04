import axiosClient from './axiosClient';

const userAPI = {
  getAll: () => {
    return axiosClient.get('/user/getAll');
  },
  getImage: (userId) => {
    return axiosClient.get(`/user/images/${userId}`);
  }
};

export default userAPI;