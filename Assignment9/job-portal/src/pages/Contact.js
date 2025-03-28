import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Contact Us
      </Typography>

      <Typography align="center" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
        We’d love to hear from you! Reach out via email, phone, or simply fill out the form below and we’ll get back to you as soon as possible.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }} elevation={3}>
            <EmailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Email</Typography>
            <Typography>contact@jobportal.com</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }} elevation={3}>
            <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Phone</Typography>
            <Typography>+1 (555) 123-4567</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }} elevation={3}>
            <LocationOnIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Address</Typography>
            <Typography>123 Job Street, Tech City, USA</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Optional contact form */}
      <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>
        Send us a message
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" fullWidth multiline rows={4} required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Contact;
