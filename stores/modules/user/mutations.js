
import Log from "../../../common/Log"


let TAG = "USER-MUTATIONS"
export default {
	setUserToken(state,payload) {
		state.userToken = payload
		Log.d(TAG,state.userToken+"\\");
	},
	setIsEmployee(state,payload){
		state.isEmployee = payload
	},
	setUser(state,payload) {
		state.user=payload;
	},
	setFriendList(state,payload){
		state.friendList = payload;
	},
	setGroupList(state,payload){
		state.groupList = payload;
	},
	setUnDoFriendAddCount(state,payload){
		state.unDoFriendAddCount = payload;
	},
	setUnDoRoomAddCount(state,payload){
		state.unDoRoomAddCount = payload;
	},
	setEmployeeRefreshInterval(state,payload){
		state.employeeRefreshInterval = payload
	},
	cleartEmployeeRefreshInterval(state){
		clearInterval(state.employeeRefreshInterval)
		state.employeeRefreshInterval = null
	},
	updateUserHeadpic(state,payload){
		state.user.headpic = payload;
	},
	updateUsername(state,payload){
		state.user.nickName = payload;
	},
	updateTelPhone(state,payload){
		state.user.telphone = payload;
	},
	updateSex(state,payload){
		state.user.sex = payload;
	},
	setShimingCfg(state,payload){
		state.shimingCfg = payload;
	},
	setGreetList(state,payload){
		state.greetingList= payload;
	},
	setUnReadMsgSum(state,payload) {
		state.unReadMsgSum = payload;
		//console.log(state.user_token+"\\");
	},
	clearData(state){
		state = {
			isEmployee: false, // 是否是特权用户
			userToken:"",
			user:{},//保存用户对象
			unReadMsgSum:0,//未读消息总数
			shimingCfg:{},//实名配置
			friendList:[],//好友列表
			groupList:[],//群聊列表
			unDoFriendAddCount:0,//未处理好友添加
			unDoRoomAddCount:0,//未处理群成员申请
			employeeRefreshInterval:null, // 特权用户刷新定时器
			nickName:"",
			headpic:"",
			greetingList:[],
		}
	}
}