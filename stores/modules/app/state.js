export const state = {
	osName: "", // 操作系统名称
	osVersion: "", // 操作系统版本
	clientVersion: "1.1.4", //客户端版本
	appUuid: "", //每次打开都会自动生成一个唯一的字符，可用于后台程序判断冲线的问题
	appShow: false,
	checkHttpHealthInterval: null,
	appNeedUpdate: false,
	isOpenRefresh: false, // 是否开启不断刷新
	faxianSiteList: [], //发现自定义站点
	hotItem: {}, //底部热门导航
	footerViewHeight: 0, //footer高度 当H5时才有并效
	hotItemWebViewShow: false, //为了解决切换导航时web_view的隐藏问题
	reqUrl: [], //请求URL地址
	imgUrl: [], //图片资源请求地址
	socketUrl: [], //websocket URL地址
	rootUrl:[], // 根域名
	/*问候语图像*/
	greetingpic1: "",
	greetingpic2: "",
	greetingpic3: "",
	greetingpic4: "",
	greetingpic5: "",
	greetingList: [],
	refreshTimer:null
}