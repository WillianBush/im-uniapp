import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import home from './pages/home/index.vue'
import en from '@/i18n/en.json'
import zh from '@/i18n/zh.json'
Vue.component('home',home)
Vue.use(VueI18n)
Vue.config.productuinTip = false
const i18n = new VueI18n({
	locale: 'zh-CN',
	messages: {
		'en-US': en,
		'zh-CN': zh
	}
})

Vue.prototype._i18n = i18n
import addressBook from './pages/addressBook/index.vue'
Vue.component('addressBook',addressBook)

import faxian from './pages/faxian/index.vue'
Vue.component('faxian',faxian)

import hotItem from './pages/hotItem/hotItem.vue'
Vue.component('hotItem',hotItem)

import mine from './pages/mine/index.vue'
Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import number_jpan from './components/numberJpan/numberJpan.vue'
Vue.component('number-jpan',number_jpan)

import store from "./store"//使用vuex对状态进行管理
Vue.prototype.$store = store;

/*这里是为了从domian拿到数据后，再进行app启动，防止接口访问时，domian未获取到*/
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})

/*注意：这里websocket和http 都是动态从oss获取，所以是一个有延迟的网络请求过程，而main.js是启动入口，不能直接绑定，否则可能导致websocket、http
* 没有初始化完成，就进行后续的操作，存在调用报错。这里等oss获取成功后，再进行绑定配置*/
import websocket from './common/websocketStore.js'
export function bindWebSocket(){
	Vue.prototype.$websocket = websocket;
}

import { http } from '@/common/netRequest.js'
export function bindHttp(){
	Vue.prototype.$http = http

	//刷新user
	let user = uni.getStorageSync("USER");
	console.log("--------->"+user);
	if(user) {
		console.log(".......");
		//更新一下user
		http.post("/user/json/load/v1",
			{
				header:{
					"x-access-uid":user.id
				}
			}
		).then(res=>{
			console.log(res.data);
			let res_data = eval(res.data);
			if(res_data.code==200) {
				console.log("99999999999999");
				console.log(res_data.body);
				store.commit("setUser",res_data.body)
				uni.setStorageSync("USER",res_data.body);
				store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
				store.commit("setUnDoRoomAddCount",res_data.body.unDoRoomAddCount);
				//websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
			}
		})
		// uni.request({
		// 	method:"POST",
		// 	url: store.state.req_url + "/user/json/load/v1",
		// 	header:{
		// 		"Content-Type":"application/x-www-form-urlencoded",
		// 		"x-access-uid":user.id
		// 	},
		// 	success(res) {
		// 		let res_data = eval(res.data);
		// 		if(res_data.code==200) {
		// 			store.commit("setUser",res_data.body)
		// 			uni.setStorageSync("USER",res_data.body);
		// 			store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
		// 			store.commit("setUnDoRoomAddCount",res_data.body.unDoRoomAddCount);
		// 			//websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
		// 			uni.navigateTo({
		// 				url:"/pages/index/index"
		// 			})
		// 		}
		// 	}
		// })

	}
}

// #ifdef APP-PLUS
//Vue.prototype.$clientType = "APP"
// #endif
// #ifdef H5
Vue.prototype.$clientType = "H5"
//Vue.prototype.$clientType = "PC";/**PC端需要的**/
// #endif



// uni.onSocketError(function(){
// 	console.log("失败失败失败失败失败");
// 	});


// uni.onSocketMessage(function (res_ws) {
// 	heartCheck.reset();

// 	let user = uni.getStorageSync("USER");
// 	let data = JSON.parse(res_ws.data);
// 	if(data.CMD=="LOGIN") {
// 		uni.navigateTo({
// 			url:"../login/login"
// 		})
// 	} else if(data.CMD=="OTHER_LOGIN") {
// 		//别处冲线
// 		uni.request({
// 			method:"POST",
// 			url: store.state.req_url + "/user/json/logout",
// 			header:{
// 				"Content-Type":"application/x-www-form-urlencoded",
// 				"x-access-uid":store.state.user.id
// 			},
// 			success(res) {
// 				let res_data = eval(res.data);
// 				if(res_data.code==200) {
// 					uni.clearStorageSync();
// 					store.commit("clearData");
// 					uni.showModal({
// 					    title: '提示',
// 						showCancel:false,
// 					    content: '你的帐号已在别处上线',
// 					    success: function (res) {
// 					        if (res.confirm) {
// 					            uni.navigateTo({
// 					            	url:"../login/login"
// 					            })
// 					        }
// 					    }
// 					});

// 				}
// 			}
// 		})

