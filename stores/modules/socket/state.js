export const state = {
		socketTask: null,
		eventlist: [],
		isOpenSocket:false,
		continueCloseCount:0,//连续失败数量
		lock:false,
		delayTime:-1, // 网络ping延时
		startPingTime:0,
		sendQueue:[],// 消息发送队列
		checkMsgTimer:null,//消息检测定时器
		checkTime:10*1000,//消息检测间隔
	}