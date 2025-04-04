import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const commonNavItems = [
    { path: '/home', label: 'Home', icon: <HomeIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/contact', label: 'Contact', icon: <ContactMailIcon /> },
  ];

  const adminNavItems = [
    { path: '/admin/employees', label: 'Employees', icon: <PeopleIcon /> },
    { path: '/admin/add-job', label: 'Add Job', icon: <AddIcon /> },
  ];

  const employeeNavItems = [
    { path: '/jobs', label: 'Jobs', icon: <WorkIcon /> },
    { path: '/companies', label: 'Companies', icon: <BusinessIcon /> },
  ];

  const getNavItems = () => {
    if (!isAuthenticated) return [];
    if (userType === 'admin') {
      return [...commonNavItems, ...adminNavItems];
    }
    return [...commonNavItems, ...employeeNavItems];
  };

  const navItems = getNavItems();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <IconButton
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: location.pathname === item.path ? 'secondary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  title={item.label}
                >
                  {item.icon}
                </IconButton>
              ))}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
