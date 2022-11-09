import {
    insertSocketsQuery,
    deleteSocketsQuery,
    readSocketsByUuidQuery,
    insertWaitingQuery,
    getMatchQuery,
    readWaitingQuery,
    deleteWaitingQuery,
    deleteSocketsByUuidQuery,
    readSocketsQuery,
} from "../match/database.js";
import app from '../index.js';

//Waiting insert
app.post(`/waiting/:uuid/:difficulty`, async (req, res) => {
    let uuid = req.params.uuid;
    let difficulty = req.params.difficulty;
    if (uuid == null || difficulty == null) {
      res.send(400);
      return;
    }
    const waitee = await insertWaitingQuery(uuid, difficulty);
    if (waitee != null) {
      res.status(200);
      res.send(waitee);
    } else {
      res.send(204);
      res.send(waitee);
    }
  });
  
//Waiting get
app.get(`/waiting/:difficulty`, async (req, res) => {
  let difficulty = req.params.difficulty;
  if (difficulty == null) {
    res.send(400);
    return;
  }
  const waitingUsers = await readWaitingQuery(difficulty);
  if (waitingUsers != null) {
    res.status(200);
    res.send(waitingUsers);
  } else {
    res.status(404);
    res.send("Resource not found");
  }
});

//Waiting delete
app.delete(`/waiting/:uuid`, async (req,res) => {
  var uuid = req.params.uuid;
  if (uuid == null) {
    res.send(400);
    return;
  }
  const waitee = await deleteWaitingQuery(uuid);
  if (waitee != null) {
    res.status(200);
    res.send(waitee);
  } else {
    res.status(404);
    res.send(waitee);
  }});

app.put(`/sockets/:socketid/:uuid`, async (req, res) => {
  var uuid = req.params.uuid;
  var socketId = req.params.socketid;
  if (uuid == null || socketId == null) {
    res.send(400);
  }
  const socket = await insertSocketsQuery(socketId, uuid);
  if (socket == null) {
    res.status(204);
    res.send(socket);
    return;
  } else {
    res.status(200);
    res.send(socket);
  }
})

app.get(`/sockets/:uuid`, async (req,res) => {
  var uuid = req.params.uuid;
  if (uuid == null) {
    res.send(400);
    return;
  }
  var socket = await readSocketsByUuidQuery(uuid);
  if (socket == null) {
    res.send(404);
    return;
  }
  res.status(200);
  res.send(socket);
})

app.get(`/sockets`, async (req,res) => {
  var sockets = await readSocketsQuery();
  if (sockets == null) {
    res.send(400);
    return;
  }
  res.status(200);
  res.send(sockets);
})

app.delete(`/sockets/:socketid`, async (req, res) => {
  var socketId = req.params.socketid;
  if (socketId == null) {
    res.send(400);
    return;
  }
  var socket = await deleteSocketsQuery(socketId);
  if (socket == null) {
    res.send(404);
    return;
  }
  res.status(200);
  res.send(socket);
})