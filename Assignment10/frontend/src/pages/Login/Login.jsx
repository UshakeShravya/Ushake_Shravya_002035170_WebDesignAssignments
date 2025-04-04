import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Link, Alert, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, testConnection } from '../../api/authService';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import PageBackground from '../../components/PageBackground';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [connectionDetails, setConnectionDetails] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  // Redirect to appropriate page based on user type
  useEffect(() => {
    if (isAuthenticated) {
      const userType = localStorage.getItem('userType');
      if (userType === 'admin') {
        navigate('/admin/employees');
      } else if (userType === 'employee') {
        navigate('/jobs');
      } else {
        navigate('/home');
      }
    }
  }, [isAuthenticated, navigate]);

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
      dispatch(loginFailure('Cannot connect to the server. Please check your connection and try again.'));
      return;
    }
    
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }

    dispatch(loginStart());

    try {
      const response = await login(formData);
      dispatch(loginSuccess(response));
      // Navigation will be handled by the useEffect above
    } catch (err) {
      console.error('Login error in component:', err);
      dispatch(loginFailure(err.error || 'Login failed. Please try again.'));
    }
  };

  return (
    <PageBackground variant="login">
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
              Login
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
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || connectionStatus !== 'connected'}
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
                disabled={loading || connectionStatus !== 'connected'}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                disabled={loading || connectionStatus !== 'connected'}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </PageBackground>
  );
};

export default Login;
