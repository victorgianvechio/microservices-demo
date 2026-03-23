const notificationService = require("../services/notificationService")

function handlePaymentApproved(event, io, correlationId) {
  const notification = notificationService.processPaymentApproved(event, correlationId)

  console.log(`[${correlationId}] - Enviando notificação via socket:`, notification)

  io.emit("notification", notification)
}

module.exports = {
  handlePaymentApproved
}