const orderRepository = require("../repositories/orderRepository")
const { publishOrderCreated } = require("../messaging/publishers/orderCreatedPublisher")

let orderId = 1

function createOrder(correlationId) {

  const order = {
    id: orderId++,
    status: "CREATED"
  }

  orderRepository.create(order)

  console.log(`[${correlationId}] Pedido criado:`, order)

  publishOrderCreated(order, correlationId)

  return order
}

module.exports = {
  createOrder
}