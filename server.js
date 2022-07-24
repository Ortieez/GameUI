import { Server } from "socket.io";

const io = new Server({
   cors: {
      origin: "*",
   }
});

io.on("connection", (socket) => {
   socket.on("test", ()=> {
      console.log("test");
   })
});

io.listen(3000);
console.log("Listening on port 3000");