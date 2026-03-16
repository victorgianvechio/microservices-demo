const orderRepository = require("../repositories/orderRepository")
const { publishOrderCreated } = require("../messaging/orderEventPublisher")

let orderId = 1

function createOrder() {

  const order = {
    id: orderId++,
    status: "CREATED"
  }

  orderRepository.create(order)

  console.log("Pedido criado:", order)

  publishOrderCreated(order)

  return order
}

module.exports = {
  createOrder
}