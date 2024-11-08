import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';

const HiddenSearchFormsHelper = () => {
  // State to control whether the element is visible or not
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the element
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <Button variant="contained" onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Details
      </Button>

      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {/* The element that will unfold */}
        <Grid item xs={12}>
          <div
            style={{
              overflow: 'hidden',
              height: isVisible ? 'auto' : '0', // Toggle height
              transition: 'height 0.3s ease', // Smooth transition for unfolding
            }}
          >
            <Typography variant="body1">
              This is the hidden content that unfolds when you click the button.
              You can include any content here that you want to show or hide.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HiddenSearchFormsHelper;