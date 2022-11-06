import Vue from 'vue'
import Vuex from 'vuex'
import store from "../store"//使用vuex对状态进行管理
Vue.use(Vuex);
let wsOpenDo = true;
let heartCheck;
export default new Vuex.Store({  
	state: { 
		socketTask: null, 
		eventlist: [],
		is_open_socket:false,
		continueCloseCount:0,//连续失败数量
		lock:false, 
	},
	mutations: { 
		WEBSOCKET_INIT(state) {
			var _this = this; 
			if(state.is_open_socket) return;
			if(state.lock) return;
			state.lock = true;
			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
			if(state.socketTask) {
				if(heartCheck) {
					heartCheck.reset();
					heartCheck = null;
				}
				
				state.socketTask.close();
			}
			var i = Math.floor((Math.random() * store.state.req_url.length));
			state.socketTask = uni.connectSocket({
				url: store.state.socket_url[i]+"/chat/socket"+"?app_uuid="+store.state.app_uuid,
				// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
				success(data) {
					state.lock = false;	
					console.log("成功");
				},
				fail() {
					console.log("失败1");
				}
			});
			
			//心跳检测
			heartCheck = {
				st:null,
				si:null,
				start:function() {
					var self = this;
					this.si = setTimeout(()=>{
						let user = uni.getStorageSync("USER");
						if(user) {
							// _this.dispatch('WEBSOCKET_SEND', "{body:'"+user.id+"',CMD:'PING'}");
							 
							let v = user.id+"#"+Vue.prototype.$clientType+"#"+store.state.app_uuid;
							_this.dispatch('WEBSOCKET_SEND', "{body:'"+v+"',CMD:'PING'}");
							
						} else {
							
							_this.dispatch('WEBSOCKET_SEND', "{body:'',CMD:'PING'}");
							// uni.navigateTo({
							// 	url:"/pages/login/login"
							// });
							// return;
						}
						self.st = setTimeout(()=>{
							//_this.state.socketTask.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
							if(!state.is_open_socket) {
								heartCheck.reset();
								//if(store.state.appShow) {
									_this.dispatch('WEBSOCKET_INIT');
								//}
							}  
						}, 10000)
					},10000)  
				},  
				reset:function() {
					clearTimeout(this.st);
					clearTimeout(this.si);
					// this.st = null; 
					console.log("clearTimeout");
				}
			}
			
			
			//因为 websocket多次创建时 复用了底层的 tcp 链接，所以它认为自己并没有重新打开 socket，也因此不会触发 onSocketOpen 事件。
			//所以些初始化最好放到connectSocket
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			state.socketTask.onOpen((res) => {
				// if(!wsOpenDo) return;
				wsOpenDo = false;
				state.is_open_socket = true;
				state.continueCloseCount = 0;
				
				console.log("WebSocket连接正常打开中...！");
				
				let user = uni.getStorageSync("USER");
				if(user) {
					
					
					let v = {
						user_id:user.id,
						app_uuid:store.state.app_uuid,
					}
					v.client = Vue.prototype.$clientType;
					v.user_id = v.user_id+"#"+v.client;
					_this.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
					
					
					let WAIT_SEND_MSG_LIST = [];
					let WAIT_SEND_MSG = uni.getStorageSync("WAIT_SEND_MSG");
					
					// Vue.prototype.$http.post("/socke/println",
					// 	{txt:"WAIT_SEND_MSG："+WAIT_SEND_MSG},
					// 	{header:{"x-access-uid":store.state.user.id}} 
					// ).then(res=>{})
					console.log("WAIT_SEND_MSG:"+WAIT_SEND_MSG);
					if(WAIT_SEND_MSG&&WAIT_SEND_MSG!="") {
						WAIT_SEND_MSG_LIST = JSON.parse(WAIT_SEND_MSG);
						WAIT_SEND_MSG_LIST.forEach(item=>{
							// Vue.prototype.$http.post("/socke/println",
							// 	{txt:"消息重新发送ing....."+item},
							// 	{header:{"x-access-uid":store.state.user.id}} 
							// ).then(res=>{})
							
							console.log("消息重新发送ing....."+item);
							_this.dispatch('WEBSOCKET_SEND', item);
						})
					}	
					uni.removeStorageSync("WAIT_SEND_MSG");
					store.commit("setWAIT_SEND_MSG",""); 
					
					
					
					// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
					// #ifdef APP-PLUS
					setTimeout(function(){
						const clientInfo = plus.push.getClientInfo()
						let pushUser = {
						  clientid: clientInfo.clientid,
						  appid: clientInfo.appid,
						  appkey: clientInfo.appkey,
						  userName: '用户名',
						  userRole: '用户角色',
						  uid:user.id
						}
						_this.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(pushUser)+"',CMD:'APP_PUSH_USER_INFO'}");
					},1000);
					// #endif
				}
				
				if(heartCheck) {
					heartCheck.start();
				}
					
				setTimeout(()=>{
					wsOpenDo = true;
				},2000)
			});
			
			state.socketTask.onClose((res) => {
				state.is_open_socket = false;
				state.continueCloseCount = state.continueCloseCount + 1;
				heartCheck.reset();
				console.log("WebSocket重新连接1！");
				_this.dispatch('WEBSOCKET_INIT');
			});
			
			state.socketTask.onError((res) => {
				state.is_open_socket = false;
				state.continueCloseCount = state.continueCloseCount + 1;
				heartCheck.reset();
				console.log("WebSocket重新连接2！");
				_this.dispatch('WEBSOCKET_INIT');
			});
			
			
			// state.socketTask.onError((res) => {
			// 	state.is_open_socket = false;
			// 	heartCheck.reset();
			// 	if(store.state.appShow) {
			// 		console.log("WebSocket重新连接2！");
			// 		//_this.dispatch('WEBSOCKET_INIT');	
			// 		let cur_si = setInterval(()=>{
			// 			if(!state.is_open_socket) {
			// 				console.log("1111");
			// 				state.socketTask = uni.connectSocket({
			// 					url: ws_url,
			// 					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
			// 					success(data) {
			// 						console.log("websocket连接成功");
			// 					},
			// 					fail() {
			// 						console.log("失败1");
			// 					}
			// 				});
			// 				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			// 				// state.socketTask.onOpen((res) => {
			// 				// 	console.log("WebSocket连接正常打开中...！");
			// 				// 	state.is_open_socket = true;
			// 				// 	let user = uni.getStorageSync("USER");
			// 				// 	if(user) {
			// 				// 		_this.dispatch('WEBSOCKET_SEND', "{body:'"+user.id+"',CMD:'PUTSESSION'}");
			// 				// 	}
			// 				// });
			// 			} else {
			// 				clearTimeout(cur_si);
			// 			}
			// 		},1000)
			// 	}
			// });
			     
			
			
			state.socketTask.onMessage((res_ws) => {
				console.log("33333333333333333");
				heartCheck.reset();
				heartCheck.start();
				let user = uni.getStorageSync("USER");
				let data = JSON.parse(res_ws.data);
				console.log(data.body);
				console.log(data.CMD);
				
				if(data.CMD=="LOGIN") {
					console.log("来登陆了------>");
					uni.redirectTo({
						url:"../login/login"
					})
				} else if(data.CMD=="CLEAR_CHAT_MSG_DATA_MGR") {
					
					let arrs = data.body.split("#");
					arrs.forEach(chat_id=>{
						if(chat_id&&chat_id!="") {
							store.state.chatMessageMap.delete(user.id+"#"+chat_id);
							uni.removeStorageSync(user.id+"#"+chat_id+'_CHAT_MESSAGE');
							if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==chat_id) {
								store.commit("setCur_chat_msg_list",[]);
							}	
							uni.removeStorageSync(user.id+"#"+chat_id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+chat_id+'_CHAT_MESSAGE_UNREAD');
						}
						
						
					});
					
					let list = store.state.ar_list;
					list.forEach(item=>{
						//if(item.id==chat_id) {
						if(data.body.indexOf(item.id)>=0) {	
							item.content = "";
							item.unread = 0;
						}
					})  
					store.commit("setAr_list",list);
					
					
					
				} else if(data.CMD=="CLEARCHATMSG") {	
					console.log(data.body);
					store.state.chatMessageMap.delete(user.id+"#"+data.body);
					uni.removeStorageSync(user.id+"#"+data.body+'_CHAT_MESSAGE');
					if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body) {
						store.commit("setCur_chat_msg_list",[]);
					}	
					uni.removeStorageSync(user.id+"#"+data.body+'_CHAT_MESSAGE_LASTCONTENT');
					uni.removeStorageSync(user.id+"#"+data.body+'_CHAT_MESSAGE_UNREAD');
				} else if(data.CMD=="AITE") {	
					//@群成员
					let arrs = data.body.split("#");
					let fromuid = arrs[0];
					let chatid = arrs[1];
					let touid = arrs[2];
					let msgUuid = arrs[3];
					let fromName = arrs[4];
					
					let v = {
						fromuid:fromuid,
						chatid:chatid,
						touid:touid,
						msgUuid:msgUuid,
						fromName:fromName,
					}
					
					
					store.state.ar_list.forEach(item=>{
						if(item.id == chatid) {
							if(store.state.cur_chat_entity&&v.chatid==store.state.cur_chat_entity.id) {
								let list = store.state.cur_chat_aiteToMyList;
								list.push(v);
								
								let s = "";//用于临时使用
								list = list.filter(item=>{
									if(s.indexOf(item.fromuid)<0) {
										s+=(item.fromuid+"#");
										return true;
									} 
									return false;
								});
								
								store.commit("setCur_chat_aiteToMyList",list); 
							} else {
								let list = [];
								let str = uni.getStorageSync(chatid+'#AITE_LIST');
								if(str&&str!="") {
									list = JSON.parse(str);
								}
								list.push(v);
								uni.setStorageSync(chatid+"#AITE_LIST",JSON.stringify(list));
								item.aiteCount = item.aiteCount + 1;
								uni.setStorageSync(chatid+"#AITE_COUNT",item.aiteCount);
							}
							
						}
					});
					
				} else if(data.CMD=="OTHER_LOGIN") {
					//别处冲线
					
					// uni.request({
					// 	method:"POST",
					// 	url:store.state.req_url + "/user/json/logout",
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			//uni.clearStorageSync();
					// 			store.commit("clearData");
					// 			uni.showModal({
					// 			    title: '提示',
					// 				showCancel:false,
					// 			    content: '你的帐号已在别处上线',
					// 			    success: function (res) {
					// 			        if (res.confirm) {
					// 						uni.removeStorageSync("USER");
					// 						uni.redirectTo({
					// 							url:"../login/login"
					// 						})
					// 			        }
					// 			    }
					// 			});
								
					// 		}
					// 	}
					// })
				} else if(data.CMD=="CHAT_MSG_READED") {
					console.log("CHAT_MSG_READED-CHAT_MSG_READED");
					console.log(data.body);
					let str = uni.getStorageSync(user.id+"#"+data.body+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].bean) {
								if(arrs[i].bean.read == 0) {
									arrs[i].bean.read = 1;
								} else {
									break;
								}
							}
							
						}	
						uni.setStorageSync(user.id+"#"+data.body+'_CHAT_MESSAGE',JSON.stringify(arrs));
					}
					
					if(store.state.chatMessageMap.has(user.id+"#"+data.body)) {
						let list = store.state.chatMessageMap.get(user.id+"#"+data.body);
						for(let i=list.length-1;i>=0;i--) {
							if(list[i].bean) {
								if(list[i].bean.read == 0) {
									list[i].bean.read = 1;
								} else {
									break;
								}
							}
							
						}
					}
					if(store.state.cur_chat_entity&&data.body==store.state.cur_chat_entity.id) {
						let list = store.state.cur_chat_msg_list;
						for(let i=list.length-1;i>=0;i--) {
							if(list[i].bean==undefined) continue;
							if(list[i].bean.read == 0) {
								list[i].bean.read = 1;
							} else {
								break;
							}
						}
						store.commit("setCur_chat_msg_list",list);
					} 
					
					
				} else if(data.CMD=="FRIEND_ONLINE") {	
					let list = store.state.ar_list;
					list.forEach(item=>{
						if(item.id==data.body) {
							item.online = 1;
						}
					})
					store.commit("setAr_list",list);
					if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body) {
						store.state.cur_chat_entity.online = 1;
						store.commit("setCur_chat_entity",store.state.cur_chat_entity); 
					}
					
					
				} else if(data.CMD=="FRIEND_OFFLINE") {	
					let list = store.state.ar_list;
					list.forEach(item=>{
						if(item.id==data.body) {
							item.online = 0;
						}
					})
					store.commit("setAr_list",list);
					
					if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body) {
						store.state.cur_chat_entity.online = 0;
						store.commit("setCur_chat_entity",store.state.cur_chat_entity); 
					}
				} else if(data.CMD=="SHOW_INPUT_ING") {	
					store.state.temp.input_ing = true;
				} else if(data.CMD=="HIDE_INPUT_ING") {		
					store.state.temp.input_ing = false;
				} else if(data.CMD=="LOGIN_USER_MODIFY_HEADPIC") {
					store.commit("updateUserHeadpic",data.body);
				} else if(data.CMD=="LOGIN_USER_MODIFY_NN") {
					store.commit("updateUsername",data.body);
				} else if(data.CMD=="CHAT_RED_BROADCAST_UPDATE") {	
					console.log("----------------------->111111111111");
					if(store.state.temp.bean&&store.state.temp.bean.redUUID==data.body.redUUID&&data.body.opener_ids.indexOf(store.state.user.id)<0&&data.body.status==1) {
						 console.log("----------------------->2222222222222222");
						store.state.temp.bean.descri1 = "手慢了，红包抢完了";
					 }
					console.log("----------------------->333333333333333");
					 let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					 if(str&&str!="") {
						 console.log("----------------------->444444444444");
					 	var arrs = JSON.parse(str);
					 	let narrs = [];
					 	for(let i=arrs.length-1;i>=0;i--) {
					 		if(arrs[i].type == "USER_RED"&&data.body.redUUID==arrs[i].bean.redUUID) {
								console.log("----------------------->444444444444_1");
					 			arrs[i].bean = data.body;
					 			break;
					 		}
					 	}	
					 	uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					 }
					 console.log("----------------------->55555555555555555");
					if(store.state.chatMessageMap.has(user.id+"#"+data.body.chatid)) {
						console.log("----------------------->666666666666666666666");
						 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.chatid);
						 try{
							 list.forEach(item=>{
								if(item.bean&&item.bean.redUUID&&item.bean.redUUID == data.body.redUUID) {
									console.log("----------------------->666666666666666666666_1");
									item.bean.status = data.body.status;
									item.bean.openedNumber = data.body.openedNumber;
									item.bean.openedMoney = data.body.openedMoney;
									throw Error();
								}
							 });
						 }catch(e){}
						 
					}
					console.log("----------------------->6666666666666666666");
					//表明正在打开中的
					if(store.state.temp.bean&&store.state.temp.bean.redUUID==data.body.redUUID) {
						console.log("----------------------->777777777777777777");
						store.state.temp.bean = data.body;
					}
					console.log("----------------------->8888888888888888");
					if(store.state.cur_chat_entity&&data.body.chatid==store.state.cur_chat_entity.id) {
						console.log("----------------------->99999999999999999");
						try{
							store.state.cur_chat_msg_list.forEach(item=>{
								if(item.bean&&item.bean.uuid&&item.bean.uuid == data.body.redUUID) {
									console.log(data.body.openedNumber+"更新了--》:"+data.body.status);
									item.bean.status = data.body.status;
									item.bean.openedNumber = data.body.openedNumber;
									item.bean.openedMoney = data.body.openedMoney;
									throw Error();
								}
							});
						}catch(e){}
						
					} 
					  
					  // str = uni.getStorageSync(user.id+'_RED_MUST_UPDATE_MAP');
					  // if(str&&str!="") {
					  // 	var arrs = JSON.parse(str);
					  // 	arrs[data.body.redUUID] = data.body;
					  // 	uni.setStorageSync(user.id+'_RED_MUST_UPDATE_MAP',JSON.stringify(arrs));
					  // } else {
					  // 	uni.setStorageSync(user.id+'_RED_MUST_UPDATE_MAP',JSON.stringify(data.body));
					  // }
					  
					 console.log("----------------------->10000000000");
					 let temp = data.body;
					 data.body = [temp];
					 //arUpdate(data);
					 console.log("----------------------->pppppppppppppppp");
				} else if(data.CMD=="CHAT_TRANSFER_FINISHED") {	 
					console.log("完成了");
					if(store.state.temp.bean&&store.state.temp.bean.utid&&store.state.temp.bean.utid==data.body.txt) {
						store.state.temp.bean.status = 1;
					} 
					
					
					let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].type == "USER_TRANSFER"&&data.body.txt==arrs[i].bean.utid) {
								arrs[i].bean.status = 1;
								break;
							}
						}	
						uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					}
					if(store.state.chatMessageMap.has(user.id+"#"+data.body.chatid)) {
						 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.chatid);
						 try {
							 list.forEach(item=>{
									if( item.type == "USER_TRANSFER"&& item.bean.utid == data.body.txt) {
										item.bean.status =1;
										throw Error();
									}
							 });
						 }catch(e){}	
						 
					}	 
					try {
						store.state.cur_chat_msg_list.forEach(item=>{
							if(item.type == "USER_TRANSFER"&& item.bean.utid == data.body.txt) {
								item.bean.status = 1;
								throw Error();
							}
						});
					}catch(e){}	
					
					
					str = uni.getStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						if(arrs[data.body.txt]) {
							arrs[data.body.txt].status = 1;
						}
						
					} 
				} else if(data.CMD=="CHAT_TRANSFER_EXPIRED") {
					console.log("过期了");
					uni.$emit("scrollTopFn");
					if(store.state.temp.bean&&store.state.temp.bean.utid&&store.state.temp.bean.utid==data.body.txt) {
						store.state.temp.bean.status = 2;
					}
					
					
					let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].type == "USER_TRANSFER"&&data.body.txt==arrs[i].bean.utid) {
								arrs[i].bean.status = 2;
								break;
							}
						}	
						uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					}
					if(store.state.chatMessageMap.has(user.id+"#"+data.body.chatid)) {
						 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.chatid);
						 try {
							 list.forEach(item=>{
									if( item.type == "USER_TRANSFER"&& item.bean.utid == data.body.txt) {
										item.bean.status = 2;
										throw Error();
									}
							 });
						 }catch(e){}	
						 
					}	 
					try {
						store.state.cur_chat_msg_list.forEach(item=>{
							if(item.type == "USER_TRANSFER"&& item.bean.utid == data.body.txt) {
								item.bean.status = 2;
								throw Error();
							}
						});
					}catch(e){}	
					
					
					str = uni.getStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						arrs[data.body.txt].status = 2;
					} 
					
					
					
				} else if(data.CMD=="CHAT_RED_EXPIRED") {
					console.log("过期了");
					uni.$emit("scrollTopFn");
					console.log("过期了");
					if(store.state.temp.bean&&store.state.temp.bean.redUUID&&store.state.temp.bean.redUUID==data.body.txt) {
						store.state.temp.bean.status = 2;
					}
					let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].type == "USER_RED"&&data.body.txt==arrs[i].bean.redUUID) {
								arrs[i].bean.status = 2;
								break;
							}
						}	
						uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					}
					if(store.state.chatMessageMap.has(user.id+"#"+data.body.chatid)) {
						 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.chatid);
						 try {
							 list.forEach(item=>{
									if( item.type == "USER_RED"&& item.bean.redUUID == data.body.txt) {
										item.bean.status = 2;
										throw Error();
									}
							 });
						 }catch(e){}	
						 
					}	 
					try {
						store.state.cur_chat_msg_list.forEach(item=>{
							if(item.type == "USER_RED"&& item.bean.redUUID == data.body.txt) {
								item.bean.status = 2;
								throw Error();
							}
						});
					}catch(e){}	
					
					
					
				} else if(data.CMD=="RED_DETAIL_LIST") {	 
					 store.state.temp.open_hongbao_list = data.body.details;
					 uni.$emit('show_red_detail');
				} else if(data.CMD=="TRANSFER_MUST_UPDATE_FOR_MEMBER") {
					
					for(let key in data.body) {
					   let chatid = "";
					   if(user.id==data.body[key].fromUid) {
						   chatid = data.body[key].toUid;
					   } else {
						   chatid = data.body[key].fromUid;
					   }
					   
					   let str = uni.getStorageSync(user.id+"#"+chatid+'_CHAT_MESSAGE');
					   if(str&&str!="") {
					   	var arrs = JSON.parse(str);
					   	for(let i=arrs.length-1;i>=0;i--) {
					   		if(arrs[i].type == "USER_TRANSFER"&&arrs[i].bean.utid==data.body[key].utid) {
					   			arrs[i].bean.status = data.body[key].status;
					   			break;
					   		}
					   	}	
					   	uni.setStorageSync(user.id+"#"+chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					   }
					   if(store.state.chatMessageMap.has(user.id+"#"+chatid)) {
					   	 let list = store.state.chatMessageMap.get(user.id+"#"+chatid);
					   	 try{
					   		 list.forEach(item=>{
					   			if(item.bean.utid == data.body[key].utid) {
					   				item.bean.status = data.body[key].status;
					   				throw Error();
					   			}
					   		 });
					   	 }catch(e){}
					   }
					}
					
					let str = uni.getStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						for(let key in data.body) {
						   // console.log("属性：" + key + ",值："+ data.body[key]);
						   arrs[key] = data.body[key];
						}
						uni.setStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP',JSON.stringify(arrs));
					} else {
						uni.setStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP',JSON.stringify(data.body));
					}	
					
				} else if(data.CMD=="RED_MUST_UPDATE_FOR_MEMBER") {
					
					let str = uni.getStorageSync(user.id+'_RED_MUST_UPDATE_MAP');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						for(let key in data.body) {
						   // console.log("属性：" + key + ",值："+ data.body[key]);
						   arrs[key] = data.body[key];
						}
						uni.setStorageSync(user.id+'_RED_MUST_UPDATE_MAP',JSON.stringify(arrs));
					} else {
						uni.setStorageSync(user.id+'_RED_MUST_UPDATE_MAP',JSON.stringify(data.body));
					}	
					
					// str = uni.getStorageSync(user.id+'_RED_MUST_UPDATE_MAP');
					// if(str&&str!="") {
					// 	var arrs = JSON.parse(str);
					// 	console.log("99999999999999999999999999");
					// 	console.log(arrs);
					// }	
					
				} else if(data.CMD=="CHAT_RED_OPEN_SUCCESS") {
					setTimeout(()=>{
						console.log("CHAT_RED_OPEN_SUCCESS");
						console.log(data.body.red);
						store.state.temp.open_hongbao_list = data.body.details;
						store.state.temp.bean = data.body.red;
						let str = uni.getStorageSync(user.id+"#"+data.body.red.chatid+'_CHAT_MESSAGE');
						if(str&&str!="") {
							var arrs = JSON.parse(str);
							for(let i=arrs.length-1;i>=0;i--) {
								if(arrs[i].type == "USER_RED"&&data.body.red.redUUID==arrs[i].bean.redUUID) {
									arrs[i].bean = data.body.red;
									break;
								}
							}	 
							uni.setStorageSync(user.id+"#"+data.body.red.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
						}
						console.log(user.id+"#"+data.body.red.chatid);
						if(store.state.chatMessageMap.has(user.id+"#"+data.body.red.chatid)) {
							console.log("进来了");
							 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.red.chatid);
							 try{
								 list.forEach(item=>{
									if(item.bean&&item.bean.redUUID&&item.bean.redUUID == data.body.red.redUUID) {
										console.log("进来了1");
										item.bean = data.body.red;
										throw Error();
									}
								 });
							 }catch(e){}
							 
						}
						try{
							store.state.cur_chat_msg_list.forEach(item=>{
								if(item.bean&&item.bean.redUUID&&item.bean.redUUID == data.body.red.redUUID) {
									item.bean = data.body.red;
									throw Error();
								}
							});
						}catch(e){}	
						
						
						
						uni.$emit('show_red_detail');
					},800)
					
					
				} else if(data.CMD=="GROUP_CHAT_RED_OPEN_END") {	
					store.state.temp.bean = data.body;
					let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].type == "USER_RED"&&data.body.uuid==arrs[i].bean.uuid) {
								arrs[i].bean = data.body;
								break;
							}
						}	
						uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
					}
					if(store.state.chatMessageMap.has(user.id+"#"+data.body.chatid)) {
						 let list = store.state.chatMessageMap.get(user.id+"#"+data.body.chatid);
						 try {
							 list.forEach(item=>{
									if(item.uuid&&item.uuid == data.body.uuid) {
										item.status = data.body.status;
										throw Error();
									}
							 });
						 }catch(e){}	
						 
					}	 
					try {
						store.state.cur_chat_msg_list.forEach(item=>{
							if(item.uuid&&item.uuid == data.body.uuid) {
								item.status = data.body.status;
								throw Error();
							}
						});
					}catch(e){}	
					
					 
					 //这个命令场景是。点击的时候。能打开。但是打开过程中。被其他玩家抢完了或过期
					 //myConstants.curScope.red = data.body;//更新当前打开红包的状态 
					 //myConstants.curScope.redMap[data.body.redUUID].status = myConstants.curScope.red.status;//更新此群红包MAP中某红包的某个属性,不要整个BEAN覆盖否则会失去引用无法达到更新目的
				} else if(data.CMD=="LOGIN_USER_STATUS_BAN") {

					// uni.request({
					// 	method:"POST",
					// 	url:store.state.req_url + "/user/json/logout",
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			uni.clearStorageSync();
					// 			store.commit("clearData");
					// 			uni.showToast({
					// 				icon:"none",
					// 			    title: '帐号已被冻结',
					// 			    duration: 2000
					// 			});
					// 			uni.redirectTo({
					// 				url:"../login/login"
					// 			})
					// 		}
					// 	}
					// })
				} else if(data.CMD=="LOGIN_USER_REMOVE") {
					
					// uni.request({
					// 	method:"POST",
					// 	url:store.state.req_url + "/user/json/logout",
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			uni.clearStorageSync();
					// 			store.commit("clearData");
					// 			uni.showToast({
					// 				icon:"none",
					// 			    title: '帐号已被删除',
					// 			    duration: 2000
					// 			});
					// 			uni.redirectTo({
					// 				url:"../login/login"
					// 			})
					// 		}
					// 	}
					// })
				} else if(data.CMD=="ERROR") {
					console.log("9999");
					setTimeout(()=>{
						uni.showToast({
							icon:"none",
						    title: data.body,
						    duration: 2000
						});
					},100)
					
					console.log("错误"+data.body);
				} else if(data.CMD=="UPDATE_ADDRESS_BOOK") {
					
					Vue.prototype.$http.post("/user/friend/list/v1",
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":Vue.prototype.$clientType
							}
						}
						
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {  
							store.commit("setFriend_list",res_data.body);
						}
					});
					
					
					// uni.request({
					// 	method:"POST",
					// 	url:store.state.req_url + "/user/friend/list/v1",
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			store.commit("setFriend_list",res_data.body);
					// 		}
					// 	}
					// })
				} else if(data.CMD=="FRIENDSADD") {
					 //FRIENDSADD好友添加处理
					 if(store.state.unDoFriendAddCount>0) {
						 store.commit("setUnDoFriendAddCount",store.state.unDoFriendAddCount+1);
					 } else {
						 store.commit("setUnDoFriendAddCount",1);
					 }
				} else if(data.CMD=="ROOMADD") {
					 //群成员申请
					 if(store.state.unDoFriendAddCount>0) {
						 store.commit("setUnDoRoomAddCount",store.state.unDoRoomAddCount+1);
					 } else {
						 store.commit("setUnDoRoomAddCount",1);
					 }
				} else if(data.CMD=="AR_INSERT" || data.CMD=="AR_UPDATE") {
					console.log("执行了_ar_update_start");
					arUpdate(data);
					console.log("执行了_ar_update_end");
				}   
				else if(data.CMD=="GROUP_MEMBER_REMOVE") {
					let list =store.state.ar_list.filter(item=>{
						if(item.id==data.body) {
							return false;
						}
						return true;
					})
					store.commit("setAr_list",list);
					
					let list_1 =store.state.group_list.filter(item=>{
						if(item.id==data.body) {
							return false;
						}
						return true;
					})
					store.commit("setGroup_list",list_1)
				}	
				// else if(data.CMD=="CHAT_SEND_RED_SUCCESS") {
					
				// }	
				else if(data.CMD=="CHAT_MSG_UNDO") {
					//console.log(data);
					console.log("撤回了");
					let str = uni.getStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE');
					if(str&&str!="") {
						var arrs = JSON.parse(str);
						let narrs = [];
							console.log(data.body);
						for(let i=arrs.length-1;i>=0;i--) {
							if(arrs[i].bean&&(arrs[i].bean.uuid == data.body.bean.txt)) {
								arrs[i] = {
									opt:"undo",
									opt_uid:data.body.bean.fromUid,
									name:data.body.bean.fromName,
								}
								if(i==arrs.length-1) {
									//如果是最后一个，则把最后last_content设置为撤消
									let last_content = "";
									for(let j=arrs.length-1;j>=0;j--) {
										if(arrs[j].bean&&arrs[j].bean.simple_content!="") {
											last_content = arrs[j].bean.simple_content;
											break;
										}
									}
									uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE_LASTCONTENT',last_content);
									try {
										store.state.ar_list.forEach(item=>{
											if(item.id==data.body.chatid) {
												item.content = last_content;
												throw Error();
											}
										})
									}catch(e){}	
									if(data.body.bean&&data.body.bean.fromUid!=store.state.user.id) {
									} else {
										setTimeout(()=>{
											uni.pageScrollTo({
												scrollTop: 9999999999,
												duration: 0
											});
										},100)
									}
								}
								break;
							}
						}
						
						
						
						
						if(arrs.length>100) {
						 	arrs.splice(0,arrs.length-100);
						}
						
						uni.setStorageSync(user.id+"#"+data.body.chatid+'_CHAT_MESSAGE',JSON.stringify(arrs));
						
						store.commit("updateChatMessageMap",{
							key:user.id+"#"+data.body.chatid,
							value:arrs
						});
						
						if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body.chatid) {
							store.commit("setCur_chat_msg_list",arrs);
						}
						
						
						
						
						
					}
					
					
					
											  
				}	
				else if(data.CMD=="USER_CHAT_MESSAGE" || data.CMD=="GROUP_CHAT_MESSAGE" || data.CMD=="CHAT_SEND_RED_SUCCESS"
							||data.CMD=="CHAT_SYS_TXT"||data.CMD=="CHAT_SEND_TRANSFER_SUCCESS") {
					console.log("返回了:"+new Date());
					console.log(data.body[0]);
					
						  
					if(data.body[0].bean) {
						console.log("data.body[0].bean.psr:"+data.body[0].bean.psr);
					}
					
					//if(data.body[0].bean.fromUid!=store.state.user.id) {
					
					//消息遗留检查【重发检查机制】
					// let tnmus = uni.getStorageSync(data.body[0].chatid+"_THE_NEW_MSG_UUIDS");
					// console.log("tnmus:"+tnmus);
					// if(null!=tnmus&&tnmus!="") {
					// 	if(tnmus.indexOf(data.body[0].bean.uuid)>=0) return;
					// 	console.log("添加信息了");
					// 	let arrs_tnmus = tnmus.split("#");
					// 	if(arrs_tnmus.length>=20) {
					// 		arrs_tnmus.splice(0,1);
					// 	}	
					// 	arrs_tnmus.push(data.body[0].bean.uuid);
					// 	let arrs_tnmus_str = arrs_tnmus.join("#");
					// 	console.log("arrs_tnmus_str:"+arrs_tnmus_str);
					// 	uni.setStorageSync(data.body[0].chatid+"_THE_NEW_MSG_UUIDS",arrs_tnmus_str);				
					// } else {
					// 	uni.setStorageSync(data.body[0].chatid+"_THE_NEW_MSG_UUIDS",data.body[0].bean.uuid)
					// } 
					
					
					//#ifndef H5 
					if(data.CMD=="USER_CHAT_MESSAGE" || data.CMD=="GROUP_CHAT_MESSAGE" || data.CMD=="CHAT_SEND_TRANSFER_SUCCESS" )	{
						if(!store.state.appShow) {
							setTimeout(()=>{
								let options = { cover: false, sound: 'system', title:data.body[0].bean.fromName};
								plus.push.createMessage(data.body[0].bean.simple_content, "" , options);
							},100)
						}
					}
					//#endif
					 
					// console.log("data.body[0].bean.fromUid:"+data.body[0].bean.fromUid);
					// console.log("data.body[0].bean.toUid:"+data.body[0].bean.toUid);
					// console.log("store.state.user.id:"+store.state.user.id);
					
					 
					
					// //用户间聊天，接收方也可以自动拉到下面
					// console.log(store.state.temp.chatVew);
					// if(store.state.cur_chat_entity&&store.state.temp.chatVew) {
					// 	let sp = store.state.temp.chatVew.getScrollPosition();
					// 	let sp_bottom = sp.scrollHeight - sp.scrollTop - store.state.temp.chatVew.$el.clientHeight;
					// 	console.log("sp_bottom:"+sp_bottom);
					// 	if(sp_bottom<300) {
					// 		console.log("来到这里了");
					// 		store.state.temp.chatVew.scrollTo(9999999999);
					// 	}
					// }
					
					uni.$emit("scrollTopFn");
					
					
					let darao = uni.getStorageSync(data.body[0].chatid+"_darao");
					console.log("darao:"+darao);
					if(data.body[0].bean.fromUid!=store.state.user.id) {
						console.log("11111111->"+data.act);
						if(!darao&&data.act=="none") {
							console.log("播放了1："+store.state.temp.msg_mp3_playtime);
							if(store.state.temp.msg_mp3_playtime==0||(new Date().getTime() - store.state.temp.msg_mp3_playtime)>1000) {
								// uni.showToast({
								//     icon: 'none',
								// 	position: 'bottom',
								//     title: '2222'
								// });
								console.log("播放了2");
								let mp3_src = '/static/mp3/msg.mp3';
								//实例化声音  
								const Audio = uni.createInnerAudioContext();
								Audio.autoplay = true;
								Audio.src = mp3_src; //音频地址  
								Audio.play(); //执行播放 
								console.log("播放了3");
								Audio.onSeeked(() => {
									console.log('Audio 释放释放！');
									Audio.destroy();
								});
								store.state.temp.msg_mp3_playtime = new Date().getTime();
							}
							
						} 
						
						
						
						//群成员昵称显示备注问题	
						if(data.CMD=="GROUP_CHAT_MESSAGE") {
							let s = uni.getStorageSync(data.body[0].bean.fromUid+"_NOTE");
							if(s&&s!="") {
								data.body[0].bean.fromName = s;
							}
						}
						
						 
					} else if(data.body[0].bean.fromUid==store.state.user.id){//多端同步的问题
						if(data.body[0].bean.fromUid!=store.state.user.id) {
							console.log("11111111->"+data.act);
							if(!darao&&data.act=="none") {
								console.log("播放了1："+store.state.temp.msg_mp3_playtime);
								if(store.state.temp.msg_mp3_playtime==0||(new Date().getTime() - store.state.temp.msg_mp3_playtime)>1000) {
									// uni.showToast({
									//     icon: 'none',
									// 	position: 'bottom',
									//     title: '2222'
									// });
									console.log("播放了2");
									let mp3_src = '/static/mp3/msg.mp3';
									//实例化声音
									const Audio = uni.createInnerAudioContext();
									Audio.autoplay = true;
									Audio.src = mp3_src; //音频地址
									Audio.play(); //执行播放
									console.log("播放了3");
									Audio.onSeeked(() => {
										console.log('Audio 释放释放！');
										Audio.destroy();
									});
									store.state.temp.msg_mp3_playtime = new Date().getTime();
								}

							}

							//群成员昵称显示备注问题
							if(data.CMD=="GROUP_CHAT_MESSAGE") {
								let s = uni.getStorageSync(data.body[0].bean.fromUid+"_NOTE");
								if(s&&s!="") {
									data.body[0].bean.fromName = s;
								}
							}
						}
					}else {
						
						//#ifndef H5
						if(data.CMD=="CHAT_SEND_TRANSFER_SUCCESS") {
							setTimeout(()=>{
								uni.navigateBack();
							},300);
						} 
						
						setTimeout(()=>{
							uni.pageScrollTo({
							    scrollTop: 9999999999,
							    duration: 0
							});
						},350)
						//#endif
						//#ifdef H5
						if(data.CMD=="CHAT_SEND_TRANSFER_SUCCESS") {
							setTimeout(()=>{
								uni.navigateBack();
							},150);
						} 
						
						setTimeout(()=>{
							uni.pageScrollTo({
							    scrollTop: 9999999999,
							    duration: 0
							});
						},200)
						//#endif
						
						//如果是云端加载数据则不需要执行下面的
						if(data.act&&data.act!="cloudStorageData") {
							//如果当前打开窗口为此信息对应的窗口，则不需要把信息再次缓存，所以这里直接执行return;就可以了
							//意思就是自己发的信息已经在发的时候缓存 过了。这里return;就可以了。不需要执行下去
							if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body[0].chatid
								&&(data.CMD=="USER_CHAT_MESSAGE"||data.CMD=="GROUP_CHAT_MESSAGE")
								) {
										
									if(data.body[0].bean&&(data.body[0].bean.psr!="video"&&data.body[0].bean.psr!="voice"&&data.body[0].type!="USER_CARD")) {
										console.log("进来这里");
										store.state.ar_list.forEach(item=>{
											if(item.id==data.body[0].chatid) {
												// let s = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT');
												let s = data.body[0].bean.simple_content;
												item.content = (null==s?"":s); 
												uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT',s);
											}
										});
										return;
									}
									
							}
						}
					}
					
					
					//4028d817755a9b5f01755aa3386d0003#4028d817755a9b5f01755aa3386d0003
					 let str = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE');
					 if(str&&str!="") {
						 console.log("---->1");
						 var jsonObj = JSON.parse(str);
						 jsonObj = jsonObj.concat(data.body);
						 
						 if(jsonObj.length>100) {
						 	jsonObj.splice(0,jsonObj.length-100);
						 }
						 
						 uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE',JSON.stringify(jsonObj));
						 // if(state.chatMessageMap.has(user.id+"#"+data.body[0].chatid)) {
							//  let list = state.chatMessageMap.get(user.id+"#"+data.body[0].chatid);
							//  list = list.concat(data.body);
							//  if(list.length>50) {
							//  	list.splice(0,list.length-50);
							//  }
							// store.commit("updateChatMessageMap",user.id+"#"+data.body[0].chatid,list);
						 // } else {
							
							store.commit("updateChatMessageMap",{
								key:user.id+"#"+data.body[0].chatid,
								value:jsonObj
							});
								
							if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body[0].chatid) {
								store.commit("setCur_chat_msg_list",jsonObj);
								console.log("---->3");
								let v = {
									toUid:data.body[0].chatid,
									fromUid:store.state.user.id
								}
								_this.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'CHAT_MSG_READED'}");
								
							}
							  console.log("---->6");
							//store.state.chatMessageMap.set(user.id+"#"+data.body[0].chatid,jsonObj)
						 // }
						 uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT',jsonObj[jsonObj.length-1].bean.simple_content);
					 } else {
						 console.log("---->2");
						  uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE',JSON.stringify(data.body));
						  store.commit("updateChatMessageMap",{
						  	key:user.id+"#"+data.body[0].chatid,
						  	value:data.body
						  });
						  if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body[0].chatid) {
							  store.commit("setCur_chat_msg_list",data.body);
						  }
						   uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT',data.body.simple_content);
						 // store.commit("updateChatMessageMap",user.id+"#"+data.body[0].chatid,data.body);
						//store.state.chatMessageMap.set(user.id+"#"+data.body[0].chatid,data.body)
					 }
					
					
					//uni.removeStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT');
					 //更新联系记录最后一条显示内容和未读统计信息
					let unreadCount = 0; 
					
					
					let c = 0;//未读数量
					//let darao = uni.getStorageSync(data.body[0].chatid+"_darao");
					if(!darao) {
						if((!store.state.cur_chat_entity||data.body[0].chatid!=store.state.cur_chat_entity.id)
							&&data.body[0].bean.fromUid!=user.id) {
							
							//处理用户信息未读统计
							 str = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD');
							 if(str&&str!="") {
								c = parseInt(str)+1;
								uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD',c+"");
							 } else {
								c = 1;
								uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD',"1")
							 }
							 
						 } 
					}
					
					// console.log(data.body[0]);
					// console.log("***************");
					store.state.ar_list.forEach(item=>{
						if(item.id==data.body[0].chatid) {
							let s = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT');
							item.content = (null==s?"":s);
							store.commit("setChat_my_loadding",false); 
							item.unread = c;
						}
						unreadCount = unreadCount + item.unread;
					})
					store.commit("setUnReadMsgSum",unreadCount);
				}
			});
			
			let arUpdate = function(data) {
					let user = uni.getStorageSync("USER");
					if(store.state.ar_list.length>0) {
						let lastContent = "";
						let list1 = [];	//没有置顶的
						let list2 = [];//置顶的
						let tempItem;
						let list =store.state.ar_list.filter(item=>{
							if(item.id==data.body[0].id) {
								tempItem = item;
								tempItem.img = data.body[0].img;
								tempItem.title = data.body[0].title;
								tempItem.createDate = data.body[0].createDate;
								tempItem.createDateTime = data.body[0].createDateTime;
								tempItem.subname = data.body[0].subname;
								let s = uni.getStorageSync(item.id+"_NOTE");
								if(s&&s!="") {
									tempItem.title = s;
								}
								
								
								let str = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
								if(null!=str&&str!="") {
									tempItem.unread = parseInt(str);
								} else {
									tempItem.unread = 0;
								}
								return false;
							}
							return true;
						})
						if(!tempItem) {
							tempItem = data.body[0];
						}
						list.push(tempItem);
						list.forEach(item=>{
							//if(item) {
								let zhiding = uni.getStorageSync(item.id+"_zhiding");
								if(zhiding) {
									item.top = 0;
									list2.push(item);
								} else {
									list1.push(item);
								}
							//}
						});
						list1.sort(function(a,b){
							return b.createDateTime-a.createDateTime;
						})
						list2.sort(function(a,b){
							return b.createDateTime-a.createDateTime;
						})
						store.commit("setAr_list",list2.concat(list1));
					} else {
						data.body.forEach(item=>{
							let zhiding = uni.getStorageSync(item.id+"_zhiding");
							if(zhiding) {
								item.top = 0;
							}
						}); 
						
						data.body.sort(function(a,b){
							//除了top.如果TOP相等就按时间排
							if(a.top==b.top) {
								return b.createDateTime-a.createDateTime;
							} else {
								return a.top - b.top;
							}
							
						})
						
						store.commit("setAr_list",data.body);
					}
			}
			
			state.lock = false;	
		},    
		WEBSOCKET_SEND(state, p) {
			let _this = this;
			// let user = uni.getStorageSync("USER");
			// if(user) {
			// 	p+=("=!@#&="+user.id+"#"+Vue.prototype.$clientType+"#"+store.state.app_uuid);
			// }		
			state.socketTask.send({
				data: p, 
				
				async success() {
					// if(p.indexOf("CMD:'USER_CHAT_SEND_TXT'")>=0
					// 	||p.indexOf("CMD:'USER_CHAT_SEND_VOICE'")>=0
					// 	||p.indexOf("CMD:'GROUP_CHAT_SEND_TXT'")>=0
					// 	||p.indexOf("CMD:'GROUP_CHAT_SEND_VOICE'")>=0
					// 	||p.indexOf("CMD:'CHAT_SEND_CARD'")>=0
					// 	||p.indexOf("CMD:'USER_CHAT_SEND_RED'")>=0
					// 	) {
							console.log("发送成功:"+p);
							
					// 	}
				},
				async fail() {
					 state.is_open_socket = false;
					console.log("发送失败!!!!!!");
					
					if(p.indexOf("CMD:'USER_CHAT_SEND_TXT'")>=0
						||p.indexOf("CMD:'USER_CHAT_SEND_VOICE'")>=0
						||p.indexOf("CMD:'GROUP_CHAT_SEND_TXT'")>=0
						||p.indexOf("CMD:'GROUP_CHAT_SEND_VOICE'")>=0
						||p.indexOf("CMD:'CHAT_SEND_CARD'")>=0
						||p.indexOf("CMD:'USER_CHAT_SEND_RED'")>=0
						) {
							let WAIT_SEND_MSG_LIST = [];
							let WAIT_SEND_MSG = uni.getStorageSync("WAIT_SEND_MSG");
							if(WAIT_SEND_MSG&&WAIT_SEND_MSG!="") {
								console.log("WAIT_SEND_MSG:"+WAIT_SEND_MSG);
								WAIT_SEND_MSG_LIST = JSON.parse(WAIT_SEND_MSG);
							}	
							WAIT_SEND_MSG_LIST.push(p);
							uni.setStorageSync("WAIT_SEND_MSG",JSON.stringify(WAIT_SEND_MSG_LIST));
							store.commit("setWAIT_SEND_MSG",store.state.WAIT_SEND_MSG + p); 
							
						}
					// 在使用WebSocket的时候，如果网络突然断开，WebSocketd是不会触发任何事件的，所以前端程序无法得知当前链接是否断开。
					//但是这个时候使用WebSocket.send方法的时候，浏览器会发现消息发不出去，隔一段时间之后(貌似每个浏览器隔的时间不相同)，会触发onclose函数。
					//利用这点，我们可以在send不出消息并触发onclose之后，进行重连
					state.socketTask.onClose(); //如果发送失败。则被认为连线中断了
					// _this.dispatch('WEBSOCKET_INIT');
					
				}
			});
			
			
			
		},
	},


	actions: {
		WEBSOCKET_INIT({
			commit
		}, url) {
			commit('WEBSOCKET_INIT')
		},
		WEBSOCKET_SEND({
			commit
		}, p) {
			commit('WEBSOCKET_SEND', p)
		}
	}
})



