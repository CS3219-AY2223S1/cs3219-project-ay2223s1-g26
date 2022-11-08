import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import "./QuestionSelectDropdown.css";

export default function QuestionSelectDropdown({
  questionList,
  questionProp,
  setQuestionProp,
  handleChangeQuestionButtonPress,
}) {
  const [difficulty, setDifficulty] = useState("");

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuestionChange = (event) => {
    console.log("selected qn: ", event.target.value);
    setQuestionProp(event.target.value);
  };
  const buttonStyle = { flex: 1, height: "80%" };

  return (
    <div class="questionSelectContainer">
      <FormControl sx={{ m: 1, minWidth: "30%" }}>
        <InputLabel id="difficulty-select">Difficulty</InputLabel>
        <Select
          value={difficulty}
          labelId="difficulty-select"
          id="difficulty-selection"
          onChange={handleDifficultyChange}
        >
          {["EASY", "MEDIUM", "HARD"].map((difficulty) => {
            return (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: "50%" }}>
        <InputLabel id="question-label">Question</InputLabel>
        <Select
          labelId="question-label"
          id="question-selection"
          onChange={handleQuestionChange}
          disabled={difficulty == ""}
        >
          {questionList
            .filter((question) => question.difficulty === difficulty)
            .map((question) => {
              return (
                <MenuItem key={question._id} value={question}>
                  {question.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Button
        size="large"
        variant="outlined"
        width="20%"
        style={buttonStyle}
        onClick={handleChangeQuestionButtonPress}
        disabled={questionProp == undefined}
      >
        {"Confirm Change Question"}
      </Button>
    </div>
  );
}
