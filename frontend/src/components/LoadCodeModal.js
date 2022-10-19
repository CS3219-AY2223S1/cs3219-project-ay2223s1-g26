import axios from "axios";
import React, { Component, useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { context } from "../context";

const LoadCodeModal = ({
  openLoadCodeModal,
  setOpenLoadCodeModal,
  questionId,
  handleRestoreCode,
}) => {
  const { user, setIsLoading, $axios } = useContext(context);
  const [loadedCode, setLoadedCode] = useState("");
  const buttonStyle = { flex: 1, height: "80%" };

  useEffect(() => {
    $axios
      .get(`${$axios.defaults.baseURL}/getSavedCode`, {
        questionId: questionId,
      })
      .then((code) => setLoadedCode(code));
  }, [$axios, questionId]);

  const handleRestoreButtonPress = () => {
    setOpenLoadCodeModal(false);
    handleRestoreCode(loadedCode);
  };

  return (
    <Modal isOpen={openLoadCodeModal}>
      <h1>Below is your most recently saved code</h1>
      <p>{loadedCode}</p>
      <h2>
        Would you like to restore it to this session? Your partner will receive
        this saved code as well
      </h2>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        height="10%"
        display="flex"
        style={{ padding: "1vh 2vw" }}
      >
        <Button
          size="large"
          variant="outlined"
          width="20%"
          style={buttonStyle}
          onClick={handleRestoreButtonPress}
        >
          {"Restore to Session"}
        </Button>
      </Stack>
    </Modal>
  );
};

export default LoadCodeModal;
