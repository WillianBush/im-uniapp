import Log from "../../../common/Log";
let TAG = "CHAT-ACTION";
import {
	listPage,
	removeRecord,
	isRoomMember,
	isMyFri,
	searchList,
	getChatCfg,
	loadTalkUserById,
	saveOrUpdate,
	uploadVoice,
	collect,
	getRoomCfg,
	transferGroup,
	dissolve,
	logoutRoom,
	uStopSpeak,
	uCnfSet
} from "../../../common/api";
import {
	SocketType
} from "../../../const/SocketType";
import {
	dateFormat,
	uuid
} from "../../../common/utils";
import {
	MessageType
} from "../../../const/MessageType";

export default {
	refreshChatList({
		dispatch
	}) {
		dispatch("listPageAction");
	},
	listPageAction({
		commit,
		state
	}, payload) {
		let params = {
			pageSize: 50,
			pageNum: 1,
		};
		if (payload) {
			params.pageSize = payload.pageSize;
			params.pageNum = payload.pageNum;
		}
		let user = uni.getStorageSync("USER");

		return new Promise((resolve, reject) => {
			listPage(params)
				.then((res_1) => {
					let res_data_1 = eval(res_1.data);
					if (res_data_1.code == 200) {
						let unreadSum = 0;
						res_data_1.body.records.forEach((item) => {
							let s = uni.getStorageSync(item.id + "_NOTE");
							if (s && s != "") {
								item.title = s;
							}
							let last_txt = uni.getStorageSync(
								user.id + "#" + item.id + "_CHAT_MESSAGE_LASTCONTENT"
							);
							if (last_txt.indexOf("<img") >= 0) {
								item.content = "[图片]";
							} else if (last_txt.indexOf("upload/chat/voice") >= 0) {
								item.content = "[语音]";
							} else if (last_txt.indexOf("upload/chat/video") >= 0) {
								item.content = "[视频]";
							} else {
								item.content = last_txt;
							}

							let unRead = uni.getStorageSync(
								user.id + "#" + item.id + "_CHAT_MESSAGE_UNREAD"
							);
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
						});
						commit("setArList", list);
						commit("setUnReadMsgSum", unreadSum);
						resolve(res_data_1);
					} else if (res_data_1.code == 502) {
						uni.navigateTo({
							url: "/pages/empty/empty",
						});

						reject(res_data_1);
					} else {
						uni.showToast({
							icon: "none",
							title: "获取列表失败",
						});
						reject(res_data_1);
					}
				})
				.catch((error) => {
					uni.showToast({
						icon: "none",
						title: "获取列表失败",
					});
					Log.d(TAG, "listPage", error);
					reject(error);
				});
		});
	},
	// 扫码
	scanCode({
		rootState
	}) {
		uni.scanCode({
			fail: function(error) {
				uni.showToast({
					icon: "none",
					title: "扫码失败",
				});
			},
			success: function(res) {
				//console.log('条码类型：' + res.scanType);
				if (res.result.indexOf("#group#") == 0) {
					let roomid = res.result.split("#")[2];
					isRoomMember({
						roomid: roomid,
					}).then((res) => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							if (res_data.msg == "1") {
								uni.navigateTo({
									url: "/pages/chat/group/index?toid=" + roomid,
								});
							} else {
								uni.navigateTo({
									url: "/pages/addressBook/group/group_detail?id=" +
										roomid,
								});
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res_data.msg,
							});
						}
					});
				} else if (res.result.indexOf("#member#") == 0) {
					let member_id = res.result.split("#")[2];
					//如果是自己的二维码
					if (member_id == rootState.user.id) {
						uni.navigateTo({
							url: "/pages/index/index",
						});
						return;
					}

					isMyFri({
						uid: member_id,
					}).then((res) => {
						console.log(res.data);
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							if (res_data.msg == "1") {
								uni.navigateTo({
									url: "/pages/chat/user/index?toid=" + member_id,
								});
							} else {
								uni.navigateTo({
									url: "/pages/chat/user_detail?id=" + member_id,
								});
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res_data.msg,
							});
						}
					});
				} else if (res.result.indexOf("http") == 0) {
					uni.navigateTo({
						url: "/pages/faxian/site/site?url=" + encodeURIComponent(res.result),
					});
				} else {
					uni.navigateTo({
						url: "/pages/faxian/txtContent/txtContent?txt=" + res.result,
					});
				}
			},
		});
	},
	// 取消置顶操作
	cancelZhidingItem({
		commit,
		state
	}, payload) {
		let item = payload;
		uni.setStorageSync(item.id + "_zhiding", false);
		let list1 = []; //没有置顶的
		let list2 = []; //置顶的

		state.arList.forEach((item1) => {
			if (item.arid == item1.arid) {
				item1.top = 50;
			}

			let zhiding = uni.getStorageSync(item1.id + "_zhiding");
			if (zhiding) {
				item.top = 0;
				list2.push(item1);
			} else {
				list1.push(item1);
			}
		});

		list1.sort(function(a, b) {
			return b.createDateTime - a.createDateTime;
		});
		list2.sort(function(a, b) {
			return b.createDateTime - a.createDateTime;
		});
		commit("setArList", list2.concat(list1));
	},
	zhidingItem({
		state,
		commit
	}, payload) {
		uni.setStorageSync(item.id + "_zhiding", true);
		let list1 = []; //没有置顶的
		let list2 = []; //置顶的
		state.arList.forEach((item1) => {
			if (item.arid == item1.arid) {
				item1.top = 0;
			}

			let zhiding = uni.getStorageSync(item1.id + "_zhiding");
			if (zhiding) {
				item.top = 0;
				list2.push(item1);
			} else {
				list1.push(item1);
			}
		});

		list1.sort(function(a, b) {
			return b.createDateTime - a.createDateTime;
		});
		list2.sort(function(a, b) {
			return b.createDateTime - a.createDateTime;
		});
		commit("setArList", list2.concat(list1));
	},
	removeItem({
		commit,
		state
	}, payload) {
		removeRecord({
			id: payload,
		}).then((res) => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				let list = state.arList.filter((item1) => {
					if (item.arid == item1.arid) {
						return false;
					}
					return true;
				});
				commit("setArList", list);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	searchMsgListAction({
		commit
	}, payload) {
		searchList({
			nickname: payload,
		}).then((res) => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setArListShow", res_data.body);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	getChatCfgAction({
		commit
	}) {
		getChatCfg().then((res) => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setChatCfg", res_data.body);
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	loadTalkUserAction({
		commit,
		rootState
	}, payload) {
		let user = uni.getStorageSync("USER");
		return new Promise((resolve, reject) => {
			loadTalkUserById({
				id: payload.toid,
			}).then((res) => {
				let res_data = eval(res.data);
				let unRead = uni.getStorageSync(
					user.id + "#" + payload.toid + "_CHAT_MESSAGE_UNREAD"
				);
				if (unRead && unRead != "") {
					uni.removeStorageSync(
						user.id + "#" + payload.toid + "_CHAT_MESSAGE_UNREAD"
					);
					commit(
						"user/setUnReadMsgSum",
						rootState.user.unReadMsgSum - parseInt(unRead), {
							root: true,
						}
					);
				}
				if (res_data.code == 200) {
					commit("setCurChatEntity", res_data.body);
					resolve(res_data.body);
				} else {
					reject(res_data);
				}
			});
		});
	},
	saveOrUpdateAction({
		commit
	}, payload) {
		saveOrUpdate({
			type: 2,
			eid: payload,
		}).then((res) => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				//更新消息列表
				// let list = _this.$store.state.ar_list.filter(item=>{
				// 	if(item.id==res_data.body.id) return false;
				// })
				// list.splice(0,0,res_data.body);
				// _this.$store.commit("setAr_list",list);
			} else {
				uni.showModal({
					title: "信息提示",
					content: res_data.msg,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1,
							});
						}
					},
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		});
	},
	chooseVideoAction({
		commit
	}) {
		return new Promise((resolve, reject) => {
			uni.chooseVideo({
				sourceType: ["camera"],
				success: (res) => {
					commit("setChatMyLoadding", true);
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 9999999999,
							duration: 0,
						});
					}, 100);
					resolve(res);
				},
				fail: (error) => {
					reject(error);
				},
			});
		});
	},
	chooseImageAction({
		commit
	}) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ["album", "camera"], //从相册选择
				success: (res) => {
					commit("setChatMyLoadding", true);
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 9999999999,
							duration: 0,
						});
					}, 100);
					resolve(res);
				},
				fail: (error) => {
					reject(error);
				},
			});
		});
	},

	async uploadVideoAction({
		commit,
		dispatch,
		rootState
	}, payload) {
		return new Promise(async (resolve, rejcet) => {
			let uploadRes = await dispatch("chooseVideoAction");
			if (!uploadRes.tempFilePath) {
				uni.showToast({
					title: "视频上传失败",
					duration: 2000,
				});
				reject(false);
			}
			let token = uni.getStorageSync("token");
			uni.uploadFile({
				// 需要上传的地址
				url: rootState.app.reqUrl + "/user/file/uploadVideo",
				header: {
					["member-token"]: token,
				},
				// filePath  需要上传的文件
				filePath: uploadRes.tempFilePath,
				name: "file",
				success(res1) {
					let json = eval("(" + res1.data + ")");
					// 显示上传信息
					if (json.code == 200) {
						let v = {
							txt: json.msg,
							fromUid: rootState.user.user.id,
							chatType: '2'
						}
						let cmd = "socket/sendChatMessage"
						if (payload.toGroupid) {
							v.toGroupid = payload.toGroupid
							v.chatType = '1'
							cmd = "socket/sendGroupChatMessage"
						} else {
							v.toUid = payload.toUid
						}
						dispatch(cmd, v, {
							root: true
						});
						//#ifdef APP-PLUS
						v.psr = "video";
						v.simple_content = "[视频]";
						dispatch("sendBaseDaoAction", v);
						//#endif
						resolve(true)
					} else {
						rejcet(false)
					}
				},
				fail(error) {
					rejcet(error);
				}
			});
		})
	},
	uploadImageAction({
		commit,
		dispatch,
		rootState
	}, payload) {
		return new Promise(async (resolve, reject) => {
			let uploadRes = await dispatch("chooseImageAction");
			if (!uploadRes.tempFilePath) {
				uni.showToast({
					title: "图片上传失败",
					duration: 2000,
				});
				reject(false);
			}
			let arrs = uploadRes.tempFilePaths;
			let token = uni.getStorageSync("token");

			arrs.forEach((item) => {
				var uper = uni.uploadFile({
					// 需要上传的地址
					url: rootState.app.reqUrl + "/user/file/upload",
					header: {
						["member-token"]: token,
					},
					filePath: item,
					name: "file",
					success(res1) {
						let json = eval("(" + res1.data + ")");
						// 显示上传信息
						if (json.code == 200) {
							let v = {
								txt: json.msg,
								fromUid: rootState.user.user.id,
								chatType: '2'
							}
							let cmd = "socket/sendChatMessage"
							if (payload.toGroupid) {
								v.toGroupid = payload.toGroupid
								v.chatType = '1'
								cmd = "socket/sendGroupChatMessage"
							} else {
								v.toUid = payload.toUid
							}
							dispatch(cmd, v, {
								root: true
							});
							//#ifdef APP-PLUS
							v.psr = "uparse";
							v.simple_content = "[图片]";
							dispatch("sendBaseDaoAction", v);
							//#endif
							setTimeout(() => {
								resolve(true)
							}, 5 * 1000)
						} else {
							reject(json)
						}

					},
					fail(error) {
						reject(error)
					}
				});
			});
		})
	},
	uploadVoiceAction({
		commit
	}, payload) {
		uploadVoice({
			base64: payload.img,
		}).then((res) => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				let json = eval(res.data);
				// 显示上传信息
				if (json.code == 200) {
					dispatch("socket/sendVoiceMessage", {
						txt: json.msg,
						toUid: payload.toid,
						fromUid: rootState.user.user.id,
						sub_txt: timeStr,
					}, {
						root: true
					});
					//#ifdef APP-PLUS
					dispatch("sendBaseDaoAction", v);
					//#endif
				}
			}
		});
	},
	sendBaseDaoAction({
		commit,
		dispatch,
		state,
		rootState
	}, payload) {
		let v = payload;
		let user = uni.getStorageSync("USER");
		v.fromHeadpic = user.headpic;
		let date = new Date();
		v.date = dateFormat("Y/m/d H:M", date);
		v.fromName = user.nickName;
		v.dateTime = date.getTime();
		v.read = 0;
		v.oldTxt = v.txt;
		v.simple_content = v.txt;
		//去除视频上传和图片上传 纯文件内容才检测URL
		if (v.txt.indexOf("/chat_video") < 0 && v.txt.indexOf("/chat_img") < 0) {
			let hasUrl = false;
			let httpReg = new RegExp(
				"(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?",
				"gi");
			let formatTxtContent = v.txt.replace(httpReg, function(httpText) {
				hasUrl = true;
				return '<a style="color: #3F92F8;" href="' + httpText + '">' + httpText + '</a>';
			});
			if (hasUrl) {
				v.txt = formatTxtContent;
				v.psr = "uparse";
			}
		}
		let msgbean = {
			chatType: v.chatType,
			chatId: v.toUid ? v.toUid : v.toGroupid,
			messageType: "USER_TXT",
			bean: v,
		};
		let list = [msgbean];
		let str = uni.getStorageSync(
			user.id + "#" + msgbean.chatId + "_CHAT_MESSAGE"
		);
		if (str && str != "") {
			var jsonObj = JSON.parse(str);
			list = jsonObj.concat(list);
			if (list.length > 30) {
				list.splice(list.length - 30, list.length);
			}
		}
		uni.setStorageSync(
			user.id + "#" + msgbean.chatId + "_CHAT_MESSAGE",
			JSON.stringify(list)
		);
		
		uni.setStorageSync(
			user.id + "#" + msgbean.chatId + "_CHAT_MESSAGE_LASTCONTENT",
			list[list.length - 1].bean.simple_content
		);
		commit("setCurChatMsgList", list);
		commit("setChatMyLoadding", false);
	},
	transMessageAction({
		dispatch,
		commit,
		state,
		rootState
	}, payload) {
		let ids = payload;
		let user = uni.getStorageSync("USER");
		ids.forEach((id) => {
			state.arList.forEach((item) => {
				if (id == item.id) {
					let v = {};
					if (state.temp.content.indexOf("[名片USERCARD]#") == 0) {
						let ss = state.temp.content.split("#");
						v = {
							muuid: ss[4],
							fromUid: user.id,
						};
						if (item.typeid == "1") {
							v.toGroupid = id;
						} else {
							v.toUid = id;
						}
						dispatch(
							"socket/" + SocketType.WEBSOCKET_SEND, {
								body: v,
								CMD: MessageType.CHAT_SEND_CARD,
							}, {
								root: true,
							}
						);
					} else {
						v = {
							txt: state.temp.content,
							fromUid: user.id,
							uuid: uuid(),
						};
						let cmd = MessageType.USER_CHAT_SEND_TXT
						if (item.typeid == "1") {
							v.toGroupid = id;
							cmd = MessageType.GROUP_CHAT_SEND_TXT
						} else {
							v.toUid = id;
						}
						dispatch(
							"socket/" + SocketType.WEBSOCKET_SEND, {
								body: v,
								CMD: cmd,
							}, {
								root: true,
							}
						);
						dispatch("sendBaseDaoAction", v);
					}
					saveOrUpdate({
						type: item.typeid,
						eid: id,
					}).then((res) => {});
				}
			});
		});
	},
	collectAction({
		commit
	}, payload) {
		collect({
			jsonstr: payload
		}).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				uni.showToast({
					title: '收藏成功',
					icon: "success",
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	getRoomConfigAction({
		state
	}) {
		let user = uni.getStorageSync("USER")
		return new Promise((resolve, reject) => {
			getRoomCfg().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					let flag = false;
					//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
					if (res_data.body.lookGroupMemberDetailForRole == 0) {
						flag = true;
					} else if (res_data.body.lookGroupMemberDetailForRole == 1) {
						if (user.id == state.curChatEntity.owner_UUID) {
							flag = true;
						}
					} else if (res_data.body.lookGroupMemberDetailForRole == 2) {
						if (user.id == state.curChatEntity.owner_UUID ||
							state.curChatEntity.memberMgr_ids.indexOf(user.id) >= 0) {
							flag = true;
						}
					}
				}
				resolve(flag)
			}).catch(error => {
				reject(error)
			})
		})
	},
	transferGroupAction({
		state
	}, payload) {
		transferGroup(payload).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				uni.showToast({
					icon: 'success',
					title: "转让成功"
				});
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/index/index"
					})
				}, 1500)

			} else {
				uni.showToast({
					icon: "none",
					title: res_data.msg,
					duration: 2000
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	dissolveGroupAction({
		state
	}, payload) {
		dissolve(payload).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				uni.showToast({
					icon: 'success',
					title: "解散成功"
				});
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/index/index"
					})
				}, 1500)

			} else {
				uni.showToast({
					icon: "none",
					title: res_data.msg,
					duration: 2000
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	logoutGroupAction({
		state,
		dispatch
	}, payload) {
		logoutRoom(payload).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				uni.showToast({
					icon: 'success',
					title: "已成功退出此群组"
				});
				dispatch("refreshChatList");
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/index/index"
					})
				}, 1500);
			} else {
				uni.showToast({
					icon: "none",
					title: res_data.msg,
					duration: 2000
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	uStopSpeakAction({
		state,
		commit
	}, payload) {
		uStopSpeak(payload).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				commit("setStopSpeak", stopSpeak)
			} else {
				uni.showToast({
					title: res_data.msg,
					duration: 2000
				});
			}
		}).catch(error => {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: error.msg ? error.msg : "服务器异常!"
			});
		})
	},
	uCnfSetAction({
		state,
		commit
	}, payload) {
		uCnfSet(payload).then(res => {
			let res_data = eval(res.data);
			if (res_data.code == 200) {
				if (payload.yaoqingAble) {
					commit("setYaoqingAble", 1)
				} else {
					commit("setYaoqingAuditAble", 1)
				}
			} else {
				uni.showToast({
					title: res_data.msg,
					duration: 2000
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
};