import React, { Component, Text, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import EasyQuestion from "../resources/Easy.md";
import MediumQuestion from "../resources/Medium.md";
import HardQuestion from "../resources/Hard.md";
import "./QuestionBox.css";

const QuestionBox = ({ difficulty }) => {
  const QUESTIONS = {
    Easy: EasyQuestion,
    Medium: MediumQuestion,
    Hard: HardQuestion,
  };
  const DIFFICULTY = "Easy";

  // TODO: Implement this based on route parameters
  // const DIFFICULTY = difficulty;

  const [question, setQuestion] = useState("");
  useEffect(() => {
    fetch(QUESTIONS[DIFFICULTY])
      .then((res) => res.text())
      .then((text) => setQuestion(text));
  }, []);
  return (
    <div className="questionboxContainer">
      <ReactMarkdown className="markdownContainer" children={question} />
    </div>
  );
};

export default QuestionBox;
