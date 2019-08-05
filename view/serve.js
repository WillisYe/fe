const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();
const history = require('connect-history-api-fallback');
const os = require('os');

// HTML5 History模式 和客户端配合解决刷新404问题
history({
    index: 'dist/index.html'
});
app.use(history());

// 超时时间
const TIME_OUT = 20 * 10 ** 3;

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
    if (!req.timedout) next();
});

// 静态页面
// 这里一般设置你的静态资源路径
app.use('/', express.static('dist'));

// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
const proxyParams = {
    target: "http://192.168.9.22:3010",
    changeOrigin: true,
    secure: false,
    ws: true
}
app.use(proxy('/unit', proxyParams));
app.use(proxy('/creep', proxyParams));
app.use(proxy('/hero', proxyParams));
app.use(proxy('/prop', proxyParams));


///////////////////获取本机ip///////////////////////
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();

// 监听端口
app.listen(80, () => {
    console.log(`server running http://${myHost}:80`);
});