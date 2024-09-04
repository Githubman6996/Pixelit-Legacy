const express = require("express");
const app = express();

// socket.io setup
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "Pixilet-Blooket-Private-Server/login.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("login", (name, pass) => {
    console.log(`login ${name} ${pass}`);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("server did load");
