import React from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

const PartnerLeftModal = ({
  partnerLeave,
  handleCompleted,
  handleSave,
  textChanged,
  setTextChanged,
  completed,
}) => {
  const navigate = useNavigate();
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(100, 100, 100, 0.5)",
      height: "100vh",
      width: "100vw",
      padding: "30vh 25vw",
      boxSizing: "border-box",
    },
    content: {
      margin: "20vh 15vw",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3rem",
    },
  };

  const buttonStyle = { flex: 1, height: "80%" };

  const rerouteToLobby = () => {
    navigate("/dashboard");
  };

  return (
    <Modal
      isOpen={partnerLeave}
      style={modalStyle}
      shouldCloseOnOverlayClick={true}
    >
      <h1>Partner has left the session</h1>
      <h3 style={{ textAlign: "center" }}>
        Return to the matching lobby to find a new partner
      </h3>
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
          onClick={() => {
            handleSave();
            setTextChanged(false);
          }}
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
          disabled={completed}
        >
          Completed
        </Button>
        <Button
          size="large"
          variant="outlined"
          width="20%"
          onClick={rerouteToLobby}
          style={buttonStyle}
        >
          Return to Lobby
        </Button>
      </Stack>
    </Modal>
  );
};

export default PartnerLeftModal;
