const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // socket.on("private message", (targetSocket, msg) => {
  //   socket.to(targetSocket).emit("private message", socket.id, msg);
  // });
  socket.on("match", (args) => {
    console.log(args);
    socket.on(args.USER_ID, (msg) => {
      io.emit(args.USER_ID, msg);
      console.log("msg: ", msg);
    });
  });

  console.log("connection: ", socket.id);
  return;
});

httpServer.listen(8080);