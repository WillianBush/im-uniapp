//mutations里面的函数 必须是同步函数
//mutations：这里可以改变state状态，并且是响应式的，也只有在这里改变state才能做到响应式，注意：这里同步的并不能执行异步操作
//第一个参数是state，也可以向mutations里的函数传入第二个参数即payload，自定义的
/**
比如这样
t(state,payload){

}
或
t:(state,payload)=>{

}
**/
//在使用mutations里的函数时应使用this.$store.commit(方法名)或this.$store.commit(方法名,载荷/即参数)
export default {
	setSignInCnf(state,payload) {
		state.signInCnf = payload
	},
	setWAIT_SEND_MSG(state,payload) {
		state.WAIT_SEND_MSG = payload
	},
	setCur_chat_aiteToMyList(state,payload) {
		state.cur_chat_aiteToMyList = payload
	},
	setHotItem_webView_show(state,payload) {
		state.hotItem_webView_show = payload
	},
	setShimingCfg(state,payload) {
		state.shimingCfg = payload
		//console.log(state.user_token+"\\");
	},
	setUserToken(state,payload) {
		state.user_token = payload
		//console.log(state.user_token+"\\");
	},
	setLang(state,payload) {
		state.lang = payload
		//console.log(state.user_token+"\\");
	},

	setUnReadMsgSum(state,payload) {
		state.unReadMsgSum = payload;
		//console.log(state.user_token+"\\");
	},
	setHotItem_webViewStyle(state,payload) {
		state.hotItem_webViewStyle=payload;
	},
	setHotItem(state,payload) {
		state.hotItem=payload;
	},
	setUser(state,payload) {
		state.user=payload;
	},
	setFriend_list(state,payload){
		state.friend_list = payload;
	},
	setGroup_list(state,payload){
		state.group_list = payload;
	},
	updateUserHeadpic(state,payload){
		state.user.headpic = payload;
	},
	updateUsername(state,payload){
		state.user.nickName = payload;
	},
	setAr_list(state,payload){
		if(state.ar_list_show.length==state.ar_list.length) {
			state.ar_list_show = payload;
		}
		state.ar_list = payload;
	},
	setAr_list_show(state,payload){
		state.ar_list_show = payload;
	},
	setUnDoFriendAddCount(state,payload){
		state.unDoFriendAddCount = payload;
	},
	setUnDoRoomAddCount(state,payload){
		state.unDoRoomAddCount = payload;
	},
	setIsEmployee(state,payload){
		state.isEmployee = payload;
	},
	setImgDomain(state,payload){
		state.img_url = payload;
	},
	setReqDomain(state,payload){
		state.req_url = payload;
	},
	setSocketDomain(state,payload){
		state.socket_url = payload;
	},
	updateChatMessageMap(state,payload){
		state.chatMessageMap.set(payload.key,payload.value);
	},
	setCur_chat_entity(state,payload){

		state.cur_chat_entity = payload;
	},
	setCur_chat_msg_list(state,payload){
		state.cur_chat_msg_list = payload;
	},
	setFaxian_site_list(state,payload){
		state.faxian_site_list = payload;
	},
	setChat_my_loadding(state,payload){
		state.chat_my_loadding = payload;
	},
	clearData(state) {
		state.unReadMsgSum = 0;
		state.user = {};
		state.user_token = "";
		state.unReadMsgSum = 0;
		state.lang = "",
		state.ar_list = [];
		state.ar_list_show = [];
		state.friend_list = [];
		state.group_list = [];
		state.unDoFriendAddCount = 0;
		state.unDoRoomAddCount = 0;
		state.chatMessageMap = new Map();
		state.cur_chat_entity = {};
		state.cur_chat_msg_list = [];
		state.chat_my_loadding = false;
		state.isEmployee = "";
	}
}
