const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/views/ingame.html");
});

io.on("connection", (socket) => {
  socket.on("score", (data) => {
    io.emit("score", data);
  });

  socket.on("teams", (data) => {
      io.emit("teams", data);
  });
});

http.listen(port, () => {
  console.log(`Server http://localhost:${port}/`);
});
