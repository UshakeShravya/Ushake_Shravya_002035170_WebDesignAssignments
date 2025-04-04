import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PageBackground from '../../components/PageBackground';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <PageBackground>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 5, maxWidth: 600 }}>
            <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              You don't have permission to access this page.
            </Typography>
            <Typography variant="body1" paragraph>
              If you believe this is an error, please contact the administrator.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Go to Home
            </Button>
          </Paper>
        </Box>
      </Container>
    </PageBackground>
  );
};

export default ErrorPage; 