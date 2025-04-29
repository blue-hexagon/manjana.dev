import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';

const HiddenSearchFormsHelper = () => {

  const [isVisible, setIsVisible] = useState(false);


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
              height: isVisible ? 'auto' : '0',
              transition: 'height 0.3s ease',
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