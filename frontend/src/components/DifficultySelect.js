import { ButtonGroup, Button, Grid, Typography } from "@mui/material";
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

//Can implement a stepper here
function DifficultySelect() {
  const [difficulty, setDifficulty] = useState();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [partnerUuid, setPartnerUuid] = useState();
  const [roomUuid, setRoomUuid] = useState();
  const [questionSeed, setQuestionSeed] = useState(null);

  const user = useContext(context);
  console.log("user gotten from context: ", user?.user?.uid);

  useEffect(() => {
    msSocket = io("http://localhost:3000");

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
        msSocket.emit("deregister");
      }
    );

    msSocket.on("deregister_success", () => {
      console.log("deregister_success");
      setIsConnecting(false);
    });

    msSocket.on("deregister_failed", () => {
      msSocket.emit("deregister");
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
    if (isConnecting) {
      timer = setTimeout(() => {
        setIsConnecting(false);
      }, 30000);
      //Disable the buttons
      //Start loading spinner
    } else {
      //Stop loading spinner
      //Enable the buttons
    }
  }, [isConnecting]);

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

  return (
    <div>
      <Grid
        container
        spacing={12}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h5" color="inherit" component="div" mb={2}>
          Select the desired question difficulty level:
        </Typography>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          display="flex"
        >
          <Button
            onClick={() => {
              handleDifficultyButton(Difficulty.Easy);
            }}
          >
            Easy
          </Button>
          <Button
            onClick={() => {
              handleDifficultyButton(Difficulty.Medium);
            }}
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              handleDifficultyButton(Difficulty.Hard);
            }}
          >
            Hard
          </Button>
        </ButtonGroup>
      </Grid>
    </div>
  );
}

export default DifficultySelect;