// 	} else if(data.CMD=="LOGIN_USER_MODIFY_HEADPIC") {
// 		store.commit("updateUserHeadpic",data.body);
// 	} else if(data.CMD=="LOGIN_USER_MODIFY_NN") {
// 		store.commit("updateUsername",data.body);
// 	} else if(data.CMD=="LOGIN_USER_STATUS_BAN") {
// 		uni.request({
// 			method:"POST",
// 			url: store.state.req_url + "/user/json/logout",
// 			header:{
// 				"Content-Type":"application/x-www-form-urlencoded",
// 				"x-access-uid":store.state.user.id
// 			},
// 			success(res) {
// 				let res_data = eval(res.data);
// 				if(res_data.code==200) {
// 					uni.clearStorageSync();
// 					store.commit("clearData");
// 					uni.showToast({
// 						icon:"none",
// 					    title: '帐号已被冻结',
// 					    duration: 2000
// 					});
// 					uni.navigateTo({
// 						url:"../login/login"
// 					})
// 				}
// 			}
// 		})
// 	} else if(data.CMD=="LOGIN_USER_REMOVE") {
// 		uni.request({
// 			method:"POST",
// 			url: store.state.req_url + "/user/json/logout",
// 			header:{
// 				"Content-Type":"application/x-www-form-urlencoded",
// 				"x-access-uid":store.state.user.id
// 			},
// 			success(res) {
// 				let res_data = eval(res.data);
// 				if(res_data.code==200) {
// 					uni.clearStorageSync();
// 					store.commit("clearData");
// 					uni.showToast({
// 						icon:"none",
// 					    title: '帐号已被删除',
// 					    duration: 2000
// 					});
// 					uni.navigateTo({
// 						url:"../login/login"
// 					})
// 				}
// 			}
// 		})
// 	} else if(data.CMD=="ERROR") {
// 		uni.showToast({
// 			icon:"none",
// 		    title: data.body,
// 		    duration: 2000
// 		});
// 	} else if(data.CMD=="UPDATE_ADDRESS_BOOK") {
// 		uni.request({
// 			method:"POST",
// 			url: store.state.req_url + "/user/friend/list/v1",
// 			header:{
// 				"Content-Type":"application/x-www-form-urlencoded",
// 				"x-access-uid":user.id
// 			},
// 			success(res) {
// 				let res_data = eval(res.data);
// 				if(res_data.code==200) {
// 					store.commit("setFriend_list",res_data.body);
// 				}
// 			}
// 		})
// 	} else if(data.CMD=="FRIENDSADD") {
// 		 //FRIENDSADD好友添加处理
// 		 if(store.state.unDoFriendAddCount>0) {
// 			 store.commit("setUnDoFriendAddCount",store.state.unDoFriendAddCount+1);
// 		 } else {
// 			 store.commit("setUnDoFriendAddCount",1);
// 		 }
// 	}
// 	else if(data.CMD=="AR_INSERT" || data.CMD=="AR_UPDATE") {
// 		if(store.state.ar_list.length>0) {
// 			let lastContent = "";
// 			let list1 = [];	//没有置顶的
// 			let list2 = [];//置顶的
// 			let list = store.state.ar_list.filter(item=>{
// 				if(item.id==data.body[0].id) {
// 					data.body[0].content = item.content;
// 					return false;
// 				}
// 				return true;
// 			})
// 			list.push(data.body[0]);
// 			list.forEach(item=>{
// 				let zhiding = uni.getStorageSync(item.id+"_zhiding");
// 				if(zhiding) {
// 					item.top = 0;
// 					list2.push(item);
// 				} else {
// 					list1.push(item);
// 				}
// 			});
// 			list1.sort(function(a,b){
// 				return b.createDateTime-a.createDateTime;
// 			})
// 			list2.sort(function(a,b){
// 				return b.createDateTime-a.createDateTime;
// 			})
// 			store.commit("setAr_list",list2.concat(list1));
// 		} else {
// 			data.body.forEach(item=>{
// 				let zhiding = uni.getStorageSync(item.id+"_zhiding");
// 				if(zhiding) {
// 					item.top = 0;
// 				}
// 			});

// 			data.body.sort(function(a,b){
// 				//除了top.如果TOP相等就按时间排
// 				if(a.top==b.top) {
// 					return b.createDateTime-a.createDateTime;
// 				} else {
// 					return a.top - b.top;
// 				}

// 			})

// 			store.commit("setAr_list",data.body);
// 		}

