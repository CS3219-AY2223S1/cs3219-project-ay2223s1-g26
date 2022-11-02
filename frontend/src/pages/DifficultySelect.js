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
import DifficultyCard from "../components/DifficultyCard";
import TimedLoader from "../components/TimedLoader";

const Difficulties = ['Easy', 'Medium', 'Hard']

var msSocket;
var timer;

//Can implement a stepper here
function DifficultySelect() {
  const [difficulty, setDifficulty] = useState();
  const [isConnecting, setIsConnecting] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [partnerUuid, setPartnerUuid] = useState();
  const [roomUuid, setRoomUuid] = useState();
  const [questionSeed, setQuestionSeed] = useState(null);
  const [value, setValue] = useState(0)

  const { user } = useContext(context);
  console.log("user gotten from context: ", user?.displayName);

  useEffect(() => {
    msSocket = io("http://localhost:3000");

    msSocket.on("connected", () => {
      console.log("connected to match service!");
      msSocket.emit("register", user?.uid);
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
        msSocket.emit("deregister", user.uid, numberOfRetries + 1);
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
    msSocket.emit("getMatch", user.uid, difficulty);
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
      const valueIncrementer = setInterval(() => {
        setValue((prev) => prev >= 30 ? 0 : prev + 1)
      }, 1000)
      //Disable the buttons
      setButtonsEnabled(false);
      console.log('value:', value, 'isConnecting', isConnecting)
      return () => {
        clearInterval(valueIncrementer)
        setValue(0)
        console.log('value set as 0')
      }
    } else if (isConnecting == false) {
      //Stop loading spinner
      //Enable the buttons
      msSocket.emit("deregister", user.uid);
      setButtonsEnabled(true);
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
      {isConnecting
        ? (<TimedLoader loading={isConnecting} value={value} difficulty={difficulty}/>)
        : (<>
            {user && <div style={{
                fontSize:30,
                fontWeight:400,
                marginTop: -30,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                What difficulty would you like to attempt <span style={{color: '#1b76d2'}}>{user.displayName}</span> ?
              </div>
            }
            <Grid container spacing={1} style={{marginTop: 25}}>
              {Difficulties.map((difficulty, i) => (
                <Grid item xs={4}>
                  <DifficultyCard
                    difficulty={difficulty}
                    handleDifficultyButton={handleDifficultyButton}
                    buttonsEnabled={buttonsEnabled}/>
                </Grid>
              ))}
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
        </>)
      }
    </div>
  );
}

export default DifficultySelect;
