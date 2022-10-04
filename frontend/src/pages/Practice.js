import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";
import { context } from "../context";

import "./Practice.css";
function Practice() {
  let location = useLocation();
  const { user, setIsLoading, $axios } = useContext(context);

  const [uuid1, setUuid1] = useState(null);
  const [uuid2, setUuid2] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [roomid, setRoomid] = useState(null);
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState();

  useEffect(() => {
    if (process.env.REACT_APP_ENV === "dev_1") {
      setUuid1(process.env.REACT_APP_USER1);
      setUuid2(process.env.REACT_APP_USER2);
      setRoomid(1234567);
      setDifficulty("MEDIUM");
    } else if (process.env.REACT_APP_ENV === "dev_2") {
      setUuid1(process.env.REACT_APP_USER1);
      setUuid2(process.env.REACT_APP_USER2);
      setRoomid(1234567);
      setDifficulty("MEDIUM");
    } else if (process.env.REACT_APP_ENV === "prod_1") {
      setUuid1(location.state?.uuid1);
      setUuid2(location.state?.uuid2);
      setRoomid(location.state?.roomUuid);
      setDifficulty(location.state?.difficulty?.toUpperCase());
    } else if (process.env.REACT_APP_ENV === "prod_2") {
      setUuid1(location.state?.uuid2);
      setUuid2(location.state?.uuid1);
      setRoomid(location.state?.roomUuid);
      setDifficulty(location.state?.difficulty?.toUpperCase());
    }
    console.log("roomID", roomid);
    roomid && fetchQuestion();
  }, [location.state, roomid]);

  const fetchQuestion = async () => {
    let intSeed = 0;
    for (let c of roomid) {
      if (!Number.isNaN(parseInt(c))) intSeed += parseInt(c);
    }
    const request = `http://localhost:3005/questions?difficulty=${difficulty}&seed=${intSeed}`;
    const question = await axios.get(request).catch((err) => {
      console.log("error fetching qn: ", err);
    });
    setQuestion(question?.data?.data?.question);
    setQuestionId(question?.data?.data?._id);
  };

  return (
    <div className="practiceContainer">
      <div className="questionAndChat">
        {question && <QuestionBox questionProp={question} />}
      </div>
      <CommonEditor
        uuid1={uuid1}
        uuid2={uuid2}
        roomid={roomid}
        difficulty={difficulty}
        questionId={questionId}
      />
    </div>
  );
}

export default Practice;
