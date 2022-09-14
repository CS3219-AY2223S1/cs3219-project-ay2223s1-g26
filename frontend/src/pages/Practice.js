import React, { useEffect, useState } from "react";
import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";

import "./Practice.css";
function Practice() {
  return (
    <div className="practiceContainer">
      <QuestionBox />
      <CommonEditor />
    </div>
  );
}

export default Practice;
