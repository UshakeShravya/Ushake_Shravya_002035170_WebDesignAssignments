import React, { useState } from 'react';
import { jobPosts } from '../jobPosts';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

function JobListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const uniqueRoles = [...new Set(jobPosts.map((job) => job.title))];

  const filteredJobs = jobPosts.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? job.title === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Available Job Openings
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search jobs..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="Filter by role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="">All Roles</MenuItem>
            {uniqueRoles.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} key={job.id}>
            <HoverCard>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{job.description}</Typography>
                <Typography variant="caption" color="text.secondary">{job.lastUpdated}</Typography>
              </CardContent>
              <CardContent sx={{ pt: 0 }}>
                <Button
                  variant="contained"
                  href={job.applyLink}
                  target="_blank"
                  sx={{ mt: 1 }}
                >
                  Apply
                </Button>
              </CardContent>
            </HoverCard>
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }} color="text.secondary">
          No job postings match your search.
        </Typography>
      )}
    </Container>
  );
}

export default JobListings;
