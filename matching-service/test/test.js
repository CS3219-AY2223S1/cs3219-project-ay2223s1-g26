import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
var assert = chai.assert;

describe("Waiting", () => {
    describe("POST /waiting", () => {
        it("should successfully post a waitee", (done) => {
            chai.request(app)
                .post('/waiting/testUuid/medium')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.difficulty, "medium");
                    done();
                })
        })
    })
})

//Test POST error resiliency
describe("Waiting", () => {
    describe("POST /waiting", () => {
        it("should successfully post a waitee", (done) => {
            chai.request(app)
                .post('/waiting/testUuid/medium')
                .end((err, res) => {
                    assert.equal(res.status, 204);
                    done();
                })
        })
    })
})

describe("Waiting", () => {
    describe("GET /waiting", () => {
        it("should successfully GET a waitee", (done) => {
            chai.request(app)
                .get('/waiting/medium')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body[0].uuid, "testUuid");
                    assert.equal(res.body[0].difficulty, "medium");
                    done();
                })
        })
    })
})

describe("Waiting", () => {
    describe("DELETE /waiting", () => {
        it("should successfully delete a waitee", (done) => {
            chai.request(app)
                .delete('/waiting/testUuid')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.difficulty, "medium");
                    done();
                })
        })
    })
})

//Test DELETE error resiliency
describe("Waiting", () => {
    describe("DELETE /waiting", () => {
        it("should successfully delete a waitee", (done) => {
            chai.request(app)
                .delete('/waiting/testUuid')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                })
        })
    })
})


describe("Sockets", () => {
    describe("PUT /sockets", () => {
        it("should successfully post a socket", (done) => {
            chai.request(app)
                .put('/sockets/testSocketId/testUuid')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.id, "testSocketId");
                    done();
                })
        })
    })
})

//Test PUT update
describe("Sockets", () => {
    describe("PUT /sockets", () => {
        it("should successfully update a socket", (done) => {
            chai.request(app)
                .put('/sockets/testSocketId1/testUuid')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.id, "testSocketId1");
                    done();
                })
        })
    })
})

describe("Sockets", () => {
    describe("GET /sockets", () => {
        it("should successfully GET a socket", (done) => {
            chai.request(app)
                .get('/sockets')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body[0].uuid, "testUuid");
                    assert.equal(res.body[0].id, "testSocketId1");
                    done();
                })
        })
    })
})

describe("Sockets", () => {
    describe("GET /sockets/:uuid", () => {
        it("should successfully GET a socket", (done) => {
            chai.request(app)
                .get('/sockets/testUuid')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.id, "testSocketId1");
                    done();
                })
        })
    })
})

describe("Sockets", () => {
    describe("DELETE /sockets/:socketid", () => {
        it("should successfully delete a socket", (done) => {
            chai.request(app)
                .delete('/sockets/testSocketId1')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.uuid, "testUuid");
                    assert.equal(res.body.id, "testSocketId1");
                    done();
                })
        })
    })
})

//Test DELETE error resiliency
describe("Sockets", () => {
    describe("DELETE /sockets/:socketid", () => {
        it("should successfully delete a socket", (done) => {
            chai.request(app)
                .delete('/sockets/testSocketId1')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                })
        })
    })
})