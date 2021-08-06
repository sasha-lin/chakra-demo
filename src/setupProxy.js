const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware('/api', {    // 'qwl'  需要转发的请求
    target: 'https://conduit.productionready.io',  //接口服务器地址
    // target: 'http://192.168.9.116:8080',
    // target: 'http://192.168.9.17:8080', 
    // target: 'http://192.168.9.19:8080', 
    changeOrigin: true
  }));
};
