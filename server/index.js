const express = require("express");

const app = express();
const server = require("http").createServer(app);

const { SerialPort } = require("serialport");

// socket.io
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

server.listen(3000, function () {
  console.log("Server listening");
});

const serialPort = new SerialPort({
  path: "/dev/cu.usbmodem11101",
  baudRate: 9600,
  parity: "none",
}).setEncoding("utf8");

io.on("connection", function (socket) {
  socket.on("play_record", function (play) {
    console.log(`${play ? "Play" : "Pause"} record`);
    serialPort.write(`${play ? 1 : 0}`);
  });
});
