import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';


const CompanyCard = ({ company }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      {company.imagePath && (
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3000${company.imagePath}`}
          alt={company.fullName}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {company.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;