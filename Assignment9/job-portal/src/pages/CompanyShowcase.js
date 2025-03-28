import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

function CompanyShowcase() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/companies/getCompanies');
        setCompanies(res.data.data.companiesList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Company Showcase
      </Typography>
      <Grid container spacing={3}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={company.imageUrl}
                alt={company.name}
                sx={{ objectFit: 'contain', padding: 2 }}
              />
              <CardContent>
                <Typography align="center">{company.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CompanyShowcase;
