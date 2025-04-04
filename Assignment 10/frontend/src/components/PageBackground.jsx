import React from 'react';
import { Box } from '@mui/material';

const PageBackground = ({ children, variant = 'default' }) => {
  const backgrounds = {
    default: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)'
    },
    login: {
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      overlay: 'rgba(255, 255, 255, 0.9)'
    },
    register: {
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      overlay: 'rgba(255, 255, 255, 0.9)'
    },
    companies: {
      background: 'linear-gradient(135deg, #f6f8fc 0%, #e9ecef 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)'
    },
    jobs: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)'
    },
    about: {
      background: 'linear-gradient(135deg, #f1f4f8 0%, #e9ecef 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)'
    },
    contact: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      overlay: 'rgba(255, 255, 255, 0.85)'
    }
  };

  const style = backgrounds[variant] || backgrounds.default;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: style.background,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: style.overlay,
          zIndex: 1
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, py: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageBackground; 