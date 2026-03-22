const notificationService = require("../services/notificationService")

function handlePaymentApproved(event, io) {
  const notification = notificationService.processPaymentApproved(event)

  console.log("Enviando notificação via socket:", notification)

  io.emit("notification", notification)
}

module.exports = {
  handlePaymentApproved
}