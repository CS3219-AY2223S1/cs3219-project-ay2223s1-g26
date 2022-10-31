import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  readSocketsQuery,
  insertSocketsQuery,
  deleteSocketsQuery,
  readSocketsByUuidQuery,
  insertWaitingQuery,
  getMatchQuery,
  readWaitingQuery,
  deleteWaitingQuery,
  deleteSocketsByUuidQuery,
} from "./match/database.js";
import { v4 as uuidv4 } from "uuid";
import * as adapter from "@socket.io/postgres-adapter";
import pg from "pg";
const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const user =  process.env.AWS_SOCKET_DB_USER;
const host = process.env.AWS_SOCKET_DB_ENDPOINT;
const database = process.env.AWS_SOCKET_DB;
const password = process.env.AWS_SOCKET_DB_PASSWORD;
const port = process.env.AWS_SOCKET_DB_PORT;

console.log(password);

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

io.adapter(adapter.createAdapter(pool));

io.on("connection", (socket) => {
    console.log("A client connected! With socket id: " + socket.id);
    socket.emit("connected");
    socket.on("register", async function(uuidField) {
        const registeredSocket = await insertSocketsQuery(socket.id, uuidField);
        if (registeredSocket != null) {
          const registeredId = registeredSocket.id;
          console.log("socket " + registeredId + " registered, with id: " + uuidField);
        }
    })

    socket.on('getMatch', async function(uuidField, difficultyField) {
        console.log("getMatch called with uuid: " +  uuidField + " and difficulty: " + difficultyField);
        const partner = await getMatchQuery(uuidField, difficultyField);
        console.log(partner);
        if (partner != null) {
            var roomUuid = uuidv4();
            const partnerUuid = partner[1];
            socket.emit("matchFound", uuidField, partnerUuid, roomUuid);
            const partnerSocket = await readSocketsByUuidQuery(partnerUuid);
            const partnerSocketId = partnerSocket.id;
            console.log("partnerSocketId: " + partnerSocketId); 
            socket.to(partnerSocketId).emit("matchFound", partnerSocketId, uuidField, roomUuid)
            await deleteSocketsByUuidQuery(uuidField);
            await deleteSocketsByUuidQuery(partnerUuid);
        }
    })
    
    socket.on('deregister', async function(uuidField, numberOfRetries) {
        const waitee = await deleteWaitingQuery(uuidField);
        if (waitee == null) {
          socket.emit("deregister_failed", numberOfRetries);
        } else {
          socket.emit("deregister_success");
        }
    })

    socket.on('disconnect', async() => {
      deleteSocketsQuery(socket.id);
    })
})

//Configure public folder
var clientDir = path.join(__dirname, "public");
app.use("/", express.static(clientDir));

//Send static HTML file
app.get("/", (req, res) => {s
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/testInsertQuery", async (req, res) => {
  const waitee = await insertWaitingQuery("uuid2", "hard");
  if (waitee != null) {
    res.send(JSON.stringify(waitee, null, 2));
  } else {
    res.send("");
  }
});

app.get("/testReadQuery", async (req, res) => {
  const waitee = await readWaitingQuery("hard");
  res.send(JSON.stringify(waitee, null, 2));
});

app.get("/getMatch", async (req, res) => {
  const partner = await getMatchQuery("uuid4", "hard");
  res.send(JSON.stringify(partner, null, 2));
});

//Start listening on port 3000
httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
