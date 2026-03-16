const notificationService = require("../services/notificationService")

function handlePaymentApproved(event, io) {

  const notification = notificationService.processPaymentApproved(event)

  io.emit("notification", notification)
}

module.exports = {
  handlePaymentApproved
}