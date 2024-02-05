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
		Log.d(TAG,"setPingTime",payload)
		state.startPingTime = payload
	},
	setDelayTime(state,payload){
		state.delayTime = payload
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