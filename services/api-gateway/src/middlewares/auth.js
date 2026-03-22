const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/env")

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

module.exports = authenticate