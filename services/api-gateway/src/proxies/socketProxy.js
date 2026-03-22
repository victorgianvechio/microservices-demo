const { createProxyMiddleware } = require("http-proxy-middleware")
const { NOTIFICATION_SERVICE_URL } = require("../config/env")

const socketProxy = createProxyMiddleware({
  target: NOTIFICATION_SERVICE_URL,
  changeOrigin: true,
  ws: true,
  logLevel: "debug",
  pathRewrite: (path) => path,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("Connection", "keep-alive")
  }
})

module.exports = socketProxy