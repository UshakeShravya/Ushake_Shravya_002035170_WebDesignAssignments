import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const userType = localStorage.getItem('userType');

const initialState = {
  user: null,
  token: token || null,
  isAuthenticated: !!token,
  userType: userType || null,
  loading: false,
  error: null,
  registrationSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.user.type;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userType', action.payload.user.type);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.registrationSuccess = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.registrationSuccess = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userType = null;
      state.error = null;
      state.registrationSuccess = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart, 
  registerSuccess, 
  registerFailure, 
  logout 
} = authSlice.actions;
export default authSlice.reducer; 