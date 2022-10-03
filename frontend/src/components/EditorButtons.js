import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const EditorButtons = ({ handleLeave }) => {
  const buttonStyle = { flex: 1, height: "80%" };

  const handleLeaveButtonPress = () => {
    handleLeave();
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
      <Button size="large" variant="outlined" width="20%" style={buttonStyle}>
        Attempted
      </Button>
      <Button size="large" variant="contained" width="20%" style={buttonStyle}>
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
