
const app = require('express')();
const cors = require('cors')
app.use(cors());
// app이 cors를 사용한다고 먼저 선언한 다음에 server 만들 때 인자로 넘겨줘야함
const httpServer = require('http').createServer(app)
const wsServer = require('socket.io')(httpServer, { cors: {origin: "*", methods: ["GET", "POST"]}})

app.get("/", (req, res) => {
    res.json({"users":"hi"})
})


wsServer.on("connection", (socket) => {
  console.log('입장')
    socket.on("join_room", (roomName) => {
      socket.join(roomName);
      socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
      socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
      socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName) => {
      console.log('ice')
      socket.to(roomName).emit("ice", ice);
    });
    socket.on('message', (message, roomName) => {
      console.log('메시지', message)
      socket.to(roomName).emit("message", message);
    })
  });


httpServer.listen(5000, () => {console.log("server started")})
// app이 listen 하면 안 됨

