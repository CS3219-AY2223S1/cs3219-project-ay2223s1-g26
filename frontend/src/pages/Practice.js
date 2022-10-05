import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";
import Chat from "../components/Chat";
import EasyQuestion from "../resources/Easy.md";
import MediumQuestion from "../resources/Medium.md";
import HardQuestion from "../resources/Hard.md";

import "./Practice.css";

function Practice() {
  let location = useLocation();
  const [socket, setSocket] = useState();
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

    const fetchQuestion = async () => {
      const QUESTIONS = {
        EASY: EasyQuestion,
        MEDIUM: MediumQuestion,
        HARD: HardQuestion,
      };

      if (process.env.REACT_APP_ENV.substring(0, 3) === "dev") {
        console.log("setting question: ", QUESTIONS[difficulty]);
        fetch(QUESTIONS[difficulty])
          .then((res) => res.text())
          .then((qn) => setQuestion(qn));
        setQuestion(QUESTIONS[difficulty]);
        setQuestionId(123);
      } else {
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
      }
    };

    if (roomid) fetchQuestion();
  }, [location.state, roomid, difficulty]);

  useEffect(() => {
    setSocket(io("http://localhost:8081"));
  }, []);

  return (
    <div className="practiceContainer">
      <div className="questionAndChat">
        {question && <QuestionBox questionProp={question} />}
        <Chat socket={socket} />
      </div>
      <CommonEditor
        uuid1={uuid1}
        uuid2={uuid2}
        roomid={roomid}
        difficulty={difficulty}
        questionId={questionId}
        socket={socket}
      />
    </div>
  );
}

export default Practice;
