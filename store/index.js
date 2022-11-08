import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations.js"
import actions from "./actions.js"
import getter from "./getter.js"
import module from "./module.js"

//使用vuex插件前先执行use一下
Vue.use(Vuex)

const state = {
	SYS_VERSION:"1.0.5",//客户端版本
	app_uuid:"",//每次打开都会自动生成一个唯一的字符，可用于后台程序判断冲线的问题
	signInCnf:null,//签到配置
	WAIT_SEND_MSG:"",//发送失败，等待重头发送信息
	user_token:"",//user_token
	user:{},//保存用户对象
	unReadMsgSum:0,//未读消息总数
	ar_list:[],//消息列表
	ar_list_show:[],//消息列表用于显示 
	friend_list:[],//好友列表
	group_list:[],//群聊列表 
	unDoFriendAddCount:0,//未处理好友添加
	unDoRoomAddCount:0,//未处理群成员申请
	isEmployee: "",
	isOpenRefresh: false,
	chatMessageMap:new Map(),
	cur_chat_aiteToMyList:[],//当前聊天实体 别人@我的对象列表
	cur_chat_entity:{},//当前聊天实体
	//cur_chat_id:"",//当前正在聊天的ID
	cur_chat_msg_list:[],//当前正在聊天的记录列表
	appShow:false,
	appNeedUpdate:false,
	chat_my_loadding:false,
	faxian_site_list:[],//发现自定义站点  
	hotItem:{},//底部热门导航
	shimingCfg:{},//实名配置 
	footerViewHeight:0,//footer高度 当H5时才有并效
	hotItem_webView_show:false,//为了解决切换导航时web_view的隐藏问题
	/**当flex: 0时是为了可以切换导航,flex: 1时显示web_view,因为此时web_view才有宽度和高度**/
	// // hotItem_webViewStyle:"flex: 0",//为了解决切换导航时web_view的隐藏问题
	req_url:[],//请求URL地址
	img_url:[],//图片资源请求地址
	socket_url:[],//websocket URL地址
	/*问候语图像*/
	greetingpic_1:"",
	greetingpic_2:"",
	greetingpic_3:"",
	greetingpic_4:"",
	greetingpic_5:"",
	greetingList:[],
	//临时属性    
	temp:{  
		base64:"",//【作用于群二维码发给朋友临时存等等，因为直接使用带参数页面跳转会导致特殊符号过滤掉】
		content:"",
		bean:{},
		open_hongbao_list:[],
		input_ing:false,
		msg_mp3_playtime:0,
		chatVew:null,//当前聊天窗口scroll-view
	}
	 
}

//mutations：这里可以改变state状态，并且是响应式的，也只有在这里改变state才能做到响应式，注意：这里同步的并不能执行异步操作
//getter：相当于组件中的计算属性computed
//actions：相当于组件中的methods。注意：这里可以执行异步操作。如网络请求的操作都可以mutations是不能执行异步操作的
const store = new  Vuex.Store({
	state,
	mutations,
	actions,
	getter,
	module
});
 


export default store