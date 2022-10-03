import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";

import "./Practice.css";
function Practice(props) {
  console.log("enter Practice");
  let location = useLocation();

  let uuid1, uuid2, roomid, difficulty;

  if (process.env.REACT_APP_ENV === "dev_1") {
    uuid1 = process.env.REACT_APP_USER1;
    uuid2 = process.env.REACT_APP_USER2;
    roomid = 1234567;
    difficulty = "MEDIUM";
  } else if (process.env.REACT_APP_ENV === "dev_2") {
    uuid1 = process.env.REACT_APP_USER2;
    uuid2 = process.env.REACT_APP_USER1;
    roomid = 1234567;
    difficulty = "MEDIUM";
  } else if (process.env.REACT_APP_ENV === "prod_1") {
    uuid1 = location.state;
    uuid2 = location.state;
    roomid = 1234567;
    difficulty = "MEDIUM";
  } else if (process.env.REACT_APP_ENV === "prod_2") {
    uuid1 = location.state;
    uuid2 = location.state;
    roomid = 1234567;
    difficulty = "MEDIUM";
  }

  return (
    <div className="practiceContainer">
      <div className="questionAndChat">
        <QuestionBox />
      </div>
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
