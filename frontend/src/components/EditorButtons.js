import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EditorButtons = ({
  handleLeave,
  handleSave,
  handleCompleted,
  textChanged,
  setTextChanged,
}) => {
  const buttonStyle = { flex: 1, height: "80%" };

  const handleLeaveButtonPress = () => {
    handleLeave();
  };

  const handleSaveButtonPress = () => {
    handleSave();
    setTextChanged(false);
  };

  return (
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
        onClick={handleSaveButtonPress}
        disabled={!textChanged}
      >
        {textChanged ? "Save" : "Saved up to date"}
      </Button>
      <Button
        size="large"
        variant="contained"
        width="20%"
        style={buttonStyle}
        onClick={handleCompleted}
      >
        Completed
      </Button>
      <Button
        size="large"
        variant="contained"
        color="error"
        width="20%"
        style={buttonStyle}
        onClick={handleLeaveButtonPress}
      >
        Leave
      </Button>
    </Stack>
  );
};

export default EditorButtons;
