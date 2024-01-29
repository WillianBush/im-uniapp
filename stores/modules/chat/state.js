export const state = {
	chatCfg: {},
	arList: [], //消息列表
	arListShow: [], //消息列表用于显示
	WAIT_SEND_MSG: "", //发送失败，等待重头发送信息
	chatMessageMap: new Map(),
	curChatAiteToMyList: [], //当前聊天实体 别人@我的对象列表
	curChatEntity: {}, //当前聊天实体
	curChatMsgList: [], //当前正在聊天的记录列表
	chatMyLoadding: false,
	memberLength:"",
	//临时属性
	temp: {
		base64: "", //【作用于群二维码发给朋友临时存等等，因为直接使用带参数页面跳转会导致特殊符号过滤掉】
		content: "",
		bean: {},
		inputIng: false,
		msgMp3Playtime: 0,
		chatVew: null, //当前聊天窗口scroll-view
	}
}