const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const rateLimit = require("express-rate-limit")
const jwt = require("jsonwebtoken")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// logging
app.use(morgan("combined"))

// rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
})

app.use(limiter)

// autenticação middleware
function authenticate(req, res, next) {

  if (req.path === "/login") {
    return next()
  }

  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" })
  }

  const token = authHeader.split(" ")[1]

  try {

    jwt.verify(token, "secret")

    next()

  } catch {

    res.status(403).json({ error: "Invalid token" })

  }
}

app.use(authenticate)

// rota fake de login
app.post("/login", (req, res) => {

  const token = jwt.sign(
    { user: "demo-user" },
    "secret",
    { expiresIn: "1h" }
  )

  res.json({ token })

})

// proxy para api-service
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://api-service:3000",
    changeOrigin: true
  })
)

// proxy para notification-service
app.use(
  "/notifications",
  createProxyMiddleware({
    target: "http://notification-service:3002",
    changeOrigin: true
  })
)

app.listen(8080, () => {
  console.log("API Gateway running on port 8080")
})