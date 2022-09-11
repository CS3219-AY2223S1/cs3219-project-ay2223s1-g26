import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const { io } = require("socket.io-client");

// Only for dev environment, to simulate 2 clients
let USER_ID;
let PARTNER_ID;

if (process.env.REACT_APP_ENV === "dev_1") {
  USER_ID = process.env.REACT_APP_USER1;
  PARTNER_ID = process.env.REACT_APP_USER2;
} else if (process.env.REACT_APP_ENV === "dev_2") {
  USER_ID = process.env.REACT_APP_USER2;
  PARTNER_ID = process.env.REACT_APP_USER1;
}

const CommonEditor = () => {
  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  useEffect(() => {
    let socket = io("http://localhost:8080");
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("match", { USER_ID, PARTNER_ID });
    });
    socket.on(PARTNER_ID, handleChangeReceived);
    socket.on("confirmed", console.log("confirmed"));
    setClientSocket(socket);
  }, []);

  const handleChangeEmitted = (text) => {
    console.log("change emitted: ", text.target.value);
    console.log(
      "caret position: ",
      document.getElementById("editor").selectionEnd
    );
    setTextValue(text.target.value);
    clientSocket.emit(USER_ID, text.target.value);
  };

  const handleChangeReceived = (text) => {
    console.log("received: ", text);
    setTextValue(text);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="editor"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          onInput={handleChangeEmitted}
          value={textValue}
        />
      </div>
    </Box>
  );
};

export default CommonEditor;
