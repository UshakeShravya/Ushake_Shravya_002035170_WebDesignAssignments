import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Link, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, testConnection } from '../../api/authService';
import { registerStart, registerSuccess, registerFailure } from '../../store/slices/authSlice';
import PageBackground from '../../components/PageBackground';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, registrationSuccess } = useSelector((state) => state.auth);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'employee'
  });

  // Test connection to backend on component mount
  const checkConnection = async () => {
    try {
      setConnectionStatus('checking');
      setConnectionError(null);
      setConnectionDetails(null);
      
      console.log('Checking connection to backend...');
      const isConnected = await testConnection();
      
      if (isConnected) {
        setConnectionStatus('connected');
        setConnectionDetails('Successfully connected to the server');
      } else {
        setConnectionStatus('disconnected');
        setConnectionDetails(
          'Could not connect to the server. Please make sure the backend is running on port 3001. ' +
          'Check the browser console for detailed connection diagnostics.'
        );
      }
    } catch (err) {
      console.error('Connection test failed:', err);
      setConnectionStatus('error');
      setConnectionError(err.message || 'Unknown error');
      setConnectionDetails(
        'An error occurred while testing the connection. ' +
        'Please check the browser console for detailed error information. ' +
        'Make sure the backend server is running on port 3001.'
      );
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  // Redirect to login page after successful registration
  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return 'Full name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (!['admin', 'employee'].includes(formData.type)) {
      return 'Invalid user type';
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check connection status before proceeding
    if (connectionStatus !== 'connected') {
      dispatch(registerFailure('Cannot connect to the server. Please check your connection and try again.'));
      return;
    }
    
    const validationError = validateForm();
    if (validationError) {
      dispatch(registerFailure(validationError));
      return;
    }

    dispatch(registerStart());

    try {
      const response = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        type: formData.type
      });
      
      dispatch(registerSuccess());
    } catch (err) {
      console.error('Registration error in component:', err);
      dispatch(registerFailure(err.error || 'Registration failed. Please try again.'));
    }
  };

  return (
    <PageBackground variant="register">
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Register
            </Typography>
            
            {connectionStatus === 'checking' && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography>Checking connection to server...</Typography>
                </Box>
              </Alert>
            )}
            
            {connectionStatus === 'connected' && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {connectionDetails}
              </Alert>
            )}
            
            {connectionStatus === 'disconnected' && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
                action={
                  <Button color="inherit" size="small" onClick={checkConnection}>
                    Retry
                  </Button>
                }
              >
                <Typography variant="body1">
                  Cannot connect to the server. Please check your connection and try again.
                </Typography>
                {connectionDetails && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {connectionDetails}
                  </Typography>
                )}
                {connectionError && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Error: {connectionError}
                  </Typography>
                )}
              </Alert>
            )}
            
            {connectionStatus === 'error' && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
                action={
                  <Button color="inherit" size="small" onClick={checkConnection}>
                    Retry
                  </Button>
                }
              >
                <Typography variant="body1">
                  Error testing connection to the server. Please check your connection and try again.
                </Typography>
                {connectionDetails && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {connectionDetails}
                  </Typography>
                )}
                {connectionError && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Error: {connectionError}
                  </Typography>
                )}
              </Alert>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {registrationSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Registration successful! Redirecting to login page...
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>User Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="User Type"
                  disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                disabled={loading || registrationSuccess || connectionStatus !== 'connected'}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </PageBackground>
  );
};

export default Register; 