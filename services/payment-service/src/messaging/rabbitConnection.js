const amqp = require("amqplib")

let channel

async function connectRabbit() {
  const connection = await amqp.connect("amqp://rabbitmq")

  channel = await connection.createChannel()

  console.log("Payment-service conectado ao RabbitMQ")
}

function getChannel() {
  if (!channel) {
    throw new Error("Channel não inicializado")
  }

  return channel
}

module.exports = {
  connectRabbit,
  getChannel
}