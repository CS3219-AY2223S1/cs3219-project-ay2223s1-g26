import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import "./CommonEditor.css";
import EditorButtons from "./EditorButtons";
import PartnerLeftModal from "./PartnerLeftModal";
import LoadCodeModal from "./LoadCodeModal";

import { useNavigate } from "react-router";
import { context } from "../context";

const CommonEditor = ({ uuid1, uuid2, roomid, socket, question }) => {
  const navigate = useNavigate();
  // Determine user and partner ID to use based on environment
  const { user, setIsLoading, $axios } = useContext(context);

  const [textValue, setTextValue] = useState("");

  const [clientSocket, setClientSocket] = useState(false);
  const [partnerLeave, setPartnerLeave] = useState(false);
  const [textChanged, setTextChanged] = useState(true);
  const [openLoadCodeModal, setOpenLoadCodeModal] = useState(false);
  const [loadedCode, setLoadedCode] = useState("");

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
    console.log("handle Save is called");
    $axios.post(`${$axios.defaults.baseURL}/saveCode`, {
      questionTitle: question.name,
      questionId: question._id,
      questionDifficulty: question.difficulty,
      code: textValue,
    });
    console.log("handleSave: ", {
      questionTitle: question.name,
      questionId: question._id,
      questionDifficulty: question.difficulty,
      code: textValue,
    });
  };

  const handleLoadButtonPress = async () => {
    $axios
      .get(`${$axios.defaults.baseURL}/getSavedCode?questionId=${question._id}`)
      .then((code) => {
        setLoadedCode(code.data);
      })
      .then(() => setOpenLoadCodeModal(true));
  };

  const handleRestoreCode = (code) => {
    handleChangeEmitted(code);
    setTextValue(code);
  };

  const handleCompleted = () => {
    $axios.post(`${$axios.defaults.baseURL}/addQuestionAttempt`, {
      questionId: question._id,
      questionDifficulty: question.difficulty,
      questionTitle: question.name,
    });
    console.log("handleCompleted: ", {
      questionId: question._id,
      questionDifficulty: question.difficulty,
      questionTitle: question.name,
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
      <LoadCodeModal
        openLoadCodeModal={openLoadCodeModal}
        setOpenLoadCodeModal={setOpenLoadCodeModal}
        loadedCode={loadedCode}
        setLoadedCode={setLoadedCode}
        handleRestoreCode={handleRestoreCode}
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
            handleLoadButtonPress={handleLoadButtonPress}
          />
        </div>
      </div>
    </>
  );
};

export default CommonEditor;
