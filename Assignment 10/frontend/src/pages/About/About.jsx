import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import PageBackground from '../../components/PageBackground';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const About = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Job Listings',
      description: 'Browse through a wide range of job opportunities from top companies.'
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Company Showcase',
      description: 'Explore profiles of leading companies and their work culture.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Platform',
      description: 'Your data is protected with industry-standard security measures.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast & Easy',
      description: 'Quick application process and instant job matching.'
    }
  ];

  return (
    <PageBackground>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            About Job Portal
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
            Connecting talented professionals with their dream careers
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom align="center">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
              We strive to create a seamless connection between job seekers and employers. Our platform
              provides a comprehensive solution for both parties, making the job search and hiring process
              efficient and effective. We believe in creating opportunities and fostering professional growth
              through meaningful connections.
            </Typography>
          </Box>
        </Box>
      </Container>
    </PageBackground>
  );
};

export default About;