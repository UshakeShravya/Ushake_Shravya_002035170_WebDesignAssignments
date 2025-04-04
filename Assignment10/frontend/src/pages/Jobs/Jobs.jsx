import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Pagination,
  CircularProgress
} from '@mui/material';
import PageBackground from '../../components/PageBackground';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from '../../store/slices/jobsSlice';
import { fetchJobs } from '../../api/jobsService';

const Jobs = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { jobs, loading, error, currentPage, totalPages } = useSelector((state) => state.jobs);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadJobs = async () => {
      dispatch(fetchJobsStart());
      try {
        const response = await fetchJobs(page);
        dispatch(fetchJobsSuccess(response));
      } catch (err) {
        dispatch(fetchJobsFailure(err.error || 'Failed to fetch jobs'));
      }
    };

    loadJobs();
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = (jobs || []).filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    const matchesExperience = !experience || job.experience === experience;
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  if (loading) {
    return (
      <PageBackground>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        </Container>
      </PageBackground>
    );
  }

  if (error) {
    return (
      <PageBackground>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Typography color="error">{error}</Typography>
          </Box>
        </Container>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Available Jobs
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
            Browse through our job listings
          </Typography>

          {/* Search and Filters */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={jobType}
                  label="Job Type"
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Experience</InputLabel>
                <Select
                  value={experience}
                  label="Experience"
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="Entry Level">Entry Level</MenuItem>
                  <MenuItem value="2+ years">2+ years</MenuItem>
                  <MenuItem value="3+ years">3+ years</MenuItem>
                  <MenuItem value="5+ years">5+ years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Job Listings */}
          <Grid container spacing={3}>
            {(filteredJobs || []).map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {job.jobTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {job.companyName}
                        </Typography>
                      </Box>
                      <Tooltip title={savedJobs.includes(job._id) ? "Remove from saved" : "Save job"}>
                        <IconButton onClick={() => handleSaveJob(job._id)}>
                          {savedJobs.includes(job._id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<LocationOnIcon />} 
                        label={job.location} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Chip 
                        icon={<WorkIcon />} 
                        label={job.type} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Chip 
                        icon={<AttachMoneyIcon />} 
                        label={job.salary?.toLocaleString() || 'N/A'} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>

                    <Typography variant="body1" paragraph>
                      {job.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {(job.skills || []).map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      ))}
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Posted {job.postedDate}
                    </Typography>
                  </CardContent>
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                  <CardActions sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'row', sm: 'column' },
                    justifyContent: 'center',
                    p: 2
                  }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ mb: { xs: 0, sm: 1 } }}
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large" 
              />
            </Box>
          )}
        </Box>
      </Container>
    </PageBackground>
  );
};

export default Jobs;