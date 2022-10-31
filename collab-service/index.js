const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");
const { config } = require("dotenv");
const app = express();

if (process.env.NODE_ENV !== 'production') { 
  config(); 
} 

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const user =  process.env.AWS_SOCKET_DB_USER;
const host = process.env.AWS_SOCKET_DB_ENDPOINT;
const database = process.env.AWS_SOCKET_DB;
const password = process.env.AWS_SOCKET_DB_PASSWORD;
const port = process.env.AWS_SOCKET_DB_PORT;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port
});

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

io.adapter(createAdapter(pool));

io.on("connection", (socket) => {
  socket.on("match", (args) => {
    socket.join(args.roomid); // join specific room
    socket.on("text", (msg) => {
      io.to(args.roomid).emit("text", msg);
    });
    socket.on("message", (msg) => {
      io.to(args.roomid).emit("message", msg);
    });
    socket.on("leave", () => {
      io.to(args.roomid).emit("left");
      socket.leave(args.roomid);
    });
  });
  return;
});

httpServer.listen(8081);
