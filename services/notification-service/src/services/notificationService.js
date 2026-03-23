const notificationRepository = require("../repositories/notificationRepository")

function processPaymentApproved(event, correlationId) {
  const notification = {
    message: "Pagamento aprovado!",
    orderId: event.orderId
  }

  notificationRepository.create(notification)

  console.log(
    `[${correlationId}] Notificação salva:`,
    notification
  )

  return notification
}

module.exports = {
  processPaymentApproved
}