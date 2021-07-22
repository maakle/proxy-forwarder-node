require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Logging
app.use(morgan("dev"));

// Proxy endpoints
app.use(
  "/",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  })
);

// Start the Proxy
app.listen(PORT, () => {
  console.log(`Starting Proxy on port: ${PORT}`);
});
