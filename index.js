const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(require("express").static("."));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/views/ingame.html");
});

io.on("connection", (socket) => {
  socket.on("clear", () => {
    io.emit("clear");
  });

  socket.on("teams", (names, scores) => {
    io.emit("teams", names, scores);
  });
});

http.listen(port, () => {
  console.log(`Server http://localhost:${port}/`);
});
