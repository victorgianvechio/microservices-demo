const amqp = require("amqplib")

let channel

async function connectRabbit() {

  const connection = await amqp.connect("amqp://rabbitmq")

  channel = await connection.createChannel()

  await channel.assertQueue("order_created")

  console.log("Order-service conectado ao RabbitMQ")
}

function publishOrderCreated(order) {

  channel.sendToQueue(
    "order_created",
    Buffer.from(JSON.stringify(order))
  )

  console.log("Evento order_created publicado:", order)
}

module.exports = {
  connectRabbit,
  publishOrderCreated
}