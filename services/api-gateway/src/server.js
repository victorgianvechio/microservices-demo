const http = require("http")
const { app, socketProxy } = require("./app")

const server = http.createServer(app)

server.on("upgrade", socketProxy.upgrade)

server.listen(3003, () => {
  console.log("API Gateway rodando na porta 3003")
})