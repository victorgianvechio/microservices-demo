const orderService = require("../services/orderService")

async function createOrder(req, res) {

  const correlationId = req.correlationId || "no-correlation-id"

  console.log(`[${correlationId}] - Criando pedido...`)
  const order = orderService.createOrder(correlationId)

  res.json(order)
}

module.exports = {
  createOrder
}