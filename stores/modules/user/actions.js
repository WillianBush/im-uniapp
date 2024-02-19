import Log from "../../../common/Log"
import Vue from "vue"
import {
	checkHealth,
	friendList,
	getImgDomain,
	getShimingCfg,
	getUserInfo,
	isEmployee,
	listPage,
	login,
	removeRecord,
	isSuperUser,
	getDefaultMessage,
	register
} from "../../../common/api";
import {
	random32String
} from "../../../common/utils";
import {
	SocketType
} from "../../../const/SocketType";

let TAG = "USER-ACTIONS"

export default {
	updateUserInfo({
		commit
	}) {
		getUserInfo().then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				Log.d(TAG, "getUserInfo", res_data.body)
				commit("setUser", res_data.body)
				uni.setStorageSync("USER", res_data.body);
				commit("setUnDoFriendAddCount", res_data.body.unDoFriendAddCount);
				commit("setUnDoRoomAddCount", res_data.body.unDoRoomAddCount);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	isEmployeeAction({
		state,
		commit,
		rootGetters
	}) {
		return new Promise((resolve, reject) => {
			isEmployee().then(res => {
				let res_data = eval(res.data);
				if (res.statusCode == 200) {
					let employee = res_data.msg === 'Yes';
					let isOpenUpdate = rootGetters['app/isOpenUpdate']
					// 特权用户，开启定时刷新
					if (employee && isOpenUpdate) {
						if (state.employeeRefreshInterval) {
							commit("cleartEmployeeRefreshInterval")
						}
						commit("setEmployeeRefreshInterval", setInterval(function() {
							Log.d(TAG, "===", "特权用户刷新");
							dispatch("chat/listPageAction", null, {
								root: true,
							});
						}, 10 * 1000));
					}
					commit("setIsEmployee", employee);
					resolve(employee)
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: res_data.msg
					});
					reject(res)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	loginAction({
		commit,
		dispatch,
		rootState,
		rootGetters
	}, payload) {
		let osName = rootGetters['app/osName'];
		let osVersion = rootGetters['app/osVersion'];
		console.log("=====osName", osName)
		return new Promise((resolve, reject) => {
			login({
				account: payload.account,
				password: payload.password,
				deviceType: osName,
				deviceVersion: osVersion,
			}).then((res) => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					commit("setUser", res_data.body);
					commit("setUserToken", res_data.token);
					uni.setStorageSync("USER", res_data.body);
					uni.setStorageSync("token", res_data.token);
					commit(
						"setUnDoFriendAddCount",
						res_data.body.unDoFriendAddCount
					);
					commit(
						"setUnDoRoomAddCount",
						res_data.body.unDoRoomAddCount
					);
					//生成websocket id和当前用户对应上
					random32String(res_data.body.id)
					dispatch("socket/" + SocketType.WEBSOCKET_INIT, null, {
						root: true
					});
					// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
					// #ifdef APP-PLUS
					setTimeout(function() {
						const clientInfo = plus.push.getClientInfo();
						let pushUser = {
							clientid: clientInfo.clientid,
							appid: clientInfo.appid,
							appkey: clientInfo.appkey,
							userName: "用户名",
							userRole: "用户角色",
							uid: res_data.body.id,
						};
						dispatch("socket/" + SocketType.WEBSOCKET_SEND, {
							body: pushUser,
							CMD: MessageType.APP_PUSH_USER_INFO
						}, {
							root: true
						});

					}, 1000);
					// #endif
					dispatch("isEmployeeAction");
					dispatch("chat/listPageAction", null, {
						root: true,
					});
					resolve(res_data);
				} else {
					reject(res_data);
				}
			}).catch(error => {
				Log.e(TAG, error)
				reject(error);
			});
		})
	},
	registerAction({
		commit,
		dispatch,
		rootState
	}, payload) {
		return new Promise((resolve, reject) => {
			register({
				inviteCode: payload.inviteCode,
				nickname: payload.nickname,
				password: payload.password,
			}).then((res) => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					// 注册成功需要登录，所以这里不需要存用户信息
					
					// commit("setUser", res_data.body);
					// uni.setStorageSync("USER", res_data.body);
					// uni.setStorageSync("token", res_data.token);
					// commit("setUserToken", res_data.token);
					
					// commit(
					// 	"setUnDoRoomAddCount",
					// 	res_data.body.unDoRoomAddCount
					// );
					// commit(
					// 	"setUnDoFriendAddCount",
					// 	res_data.body.unDoFriendAddCount
					// );
					// dispatch("socket/" + SocketType.WEBSOCKET_INIT, null, {
					// 	root: true
					// });
					// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
					// #ifdef APP-PLUS
					// setTimeout(function() {
					// 	const clientInfo = plus.push.getClientInfo();
					// 	let pushUser = {
					// 		clientid: clientInfo.clientid,
					// 		appid: clientInfo.appid,
					// 		appkey: clientInfo.appkey,
					// 		userName: "用户名",
					// 		userRole: "用户角色",
					// 		uid: res_data.body.id,
					// 	};
					// 	dispatch("socket/" + SocketType.WEBSOCKET_SEND, {
					// 		body: pushUser,
					// 		CMD: MessageType.APP_PUSH_USER_INFO
					// 	}, {
					// 		root: true
					// 	});
					// }, 10000);
					// #endif
					resolve(res_data);
				} else {
					reject(res_data);
				}
			}).catch(error => {
				reject(error)
			});
		});
	},
	getShimingCfgAction({
		commit
	}) {
		getShimingCfg().then(res => {
			if (res.data.code == 200) {
				commit("setShimingCfg", res.data.body);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	getFriendListAction({
		commit,
		state
	}) {
		friendList().then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				let friendList = res_body;
				Log.d(TAG, "===friendList1", friendList)
				friendList.forEach((item) => {
					item.list.forEach((item1) => {
						let s = uni.getStorageSync(item1.member_uuid +
							"_NOTE");
						if (s && s != "") {
							item1.name = s;
						}
					})
				});
				Log.d(TAG, "===friendList2", friendList)
				commit("setFriendList", friendList);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	isSuperUserAction() {
		//是否超级用户
		return new Promise((resolve, rejcet) => {
			isSuperUser().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					resolve(parseInt(res_data.msg))
				} else {
					reject(-1)
				}
			}).catch(error => {
				reject(-1)
			})
		})
	},
	getGreetingMsgAction({
		state,
		commit
	}) {
		if (state.user) {
			getDefaultMessage().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					const data = res.data.body.rows;
					commit("setGreetList", data)
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: res_data.msg
					});
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			})
		}
	}
}