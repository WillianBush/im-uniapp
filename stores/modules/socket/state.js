export const state = {
		socketTask: null,
		eventlist: [],
		isOpenSocket:false,
		continueCloseCount:0,//连续失败数量
		lock:false,
		delayTime:-1, // 网络ping延时
		startPingTime:0,
	}