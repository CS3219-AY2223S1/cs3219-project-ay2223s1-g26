import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import "./CommonEditor.css";
import EditorButtons from "./EditorButtons";
import PartnerLeftModal from "./PartnerLeftModal";

import { useNavigate } from "react-router";
import { context } from "../context";

const CommonEditor = ({
  uuid1,
  uuid2,
  roomid,
  difficulty,
  questionId,
  socket,
}) => {
  const navigate = useNavigate();
  // Determine user and partner ID to use based on environment
  const { user, setIsLoading, $axios } = useContext(context);

  const [textValue, setTextValue] = useState("");
  const [clientSocket, setClientSocket] = useState();
  const [partnerLeave, setPartnerLeave] = useState(false);
  const [textChanged, setTextChanged] = useState(true);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      socket.emit("match", { uuid1, uuid2, roomid });
    });
    socket.on("text", handleChangeReceived);
    socket.on("left", handlePartnerLeave);
    setClientSocket(socket);
  }, [uuid1, uuid2, roomid, socket]);

  const handleChangeEmitted = (text) => {
    setTextChanged(true);
    setTextValue(text);
    clientSocket.emit("text", text);
  };

  const handleChangeReceived = (text) => {
    setTextChanged(true);
    setTextValue(text);
  };

  const handleLeave = () => {
    clientSocket.emit("leave");
    clientSocket.close();
    navigate("/dashboard");
  };

  const handlePartnerLeave = () => {
    setPartnerLeave(true);
  };

  const handleSave = () => {
    $axios.post(`${$axios.defaults.baseURL}/saveCode`, {
      questionId: questionId,
      code: textValue,
    });
    console.log("handleSave: ", {
      questionId: questionId,
      code: textValue,
    });
  };

  const handleCompleted = () => {
    $axios.post(`${$axios.defaults.baseURL}/addQuestionAttempt`, {
      questionId: questionId,
      questionDifficulty: difficulty,
      questionTitle: "TBC",
    });
    console.log("handleCompleted: ", {
      questionId: questionId,
      questionDifficulty: difficulty,
      questionTitle: "TBC",
    });
  };

  return (
    <>
      <PartnerLeftModal
        partnerLeave={partnerLeave}
        handleCompleted={handleCompleted}
        handleSave={handleSave}
        textChanged={textChanged}
        setTextChanged={setTextChanged}
      />
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
            textChanged={textChanged}
            setTextChanged={setTextChanged}
          />
        </div>
      </div>
    </>
  );
};

export default CommonEditor;
