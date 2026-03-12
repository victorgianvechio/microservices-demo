const express = require("express")
const { connectRabbit, publishOrderCreated } = require("./rabbit")

const app = express()

app.use(express.json())

let orderId = 1

app.post("/orders", async (req, res) => {

  const order = {
    id: orderId++,
    status: "CREATED"
  }

  console.log("Pedido criado:", order)

  publishOrderCreated(order)

  res.json(order)
})

app.listen(3001, async () => {

  await connectRabbit()

  console.log("Order Service rodando na porta 3001")

})