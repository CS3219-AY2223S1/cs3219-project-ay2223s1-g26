import React, { useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import ReactMarkdown from "react-markdown";

import "./ChangeQuestionModal.css";
import QuestionSelectDropdown from "./QuestionSelectDropdown.js";

const ChangeQuestionModal = ({
  openChangeQuestionModal,
  setOpenChangeQuestionModal,
  questionList,
  setQuestion,
  setQuestionRoot,
  question,
  handleChangeQuestion,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState();

  const handleChangeQuestionButtonPress = () => {
    console.log("change question: ", question);
    setQuestion(selectedQuestion.question);
    setQuestionRoot(selectedQuestion);
    setOpenChangeQuestionModal(false);
    handleChangeQuestion(selectedQuestion);
  };

  const handleCloseModal = () => {
    setOpenChangeQuestionModal(false);
  };

  return (
    <Modal isOpen={openChangeQuestionModal} shouldCloseOnOverlayClick={true}>
      <div className="ChangeQuestionModalContainer">
        <h1 style={{ textAlign: "center" }}>
          Here is a list of questions you can choose from
        </h1>
        <h2 style={{ textAlign: "center" }}>
          Would you like to change the Session's Question? Your partner's
          question will change as well.
        </h2>
        <QuestionSelectDropdown
          questionList={questionList}
          questionProp={selectedQuestion}
          setQuestionProp={setSelectedQuestion}
          handleChangeQuestionButtonPress={handleChangeQuestionButtonPress}
          handleCloseModal={handleCloseModal}
        />
        <ReactMarkdown
          className="markdownContainer"
          children={selectedQuestion?.question}
        />
      </div>
    </Modal>
  );
};

export default ChangeQuestionModal;
