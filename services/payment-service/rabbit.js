const amqp = require("amqplib")

let channel

async function connectRabbit() {

  const connection = await amqp.connect("amqp://rabbitmq")

  channel = await connection.createChannel()

  await channel.assertQueue("order_created")
  await channel.assertQueue("payment_approved")

  console.log("Payment-service conectado ao RabbitMQ")

  consumeOrders()
}

function consumeOrders() {

  channel.consume("order_created", async (msg) => {

    const order = JSON.parse(msg.content.toString())

    console.log("Recebido order_created:", order)

    await processPayment(order)

    channel.ack(msg)

  })
}

async function processPayment(order) {

  console.log("Processando pagamento...")

  // simular processamento
  await new Promise(resolve => setTimeout(resolve, 2000))

  const event = {
    orderId: order.id,
    status: "PAID"
  }

  channel.sendToQueue(
    "payment_approved",
    Buffer.from(JSON.stringify(event))
  )

  console.log("Evento payment_approved publicado:", event)
}

module.exports = {
  connectRabbit
}