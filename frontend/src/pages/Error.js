import React, { useContext } from "react";
import { context } from '../context';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function Error() {
  const { error } = useContext(context)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              Error
            </Typography>
            <Typography variant="h6">
              Something went wrong
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Error;