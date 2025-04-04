import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Container, CardActionArea } from '@mui/material';

const companies = [
  {
    id: 1,
    name: "Tech Innovators Inc.",
    description: "Leading technology company specializing in AI and cloud solutions.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Digital Solutions Co.",
    description: "Digital transformation experts helping businesses grow in the modern era.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=200&fit=crop",
    location: "New York, NY"
  },
  {
    id: 3,
    name: "Future Systems Ltd.",
    description: "Innovative software development company focused on cutting-edge solutions.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=200&fit=crop",
    location: "Seattle, WA"
  },
  {
    id: 4,
    name: "Global Tech Solutions",
    description: "International technology consulting firm with a focus on enterprise solutions.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
    location: "London, UK"
  }
];

const CompanyShowcase = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        Featured Companies
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
        Discover opportunities at leading companies
      </Typography>
      <Grid container spacing={4}>
        {companies.map((company) => (
          <Grid item key={company.id} xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={company.image}
                  alt={company.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {company.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {company.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyShowcase; 