const amqp = require("amqp-connection-manager")

let connection
let channelWrapper

function connectRabbit() {
  console.log("Tentando conectar ao RabbitMQ...")

  connection = amqp.connect(["amqp://rabbitmq"])

  connection.on("connect", () => {
    console.log("Conectado ao RabbitMQ")
  })

  connection.on("disconnect", (err) => {
    console.error("Desconectado do RabbitMQ:", err?.message)
  })

  channelWrapper = connection.createChannel({
    setup: async (channel) => {
      // cria exchanges sempre que reconectar
      await channel.assertExchange("order_events", "fanout", {
        durable: false
      })

      await channel.assertExchange("payment_events", "fanout", {
        durable: false
      })

      console.log("Exchanges configuradas")
    }
  })
}

function getChannel() {
  return channelWrapper
}

module.exports = {
  connectRabbit,
  getChannel
}