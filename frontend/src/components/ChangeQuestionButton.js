import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ChangeQuestionButton = ({ setOpenChangeQuestionModal }) => {
  const buttonStyle = { height: "80%" };

  const handleButtonPress = () => {
    setOpenChangeQuestionModal(true);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      height="10%"
      display="flex"
    >
      <Button
        size="large"
        variant="outlined"
        style={buttonStyle}
        onClick={handleButtonPress}
      >
        {"Change Question"}
      </Button>
    </Stack>
  );
};

export default ChangeQuestionButton;
