import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";

import "./Practice.css";
function Practice(props) {
  var location = useLocation();

  const { uuid1, uuid2, roomid, difficulty } = location.state;

  return (
    <div className="practiceContainer">
      <QuestionBox />
      <CommonEditor
        uuid1={uuid1}
        uuid2={uuid2}
        roomid={roomid}
        difficulty={difficulty}
      />
    </div>
  );
}

export default Practice;
