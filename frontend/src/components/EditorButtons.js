import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EditorButtons = ({
  handleLeave,
  handleSave,
  handleCompleted,
  handleLoadButtonPress,
  textChanged,
  setTextChanged,
}) => {
  const buttonStyle = { flex: 1, height: "80%" };

  const handleLeaveButtonPress = () => {
    handleLeave();
  };

  const handleSaveButtonPress = () => {
    console.log("save button press");
    handleSave();
    setTextChanged(false);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      height="10%"
      display="flex"
      style={{ paddingTop: "1vh" }}
    >
      <Button
        size="large"
        variant="outlined"
        width="20%"
        style={buttonStyle}
        onClick={handleLoadButtonPress}
        disabled={!textChanged}
      >
        {"Load"}
      </Button>
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
