import {
	MessageType
} from "../../../const/MessageType";
import Log from "../../../common/Log";
import Vue from 'vue'
import {
	uniqueArr
} from "../../../common/utils";
let TAG = "SOCKET-ACTION";
let wsOpenDo = true;
let heartCheck;
let wsUrl = "wss://180.178.43.202:9998/ws";

export default {
	WEBSOCKET_INIT({
		commit,
		dispatch,
		rootGetters,
		state,
		rootState
	}) {
		let user = uni.getStorageSync("USER")
		let id = user.memberId;

		// console.log(rootGetters['user/memberId'])
		//用户退出后，不让重新连
		if (typeof id == "undefined" || id == null || id == "") {
			return;
		}
		var _this = this;
		if (state.isOpenSocket) return;
		// 重连次数大于10则不重连
		if (state.continueCloseCount > 10) return;
		if (state.lock) return;
		commit("setLock", true);
		// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
		if (state.socketTask) {
			if (heartCheck) {
				heartCheck.reset();
				heartCheck = null;
			}
			state.socketTask.close();
		}
		var i = Math.floor(Math.random() * rootState.app.socketUrl.length);
		console.log("====reqUrl", rootState.app.reqUrl)
		console.log("====wsUrl", rootState.app.socketUrl)
		let ws = rootState.app.socketUrl[i]
		// let websocket_id = uni.getStorageSync("websocket_id");
		Log.d(TAG, "WEBSOCKET_INIT", rootState.user);
		commit("setSocketTask", uni.connectSocket({
			url: ws,
			// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
			success(data) {
				commit("setLock", false);
				Log.d(TAG, "=====ws链接成功");
			},
			fail(e) {
				Log.e(TAG, "=====ws链接失败", e);
				heartCheck && heartCheck.reset();
			},
		}))
		//心跳检测
		heartCheck = {
			st: null,
			si: null,
			start: function() {
				var self = this;
				this.si = setTimeout(() => {
					let user = uni.getStorageSync("USER");
					if (user) {
						// let v = user.id+"#"+Vue.prototype.$clientType+"#"+store.state.app_uuid;
						dispatch("WEBSOCKET_SEND", {
							CMD: MessageType.PING,
							memberId: user.memberId,
						});
						commit("setPingTime", new Date().getTime());
					} else {
						uni.navigateTo({
							url: "/pages/login/login",
						});
						return;
					}
					self.st = setTimeout(() => {
						// state.socketTask.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
						if (!state.isOpenSocket) {
							heartCheck.reset();
							dispatch("WEBSOCKET_INIT");
						}
					}, 20000);
				}, 20000);
			},
			reset: function() {
				clearTimeout(this.st);
				clearTimeout(this.si);
			},
		};

		state.socketTask.onOpen((res) => {
			wsOpenDo = false;
			commit("setIsOpenSocket", true);
			commit("setContinueCloseCount", 0);
			Log.d(TAG, "=====ws通道打开，可以发送数据");
			let user = uni.getStorageSync("USER");
			if (user) {
				// dispatch("WEBSOCKET_SEND", {
				//   CMD: MessageType.LOGIN,
				//   memberId: user.memberId,
				// });
				dispatch("WEBSOCKET_SEND", {
					CMD: MessageType.PUT_SESSION,
					body: {
						app_uuid: rootState.app.appUuid,
						client: Vue.prototype.$clientType,
						user_id: user.id + "#" + Vue.prototype.$clientType,
					}
				});
				let WAIT_SEND_MSG = uni.getStorageSync("WAIT_SEND_MSG");
				Log.d(TAG, "WAIT_SEND_MSG:", WAIT_SEND_MSG);

				if (WAIT_SEND_MSG && WAIT_SEND_MSG != "") {
					let WAIT_SEND_MSG_LIST = JSON.parse(WAIT_SEND_MSG);
					WAIT_SEND_MSG_LIST.forEach((item) => {
						Log.d(TAG, "消息重新发送ing.....", item);
						dispatch("WEBSOCKET_SEND", item);
					});
				}

				uni.removeStorageSync("WAIT_SEND_MSG");
				commit("chat/setWAIT_SEND_MSG", "", {
					root: true
				});

				//#ifndef H5
				// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
				setTimeout(function() {
					const clientInfo = plus.push.getClientInfo();
					let pushUser = {
						clientid: clientInfo.clientid,
						appid: clientInfo.appid,
						appkey: clientInfo.appkey,
						userName: "用户名",
						userRole: "用户角色",
						uid: user.id,
					};
					dispatch("WEBSOCKET_SEND", {
						CMD: MessageType.APP_PUSH_USER_INFO,
						body: pushUser,
					});
				}, 1000);
				//#endif

				if (heartCheck) {
					heartCheck.start();
				}

				setTimeout(() => {
					wsOpenDo = true;
				}, 2000);
			}
		});
		state.socketTask.onClose((res) => {
			Log.d(TAG, "======onClose:", res);
			Log.d(TAG, "WebSocket重新连接1！");
			commit("setIsOpenSocket", false);
			commit("setContinueCloseCount", state.continueCloseCount + 1);
			if (state.continueCloseCount == 10) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "通讯服务器已断开!"
				});
			}
			heartCheck.reset();
			dispatch("WEBSOCKET_INIT");
		});

		state.socketTask.onError((res) => {
			Log.d(TAG, "======onError:", res);
			Log.d(TAG, "WebSocket重新连接2！");
			commit("setIsOpenSocket", true);
			commit("setContinueCloseCount", state.continueCloseCount + 1);
			heartCheck.reset();
			if (state.continueCloseCount == 10) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "通讯服务器异常!"
				});
			}
			dispatch("WEBSOCKET_INIT");
		});

		state.socketTask.onMessage((res) => {
			dispatch("parseRevMessage", res);
		})
	},
	WEBSOCKET_CLOSE({
		state
	}) {
		state.socketTask.close()
	},
	parseRevMessage({
		state,
		commit,
		dispatch
	}, res_ws) {
		heartCheck.reset();
		heartCheck.start();
		Log.d(TAG, "收到消息:", res_ws.data);
		let data = JSON.parse(res_ws.data);
		if (data.result) {
			data.body = data.result;
		}
		switch (data.CMD) {
			case MessageType.PING:
				let curTime = new Date().getTime();
				let time = curTime - state.startPingTime;
				Log.d(TAG, "当前时间：", curTime);
				Log.d(TAG, "发送时间：", state.startPingTime);
				Log.d(TAG, "消息延迟：", time);
				commit("setDelayTime", time);
				break;
			case MessageType.LOGIN:
				uni.redirectTo({
					url: "../login/login",
				});
				break;
				//清空聊天记录,一般用于后台执行清空命令后，通知客户端清空操作
			case MessageType.CLEAR_CHAT_MSG_DATA_MGR:
				dispatch('clearMessageRecord', data);
				break;
			case MessageType.CLEAR_CHAT_MSG:
				dispatch('clearChatMsg', data);
				break;
			case MessageType.AT:
				dispatch('at', data);
				break;
			case MessageType.OTHER_LOGIN:
				break;
			case MessageType.CHAT_MSG_READ_ED:
				dispatch('chatMsgReaded', data);
				break;
			case MessageType.FRIEND_ONLINE:
				dispatch('friendOnline', data);
				break;
			case MessageType.FRIEND_OFFLINE:
				dispatch('friendOffline', data);
				break;
			case MessageType.SHOW_INPUT_ING:
				commit("chat/setInputIng", true, {
					root: true
				})
				break;
			case MessageType.HIDE_INPUT_ING:
				commit("chat/setInputIng", false, {
					root: true
				})
				break;
			case MessageType.LOGIN_USER_MODIFY_HEAD_PIC:
				commit("user/updateUserHeadpic", data.body, {
					root: true
				});
				break;
			case MessageType.LOGIN_USER_MODIFY_NN:
				commit("user/updateUsername", data.body, {
					root: true
				});
				break;
			case MessageType.LOGIN_USER_STATUS_BAN:
				break;
			case MessageType.ERROR:
				setTimeout(() => {
					uni.showToast({
						icon: "none",
						title: data.body,
						duration: 2000,
					});
				}, 100);
				break;
			case MessageType.UPDATE_ADDRESS_BOOK:
				dispatch('updateAddressBook');
				break;
			case MessageType.FRIENDS_ADD:
				dispatch('addFriend');
				break;
			case MessageType.ROOM_ADD:
				dispatch('addRoom');
				break;
			case MessageType.AR_INSERT:
			case MessageType.AR_UPDATE:
				dispatch('arUpdate', data);
				break;
			case MessageType.GROUP_MEMBER_REMOVE:
				dispatch('groupMemberRemove', data);
				break;
				//撤销
			case MessageType.CHAT_MSG_UNDO:
				dispatch('chatMsgUndo', data);
				break;
			case MessageType.USER_CHAT_MESSAGE:
			case MessageType.GROUP_CHAT_MESSAGE:
			case MessageType.CHAT_SYS_TXT:
				dispatch('chatMessage', data);
				break;
		}
	},
	chatMessage({
		commit,
		rootState,
		dispatch
	}, payload) {
		let data = payload;
		let user = rootState.user.user;
		let messageBean = data.body;
		console.log("==========收到消息", messageBean)
		messageBean[0].uuid = messageBean[0].bean.uuid
		uni.$emit("scrollTopFn");
		// 获取是否设置免打扰
		let chatId = messageBean[0].bean.fromUid != user.id ? messageBean[0].bean.fromUid : data.body[0].bean.toUid;
		if (messageBean[0].bean.toGroupid) {
			chatId = messageBean[0].bean.toGroupid
		}
		let darao = uni.getStorageSync(chatId + "_darao");
		if (messageBean[0].bean.fromUid != user.id) {
			if (!darao && data.act == "none") {
				if (
					rootState.chat.temp.msgMp3Playtime == 0 ||
					new Date().getTime() - rootState.chat.temp.msgMp3Playtime > 1000
				) {
					let mp3_src = "/static/mp3/msg.mp3";
					//实例化声音
					const Audio = uni.createInnerAudioContext();
					Audio.autoplay = true;
					Audio.src = mp3_src; //音频地址
					Audio.play(); //执行播放
					Audio.onSeeked(() => {
						Audio.destroy();
					});
					commit("chat/setMp3Time", new Date().getTime(), {
						root: true
					})
				}
			}
			//群成员昵称显示备注问题
			if (data.CMD == MessageType.GROUP_CHAT_MESSAGE) {
				let s = uni.getStorageSync(data.body[0].bean.fromUid + "_NOTE");
				if (s && s != "") {
					data.body[0].bean.fromName = s;
				}
			}
		} else if (data.body[0].bean.fromUid == user.id) {
			//多端同步的问题
		} else {
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 9999999999,
					duration: 0,
				});
			}, 200);
			//如果是云端加载数据则不需要执行下面的
			if (data.act && data.act != "cloudStorageData") {
				//如果当前打开窗口为此信息对应的窗口，则不需要把信息再次缓存，所以这里直接执行return;就可以了
				//意思就是自己发的信息已经在发的时候缓存 过了。这里return;就可以了。不需要执行下去
				if (
					rootState.chat.curChatEntity &&
					rootState.chat.curChatEntity.id == data.body[0].chatId &&
					(data.CMD == MessageType.USER_CHAT_MESSAGE ||
						data.CMD == MessageType.GROUP_CHAT_MESSAGE)
				) {
					if (
						data.body[0].bean &&
						data.body[0].bean.psr != "video" &&
						data.body[0].bean.psr != "voice" &&
						data.body[0].type != "USER_CARD"
					) {
						rootState.chat.arList.forEach((item) => {
							if (item.id == data.body[0].chatId) {
								// let s = uni.getStorageSync(user.id+"#"+data.body[0].chatId+'_CHAT_MESSAGE_LASTCONTENT');
								let s = data.body[0].bean.simple_content;
								item.content = null == s ? "" : s;
								uni.setStorageSync(
									user.id +
									"#" +
									data.body[0].chatId +
									"_CHAT_MESSAGE_LASTCONTENT",
									s
								);
							}
						});
						return;
					}
				}
			}
		}

		if (
			rootState.chat.curChatEntity &&
			rootState.chat.curChatEntity.id == chatId
		) {
			// 判断是否是当前聊天窗体
			//1-9修正 把直接赋值改为先去重
			// messageList.forEach((item) => {
			// 	item.uuid = item.bean.uuid;
			// });
			// let msgList = uniqueArr(messageList, "uuid")
			// commit(
			// 	"chat/setCurChatMsgList",
			// 	msgList, {
			// 		root: true
			// 	}
			// );
			if (user.id == messageBean[0].bean.fromUid) { // 自己发出的消息
				console.log("==========收到自己发的消息", messageBean)

				commit(
					"chat/updateCurChatMsg",
					messageBean[0], {
						root: true
					}
				);
			} else { // 别人发来的消息
				console.log("==========收到别人发来的消息", messageBean)

				commit(
					"chat/addCurChatMsg",
					messageBean, {
						root: true
					}
				);
			}
		}

		let str = uni.getStorageSync(
			user.id + "#" + chatId + "_CHAT_MESSAGE"
		);
		let messageList = []
		if (str && str != "") {
			var jsonObj = JSON.parse(str);
			if (user.id != messageBean[0].bean.fromUid) {
				jsonObj = jsonObj.concat(messageBean);
				if (jsonObj.length > 30) {
					jsonObj = jsonObj.splice(jsonObj.length - 30, jsonObj.length);
				}
			} else {
				// 如果是自己发的消息就改变消息发送成功的状态
				let isCurSend = false
				jsonObj.forEach((item) => {
					if (item.bean.uuid == messageBean[0].uuid) {
						item.uuid = messageBean[0].uuid;
						isCurSend = true;
					}
				});
				if (!isCurSend) {
					jsonObj = jsonObj.concat(messageBean);
					if (jsonObj.length > 30) {
						jsonObj = jsonObj.splice(jsonObj.length - 30, jsonObj.length);
					}
				}
				console.log("=======jsonObj:", jsonObj)
			}
			messageList = jsonObj
		} else {
			messageList = messageBean;
		}
		console.log("==========收到消息", messageList)
		uni.setStorageSync(
			user.id + "#" + chatId + "_CHAT_MESSAGE",
			JSON.stringify(messageList)
		);
		uni.setStorageSync(
			user.id + "#" + chatId + "_CHAT_MESSAGE_LASTCONTENT",
			messageBean[0].bean.simpleContent
		);

		let v = {
			toUid: chatId,
			fromUid: user.id,
		};
		// 当前窗体接受到对方发来的消息，发送已读命令
		if (rootState.chat.curChatEntity && rootState.chat.curChatEntity.id == chatId && messageBean[0].bean
			.fromUid != user.id) {
			dispatch("WEBSOCKET_SEND", {
				cmd: MessageType.CHAT_MSG_READ_ED,
				...v
			})
		}

		//更新联系记录最后一条显示内容和未读统计信息
		let unreadCount = 0;
		let c = 0; //未读数量
		if (
			(!rootState.chat.curChatEntity ||
				chatId != rootState.chat.curChatEntity.id) &&
			messageBean[0].bean.fromUid != user.id
		) { // 当前聊天没有在聊天页面，或者，不是正在聊天的对象，也不是自己发的消息。则计算未读
			//处理用户信息未读统计
			let str = uni.getStorageSync(
				user.id + "#" + chatId + "_CHAT_MESSAGE_UNREAD"
			);
			if (str && str != "") {
				c = parseInt(str) + 1;
				uni.setStorageSync(
					user.id + "#" + chatId + "_CHAT_MESSAGE_UNREAD",
					c + ""
				);
			} else {
				c = 1;
				uni.setStorageSync(
					user.id + "#" + chatId + "_CHAT_MESSAGE_UNREAD",
					"1"
				);
			}
		}

		rootState.chat.arList.forEach((item) => {
			if (item.id == messageBean[0].chatId) {
				let s = uni.getStorageSync(
					user.id +
					"#" +
					chatId +
					"_CHAT_MESSAGE_LASTCONTENT"
				);
				item.content = null == s ? "" : s;
				commit("chat/setChatMyLoadding", false, {
					root: true
				});
				item.unread = c;
			}
			unreadCount = unreadCount + item.unread;
		});
		commit("user/setUnReadMsgSum", unreadCount, {
			root: true
		});
	},
	chatMsgUndo({
		commit,
		rootState
	}, payload) {
		let data = payload;
		let user = uni.getStorageSync("USER");
		let str = uni.getStorageSync(
			user.id + "#" + data.body.chatId + "_CHAT_MESSAGE"
		);
		if (str && str != "") {
			var arrs = JSON.parse(str);
			let narrs = [];
			for (let i = arrs.length - 1; i >= 0; i--) {
				if (arrs[i].bean && arrs[i].bean.uuid == data.body.bean.txt) {
					arrs[i] = {
						opt: "undo",
						opt_uid: data.body.bean.fromUid,
						name: data.body.bean.fromName,
					};
					if (i == arrs.length - 1) {
						//如果是最后一个，则把最后last_content设置为撤消
						let last_content = "";
						for (let j = arrs.length - 1; j >= 0; j--) {
							if (arrs[j].bean && arrs[j].bean.simpleContent != "") {
								last_content = arrs[j].bean.simpleContent;
								break;
							}
						}
						uni.setStorageSync(
							user.id +
							"#" +
							data.body.chatId +
							"_CHAT_MESSAGE_LASTCONTENT",
							last_content
						);
						try {
							rootState.chat.arList.forEach((item) => {
								if (item.id == data.body.chatId) {
									item.content = last_content;
									throw Error();
								}
							});
						} catch (e) {}
						if (
							data.body.bean &&
							data.body.bean.fromUid != user.id
						) {} else {
							setTimeout(() => {
								uni.pageScrollTo({
									scrollTop: 9999999999,
									duration: 0,
								});
							}, 100);
						}
					}
					break;
				}
			}

			
			uni.setStorageSync(
				user.id + "#" + data.body.chatId + "_CHAT_MESSAGE",
				JSON.stringify(arrs)
			);

			if (
				rootState.chat.curChatEntity &&
				rootState.chat.curChatEntity.id == data.body.chatId
			) {
				commit("chat/setCurChatMsgList", arrs, {
					root: true
				});
			}
		}
	},
	groupMemberRemove({
		commit,
		rootState
	}, payload) {
		let data = payload;
		let list = rootState.chat.arList.filter((item) => {
			if (item.id == data.body) {
				return false;
			}
			return true;
		});
		commit("chat/setArList", list, {
			root: true
		});

		let list_1 = rootState.user.groupList.filter((item) => {
			if (item.id == data.body) {
				return false;
			}
			return true;
		});
		commit("chat/setGroupList", list_1, {
			root: true
		});
	},
	arUpdate({
		commit,
		rootState
	}, payload) {
		let data = payload
		console.log("data", data)
		let user = uni.getStorageSync("USER");
		if (rootState.chat.arList.length > 0) {
			let lastContent = "";
			let list1 = []; //没有置顶的
			let list2 = []; //置顶的
			let tempItem;
			let list = rootState.chat.arList.filter((item) => {
				if (item.id == data.body[0].id) {
					tempItem = item;
					tempItem.img = data.body[0].img;
					tempItem.title = data.body[0].title;
					tempItem.createDate = data.body[0].createDate;
					tempItem.createDateTime = data.body[0].createDateTime;
					tempItem.subname = data.body[0].subname;
					let s = uni.getStorageSync(item.id + "_NOTE");
					if (s && s != "") {
						tempItem.title = s;
					}

					let str = uni.getStorageSync(
						user.id + "#" + item.id + "_CHAT_MESSAGE_UNREAD"
					);
					if (null != str && str != "") {
						tempItem.unread = parseInt(str);
					} else {
						tempItem.unread = 0;
					}
					return false;
				}
				return true;
			});
			if (!tempItem) {
				tempItem = data.body[0];
			}
			list.push(tempItem);
			list.forEach((item) => {
				//if(item) {
				let zhiding = uni.getStorageSync(item.id + "_zhiding");
				if (zhiding) {
					item.top = 0;
					list2.push(item);
				} else {
					list1.push(item);
				}
				//}
			});
			list1.sort(function(a, b) {
				return b.createDateTime - a.createDateTime;
			});
			list2.sort(function(a, b) {
				return b.createDateTime - a.createDateTime;
			});
			commit("chat/setArList", list2.concat(list1), {
				root: true
			});
		} else {
			data.body.forEach((item) => {
				let zhiding = uni.getStorageSync(item.id + "_zhiding");
				if (zhiding) {
					item.top = 0;
				}
			});
			data.body.sort(function(a, b) {
				//除了top.如果TOP相等就按时间排
				if (a.top == b.top) {
					return b.createDateTime - a.createDateTime;
				} else {
					return a.top - b.top;
				}
			});
			commit("chat/setArList", data.body, {
				root: true
			});
		}
	},
	addRoom({
		commit,
		rootState
	}) {
		//群成员申请
		if (rootState.user.unDoFriendAddCount > 0) {
			commit(
				"user/setUnDoRoomAddCount",
				rootState.user.unDoRoomAddCount + 1, {
					root: true
				}
			);
		} else {
			commit("user/setUnDoRoomAddCount", 1, {
				root: true
			});
		}
	},
	addFriend({
		commit,
		rootState
	}) {
		//FRIENDSADD好友添加处理
		if (rootState.user.unDoFriendAddCount > 0) {
			commit(
				"user/setUnDoFriendAddCount",
				rootState.user.unDoFriendAddCount + 1, {
					root: true
				}
			);
		} else {
			commit("user/setUnDoFriendAddCount", 1, {
				root: true
			});
		}
	},
	updateAddressBook({
		commit
	}) {
		friendList().then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setFriendList", res_data.body);
			}
		})
	},
	friendOffline({
		commit,
		rootState
	}, payload) {
		let data = payload;
		let list = rootState.chat.arList;
		list.forEach((item) => {
			if (item.id == data.body) {
				item.online = 0;
			}
		});
		commit("chat/setArList", list, {
			root: true
		});
		if (
			rootState.chat.curChatEntity &&
			rootState.chat.curChatEntity.id == data.body
		) {
			rootState.chat.curChatEntity.online = 0;
			commit("chat/setCurChatEntity", rootState.chat.curChatEntity, {
				root: true
			});
		}
	},
	friendOnline({
		commit,
		rootState
	}, payload) {
		let data = payload;
		let list = rootState.chat.arList;
		list.forEach((item) => {
			if (item.id == data.body) {
				item.online = 1;
			}
		});
		commit("chat/setArList", list, {
			root: true
		});
		if (
			rootState.chat.curChatEntity &&
			rootState.chat.curChatEntity.id == data.body
		) {
			rootState.chat.curChatEntity.online = 1;
			commit("chat/setCurChatEntity", rootState.chat.curChatEntity, {
				root: true
			});
		}
	},
	chatMsgReaded({
		state,
		commit,
		dispatch,
		rootState
	}, payload) {
		let user = uni.getStorageSync("USER");
		let data = payload;
		let str = uni.getStorageSync(
			user.id + "#" + data.body + "_CHAT_MESSAGE"
		);
		if (str && str != "") {
			var arrs = JSON.parse(str);
			let narrs = [];
			for (let i = arrs.length - 1; i >= 0; i--) {
				if (arrs[i].bean) {
					if (arrs[i].bean.read == 0) {
						arrs[i].bean.read = 1;
					} else {
						break;
					}
				}
			}
			uni.setStorageSync(
				user.id + "#" + data.body + "_CHAT_MESSAGE",
				JSON.stringify(arrs)
			);
		}

		if (rootState.chat.chatMessageMap.has(user.id + "#" + data.body)) {
			let list = rootState.chat.chatMessageMap.get(
				user.id + "#" + data.body
			);
			for (let i = list.length - 1; i >= 0; i--) {
				if (list[i].bean) {
					if (list[i].bean.read == 0) {
						list[i].bean.read = 1;
					} else {
						break;
					}
				}
			}
		}
		if (
			rootState.chat.curChatEntity &&
			data.body == rootState.chat.curChatEntity.id
		) {
			let list = rootState.chat.curChatMsgList;
			for (let i = list.length - 1; i >= 0; i--) {
				if (list[i].bean == undefined) continue;
				if (list[i].bean.read == 0) {
					list[i].bean.read = 1;
				} else {
					break;
				}
			}
			commit("chat/setCurChatMsgList", list, {
				root: true
			});
		}
	},
	at({
		state,
		commit,
		dispatch,
		rootState
	}, payload) {
		let data = payload;
		//@群成员
		let arrs = data.body.split("#");
		let fromuid = arrs[0];
		let chatId = arrs[1];
		let touid = arrs[2];
		let msgUuid = arrs[3];
		let fromName = arrs[4];

		let v = {
			fromuid: fromuid,
			chatId: chatId,
			touid: touid,
			msgUuid: msgUuid,
			fromName: fromName,
		};

		rootState.chat.arList.forEach((item) => {
			if (item.id == chatId) {
				if (
					rootState.chat.curChatEntity &&
					v.chatId == rootState.chat.curChatEntity.id
				) {
					let list = rootState.chat.curChatAiteToMyList;
					list.push(v);

					let s = ""; //用于临时使用
					list = list.filter((item) => {
						if (s.indexOf(item.fromuid) < 0) {
							s += item.fromuid + "#";
							return true;
						}
						return false;
					});
					commit("chat/setCurChatAiteToMyList", list, {
						root: true
					});
				} else {
					let list = [];
					let str = uni.getStorageSync(chatId + "#AITE_LIST");
					if (str && str != "") {
						list = JSON.parse(str);
					}
					list.push(v);
					uni.setStorageSync(chatId + "#AITE_LIST", JSON.stringify(list));
					item.aiteCount = item.aiteCount + 1;
					uni.setStorageSync(chatId + "#AITE_COUNT", item.aiteCount);
				}
			}
		});
	},
	clearChatMsg({
		state,
		commit,
		dispatch,
		rootState
	}, payload) {
		let data = payload
		let user = uni.getStorageSync("USER");
		rootState.chat.chatMessageMap.delete(user.id + "#" + data.body);
		uni.removeStorageSync(user.id + "#" + data.body + "_CHAT_MESSAGE");
		if (
			rootState.chat.curChatEntity &&
			rootState.chat.curChatEntity.id == data.body
		) {
			commit("chat/setCurChatMsgList", [], {
				root: true
			});
		}
		uni.removeStorageSync(
			user.id + "#" + data.body + "_CHAT_MESSAGE_LASTCONTENT"
		);
		uni.removeStorageSync(
			user.id + "#" + data.body + "_CHAT_MESSAGE_UNREAD"
		);
	},
	clearMessageRecord({
		state,
		commit,
		dispatch,
		rootState
	}, payload) {
		let user = uni.getStorageSync("USER");
		let arrs = payload.body.split("#");
		arrs.forEach((chat_id) => {
			if (chat_id && chat_id != "") {
				rootState.chat.chatMessageMap.delete(user.id + "#" + chat_id);
				uni.removeStorageSync(user.id + "#" + chat_id + "_CHAT_MESSAGE");
				if (
					rootState.chat.curChatEntity &&
					rootState.chat.curChatEntity.id == chat_id
				) {
					commit("chat/setCurChatMsgList", [], {
						root: true
					});
				}
				uni.removeStorageSync(
					user.id + "#" + chat_id + "_CHAT_MESSAGE_LASTCONTENT"
				);
				uni.removeStorageSync(
					user.id + "#" + chat_id + "_CHAT_MESSAGE_UNREAD"
				);
			}
		});

		let list = rootState.chat.arList;
		list.forEach((item) => {
			if (payload.body.indexOf(item.id) >= 0) {
				item.content = "";
				item.unread = 0;
			}
		});
		commit("chat/setArList", list, {
			root: true
		});
	},
	sendChatMessage({
		dispatch,
		commit
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.USER_CHAT_SEND_TXT
		})
	},
	sendGroupChatMessage({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.GROUP_CHAT_SEND_TXT
		})
	},
	sendShowInputing({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.SHOW_INPUT_ING
		})
	},
	sendHideInputing({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.HIDE_INPUT_ING
		})
	},
	sendVoiceMessage({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.USER_CHAT_SEND_VOICE
		})
	},
	sendGroupVoiceMessage({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.GROUP_CHAT_SEND_VOICE
		})
	},
	sendChatMessageUndo({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.CHAT_MSG_UNDO
		})
	},
	sendChatMessageReaded({
		dispatch
	}, payload) {
		dispatch("WEBSOCKET_SEND", {
			body: payload,
			CMD: MessageType.CHAT_MSG_READ_ED
		})
	},

	WEBSOCKET_SEND({
		commit,
		dispatch,
		state
	}, p) {
		let _this = this;
		if (!state.socketTask || !state.isOpenSocket) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: "通讯服务器已断开!"
			});
			return
		};
		Log.d(TAG, "发送消息：", p);
		if (!p.CMD) return
		let cmd = p.CMD;
		state.socketTask.send({
			data: JSON.stringify(p),
			async success() {
				Log.d(TAG, "发送成功:" + p.CMD);
			},
			async fail() {
				state.is_open_socket = false;
				Log.d(TAG, "发送失败：", p.CMD);
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "消息发送失败!"
				});
				if (
					cmd == MessageType.USER_CHAT_SEND_TXT ||
					cmd == MessageType.USER_CHAT_SEND_VOICE ||
					cmd == MessageType.GROUP_CHAT_SEND_TXT ||
					cmd == MessageType.GROUP_CHAT_SEND_VOICE ||
					cmd == MessageType.CHAT_SEND_CARD
				) {
					let WAIT_SEND_MSG_LIST = [];
					let WAIT_SEND_MSG = uni.getStorageSync("WAIT_SEND_MSG");
					if (WAIT_SEND_MSG && WAIT_SEND_MSG != "") {
						WAIT_SEND_MSG_LIST = JSON.parse(WAIT_SEND_MSG);
					}
					WAIT_SEND_MSG_LIST.push(p);
					uni.setStorageSync(
						"WAIT_SEND_MSG",
						JSON.stringify(WAIT_SEND_MSG_LIST)
					);
					commit("chat/setWAIT_SEND_MSG", state.WAIT_SEND_MSG + p, {
						root: true,
					});
				}
				// 在使用WebSocket的时候，如果网络突然断开，WebSocketd是不会触发任何事件的，所以前端程序无法得知当前链接是否断开。
				//但是这个时候使用WebSocket.send方法的时候，浏览器会发现消息发不出去，隔一段时间之后(貌似每个浏览器隔的时间不相同)，会触发onclose函数。
				//利用这点，我们可以在send不出消息并触发onclose之后，进行重连
				state.socketTask.onClose(); //如果发送失败。则被认为连线中断了
				dispatch("WEBSOCKET_INIT");
			},
		});
	},
};