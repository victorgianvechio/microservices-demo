const { getChannel } = require("./rabbitConnection")

async function publishOrderCreated(order) {

  const channel = getChannel()

  const queue = "order_created"

  await channel.assertQueue(queue)

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(order))
  )

  console.log("Evento order_created publicado:", order)
}

module.exports = {
  publishOrderCreated
}