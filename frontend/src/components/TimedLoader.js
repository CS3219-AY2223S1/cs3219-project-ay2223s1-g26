import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { matchRoutes } from 'react-router-dom';

export default function TimedLoader(props) {
  console.log(props)
  return (
    <div>
      <Typography
        variant="title"
        component="div"
        color="text.primary"
        sx ={{
          marginBottom: '20px'
        }}
      >Finding a match for you. Please wait.</Typography>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
      >
        <Box>
          <CircularProgress variant="determinate" value={props.value * 100/30} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{props.value}</Typography>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}