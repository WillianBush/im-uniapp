

const configJapan= {
	appName : "香り",
	requestUrl: ["https://media.qweac.link/config_sys/domains-prod.txt"],
	loginIcon : "/static/logo.png",
	registerIcon : "/static/logo.png",
	setupPicture : "/static/splash.jpg"
}

const configLive1= {
	appName : "好物通",
	requestUrl: ["https://media.441635.pw/config_sys/domains-prod.txt",
		"https://media.441635.pw/config_sys/domains-prod.txt",
		"https://media.441635.pw/config_sys/domains-prod.txt"],
	loginIcon : "/static/logo12.png",
	registerIcon : "/static/logo12.png",
	language: "zh-CN",
	setupPicture : "/static/splash.jpg"
}

const config9113= {
	appName : "触感",
	requestUrl: ["https://piao-01.oss-cn-hongkong.aliyuncs.com/config_sys/domains-prod.txt"],
	loginIcon : "/static/logo.png",
	registerIcon : "/static/logo.png",
	setupPicture : "/static/splash.jpg"
}
const fangyuan= {
	appName : "约伴",
	requestUrl: [
		"https://config.7v7plw.xyz/config_sys/domains-prod.txt",
		"https://config.zlqcot.xyz/config_sys/domains-prod.txt",
		"https://config.mhelz2.xyz/config_sys/domains-prod.txt",
		"https://config.2ypoxu.xyz/config_sys/domains-prod.txt",
		"https://config.4mtfa6.xyz/config_sys/domains-prod.txt",
		"https://config.ua5q6u.xyz/config_sys/domains-prod.txt",
		"https://config.l4xo71.xyz/config_sys/domains-prod.txt",
		"https://config.ox6sdh.xyz/config_sys/domains-prod.txt",
		"https://config.5x4kgn.xyz/config_sys/domains-prod.txt",
		"https://config.l8x754.xyz/config_sys/domains-prod.txt",
		"https://config.jsrmz6.xyz/config_sys/domains-prod.txt",
		"https://dasiifdfcc.oss-cn-hongkong.aliyuncs.com/config_sys/domains-prod.txt"], //约伴线上 域名映射 oss
	loginIcon : "/static/logo.png",
	registerIcon : "/static/logo.png",
	setupPicture : "/static/splash.jpg"
}

const activeConfig = configLive1
export  {configJapan,configLive1,config9113,fangyuan,activeConfig}
