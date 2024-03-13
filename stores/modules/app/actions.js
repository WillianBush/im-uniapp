import Log from "../../../common/Log";
import Vue from "vue";
import {
	_initC
} from "../../../common/netRequest";
import config from "../../../common/netConfig";
import {
	getAppVersion,
	getImgDomain,
	getListWithMid,
	getFooterHotItem
} from "../../../common/api";
import {
	compareVersion
} from "../../../common/utils";
import {
	MessageType
} from "../../../const/MessageType";

let TAG = "APP-ACTION";
export default {
	getSystemInfo({
		commit
	}) {
		return new Promise((resolve, reject) => {
			uni.getSystemInfo({
				success: function(systemInfo) {
					commit("setOsName", systemInfo.osName)
					commit("setOsVersion", systemInfo.osVersion)
					resolve(systemInfo);
				},
				fail: function(error) {
					Log.e(TAG, error);
					reject(error);
				},
			});
		});
	},
	setAppConfig({
		dispatch,
		commit
	}) {
		dispatch("getSystemInfo")
			.then((e) => {
				Log.d(TAG, "getSystemInfo:", e);
				Vue.prototype.winH = e.windowHeight;
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == "android") {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				//#ifndef H5
				if (e.platform == "android") {
					Vue.prototype.$clientType = "android";
				} else {
					Vue.prototype.$clientType = "ios";
				}
				// #endif
				commit("setSystemVersion", e.appVersion);
			})
			.catch((error) => {
				Log.e(TAG, error);
				uni.showToast({
					title: "系统信息获取失败",
					duration: 1000,
				});
			});
	},
	async initRootDomain({
		state,
		dispatch,
		commit
	}) {
		let rootDomain = await config.requestRootDomain(commit);
		console.log("获取到rootdomain:", rootDomain)
		dispatch("initNetBind");
	},
	initNetBind({
		state,
		dispatch,
		commit
	}) {
		let remoteIP = config.requestRemoteIp(commit,state); // 获取动态设置接口请求域名
		remoteIP
			.then((resolve, reject) => {
				if (resolve) {
					_initC(state.reqUrl);
					setTimeout(() => {
						let user = uni.getStorageSync("USER");
						if (user) {
							Log.d(TAG, "WEBSOCKET_INIT====")
							dispatch("socket/WEBSOCKET_INIT", null, {
								root: true
							})
							dispatch("user/updateUserInfo", null, {
								root: true,
							});
							dispatch("user/isEmployeeAction", null, {
								root: true,
							});
						}
					}, 500);
					//获取domain成功后，执行
					Log.d(TAG, "=======获取域名成功!");
					Vue.prototype.$isResolve();
					//#ifdef H5
					//h5，点击浏览器刷新按钮，成功加载domain后，重新加载app
					uni.navigateTo({
						url: "/pages/splash/splash",
					});
					//#endif

					/*健康检查，如果后端域名挂了，更换下一个*/
					if (state.checkHttpHealthInterval) {
						commit("cleartCheckHttpHealthInterval");
					}
					commit(
						"setCheckHttpHealthInterval",
						setInterval(function() {
							// Log.d(TAG, "===", "checkHttpHealth");
							dispatch("checkHttpHealth");
						}, 100 * 1000)
					);
				}
			})
			.catch((error) => {
				uni.showToast({
					title: "域名获取失败",
					duration: 2000,
				});
			});
	},
	checkHttpHealth({
		state,
		commit
	}) {
		let _this = this;
		Log.d(TAG, "tttttt0000000", state.reqUrl);
		Log.d(TAG, "tttttt0000000", state.reqUrl.length);
		let i = 0;
		if (state.reqUrl.length == 0) {
			commit("cleartCheckHttpHealthInterval");
			uni.showToast({
				title: "服务器异常，请稍后再试",
				duration: 2000,
			});
			return;
		}
		uni.request({
			method: 'GET',
			url: state.reqUrl[i] + "/user/health/check", //仅为示例，并非真实接口地址。
			success: (res) => {
				let res_data = eval(res.data);
				if (res_data.code != 200) {
					commit("setCheckUrl", i)
				}
			},
			fail: (res) => {
				let temp = state.reqUrl
				commit("setCheckUrl", i)
			}
		});
	},
	appHideOrShow({
		dispatch,
		commit
	}, payload) {
		// app处于后台时
		commit("setAppShow", payload);
		let user = uni.getStorageSync("USER");
		if (user) {
			let v = {
				uid: user.id,
				status: payload ? 1 : 0, //APP 0处于后台 1处于前台
			};
			dispatch('socket/WEBSOCKET_SEND', {
				CMD: MessageType.APP_HIDE_SHOW,
				body: {
					uid: user.id,
					status: payload ? 1 : 0, //APP 0处于后台 1处于前台
				}
			}, {
				root: true
			})
		}
	},
	checkAppVersion({
		state,
		commit
	}) {
		return new Promise((resolve, reject) => {
			let timestamp = new Date().getTime();
			//android:1,ios:2
			let _appType;
			let _appName = uni.getSystemInfoSync().appName;
			getAppVersion({
					timestamp,
					appType: _appName === "android" ? 1 : 2,
					appName: _appName,
				})
				.then((res) => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let nativeV = state.SYS_VERSION;
						let netV = res_data.body.version;
						let vUpdate = compareVersion(netV, nativeV);
						commit("setAppNeedUpdate", vUpdate);
						resolve({
							vUpdate,
							...res_data,
						});
					} else {
						reject(res_data);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	getImageDomainAction({
		commit
	}) {
		getImgDomain().then(res => {
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
		}).catch(error => {
			console.log("####error:", error)

			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	getFooterHotItemAction({
		commit
	}) {
		getFooterHotItem().then(res => {
			commit("setHotItem", res.data.body);
		}).catch(error => {
			console.log("####error:", error)

			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	getListWithMidAction({
		commit
	}) {
		getListWithMid().then(res => {
			commit("setFaxianSiteList", res.data.body)
		}).catch(error => {
			console.log("####error:", error)

			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	clearDataAction({
		commit
	}) {
		commit("clearData");
		commit("chat/clearData", null, {
			root: true
		});
		commit("user/clearData", null, {
			root: true
		});
		commit("socket/clearData", null, {
			root: true
		});
	}
};