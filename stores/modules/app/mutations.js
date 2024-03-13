import Log from "../../../common/Log"
import {
	uuid
} from "../../../common/utils"

let TAG = "APP-mutations"
export default {
	setAppUuid(state) {
		let uuids = uuid()
		state.appUuid = uuids
		Log.d(TAG, "setAppUuid====", uuids)
	},
	setSystemVersion(state, payload) {
		state.clientVersion = payload
		Log.d(TAG, "setSystemVersion====", payload)
	},
	setAppShow(state, payload) {
		state.appShow = payload
	},
	setCheckHttpHealthInterval(state, payload) {
		state.checkHttpHealthInterval = payload
	},
	cleartCheckHttpHealthInterval(state) {
		clearInterval(state.checkHttpHealthInterval)
		state.checkHttpHealthInterval = null
	},
	setImgDomain(state, payload) {
		state.imgUrl = payload;
	},
	setReqDomain(state, payload) {
		Log.d(TAG, "setReqDomain", payload)
		state.reqUrl = payload;
	},
	setCheckUrl(state, payload) {
		state.reqUrl.splice(payload, 1)
	},
	setSocketDomain(state, payload) {
		state.socketUrl = payload;
	},
	setRootDomain(state, payload) {
		state.rootUrl = payload;
	},
	setAppNeedUpdate(state, payload) {
		state.appNeedUpdate = payload
	},
	setOsName(state, payload) {
		state.osName = payload
	},
	setOsVersion(state, payload) {
		state.osVersion = payload
	},
	setHotItemWebViewShow(state, payload) {
		state.hotItemWebViewShow = payload;
	},
	setFaxianSiteList(state, payload) {
		state.faxianSiteList = payload;
	},
	setHotItem(state, payload) {
		state.hotItem = payload;
	},
	setIsOpenRefresh(state, payload) {
		state.isOpenRefresh = payload;
	},
	setGreetingpic1(state, payload) {
		state.greetingpic1 = payload;
	},
	setGreetingpic2(state, payload) {
		state.greetingpic2 = payload;
	},
	setGreetingpic3(state, payload) {
		state.greetingpic3 = payload;
	},
	setGreetingpic4(state, payload) {
		state.greetingpic4 = payload;
	},
	setGreetingpic5(state, payload) {
		state.greetingpic5 = payload;
	},
	clearData(state) {
		state = {
			...state,
			appUuid: "", //每次打开都会自动生成一个唯一的字符，可用于后台程序判断冲线的问题
			isOpenRefresh: false, // 是否开启不断刷新
			faxianSiteList: [], //发现自定义站点
			hotItem: {}, //底部热门导航
			hotItemWebViewShow: false, //为了解决切换导航时web_view的隐藏问题
			/*问候语图像*/
			greetingpic1: "",
			greetingpic2: "",
			greetingpic3: "",
			greetingpic4: "",
			greetingpic5: "",
			greetingList: []
		}
	}
}