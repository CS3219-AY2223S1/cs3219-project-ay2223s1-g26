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
    console.log(args);
    console.log("Room: ", args.ROOM_ID);
    socket.join(args.ROOM_ID); // join specific room
    socket.on("text", (msg) => {
      io.emit("text", msg);
    });
  });

  console.log("connection: ", socket.id);
  return;
});

httpServer.listen(8081);
