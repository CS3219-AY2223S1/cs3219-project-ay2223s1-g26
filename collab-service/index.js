let express = require("express");
let socket = require("socket.io");
const { io } = require("socket.io-client");

let app = express();

let server = app.listen(8080);
console.log("Server listening on port 8080");

app.use(express.static("public"));

const backIO = socket(server, {
  cors: { origin: "*" },
});

connection = (socket) => {
  handleTextSent = () => {
    text.text = data.text;
    backIO.sockets.emit("text", data);
    return;
  };
  receiveTextChange = (text) => {
    socket.emit("emitttedTextChange");
  };
  console.log("socket arg: ", socket.arg);
  console.log("a new user with id " + socket.id + " has entered");
  socket.emit("newUser", text);
  socket.on("text", handleTextSent);
  socket.on("join", (args) => console.log("hello: ", args));
  socket.on("textChange", receiveTextChange);
  return;
};
backIO.sockets.on("connect", connection);
let text = "";
