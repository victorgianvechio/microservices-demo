const { getChannel } = require("./rabbitConnection")

function publishOrderCreated(event, correlationId) {
  const channel = getChannel()

  channel.publish(
    "order_events",
    "",
    Buffer.from(JSON.stringify(event)),
    {
      headers: {
        "x-correlation-id": correlationId
      }
    }
  )

  console.log(
    `[${correlationId}] Evento order_created publicado:`,
    event
  )
}

module.exports = {
  publishOrderCreated
}