const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  // socket.on("private message", (targetSocket, msg) => {
  //   socket.to(targetSocket).emit("private message", socket.id, msg);
  // });
  socket.on("match", (args) => {
    socket.join(args.roomid); // join specific room
    socket.on("text", (msg) => {
      io.to(args.roomid).emit("text", msg);
    });
    socket.on("leave", () => {
      io.to(args.roomid).emit("left");
      socket.leave(args.roomid);
    });
  });
  return;
});

httpServer.listen(8081);
