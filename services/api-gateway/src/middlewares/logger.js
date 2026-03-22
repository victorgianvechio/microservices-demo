function logApiCall(req, res, next) {
  // console.log("CorrelationId:", req.correlationId)
  console.log(`[${req.correlationId}] - Chamando Order Service: ${req.method} ${req.originalUrl}`)
  next()
}

module.exports = logApiCall