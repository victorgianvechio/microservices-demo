const { getChannel } = require("./rabbitConnection")

async function publishOrderCreated(order, correlationId) {

  const channel = getChannel()

  const queue = "order_created"

  await channel.assertQueue(queue)

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(order)),
    {
      headers: {
        "x-correlation-id": correlationId
      }
    }
  )

  console.log(`[${correlationId}] - Evento order_created publicado:`, order)
}

module.exports = {
  publishOrderCreated
}