const { getChannel } = require("../rabbitConnection")
const paymentService = require("../../services/paymentService")

async function startConsumer() {
  const channel = getChannel()

  const queue = "payment_queue"

  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, "order_events", "")

  channel.consume(queue, async (msg) => {
    if (!msg) return

    const event = JSON.parse(msg.content.toString())

    const correlationId =
      msg.properties.headers?.["x-correlation-id"] || "no-id"

    console.log(
      `[${correlationId}] Recebido order_created:`,
      event
    )

    await paymentService.processPayment(event, correlationId)

    channel.ack(msg)
  })
}

module.exports = {
  startConsumer
}