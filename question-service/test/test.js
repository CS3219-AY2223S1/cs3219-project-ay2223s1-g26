import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

let should = chai.should();

chai.use(chaiHttp);

describe("GET A Question", () => {
  it("it should GET a random EASY Question", (done) => {
    chai
      .request(server)
      .get("/questions?difficulty=EASY")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body["data"].should.have.property("_id");
        res.body["data"].should.have.property("difficulty");
        res.body["data"].should.have.property("name");
        res.body["data"].should.have.property("question");

        res.body["data"].should.have.property("difficulty").eql("EASY");

        done();
      });
  });

  it("it should GET a random MEDIUM Question", (done) => {
    chai
      .request(server)
      .get("/questions?difficulty=MEDIUM")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body["data"].should.have.property("_id");
        res.body["data"].should.have.property("difficulty");
        res.body["data"].should.have.property("name");
        res.body["data"].should.have.property("question");

        res.body["data"].should.have.property("difficulty").eql("MEDIUM");

        done();
      });
  });

  it("it should throw an error when difficulty is wrongly provided", (done) => {
    chai
      .request(server)
      .get("/questions?difficulty=AVERAGE")
      .end((err, res) => {
        res.status.should.be.eql(500);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have
          .property("status")
          .eql(
            "Bad Request: Invalid Difficulty Level. Please provide difficulty of EASY, MEDIUM or HARD"
          );

        done();
      });
  });

  it("it should GET a random HARD Question", (done) => {
    chai
      .request(server)
      .get("/questions?difficulty=HARD")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body["data"].should.have.property("_id");
        res.body["data"].should.have.property("difficulty");
        res.body["data"].should.have.property("name");
        res.body["data"].should.have.property("question");

        res.body["data"].should.have.property("difficulty").eql("HARD");

        done();
      });
  });

  it("it should GET a question specified by id", (done) => {
    chai
      .request(server)
      .get("/questions?id=634fd12137424ca2d53668c8")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body["data"].should.have.property("_id");

        res.body["data"].should.have.property("difficulty");
        res.body["data"].should.have.property("name");
        res.body["data"].should.have.property("question");

        res.body["data"].should.have
          .property("_id")
          .eql("634fd12137424ca2d53668c8");

        done();
      });
  });

  it("it should return Status 500 when invalid question id is provided", (done) => {
    chai
      .request(server)
      .get("/questions?id=random")
      .end((err, res) => {
        res.status.should.be.eql(500);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("status").eql("Invalid Question Id");

        done();
      });
  });

  it("it should return Status 404 question with specified id cannot be found", (done) => {
    chai
      .request(server)
      .get("/questions?id=634fd12137424ca2d53668c9")
      .end((err, res) => {
        res.status.should.be.eql(404);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("status").eql("Not Found");

        done();
      });
  });
});
