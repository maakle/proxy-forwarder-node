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
  "/test",
  createProxyMiddleware({
    target: process.env.API_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/login",
  createProxyMiddleware({
    target: process.env.LOGIN_API_URL,
    changeOrigin: true,
  })
);

app.use(
  "/",
  createProxyMiddleware({
    target: process.env.SEARCH_API_URL,
    changeOrigin: true,
  })
);

// Start the Proxy
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Starting /login route proxy on port: ${port} and forwarding to ${process.env.LOGIN_API_URL}`
  );
  console.log(
    `Starting proxy on port: ${port} and forwarding to ${process.env.SEARCH_API_URL}`
  );
});
