//h5发布时自动 去除console.log等信息
module.exports = {
    productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
    },
	"devServer" : {
		"proxy" : {
			"/user" : {
				"target" : "https://http.441635.pw",
				"changeOrigin" : true, //是否跨域
				"secure" : true, // 是否支持 https 协议的代理
				"pathRewrite" : {
					"^/user" : "/"
				}
			}
		}
	} 
}
