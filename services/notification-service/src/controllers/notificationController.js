const notificationService = require("../services/notificationService")

function handlePaymentApproved(event, correlationId, io) {
  const notification = notificationService.processPaymentApproved(event, correlationId)

  console.log(`[${correlationId}] - Enviando notificação via socket:`, notification)

  io.emit("notification", notification)
}

module.exports = {
  handlePaymentApproved
}