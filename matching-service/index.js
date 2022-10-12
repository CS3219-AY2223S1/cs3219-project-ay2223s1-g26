import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  insertWaitingQuery,
  getMatchQuery,
  readWaitingQuery,
  deleteWaitingQuery,
} from "./match/database.js";
import { v4 as uuidv4 } from "uuid";

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

const socketMap = new Map();

io.on("connection", (socket) => {
    console.log("A client connected!");
    socket.emit("connected");
    socket.on("register", function(uuidField) {
        socketMap.set(uuidField, socket.id);
        console.log("socket " + socket.id + " registered, with id: " + uuidField);
    })
    socket.on('getMatch', async function(uuidField, difficultyField) {
        console.log("getMatch called with uuid: " +  uuidField + " and difficulty: " + difficultyField);
        const partner = await getMatchQuery(uuidField, difficultyField);
        console.log(partner);
        if (partner != null) {
            var roomUuid = uuidv4();
            const partnerUuid = partner[1];
            socket.emit("matchFound", uuidField, partnerUuid, roomUuid);
            const partnerSocketId = socketMap.get(partnerUuid);
            socket.to(partnerSocketId).emit("matchFound", partnerSocketId, uuidField, roomUuid)
        }
    })
    
    socket.on('deregister', async function(uuidField) {
        const waitee = await deleteWaitingQuery(uuidField);
        if (waitee == null) {
            //socket.emit("deregister_failed");
        }
        socket.emit("deregister_success");
    })
})

//Configure public folder
var clientDir = path.join(__dirname, "public");
app.use("/", express.static(clientDir));

//Send static HTML file
app.get("/", (req, res) => {
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
