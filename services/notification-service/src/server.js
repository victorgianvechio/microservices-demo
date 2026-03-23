const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const { connectRabbit } = require("./messaging/rabbitConnection")
const { startConsumer } = require("./messaging/consumer/paymentApprovedConsumer")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("Frontend conectado ao websocket:", socket.id)
})

// 🔥 rota de teste (pra garantir que o serviço responde HTTP)
app.get("/health", (req, res) => {
  res.send("OK")
})

server.listen(3002, async () => {
  await connectRabbit()
  await startConsumer(io)

  console.log("Notification-service rodando na porta 3002")
})