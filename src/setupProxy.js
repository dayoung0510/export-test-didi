const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/socket.io', {
      // target: 'https://ws.zigap.io',
      changeOrigin: true,
      ws: true,
    }),
  );
};
