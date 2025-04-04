import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import PageBackground from '../../components/PageBackground';

const Home = () => {
  return (
    <PageBackground variant="default">
      <Container>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Welcome to Job Portal
          </Typography>
          <Typography variant="body1">
            Find your dream job with our platform. Browse through various job listings and company profiles.
          </Typography>
        </Box>
      </Container>
    </PageBackground>
  );
};

export default Home;