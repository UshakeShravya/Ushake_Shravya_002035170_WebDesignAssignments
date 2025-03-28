import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';

function About() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        About Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
        Welcome to our Job Portal — a platform dedicated to bridging the gap between talented job seekers and leading companies.
        We aim to simplify the hiring process and empower people with meaningful career opportunities.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <WorkIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Opportunities</Typography>
            <Typography variant="body2">
              Find full-time, part-time, freelance, and internship roles tailored to your skill set and interests.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <PeopleIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Connection</Typography>
            <Typography variant="body2">
              We connect thousands of job seekers with top companies across industries and locations.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <VerifiedIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Trust & Security</Typography>
            <Typography variant="body2">
              Verified company listings and secure login ensure a safe experience for both applicants and employers.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
