const { getChannel } = require("../rabbitConnection")

function publishPaymentApproved(event, correlationId) {
  const channel = getChannel()

  channel.publish(
    "payment_events",
    "",
    Buffer.from(JSON.stringify(event)),
    {
      headers: {
        "x-correlation-id": correlationId
      }
    }
  )

  console.log(
    `[${correlationId}] Evento payment_approved publicado:`,
    event
  )
}

module.exports = {
  publishPaymentApproved
}