import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs.unshift(action.payload);
    },
    addJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  addJobStart,
  addJobSuccess,
  addJobFailure
} = jobsSlice.actions;

export default jobsSlice.reducer; 