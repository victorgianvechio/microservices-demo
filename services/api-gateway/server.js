const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")
const cors = require("cors")
const http = require("http")

const app = express()

const JWT_SECRET = "SECRET_TEST"

app.use(cors())
app.use(express.json())

// 🔥 IGNORA SOCKET NO RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req) => req.path.startsWith("/socket.io")
})

app.use(limiter)

// =======================
// AUTH
// =======================

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" })
  }

  const token = authHeader.split(" ")[1]

  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(403).json({ error: "Token inválido" })
  }
}

// =======================
// LOGIN
// =======================

app.post("/login", (req, res) => {
  const user = { id: 1, name: "Victor" }
  const token = jwt.sign(user, JWT_SECRET)
  res.json({ token })
})

// =======================
// 🔥 SOCKET PROXY
// =======================

const socketProxy = createProxyMiddleware({
  target: "http://notification-service:3002",
  changeOrigin: true,
  ws: true,
  logLevel: "debug",
  pathRewrite: (path, req) => path,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("Connection", "keep-alive")
  }
})

app.use("/socket.io", socketProxy)

// =======================
// 🔥 LOG CUSTOM (ANTES DO PROXY)
// =======================

function logApiCall(req, res, next) {
  console.log(`🔁 Chamando API Service: ${req.method} ${req.originalUrl}`)
  next()
}

// =======================
// API
// =======================

app.use(
  "/api",
  authenticate,
  logApiCall, // 👈 AQUI É O PULO DO GATO
  createProxyMiddleware({
    target: "http://api-service:3000",
    changeOrigin: true
  })
)

// =======================
// SERVER
// =======================

const server = http.createServer(app)

// 🔥 UPGRADE WS
server.on("upgrade", socketProxy.upgrade)

server.listen(3003, () => {
  console.log("API Gateway rodando na porta 3003")
})