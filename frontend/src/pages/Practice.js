import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";

import "./Practice.css";
function Practice() {

  var location = useLocation();
  console.log(location.state);

  return (
    <div className="practiceContainer">
      <QuestionBox />
      <CommonEditor />
    </div>
  );
}

export default Practice;
