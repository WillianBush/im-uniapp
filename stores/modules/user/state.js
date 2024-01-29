export const state =  {
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