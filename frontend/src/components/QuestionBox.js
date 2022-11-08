import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./QuestionBox.css";
import ChangeQuestionButton from "./ChangeQuestionButton";
import ChangeQuestionModal from "./ChangeQuestionModal";

const QuestionBox = ({
  questionProp,
  questionList,
  handleChangeQuestion,
  setQuestionProp,
}) => {
  const [question, setQuestion] = useState("");
  const [openChangeQuestionModal, setOpenChangeQuestionModal] = useState(false);

  useEffect(() => {
    setQuestion(questionProp.question);
  }, [questionProp]);

  return (
    <div className="questionboxContainer">
      <ChangeQuestionModal
        setOpenChangeQuestionModal={setOpenChangeQuestionModal}
        openChangeQuestionModal={openChangeQuestionModal}
        questionList={questionList}
        setQuestion={setQuestion}
        setQuestionRoot={setQuestionProp}
        question={questionProp}
        handleChangeQuestion={handleChangeQuestion}
      />
      <ChangeQuestionButton
        setOpenChangeQuestionModal={setOpenChangeQuestionModal}
        questionList={questionList}
      />
      <ReactMarkdown className="markdownContainer" children={question} />
    </div>
  );
};

export default QuestionBox;
