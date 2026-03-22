const { createProxyMiddleware } = require("http-proxy-middleware")
const { API_SERVICE_URL } = require("../config/env")

const apiProxy = createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,

  // 🔥 ESSA É A SOLUÇÃO MAIS SEGURA
  headers: {
    "x-correlation-id": "" // placeholder (vamos sobrescrever dinamicamente)
  },

  on: {
    proxyReq: (proxyReq, req) => {
      if (req.correlationId) {
        proxyReq.setHeader("x-correlation-id", req.correlationId)
      }
    }
  }
})

module.exports = apiProxy