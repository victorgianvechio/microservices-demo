const orderService = require("../services/orderService")

async function createOrder(req, res) {

  const order = orderService.createOrder()

  res.json(order)
}

module.exports = {
  createOrder
}