import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const { io } = require("socket.io-client");

const USER_ID =
  process.env.REACT_APP_ENV === "dev_1"
    ? process.env.REACT_APP_USER1
    : process.env.REACT_APP_ENV === "dev_2"
    ? process.env.REACT_APP_USER2
    : "UNDEFINED";

const CommonEditor = () => {
  const [textValue, setTextValue] = useState("");
  const clientSocket = io("http://localhost:8080");
  clientSocket.emit("join", USER_ID);
  clientSocket.on("emittedTextChange", receiveTextChange);

  const handleChange = (text) => {
    setTextValue(text);
    clientSocket.emit("textChange", text);
    console.log(text.target.value);
  };

  const receiveTextChange = (text) => {
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
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          onChange={handleChange}
          value={textValue}
        />
      </div>
    </Box>
  );
};

export default CommonEditor;
