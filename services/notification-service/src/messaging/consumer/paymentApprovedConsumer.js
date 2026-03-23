const { getChannel } = require("../rabbitConnection")
const notificationController = require("../../controllers/notificationController")

async function startConsumer(io) {
  const channel = getChannel()

  const queue = "payment_approved"

  await channel.assertQueue(queue)

  channel.consume(queue, (msg) => {
    if (!msg) return

    const event = JSON.parse(msg.content.toString())

    const correlationId =
      msg.properties.headers?.["x-correlation-id"] || "no-correlation-id"

    console.log(`[${correlationId}] - Evento recebido:`, event)

    notificationController.handlePaymentApproved(event, io)

    channel.ack(msg)
  })
}

module.exports = {
  startConsumer
}