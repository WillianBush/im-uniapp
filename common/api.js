import {
	http
} from "@/common/netRequest.js";

export const getAppVersion = (params) =>
	http.get("/user/appversion/json/getAppVersion?site_id=1&device_type=" + params.appType + "&app_id=" +
		params.appName + "&_t=" + params.timestamp)

/**
 * 登录
 */
export const login = (params) =>
	http.post("/user/json/loginV2", params, {
		header: {
			"Content-Type": "application/json",
		},
	});


export const loginOut = (params) =>
	http.post("/user/json/logout", params);

/**
 * 注册
 */
export const register = (params) =>
	http.post("/user/json/registerV2", params, {
		header: {
			"Content-Type": "application/json",
		},
	});


export const getListWithMid = ()=>http.post("/fxs/json/getListWithMid");
/**
 * 配置
 */
export const getRegCfg = () => http.post("/sysConfig/json/getRegCfg");

export const getShimingCfg = () => http.post("/sysConfig/json/getShimingCfg")

export const getFooterHotItem = () => http.post("/sysConfig/json/getFooterHotItem")

export const getChatCfg = () => http.post("/sysConfig/json/getChatCfg")

export const getRoomCfg = () => http.post("/sysConfig/json/getRoomCfg")

export const getBankInfo = () => http.post("/sysConfig/json/getBankInfo")


export const isEmployee = () =>
	http.post("/user/employeeDefaultMessage/json/isEmployee");

export const listPage = (params = {
		pageSize: 50,
		pageNum: 1
	}) =>
	http.post("/user/accessRecord/json/listPage", {
		pageSize: params.pageSize, //数量
		pageNumber: params.pageNum, //页数
	});

export const getUserInfo = () => http.post("/user/json/load/v1")

export const checkHealth = () => http.get("/user/health/check")

export const isExistByKey = (params) => http.post("/socke/isExistByKey")


export const friendList = () => http.post("/user/friend/list/v1")

export const getImgDomain = () => http.post("/user/file/getDomain")



export const isMyFri = (params) => http.post("/user/friend/isMyFri/v1", params)

export const removeRecord = (params) => http.post("/user/accessRecord/json/remove", params)

export const isSuperUser = () => http.post("/user/json/isSuperUser")

export const searchList = (params) => http.post("/user/accessRecord/json/get", params)


export const getBlackList = () => http.post("/user/json/getBlackList")

export const verifySmsCodes = () => http.post("/user/json/verifySmsCode")

export const sendSms = () => http.post("/user/json/sendSms/v1")

export const removeBlack = (params) => http.post("/user/json/removeBlack", params)


export const getTalkUserInfo = (params) => http.get("/user/json/userInfo?toid=" + params)

export const loadTalkUserById = (params) => http.post("/user/json/loadById/v1", params)

export const isBlack = (params) => http.post("/user/json/isBlack", params)

export const removeFriends = (params) => http.post("/user/json/removeFriends", params)

export const repwd = (params) => http.post("/user/json/repwd", params)

export const getDefaultMessage = () => http.get("/user/employeeDefaultMessage/json/getMyHelloMessage")

export const employeeDefaultMessage = (params) => http.post("/user/employeeDefaultMessage/json/update", params)

export const updateNickName = (params) => http.post("/user/json/updateNickName", params)

export const updateTel = (params) => http.post("/user/json/updateTel", params)

export const updateSex = (params) => http.post("/user/json/updateSex", params)

// 黑名单操作
export const userDoBlack = (actionName, params) => http.post("/user/json/" + actionName, params)


// room

export const roomSendVerify = (params) => http.post("/room/json/sendVerify", params)

export const searchByTelOrName = (params) => http.post("/user/friend/searchByTelOrName/v1", params)

export const loadRoom = (params) => http.post("/room/json/load/v1", params)

export const isRoomMember = (params) => http.post("/room/json/isRoomMember", params)

export const roomList = (params) => http.post("/user/json/room/list", params)

export const searchRoom = (params) => http.post("/room/json/search_list", params)


export const verifyRoomList = () => http.post("/room/json/verify_list")

export const verifyRoomDo = (params) => http.post("/room/json/verifyDo", params)

export const createRoom = (params) => http.post("/room/json/createRoom", params)

export const addMember = (params) => http.post("/room/json/addMember", params)

export const getMemberList = (params) => http.post("/room/json/getMemberList", params)

export const getMemberListPage = (params) => http.post("/room/json/getMemberListPage", params)

export const getMember = (params) => http.post("/room/json/getMember", params)

export const addRoomMgr = (params) => http.post("/room/json/addRoomMgr", params)

export const uStopSpeakSingle = (params) => http.post("/room/json/uStopSpeakSingle", params)


export const isStopSpeak4User = (params) => http.post("/room/json/isStopSpeak4User", params)

export const saveOrUpdate = (params) => http.post("/user/accessRecord/json/saveOrUpdate", params)

export const removeMember = (params) => http.post("/room/json/removeMember", params)

export const transferGroup = (params) => http.post("/room/json/transferGroup", params)

export const dissolve = (params) => http.post("/room/json/dissolve", params)

export const logoutRoom = (params) => http.post("/room/json/out", params)

export const uStopSpeak = (params) => http.post("/room/json/uStopSpeak/v1", params)

export const uCnfSet = (params) => http.post("/room/json/uCnfSet", params)

export const getNotShimingMemberList = (params) => http.post("/room/json/getNotShimingMemberList", params)

export const updateShiming = (params) => http.post("/user/json/shiming_update", params)

export const getShimingInfo = () => http.post("/user/json/shiming_info")

export const getRoomMgrList = (params) => http.post("/room/json/getRoomMgrList", params)

export const removeRoomMgr = (params) => http.post("/room/json/removeRoomMgr", params)

export const stopSpeakSingleList = (params) => http.post("/room/json/stopSpeakSingleList", params)

export const updateName = (params) => http.post("/room/json/updateName", params)

export const updateDescri = (params) => http.post("/room/json/updateDescri", params)

export const clearHeadpic = (params) => http.post("/room/json/clearHeadpic", params)

export const yaoqiJoinRoom = (params) => http.post("/room/json/yaoqiJoinRoom", params)


// friend

export const searchFriend = (params) => http.post("/user/friend/searchByTelOrName/v1", params)

export const newFriendList = () => http.post("/user/friend/add/list/v1")

export const verifyFriend = (params) => http.post("/user/friend/verify/v1", params)

export const sendVerifyFriend = (params) => http.post("/user/friend/sendVerify/v1", params)

// chat msg
export const syncMsgData = (params) => http.post("/chat_msg/syncMsgData", params)

export const collect = (params) => http.post("/user/favourite/json/add", params)

export const collectList = (params) => http.post("/user/favourite/json/getList", params)

export const delCollect = (params) => http.post("/user/favourite/json/remove", params)

export const sendQrcode = (params) => http.post("/chat/sendQrcode", params)

export const chatListPage = (params) => http.post("/chat/listPage", params)



// file

export const uploadB64Img = (params) => http.post("/user/file/uploadB64Img", params)

export const uploadVoice = (params) => http.post("/user/file/uploadVoice", params)

export const delB64Img = (params) => http.post("/user/file/delB64Img", params)

// 客服

export const kefuList = () => http.post("/kefu/list")

// notice

export const noticeDetail = (params) => http.post("/notice/detail", params)

export const noticeList = () => http.post("/notice/list")