// 	}
// 	else if(data.CMD=="GROUP_MEMBER_REMOVE") {
// 		let list = store.state.ar_list.filter(item=>{
// 			if(item.id==data.body) {
// 				return false;
// 			}
// 			return true;
// 		})
// 		store.commit("setAr_list",list);
// 	}
// 	else if(data.CMD=="USER_CHAT_MESSAGE" || data.CMD=="GROUP_CHAT_MESSAGE") {
// 		if(data.body[0].bean.fromUid!=store.state.user.id) {
// 			let mp3_src = '/static/mp3/msg.mp3';
// 			//实例化声音
// 			const Audio = uni.createInnerAudioContext();
// 			Audio.autoplay = true;
// 			Audio.src = mp3_src; //音频地址
// 			Audio.play(); //执行播放
// 		}

// 		 let str = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE');
// 		 if(str&&str!="") {
// 			 var jsonObj = JSON.parse(str);
// 			 jsonObj = jsonObj.concat(data.body);
// 			 // if(jsonObj.length>50) {
// 				//  jsonObj.splice(0,jsonObj.length-50);
// 			 // }
// 			 uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE',JSON.stringify(jsonObj));

// 			 // if(state.chatMessageMap.has(user.id+"#"+data.body[0].chatid)) {
// 				//  let list = state.chatMessageMap.get(user.id+"#"+data.body[0].chatid);
// 				//  list = list.concat(data.body);
// 				//  if(list.length>50) {
// 				//  	list.splice(0,list.length-50);
// 				//  }
// 				// store.commit("updateChatMessageMap",user.id+"#"+data.body[0].chatid,list);
// 			 // } else {
// 				 if(jsonObj.length>50) {
// 				 	jsonObj.splice(0,jsonObj.length-50);
// 				 }
// 				store.commit("updateChatMessageMap",{
// 					key:user.id+"#"+data.body[0].chatid,
// 					value:jsonObj
// 				});

// 				if(store.state.cur_chat_entity&&store.state.cur_chat_entity.id==data.body[0].chatid) {
// 					store.commit("setCur_chat_msg_list",jsonObj);
// 				}

// 				//store.state.chatMessageMap.set(user.id+"#"+data.body[0].chatid,jsonObj)
// 			 // }



// 		 } else {
// 			  uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE',JSON.stringify(data.body));
// 			  store.commit("updateChatMessageMap",{
// 			  	key:user.id+"#"+data.body[0].chatid,
// 			  	value:data.body
// 			  });
// 			  if(store.state.cur_chat_entity.id==data.body[0].chatid) {
// 				  store.commit("setCur_chat_msg_list",data.body);
// 			  }

// 			 // store.commit("updateChatMessageMap",user.id+"#"+data.body[0].chatid,data.body);
// 			// store.state.chatMessageMap.set(user.id+"#"+data.body[0].chatid,data.body)
// 		 }

// 		uni.removeStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT');
// 		 //更新联系记录最后一条显示内容和未读统计信息
// 		let unreadCount = 0;
// 		uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_LASTCONTENT',data.body[0].bean.txt);

// 		let c = 0;//未读数量
// 		let darao = uni.getStorageSync(data.body[0].chatid+"_darao");
// 		if(!darao) {
// 			if(!store.state.cur_chat_entity||data.body[0].chatid!=store.state.cur_chat_entity.id) {
// 				//处理用户信息未读统计
// 				 str = uni.getStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD');
// 				 if(str&&str!="") {
// 					 c = parseInt(str)+1;
// 					 uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD',c+"");
// 				 } else {
// 					 c = 1;
// 					uni.setStorageSync(user.id+"#"+data.body[0].chatid+'_CHAT_MESSAGE_UNREAD',"1")
// 				 }

// 			 }
// 		}

// 		// console.log(data.body[0]);
// 		// console.log("***************");
// 		store.state.ar_list.forEach(item=>{
// 			// console.log(item);
// 			if(item.id==data.body[0].chatid) {
// 				if(data.body[0].bean.txt.indexOf("<img")>=0) {
// 					item.content = "[图片]";
// 				} else if(data.body[0].bean.txt.indexOf("upload/chat/voice")>=0) {
// 					item.content = "[语音]";
// 				} else {
// 					item.content = data.body[0].bean.txt;
// 				}
// 				item.unread = c;
// 			}
// 			unreadCount = unreadCount + item.unread;
// 		})

// 		console.log("unreadCount:"+unreadCount);
// 		store.commit("setUnReadMsgSum",unreadCount);
// 		 // if(myConstants.scrollDelegate) {
// 			//  myConstants.scrollDelegate.scrollBottom(true);
// 		 // }


// 	}
// });

//初始化
//this.$websocket.dispatch('WEBSOCKET_INIT', "ws://47.107.91.27:9500/ws");
//发送消息
//that.$websocket.dispatch("WEBSOCKET_SEND", "测试一下");
//

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()

