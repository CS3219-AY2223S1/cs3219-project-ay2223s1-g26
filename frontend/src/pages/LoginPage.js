import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import googleImage from '../images/google.png';
import codingImage from '../images/coding.jpg';

import "./Login.css";
function Login() {
  return (
    // <div className="login">
    //   <div className="login__container">
    //     <button className="login__btn login__google" onClick={signInWithGoogle}>
    //       Login with Google
    //     </button>
    //   </div>
    // </div>
    <div className="login">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={codingImage}
          alt="codingImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Log in to PeerPrep
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Practice solving interview style coding problems with peerprep today to get your dream job tomorrow!
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            startIcon={<Avatar src={googleImage}/>}>
              Sign in with Google
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default Login;