const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const { connectRabbit } = require("./messaging/rabbitConnection")
const {
  startConsumer
} = require("./messaging/consumer/paymentApprovedConsumer")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", () => {
  console.log("Frontend conectado ao websocket")
})

server.listen(3002, async () => {
  await connectRabbit()

  // 🔥 PASSA O IO AQUI
  await startConsumer(io)

  console.log("Notification-service rodando na porta 3002")
})