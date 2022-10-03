import * as React from "react";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LANGUAGES from "../resources/languages";
import "./CommonEditor.css";
import EditorButtons from "./EditorButtons";

const { io } = require("socket.io-client");

const CommonEditor = ({ uuid1, uuid2, roomid, difficulty }) => {
  console.log("env: ", process.env.REACT_APP_ENV);
  // Determine user and partner ID to use based on environment

  // TODO: temporary
  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  useEffect(() => {
    console.log("room_id: ", roomid);
    let socket = io("http://localhost:8081");
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("match", { uuid1, uuid2, roomid });
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

  const handleLeave = () => {
    console.log(uuid1, " is leaving the room");
    clientSocket.emit("leave");
  };

  const handleAttempted = () => {};

  return (
    <div className="editorAndButtonsContainer">
      <div className="commonEditor">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="Type your code here"
          theme="vs-dark"
          onChange={handleChangeEmitted}
          value={textValue}
        />
        <EditorButtons handleLeave={handleLeave} />
      </div>
    </div>
  );
};

export default CommonEditor;
