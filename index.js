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
    target: process.env.API_SERVICE_URL,
    changeOrigin: true,
  })
);

// Start the Proxy
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Starting proxy on port: ${port} and forwarding to ${process.env.API_SERVICE_URL}`
  );
});
