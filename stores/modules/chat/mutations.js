export default {
	setArList(state, payload) {
		if (state.arListShow.length == state.arList.length) {
			state.arListShow = payload;
		}
		state.arList = payload;
	},
	addArList(state, payload) {
		state.arList.push(payload);
	},
	setUnReadMsgSum(state, payload) {
		state.unReadMsgSum = payload;
	},
	setChatCfg(state, payload) {
		state.chatCfg = payload;
	},
	setArListShow(state, payload) {
		state.arListShow = payload;
	},
	setWAIT_SEND_MSG(state, payload) {
		state.WAIT_SEND_MSG = payload
	},
	setCurChatEntity(state, payload) {
		state.curChatEntity = payload;
	},
	setCurChatEntityName(state, payload) {
		state.curChatEntity.name = payload;
	},
	setCurChatEntityDescri(state, payload) {
		state.curChatEntity.descri = payload;
	},
	setCurChatEntityImg(state, payload) {
		state.curChatEntity.img = payload;
	},
	setCurChatMsgList(state, payload) {
		state.curChatMsgList = payload;
	},
	addCurChatMsg(state, payload) {
		if(payload.length == 1){
			state.curChatMsgList.push(payload[0]);
		}else{
			let tempList = state.curChatMsgList			
			state.curChatMsgList = payload.concat(tempList)
			console.log("=======刷新消息",state.curChatMsgList)
			
		}
	},
	updateCurChatMsg(state, payload) {
		state.curChatMsgList.forEach(item => {
			if (item.bean.uuid == payload.uuid) {
				item.uuid = payload.uuid;
			}
		})
	},
	setCurChatAiteToMyList(state, payload) {
		state.curChatAiteToMyList = payload
	},
	setInputIng(state, payload) {
		state.inputIng = payload;
	},
	updateChatMessageMap(state, payload) {
		state.chatMessageMap.set(payload.key, payload.value);
	},
	setMp3Time(state, payload) {
		state.temp.msgMp3Playtime = payload
	},
	setChatMyLoadding(state, payload) {
		state.chatMyLoadding = payload;
	},
	setTempBean(state, payload) {
		state.temp.bean = payload;
	},
	setTempContent(state, payload) {
		state.temp.content = payload;
	},
	setMemberLength(state, payload) {
		state.memberLength = payload;
	},
	setTempBase64(state, payload) {
		state.temp.base64 = payload;
	},
	deleteMessage(state, payload) {
		state.chatMessageMap.delete(payload)
	},
	setStopSpeak(state, payload) {
		state.curChatEntity.stopSpeak = payload;
	},
	setYaoqingAble(state, payload) {
		state.curChatEntity.yaoqingAble = payload;
	},
	setYaoqingAuditAble(state, payload) {
		state.curChatEntity.yaoqingAuditAble = payload;
	},
	setTouserid(state, payload) {
		state.touserid = payload
	},
	clearData(state) {
		state = {
			chatCfg: {},
			unReadMsgSum: 0, //未读消息总数
			arList: [], //消息列表
			arListShow: [], //消息列表用于显示
			WAIT_SEND_MSG: "", //发送失败，等待重头发送信息
			chatMessageMap: new Map(),
			curChatAiteToMyList: [], //当前聊天实体 别人@我的对象列表
			curChatEntity: {}, //当前聊天实体
			curChatMsgList: [], //当前正在聊天的记录列表
			chatMyLoadding: false,
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
	}
}