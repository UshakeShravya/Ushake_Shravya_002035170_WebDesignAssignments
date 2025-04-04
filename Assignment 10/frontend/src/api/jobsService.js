import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      return Promise.reject({
        error: error.response.data.message || 'An error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      return Promise.reject({
        error: 'No response from server. Please check your connection.',
        status: 0,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject({
        error: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

// Test connection to backend
export const testConnection = async () => {
  try {
    console.log('Testing connection to:', API_URL);
    
    // Try multiple approaches to test connection
    
    // 1. First try a simple fetch to the root API URL
    try {
      console.log('Attempting fetch to API root...');
      const response = await fetch(API_URL);
      console.log('Fetch response status:', response.status);
      if (response.ok || response.status === 401 || response.status === 404) {
        console.log('Server is reachable via fetch');
        return true;
      }
    } catch (fetchError) {
      console.log('Fetch failed:', fetchError.message);
    }
    
    // 2. Try a HEAD request
    try {
      console.log('Attempting HEAD request...');
      await axios.head(API_URL, { timeout: 3000 });
      console.log('Server is reachable via HEAD request');
      return true;
    } catch (headError) {
      console.log('HEAD request failed:', headError.message);
    }
    
    // 3. Try a GET request to /jobs endpoint
    try {
      console.log('Attempting GET request to /jobs...');
      const response = await api.get('/jobs');
      console.log('GET request successful');
      return true;
    } catch (getError) {
      // If we get a 401 or 404, the server is reachable but endpoint might be protected
      if (getError.response && (getError.response.status === 401 || getError.response.status === 404)) {
        console.log('Server is reachable but endpoint is protected or not found');
        return true;
      }
      console.log('GET request failed:', getError.message);
    }
    
    // 4. Try a direct axios request to the root URL
    try {
      console.log('Attempting direct axios request...');
      const response = await axios.get(API_URL, { timeout: 3000 });
      console.log('Direct axios request successful');
      return true;
    } catch (axiosError) {
      console.log('Direct axios request failed:', axiosError.message);
    }
    
    // If all attempts fail, return false
    console.log('All connection attempts failed');
    return false;
  } catch (error) {
    console.error('Connection test failed with error:', error);
    return false;
  }
};

// Fetch all jobs with pagination
export const fetchJobs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/jobs', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await api.post('/create/job', jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a job
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a job
export const deleteJob = async (jobId) => {
  try {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single job
export const getJob = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  testConnection,
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
}; 