import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import "./CommonEditor.css";
import EditorButtons from "./EditorButtons";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { context } from "../context";

const { io } = require("socket.io-client");

const CommonEditor = ({ uuid1, uuid2, roomid, difficulty }) => {
  const navigate = useNavigate();
  console.log("env: ", process.env.REACT_APP_ENV);
  // Determine user and partner ID to use based on environment
  const { user, setIsLoading, $axios } = useContext(context);

  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  const [partnerLeave, setPartnerLeave] = useState(false);

  useEffect(() => {
    console.log("room_id: ", roomid);
    let socket = io("http://localhost:8081");
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("match", { uuid1, uuid2, roomid });
    });
    socket.on("text", handleChangeReceived);
    socket.on("confirmed", console.log("confirmed"));
    socket.on("left", handlePartnerLeave);
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
    clientSocket.close();
  };

  const handlePartnerLeave = () => {
    console.log("partner has left");
    setPartnerLeave(true);
  };

  // TODO: Temp API while we figure out the actual
  const handleSave = async () => {
    const response = await $axios.post(`${$axios.defaults.baseURL}/save`);
  };

  const handleCompleted = async () => {
    const response = await $axios.post(`${$axios.defaults.baseURL}/completed`);
  };

  const rerouteToLobby = () => {
    navigate("/dashboard");
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(100, 100, 100, 0.5)",
      height: "100vh",
      width: "100vw",
      padding: "30vh 25vw",
      boxSizing: "border-box",
    },
    content: {
      margin: "20vh 30vw",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3rem",
    },
  };

  return (
    <>
      <Modal isOpen={partnerLeave} style={modalStyle}>
        <h1>Partner has left the session</h1>
        <h3 style={{ textAlign: "center" }}>
          Return to the matching lobby to find a new partner
        </h3>
        <Button
          size="large"
          variant="outlined"
          width="20%"
          onClick={rerouteToLobby}
        >
          Return to Lobby
        </Button>
      </Modal>
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
          <EditorButtons
            handleLeave={handleLeave}
            handleSave={handleSave}
            handleCompleted={handleCompleted}
          />
        </div>
      </div>
    </>
  );
};

export default CommonEditor;
