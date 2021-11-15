/**
 * 配置参考: https://cli.vuejs.org/zh/config/
 */
module.exports = {
    outputDir: process.env.outputDir, // 打包生成目录
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8002,
        overlay: {
            errors: true,
            warnings: true
        },
    }
}
