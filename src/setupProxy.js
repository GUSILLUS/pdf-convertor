const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://95.217.134.12:4010',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      method: 'POST',
    })
  );
};
