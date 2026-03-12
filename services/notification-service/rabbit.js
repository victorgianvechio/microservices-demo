const amqp = require("amqplib")

let channel

async function connectRabbit(io) {

  const connection = await amqp.connect("amqp://rabbitmq")

  channel = await connection.createChannel()

  await channel.assertQueue("payment_approved")

  console.log("Notification-service conectado ao RabbitMQ")

  channel.consume("payment_approved", (msg) => {

    const event = JSON.parse(msg.content.toString())

    console.log("Evento recebido:", event)

    // envia para todos clientes conectados
    io.emit("notification", {
      message: "Pagamento aprovado!",
      orderId: event.orderId
    })

    channel.ack(msg)
  })
}

module.exports = {
  connectRabbit
}