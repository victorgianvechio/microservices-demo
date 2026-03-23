const express = require("express")

const { connectRabbit } = require("./messaging/rabbitConnection")

const {
  startConsumer,
  getLogs
} = require("./messaging/consumer/logConsumer")

const app = express()

app.get("/logs", (req, res) => {
  res.json(getLogs())
})

app.listen(3004, async () => {
  try {
    console.log("Iniciando Log-service...")

    connectRabbit() //

    await startConsumer()

    console.log("Log-service rodando na porta 3004")
  } catch (err) {
    console.error("Erro ao iniciar log-service:", err)
  }
})