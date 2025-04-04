import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CompanyShowcase from '../../components/CompanyShowcase';
import PageBackground from '../../components/PageBackground';

const Companies = () => {
  return (
    <PageBackground variant="companies">
      <Container>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Companies
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore opportunities at top companies
          </Typography>
        </Box>
        <CompanyShowcase />
      </Container>
    </PageBackground>
  );
};

export default Companies;