const amqp = require("amqplib")

let channel

async function connectRabbit() {
  const connection = await amqp.connect("amqp://rabbitmq")
  channel = await connection.createChannel()

  await channel.assertExchange("order_events", "fanout", {
    durable: false
  })

  await channel.assertExchange("payment_events", "fanout", {
    durable: false
  })

  console.log("Payment-service conectado ao RabbitMQ")
}

function getChannel() {
  return channel
}

module.exports = {
  connectRabbit,
  getChannel
}