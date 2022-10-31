import {
  ButtonGroup,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useCallback, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { context } from "../context";

const Difficulty = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

var msSocket;
var timer;

const msEndpoint = process.env.NODE_ENV == "development"
  ? "http://localhost:3000"
  : "matching-network-load-balancer-dae844dd94888ac6.elb.ap-southeast-1.amazonaws.com"

//Can implement a stepper here
function DifficultySelect() {
  const [difficulty, setDifficulty] = useState();
  const [isConnecting, setIsConnecting] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [partnerUuid, setPartnerUuid] = useState();
  const [roomUuid, setRoomUuid] = useState();
  const [questionSeed, setQuestionSeed] = useState(null);

  const user = useContext(context);
  console.log("user gotten from context: ", user?.user?.uid);

  useEffect(() => {
    msSocket = io("matching-network-load-balancer-dae844dd94888ac6.elb.ap-southeast-1.amazonaws.com");

    msSocket.on("connected", () => {
      console.log("connected to match service!");
      msSocket.emit("register", user?.user?.uid);
    });

    msSocket.on(
      "matchFound",
      (uuidField, partnerUuid, roomUuid, questionSeed) => {
        clearTimeout(timer);
        setIsMatched(true);
        setPartnerUuid(partnerUuid);
        setRoomUuid(roomUuid);
        setQuestionSeed(questionSeed);
      }
    );

    msSocket.on("deregister_success", () => {
      console.log("deregister_success");
      setIsConnecting(false);
    });

    msSocket.on("deregister_failed", (numberOfRetries) => {
      if (numberOfRetries == 3) {
        return;
      } else {
        console.log("deregister_failed retry called")
        msSocket.emit("deregister", user.user.uid, numberOfRetries + 1);
      }
    });
  }, []);

  useEffect(() => {
    if (isMatched) {
      routeToPractice();
    }
  }, [isMatched]);

  //Difficulty hook
  useEffect(() => {
    if (difficulty == null) {
      return;
    }
    console.log(difficulty);
    setIsConnecting(true);
    msSocket.emit("getMatch", user.user.uid, difficulty);
  }, [difficulty]);

  //Connecting hook
  useEffect(() => {
    console.log("isConnecting: " + isConnecting);
    if (isConnecting == true) {
      timer = setTimeout(() => {
        setIsConnecting(false);
        toggleTimeoutSnackBar();
        setDifficulty(null);
        setButtonsEnabled(true);
      }, 30000);
      //Disable the buttons
      setButtonsEnabled(false);
      document.getElementById("circularProgress").style.display = "block";
    } else if (isConnecting == false) {
      //Stop loading spinner
      //Enable the buttons
      msSocket.emit("deregister", user.user.uid);
      document.getElementById("circularProgress").style.display = "none";
      setButtonsEnabled(true);
    } else {
      document.getElementById("circularProgress").style.display = "none";
      return;
    }
  }, [isConnecting]);

  const [buttonsEnabled, setButtonsEnabled] = useState(true);

  const handleDifficultyButton = useCallback((diff) => {
    setDifficulty(diff);
  }, []);

  let navigate = useNavigate();
  const routeToPractice = () => {
    console.log("routeToPractice");
    var path = "/practice";
    navigate(path, {
      replace: true,
      state: {
        uuid: user ? user.uid : null,
        partnerUuid: partnerUuid,
        roomUuid: roomUuid,
        difficulty: difficulty,
        questionSeed: questionSeed,
      },
    });
  };

  const [timeoutSnackbarOpen, setTimeoutSnackBarOpen] = useState(false);
  const toggleTimeoutSnackBar = () => {
    timeoutSnackbarOpen
      ? setTimeoutSnackBarOpen(false)
      : setTimeoutSnackBarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setTimeoutSnackBarOpen(false);
  };

  return (
    <div>
      <Grid
        container
        spacing={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h5" color="inherit" component="div">
            Select the desired question difficulty level:
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            display="flex"
          >
            <Button
              onClick={() => {
                handleDifficultyButton(Difficulty.Easy);
              }}
              disabled={!buttonsEnabled}
            >
              Easy
            </Button>
            <Button
              onClick={() => {
                handleDifficultyButton(Difficulty.Medium);
              }}
              disabled={!buttonsEnabled}
            >
              Medium
            </Button>
            <Button
              onClick={() => {
                handleDifficultyButton(Difficulty.Hard);
              }}
              disabled={!buttonsEnabled}
            >
              Hard
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <div id="circularProgress" display="none">
            <CircularProgress />
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={timeoutSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          No match could be found! Returning to difficulty select.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DifficultySelect;
