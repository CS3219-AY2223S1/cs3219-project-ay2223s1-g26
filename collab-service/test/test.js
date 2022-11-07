var expect = require("chai").expect;
var io = require("socket.io-client");

var app = require("../index");

var socketUrl = "http://localhost:8081";

var options = {
  transports: ["websocket"],
  "force new connection": true,
};

var joinRoomDetails = {
  uuid1: "test_uuid_1",
  uuid2: "test_uuid_2",
  roomid: "test_roomid",
};
var joinRoomDetails2 = {
  uuid1: "test_uuid_3",
  uuid2: "test_uuid_4",
  roomid: "test_roomid_2",
};

describe("Collab Session", function () {
  it("should synchronise text change in common editor", function (done) {
    client1 = io.connect(socketUrl, options);

    client1.on("text", function (msg) {
      expect(msg).to.equal("test");
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on("connect", function () {
      client1.emit("match", joinRoomDetails);
      client2 = io.connect(socketUrl, options);

      client2.on("connect", function () {
        client2.emit("match", joinRoomDetails);
        client2.emit("text", "test");
      });
    });
  });

  it("should NOT synchronise text change different rooms", function (done) {
    client2CallCount = 0;
    client3CallCount = 0;

    client1 = io.connect(socketUrl, options);

    client1.on("connect", function () {
      client1.emit("match", joinRoomDetails);

      client2 = io.connect(socketUrl, options);
      client2.emit("match", joinRoomDetails);

      client2.on("connect", function () {
        client3 = io.connect(socketUrl, options);
        client3.emit("match", joinRoomDetails2);

        client3.on("connect", function () {
          client1.emit("text", joinRoomDetails2);
        });

        client3.on("text", function () {
          client3CallCount++;
        });
      });

      client2.on("text", function () {
        client2CallCount++;
      });
    });

    setTimeout(function () {
      expect(client2CallCount).to.equal(1);
      expect(client3CallCount).to.equal(0);
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    }, 25);
  });

  it("should send and receive a message", function (done) {
    client1 = io.connect(socketUrl, options);

    client1.on("message", function (msg) {
      expect(msg).to.equal("test");
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on("connect", function () {
      client1.emit("match", joinRoomDetails);
      client2 = io.connect(socketUrl, options);

      client2.on("connect", function () {
        client2.emit("match", joinRoomDetails);
        client2.emit("message", "test");
      });
    });
  });

  it("should NOT send and receive message across different rooms", function (done) {
    client2CallCount = 0;
    client3CallCount = 0;

    client1 = io.connect(socketUrl, options);

    client1.on("connect", function () {
      client1.emit("match", joinRoomDetails);

      client2 = io.connect(socketUrl, options);
      client2.emit("match", joinRoomDetails);

      client2.on("connect", function () {
        client3 = io.connect(socketUrl, options);
        client3.emit("match", joinRoomDetails2);

        client3.on("connect", function () {
          client1.emit("message", joinRoomDetails2);
        });

        client3.on("message", function () {
          client3CallCount++;
        });
      });

      client2.on("message", function () {
        client2CallCount++;
      });
    });

    setTimeout(function () {
      expect(client2CallCount).to.equal(1);
      expect(client3CallCount).to.equal(0);
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    }, 25);
  });

  it("should inform user of partner's departure", function (done) {
    client1 = io.connect(socketUrl, options);

    client1.on("left", function (msg) {
      expect(msg);
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on("connect", function () {
      client1.emit("match", joinRoomDetails);
      client2 = io.connect(socketUrl, options);

      client2.on("connect", function () {
        client2.emit("match", joinRoomDetails);
        client2.emit("leave", "");
      });
    });
  });
});
