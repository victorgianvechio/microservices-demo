const notificationRepository = require("../repositories/notificationRepository")

function processPaymentApproved(event) {
  const notification = {
    message: "Pagamento aprovado!",
    orderId: event.orderId
  }

  notificationRepository.create(notification)

  console.log("Notificação salva:", notification)

  return notification
}

module.exports = {
  processPaymentApproved
}