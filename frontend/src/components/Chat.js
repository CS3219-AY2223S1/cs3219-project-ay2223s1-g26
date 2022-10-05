import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { context } from "../context";
import "./Chat.css";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(context);

  const ChatBubble = ({ content, self }) => {
    return (
      <div className={self ? "selfBubble" : "otherBubble"}>
        <p className="bubble">{content}</p>
      </div>
    );
  };

  const generateTextBubble = (msgObj, key) => {
    return <ChatBubble key={key} content={msgObj.content} self={msgObj.self} />;
  };

  const handleSendButton = () => {
    if (!messageText) return;
    setMessages((msgArr) => [
      ...msgArr,
      { self: true, content: messageText, key: msgArr.length },
    ]);
    socket.emit("message", { content: messageText, email: user.email });
    setMessageText("");
  };

  useEffect(() => {
    var objDiv = document.getElementById("chatContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleMessageRecieved = (msg) => {
      if (msg.email !== user.email)
        setMessages((msgArr) => [
          ...msgArr,
          { self: false, content: msg.content },
        ]);
    };
    socket && socket.on("message", handleMessageRecieved);
  }, [socket, user.email]);

  return (
    <div className="outerChatContainer">
      <div className="chatContainer" id="chatContainer">
        {messages.map((msg, key) => generateTextBubble(msg, key))}
      </div>
      <div className="textAndSubmit">
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label="Message"
          variant="filled"
          onChange={(event) => setMessageText(event.target.value)}
          value={messageText}
        />
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={handleSendButton}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
