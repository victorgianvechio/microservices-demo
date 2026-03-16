const { getChannel } = require("./rabbitConnection")
const notificationController = require("../controllers/notificationController")

async function startConsumer(io) {

  const channel = getChannel()

  const queue = "payment_approved"

  await channel.assertQueue(queue)

  channel.consume(queue, (msg) => {

    const event = JSON.parse(msg.content.toString())

    console.log("Evento recebido:", event)

    notificationController.handlePaymentApproved(event, io)

    channel.ack(msg)
  })
}

module.exports = {
  startConsumer
}