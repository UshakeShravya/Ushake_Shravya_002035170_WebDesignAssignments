import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  CircularProgress
} from '@mui/material';
import { fetchJobs } from '../../api/jobsService';
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure
} from '../../store/slices/jobsSlice';

const JobsPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { jobs, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    const loadJobs = async () => {
      dispatch(fetchJobsStart());
      try {
        const response = await fetchJobs(token, currentPage);
        dispatch(fetchJobsSuccess(response));
      } catch (err) {
        dispatch(fetchJobsFailure(err.error || 'Failed to fetch jobs'));
      }
    };

    loadJobs();
  }, [dispatch, token, currentPage]);

  const handlePageChange = (event, value) => {
    dispatch(fetchJobsStart());
    fetchJobs(token, value)
      .then((response) => dispatch(fetchJobsSuccess(response)))
      .catch((err) => dispatch(fetchJobsFailure(err.error || 'Failed to fetch jobs')));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {job.jobTitle}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {job.companyName}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${job.salary}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default JobsPage; 