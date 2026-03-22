const express = require("express")
const cors = require("cors")

const limiter = require("./middlewares/rateLimit")
const correlationId = require("./middlewares/correlationId")
const authenticate = require("./middlewares/auth")
const logApiCall = require("./middlewares/logger")

const apiProxy = require("./proxies/apiProxy")
const socketProxy = require("./proxies/socketProxy")

const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// middlewares globais
app.use(limiter)
app.use(correlationId)

// rotas
app.use("/", authRoutes)

// socket
app.use("/socket.io", socketProxy)

// api
app.use("/api", authenticate, logApiCall, apiProxy)

module.exports = { app, socketProxy }