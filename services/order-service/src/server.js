const express = require("express")
const { connectRabbit } = require("./messaging/rabbitConnection")
const orderController = require("./controllers/orderController")
const correlationId = require("./middleware/correlationId")

const app = express()

app.use(express.json())
app.use(correlationId)

app.post("/orders", orderController.createOrder)

app.listen(3001, async () => {

  await connectRabbit()

  console.log("Order Service rodando na porta 3001")

})