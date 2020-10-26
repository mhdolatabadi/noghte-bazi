const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const config = require("./src/setup/config")
let rooms = [];
let changeLog = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("handshake", "welcome! give me your room id!")
  socket.on("handshake", (roomId) => {
    if (rooms[roomId] === 2) {
      socket.emit("role", "subscriber");
      socket.join(roomId)
      socket.emit("watch", changeLog[roomId])
      socket.role = "subscriber"
    } else if (rooms[roomId] === 1) {
      socket.emit("turn", "blue");
      rooms[roomId] = 2;
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("wait", "play")
      socket.room = roomId;
    } else {
      rooms[roomId] = 1;
      socket.emit("turn", "red");
      socket.emit("wait", "wait")
      changeLog[roomId] = [];
      socket.join(roomId);
      socket.room = roomId;
    }
  });
  socket.on("disconnect", () => {
    if(socket.role !== "subscriber"){
      socket.broadcast.to(socket.room).emit("resign", "opponent resigned");
      rooms[socket.room] -= 1;
      changeLog[roomId] = []
    }
  });
  socket.on("change", (change) => {
    changeLog[socket.room].push(change)
    socket.broadcast.to(socket.room).emit("change", change);
  });
  socket.on("gift", (gift) => {
    socket.broadcast.to(socket.room).emit("gift", gift);
  });
  socket.on("resign", () => {
    socket.broadcast.to(socket.room).emit("resign", "salam");
  });
});

http.listen(config.port, () => {
});
