const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/orders", async (req, res) => {

  console.log("API recebeu pedido")

  await axios.post("http://order-service:3001/orders")

  res.json({ status: "order requested" })
})

app.listen(3000, () => {
  console.log("API Service rodando na porta 3000")
})