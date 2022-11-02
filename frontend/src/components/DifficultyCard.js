import React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Battery30Icon from "@mui/icons-material/Battery30";
import Battery80Icon from "@mui/icons-material/Battery80";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import easy from '../images/easy.jpg'
import medium from '../images/medium.jpg'
import hard from '../images/hard.jpg'
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function DifficultyCard(props) {
  const divStyle = {
    width: "100%",
    float: "left",
    height: "300px",
    position: "relative",
  };
  const iconMapping = {
    Easy: <Battery30Icon sx={{ color: "green" }} />,
    Medium: <Battery80Icon sx={{ color: "orange" }} />,
    Hard: <BatteryChargingFullIcon sx={{ color: "red" }} />,
  };

  const textMapping = {
    Easy: 'Perfect for beginners who are just starting out!',
    Medium: 'For those who have had some practice',
    Hard: 'Warning: For experts looking for a challenge'
  }

  const estimatedTimeMapping = {
    Easy: '10 - 20',
    Medium: '20 - 30',
    Hard: '30 - 45'
  }

  const imageMapping = {
    Easy: easy,
    Medium: medium,
    Hard: hard
  }

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 1 },
          textAlign: "center",
          height: "500px",
        }}
      >
        <div
          style={{
            fontSize: 25,
            display: "flex",
            alignItems: 'center',
            flexWrap: 'wrap',
            marginLeft: "auto",
            fontWeight: 450,
          }}
        >
          <Avatar
            style={{
              border: "1px solid lightgray",
              margin: 10,
            }}
            sx={{ bgcolor: "white" }}
          >
            {iconMapping[props.difficulty]}
          </Avatar>
          {props.difficulty}
        </div>
        <Divider
          style={{
            margin: 5,
          }}
        />
        <Box style={divStyle}>
          <CardMedia
            component="img"
            height="250"
            image={imageMapping[props.difficulty]}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="subtitle1">
              {textMapping[props.difficulty]}
            </Typography>
            <Typography variant="subtitle2" color='text.secondary'>
              Estimated time to complete: {estimatedTimeMapping[props.difficulty]} mins
            </Typography>
          </CardContent>
          <CardActions sx={{
            justifyContent:"center",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px'
            }}>
            <Button
              variant="contained"
              aria-label="outlined primary button group"
              onClick={() => {
                props.handleDifficultyButton(props.difficulty);
              }}
              fullWidth
              disabled={!props.buttonsEnabled}
            >
              {props.difficulty}
            </Button>
          </CardActions>
        </Box>
      </Paper>
    </div>
  );
}
