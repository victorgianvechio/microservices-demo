function correlationId(req, res, next) {
  const id = req.headers["x-correlation-id"]

  if (!id) {
    console.warn("Requisição sem correlation-id")
  }

  req.correlationId = id

  next()
}

module.exports = correlationId