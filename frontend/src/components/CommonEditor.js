import * as React from "react";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LANGUAGES from "../resources/languages";
import "./CommonEditor.css";

const { io } = require("socket.io-client");

// Only for dev environment, to simulate 2 clients
let USER_ID;
let PARTNER_ID;

const CommonEditor = ({ uuid1, uuid2, roomid, difficulty }) => {
  // Determine user and partner ID to use based on environment
  if (process.env.REACT_APP_ENV === "dev_1") {
    USER_ID = process.env.REACT_APP_USER1;
    PARTNER_ID = process.env.REACT_APP_USER2;
  } else if (process.env.REACT_APP_ENV === "dev_2") {
    USER_ID = process.env.REACT_APP_USER2;
    PARTNER_ID = process.env.REACT_APP_USER1;
  } else if (process.env.REACT_APP_ENV === "prod_1") {
    USER_ID = uuid1;
    PARTNER_ID = uuid2;
  } else if (process.env.REACT_APP_ENV === "prod_2") {
    USER_ID = uuid2;
    PARTNER_ID = uuid1;
  }

  // TODO: temporary
  const ROOM_ID = process.env.REACT_APP_ENV === "dev_3" ? 12342 : 12345;

  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  useEffect(() => {
    let socket = io("https://git.heroku.com/hidden-reaches-56374.git", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("match", { USER_ID, PARTNER_ID, ROOM_ID });
    });
    socket.on(PARTNER_ID, handleChangeReceived);
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
