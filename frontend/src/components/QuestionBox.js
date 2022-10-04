import React, { Component, Text, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import EasyQuestion from "../resources/Easy.md";
import MediumQuestion from "../resources/Medium.md";
import HardQuestion from "../resources/Hard.md";
import "./QuestionBox.css";

const QuestionBox = ({ questionProp }) => {
  const DIFFICULTY = "Easy";
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const QUESTIONS = {
      Easy: EasyQuestion,
      Medium: MediumQuestion,
      Hard: HardQuestion,
    };

    questionProp
      ? setQuestion(questionProp)
      : fetch(QUESTIONS[DIFFICULTY])
          .then((res) => res.text())
          .then((text) => setQuestion(text));
  }, [questionProp]);

  return (
    <div className="questionboxContainer">
      <ReactMarkdown className="markdownContainer" children={question} />
    </div>
  );
};

export default QuestionBox;
