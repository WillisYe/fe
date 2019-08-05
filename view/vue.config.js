// vue.config.js
const fs = require("fs");
var path = require("path");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

const proxyParams = {
    target: "http://192.168.9.22:3010",
    changeOrigin: true,
    secure: false,
    ws: true
}

module.exports = {
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    css: {
        loaderOptions: {
            sass: {
                data: fs.readFileSync("src/base.scss", "utf-8")
            }
        }
    },
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set("@$", resolve("src"))
            .set('components', resolve('src/components'))
            .set('router', resolve('src/router'))
            .set('utils', resolve('src/utils'));
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.hotReload = false;
                options.compilerOptions.preserveWhitespace = true
                return options
            })
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{
                    defaultSizes: 'gzip'
                }])
        }
    },
    devServer: {
        open: true,
        proxy: {
            "/unit": proxyParams,
            "/creep": proxyParams,
            "/hero": proxyParams,
            "/prop": proxyParams,
        }
    }
};