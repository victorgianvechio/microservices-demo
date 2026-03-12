const { connectRabbit } = require("./rabbit")

async function start() {

  await connectRabbit()

  console.log("Payment-service aguardando eventos...")
}

start()