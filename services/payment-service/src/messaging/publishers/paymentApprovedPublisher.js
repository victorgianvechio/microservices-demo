const { getChannel } = require("../rabbitConnection")

function publishPaymentApproved(event, correlationId) {
  const channel = getChannel()

  channel.sendToQueue(
    "payment_approved",
    Buffer.from(JSON.stringify(event)),
    {
      headers: {
        "x-correlation-id": correlationId // propagando
      }
    }
  )

  console.log(
    `[${correlationId}] - Evento payment_approved publicado:`,
    event
  )
}

module.exports = {
  publishPaymentApproved
}