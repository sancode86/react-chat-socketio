const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

app.use(cors("*"));

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (Socket) => {
  let name;

  Socket.on("connected", (someone) => {
    name = someone;
    io.emit("messages", { name, msg: `${name} entered the room 😄` });
  });

  Socket.on("message", (name, msg, time) => {
    var todayNow = new Date();
    var dateNow =
      todayNow.getFullYear() +
      "-" +
      (todayNow.getMonth() + 1) +
      "-" +
      todayNow.getDate();
    var timeNow =
      todayNow.getHours() +
      ":" +
      todayNow.getMinutes() +
      ":" +
      todayNow.getSeconds();
    var time = " " + timeNow;

    io.emit("messages", { name, msg, time });
  });

  Socket.on("disconnect", () => {
    io.emit("messages", { server: "server", msg: `${name} left 😔` });
  });
});

server.listen(3000, () => {
  console.log("Server up!");
});
