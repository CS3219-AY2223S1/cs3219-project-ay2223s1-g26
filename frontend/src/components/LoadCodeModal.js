import axios from "axios";
import React, { Component, useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { context } from "../context";

import "./LoadCodeModal.css";

const LoadCodeModal = ({
  openLoadCodeModal,
  setOpenLoadCodeModal,
  questionId,
  handleRestoreCode,
  loadedCode,
  setLoadedCode,
}) => {
  const { user, setIsLoading, $axios } = useContext(context);
  const buttonStyle = { flex: 1, height: "80%" };

  useEffect(() => {
    $axios
      .get(`${$axios.defaults.baseURL}/getSavedCode?questionId=${questionId}`)
      .then((code) => setLoadedCode(code));
  }, [$axios, questionId]);

  const handleRestoreButtonPress = () => {
    setOpenLoadCodeModal(false);
    handleRestoreCode(loadedCode);
  };

  return (
    <Modal isOpen={openLoadCodeModal} shouldCloseOnOverlayClick={true}>
      <div className="loadCodeModalContainer">
        <h1 style={{ textAlign: "center" }}>
          Below is your most recently saved code
        </h1>
        <pre>
          <code>{loadedCode}</code>
        </pre>
        <h2 style={{ textAlign: "center" }}>
          Would you like to restore it to this session? Your partner will
          receive this saved code as well
        </h2>
        <Button
          size="large"
          variant="outlined"
          width="20%"
          style={buttonStyle}
          onClick={handleRestoreButtonPress}
        >
          {"Restore to session"}
        </Button>
        <Button
          size="large"
          variant="outlined"
          width="20%"
          style={{ ...buttonStyle, marginTop: "1vh" }}
          onClick={() => setOpenLoadCodeModal(false)}
        >
          {"Cancel"}
        </Button>
      </div>
    </Modal>
  );
};

export default LoadCodeModal;
