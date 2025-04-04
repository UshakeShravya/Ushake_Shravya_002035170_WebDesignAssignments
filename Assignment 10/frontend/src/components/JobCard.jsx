import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import React from 'react';


const JobCard = ({ job }) => {
  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        {job.salary && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Salary: {job.salary}
          </Typography>
        )}
        <Typography variant="body2">
          {job.description}
        </Typography>
        {job.skills && job.skills.length > 0 && (
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Skills: {job.skills.join(', ')}
          </Typography>
        )}
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {job.lastUpdated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={job.applyLink} target="_blank">
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;