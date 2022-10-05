import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./QuestionBox.css";

const QuestionBox = ({ questionProp }) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(questionProp);
  }, [questionProp]);

  return (
    <div className="questionboxContainer">
      <ReactMarkdown className="markdownContainer" children={question} />
    </div>
  );
};

export default QuestionBox;
