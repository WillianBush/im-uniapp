import Log from "../../../common/Log";
import { MessageType } from "../../../const/MessageType";

let TAG = "SOCKET-MUTATIONS"
export default {
	WEBSOCKET_INIT(state){
		
	},
	WEBSOCKET_SEND(state, p) {
		
	},
	clearData(state){
		state = {
			socketTask: null,
			eventlist: [],
			isOpenSocket:false,
			continueCloseCount:0,//连续失败数量
			lock:false,
		}
	},
	setPingTime(state,payload){
		// Log.d(TAG,"setPingTime",payload)
		state.startPingTime = payload
	},
	setDelayTime(state,payload){
		state.delayTime = payload
	},
	addSendQuene(state,payload){
		let temp = state.sendQueue.filter(item => payload.bean.uuid == item.bean.uuid)
		if(!temp.length){// 不存在才加入队列
			state.sendQueue.push(payload)
		}
	},
	removeSendQuene(state,payload){
		let temp =state.sendQueue.filter(item=>item.bean.uuid !== payload || !item.bean.sendFail)
		state.sendQueue = temp;
	},
	setCheckMsgTimer(state,payload){
		if(!state.checkMsgTimer){
			state.checkMsgTimer = payload
		}
	},
	stopCheckMsgTimer(state,payload){
		state.checkMsgTimer &&clearInterval(state.checkMsgTimer)
		state.checkMsgTimer = null;
	},
	setLock(state,payload){
		state.lock = payload
	},
	setSocketTask(state,payload){
		state.socketTask = payload
	},
	setIsOpenSocket(state,payload){
		state.isOpenSocket = payload
	},
	setContinueCloseCount(state,payload){
		state.continueCloseCount = payload;
	}
}