import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // Your Node.js server
  withCredentials: true,
});

export default instance;
