const { getChannel } = require("../rabbitConnection")

const logs = []

async function startConsumer() {
  const channelWrapper = getChannel()

  if (!channelWrapper) {
    throw new Error("Channel não inicializado")
  }

  const queueName = "log-service-queue"

  // setup é executado automaticamente ao conectar/reconectar
  await channelWrapper.addSetup(async (channel) => {
    await channel.assertQueue(queueName, {
      durable: true
    })

    await channel.bindQueue(queueName, "order_events", "")
    await channel.bindQueue(queueName, "payment_events", "")

    await channel.consume(queueName, (msg) => {
      if (!msg) return

      const event = JSON.parse(msg.content.toString())

      const correlationId =
        msg.properties.headers?.["x-correlation-id"] || "no-id"

      const log = {
        correlationId,
        eventType: msg.fields.routingKey || "unknown",
        event,
        timestamp: new Date().toISOString()
      }

      logs.push(log)

      console.log(`[${correlationId}] Log evento:`, event)

      channel.ack(msg)
    })

    console.log("Log-service escutando eventos...")
  })
}

function getLogs() {
  return logs
}

module.exports = {
  startConsumer,
  getLogs
}