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
    }
});