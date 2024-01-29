//不同于Mutations只能是同步函数，在actions里可以执行异步操作
//actions：相当于组件中的methods。注意：这里可以执行异步操作。如网络请求的操作都可以mutations是不能执行异步操作的
//第一个参数是context【与 store 实例具有相同方法和属性的 context 对象】 ，也可以向actions里的函数传入第二个参数即payload，自定义的
//因为context与store实例一样，所以可以使用store里面的方法和属性。如context.commit，context.state，context.getters等等
/**
比如这样
t(context ,payload){
		
}
或
t:(context ,payload)=>{
	
}
**/

import {
	checkHealth,
	friendList,
	getFooterHotItem,
	getImgDomain,
	getShimingCfg,
	getUserInfo,
	isEmployee,
	listPage,
	removeRecord
} from "../common/api";
import Log from "../common/Log";
const TAG = "ACTION"
//在使用actions里的函数时应使用this.$store.dispatch(方法名)或this.$store.dispatch(方法名,载荷/即参数)
export default {
	updateUserInfo({
		commit
	}) {
		let user = uni.getStorageSync("USER");
		if (user) {
			//更新一下user
			getUserInfo().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					Log.d(TAG, "getUserInfo", res_data.body)
					commit("setUser", res_data.body)
					uni.setStorageSync("USER", res_data.body);
					commit("setUnDoFriendAddCount", res_data.body.unDoFriendAddCount);
					commit("setUnDoRoomAddCount", res_data.body.unDoRoomAddCount);
				}
			})
		}
	},
	checkHttpHealth({
		commit,
		state
	}) {
		let i = 0;
		checkHealth().then(res => {
			let res_data = eval(res.data);
			if (res_data.code != 200) {
				state.req_url.splice(0, 1)
			}
			Log.d(TAG, "checkHttpHealth", res_data.code)
		}).catch(res => {
			state.req_url.splice(0, 1)
		})
	},
	listPage({
		commit,
		state
	},payload) {
		let params = {pageSize:50,pageNum:1}
		if(payload){
			params.pageSize = payload.pageSize
			params.pageNum = payload.pageNum
		}
		listPage(params).then(res_1 => {
			let res_data_1 = eval(res_1.data);
			if (res_data_1.code == 200) {
				let unreadSum = 0;
				res_data_1.body.records.forEach(item => {
					let s = uni.getStorageSync(item.id + "_NOTE");
					if (s && s != "") {
						item.title = s;
					}

					let last_txt = uni.getStorageSync(user.id + "#" + item.id +
						'_CHAT_MESSAGE_LASTCONTENT');
					if (last_txt.indexOf("<img") >= 0) {
						item.content = "[图片]";
					} else if (last_txt.indexOf("upload/chat/voice") >= 0) {
						item.content = "[语音]";
					} else if (last_txt.indexOf("upload/chat/video") >= 0) {
						item.content = "[视频]";
					} else {
						item.content = last_txt;
					}


					let unRead = uni.getStorageSync(user.id + "#" + item.id +
						'_CHAT_MESSAGE_UNREAD');
					if (unRead && unRead != "") {
						unreadSum += parseInt(unRead);
						item.unread = parseInt(unRead);
					} else {
						item.unread = 0;
					}

					let aite_count = uni.getStorageSync(item.id + "#AITE_COUNT");
					if (aite_count && aite_count != "") {
						item.aiteCount = parseInt(aite_count);
					}

					let zhiding = uni.getStorageSync(item.id + "_zhiding");
					if (zhiding) {
						item.top = 0;
					}

				});
				let list = res_data_1.body.records;
				list.sort(function(a, b) {
					if (a.top == b.top) {
						return b.createDateTime - a.createDateTime;
					} else {
						return a.top - b.top;
					}
				})
				commit("setAr_list", list)
				commit("setUnReadMsgSum", unreadSum)
				//_this.$store.commit("setAr_list_show",list)

			} else if (res_data_1.code == 502) {
				uni.navigateTo({
					url: "/pages/empty/empty"
				})
			} else {
				uni.showToast({
					icon: 'none',
					title: "获取列表失败"
				});
			}
		})
	},
	getShimingCfg({commit}){
		getShimingCfg().then(res=>{
			if (res.data.code == 200) {
				commit("setShimingCfg", res.data.body);
			}
		})
	},
	getFriendList({commit,state}){
		friendList().then(res=>{
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setFriend_list", res_data.body);
				state.friend_list.forEach((item) => {
					item.list.forEach((item1) => {
						let s = uni.getStorageSync(item1.member_uuid +
							"_NOTE");
						if (s && s != "") {
							item1.name = s;
						}
					})
				})
			}
		})
	},
	getImageDomain({commit}){
		getImgDomain().then(res =>{
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setImgDomain", res_data.msg);
			} else {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: res_data.msg
				});
			}
		})
	},
	isEmployeeAction({commit}){
		isEmployee().then(res=>{
			let res_data = eval(res.data);
			if (res.statusCode == 200) {
				commit("setIsEmployee", res_data.msg === 'Yes');
			} else {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: res_data.msg
				});
			}
		})
	},
	getFooterHotItemAction({commit}){
		getFooterHotItem().then(res =>{
			commit("setHotItem", res.data.body);
		})
	},
	removeItem({commit,rootState},payload){
		removeRecord({
			id: payload.id
		}).then(res =>{
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				let list = rootState.chat.arList.filter(item1 => {
					if (item.arid == item1.arid) {
						return false;
					}
					return true;
				});
				commit("setArList", list);
			}
		})
	}
}