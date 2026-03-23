const {
  publishPaymentApproved
} = require("../messaging/publishers/paymentApprovedPublisher")

async function processPayment(order, correlationId) {
  console.log(`[${correlationId}] - Processando pagamento...`)

  // simular processamento
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const event = {
    orderId: order.id,
    status: "PAID"
  }

  publishPaymentApproved(event, correlationId)
}

module.exports = {
  processPayment
}