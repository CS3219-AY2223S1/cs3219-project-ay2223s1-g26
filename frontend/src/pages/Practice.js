import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import CommonEditor from "../components/CommonEditor";
import QuestionBox from "../components/QuestionBox";
import ChangeQuestionModal from "../components/ChangeQuestionModal";
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
  const [question, setQuestion] = useState({});
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    setUuid1(location.state?.uuid1);
    setUuid2(location.state?.uuid2);
    setRoomid(location.state?.roomUuid);
    setDifficulty(location.state?.difficulty?.toUpperCase());

    const fetchQuestion = async () => {
      let intSeed = 0;
      for (let c of roomid) {
        if (!Number.isNaN(parseInt(c))) intSeed += parseInt(c);
      }
      const request = `http://question-service-load-balancer-1091982636.ap-southeast-1.elb.amazonaws.com/questions?difficulty=${difficulty}&seed=${intSeed}`;
      const question = await axios.get(request).catch((err) => {
        console.log("error fetching qn: ", location.state?.difficulty);
        console.log(err);
      });
      setQuestion(question?.data?.data);
    };

    const fetchAllQuestons = async () => {
      let intSeed = 0;
      for (let c of roomid) {
        if (!Number.isNaN(parseInt(c))) intSeed += parseInt(c);
      }
      const request = `http://question-service-load-balancer-1091982636.ap-southeast-1.elb.amazonaws.com/allQuestions`;
      const questions = await axios.get(request).catch((err) => {
        console.log(err);
      });
      setQuestionList(questions?.data?.data);
    };

    if (roomid) {
      fetchQuestion();
      fetchAllQuestons();
    }
  }, [location.state, roomid, difficulty]);

  useEffect(() => {
    const csEndpoint =
      "collab-network-load-balancer-0122fd4415edad18.elb.ap-southeast-1.amazonaws.com";
    setSocket(
      io(
        "collab-network-load-balancer-0122fd4415edad18.elb.ap-southeast-1.amazonaws.com"
      )
    );
  }, []);

  const handlePartnerChangeQuestion = (question) => {
    setQuestion(question);
  };

  const handleChangeQuestion = (question) => {
    console.log("emmitting: ", question);
    socket.emit("change question", question);
  };
  return (
    <div className="practiceContainer">
      <div className="questionAndChat">
        {question && (
          <QuestionBox
            setQuestionProp={setQuestion}
            questionProp={question}
            questionList={questionList}
            handleChangeQuestion={handleChangeQuestion}
          />
        )}
        <Chat socket={socket} />
      </div>
      <CommonEditor
        uuid1={uuid1}
        uuid2={uuid2}
        roomid={roomid}
        question={question}
        socket={socket}
        handlePartnerChangeQuestion={handlePartnerChangeQuestion}
      />
    </div>
  );
}

export default Practice;
