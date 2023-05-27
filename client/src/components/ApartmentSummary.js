import React from 'react';
import { Box, Typography } from '@mui/material';

const ApartmentSummary = ({ apartment }) => {
  const { _id, summary } = apartment;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" component="span" sx={{ marginRight: 1 }}>
        {_id}:
      </Typography>
      <Typography variant="body1" component="span">
        {summary}
      </Typography>
    </Box>
  );
};

export default ApartmentSummary;
