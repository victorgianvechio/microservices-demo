const { getChannel } = require("../rabbitConnection")
const notificationController = require("../../controllers/notificationController")

async function startConsumer(io) {
  const channel = getChannel()

  const queue = "notification_queue"

  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, "payment_events", "")

  channel.consume(queue, (msg) => {
    if (!msg) return

    const event = JSON.parse(msg.content.toString())

    const correlationId =
      msg.properties.headers?.["x-correlation-id"] || "no-id"

    console.log(`[${correlationId}] Evento recebido:`, event)

    // 🔥 PASSANDO IO CORRETAMENTE
    notificationController.handlePaymentApproved(
      event,
      correlationId,
      io
    )

    channel.ack(msg)
  })
}

module.exports = {
  startConsumer
}