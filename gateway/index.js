const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const path=require("path")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Configuring proxy middleware
const productProxy = createProxyMiddleware('/product', { target: 'http://localhost:8001' });
const customerProxy = createProxyMiddleware('/customer', { target: 'http://localhost:8002' });
const managementProxy = createProxyMiddleware('/manager', { target: 'http://localhost:8003' });


// Using proxies for specific paths
app.use('/product', productProxy);
app.use('/customer', customerProxy);
app.use('/manager', managementProxy);

//server is listening
app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});