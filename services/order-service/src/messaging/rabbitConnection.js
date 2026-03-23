const amqp = require("amqplib")

let channel

async function connectRabbit() {
  const connection = await amqp.connect("amqp://rabbitmq")
  channel = await connection.createChannel()

  // 🔥 cria exchange
  await channel.assertExchange("order_events", "fanout", {
    durable: false
  })

  console.log("Order-service conectado ao RabbitMQ")
}

function getChannel() {
  return channel
}

module.exports = {
  connectRabbit,
  getChannel
}