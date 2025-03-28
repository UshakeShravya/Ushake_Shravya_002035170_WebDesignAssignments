import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Sarah Thompson',
      feedback:
        'This portal helped me land my dream job in less than a week! It’s super easy to use and reliable.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'James Patel',
      feedback:
        'I was able to connect with top companies and apply to roles that matched my skills. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Aisha Ali',
      feedback:
        'As a fresher, I found internships that fit my profile perfectly. Great UI and trusted listings!',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #1976d2, #42a5f5)',
          color: 'white',
          py: 10,
          textAlign: 'center',
          minHeight: '60vh',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to the Job Portal!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Discover top job opportunities and connect with leading companies to build your career.
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/jobs')}
            >
              View Jobs
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{ width: 70, height: 70, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    "{user.feedback}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
