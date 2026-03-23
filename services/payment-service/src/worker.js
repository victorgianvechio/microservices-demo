const { connectRabbit } = require("./messaging/rabbitConnection")
const {
  startConsumer
} = require("./messaging/consumers/orderCreatedConsumer")

async function start() {
  await connectRabbit()
  await startConsumer()

  console.log("Payment-service aguardando eventos...")
}

start()