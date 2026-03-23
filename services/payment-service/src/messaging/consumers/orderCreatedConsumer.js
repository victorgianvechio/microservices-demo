const { getChannel } = require("../rabbitConnection")
const paymentService = require("../../services/paymentService")

async function startConsumer() {
  const channel = getChannel()

  const queue = "order_created"

  await channel.assertQueue(queue)

  channel.consume(queue, async (msg) => {
    if (!msg) return

    const order = JSON.parse(msg.content.toString())

    const correlationId =
      msg.properties.headers?.["x-correlation-id"] || "no-correlation-id"

    console.log(
      `[${correlationId}] - Recebido order_created:`,
      order
    )

    await paymentService.processPayment(order, correlationId)

    channel.ack(msg)
  })
}

module.exports = {
  startConsumer
}