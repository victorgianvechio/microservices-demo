const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const { connectRabbit } = require("./rabbit")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("Frontend conectado ao websocket")
})

server.listen(3002, async () => {

  await connectRabbit(io)

  console.log("Notification-service rodando na porta 3002")

})