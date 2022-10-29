import * as React from "react";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LANGUAGES from "../resources/languages";
import "./CommonEditor.css";

const { io } = require("socket.io-client");

// Only for dev environment, to simulate 2 clients
let USER_ID;
let PARTNER_ID;
let ROOM_ID;

const CommonEditor = ({ uuid1, uuid2, roomid, difficulty }) => {
  console.log("env: ", process.env.REACT_APP_ENV);
  // Determine user and partner ID to use based on environment
  if (process.env.REACT_APP_ENV === "dev_1") {
    USER_ID = process.env.REACT_APP_USER1;
    PARTNER_ID = process.env.REACT_APP_USER2;
    ROOM_ID = 1234567;
  } else if (process.env.REACT_APP_ENV === "dev_2") {
    USER_ID = process.env.REACT_APP_USER2;
    PARTNER_ID = process.env.REACT_APP_USER1;
    ROOM_ID = 1234567;
  } else if (process.env.REACT_APP_ENV === "prod_1") {
    USER_ID = uuid1;
    PARTNER_ID = uuid2;
    ROOM_ID = 1234567;
  } else if (process.env.REACT_APP_ENV === "prod_2") {
    USER_ID = uuid2;
    PARTNER_ID = uuid1;
    ROOM_ID = 1234567;
  }

  // TODO: temporary
  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  useEffect(() => {
    console.log("room_id: ", ROOM_ID);
    let socket = io("http://localhost:8081");
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("match", { USER_ID, PARTNER_ID, ROOM_ID });
    });
    socket.on("text", handleChangeReceived);
    socket.on("confirmed", console.log("confirmed"));
    setClientSocket(socket);
  }, []);

  const handleChangeEmitted = (text) => {
    console.log(text);
    console.log("change emitted: ", text);
    setTextValue(text);
    clientSocket.emit("text", text);
  };

  const handleChangeReceived = (text) => {
    console.log("received: ", text);
    setTextValue(text);
  };

  return (
    <div className="commoneditorContainer">
      <Editor
        height="85vh"
        defaultLanguage="javascript"
        defaultValue="Type your code here"
        theme="vs-dark"
        onChange={handleChangeEmitted}
        value={textValue}
      />
    </div>
  );
};

export default CommonEditor;
