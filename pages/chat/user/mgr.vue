<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">设置</block><block slot="right">
		</block></cu-custom>
		<view style="background: #fff;display: flex;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="margin-top">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+cur_user.headpic+');'"></view>
				<view style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">{{cur_user.nickName}}</view>
			</view>
			
			<text @tap="createGroup()" style="font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx" class="iconfont icon-tianjiatupian"></text>
			 
		</view> 
		
		<view style="clear: both;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">
		<view @tap="editNote()" class="cu-item arrow" >
			<view class="content">
				<text class="text-grey" style="color:#333;float:left;">备注</text>
				<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{user_note}}</text>
			</view>
		</view>
			<view @tap="goMsgRecord()" class="cu-item arrow" >
				<view class="content">
					<text class="text-grey" style="color:#333">查看聊天记录</text>
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">消息免打扰</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">置顶聊天</view>
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">加入黑名单</view>
				<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			
			<view class="cu-item margin-top arrow" @tap="clearChatMsg()" >
				<view class="content">
					<text class="text-grey" style="color:#333">清空聊天记录</text>
				</view>
			</view>
			<view v-if="super_user==1" class="cu-item arrow" @tap="clearChatMsgBoth()" >
				<view class="content">
					<text class="text-grey" style="color:#333">双向清除聊天记录</text>
				</view>
			</view>
			
			
			<view class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="removeFriend()" >
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">删除</text>
				</view>
			</view>
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA:false,
				switchB:false,
				switchC:false,
				id:"",
				cur_user:{},
				super_user:0,
				user_note:"",
			}
		},
		onShow() {
			let s = uni.getStorageSync(this.id+"_NOTE");
			if(s&&s!="") {
				this.user_note = s;
			}
		},
		onLoad(e) {
			this.id = e.id;
			let _this = this;
			
			_this.$http.post("/user/json/loadById/v1",
				{id:this.id},
				{
					header:{
						//"x-access-uid":_this.$store.state.user.id
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.cur_user = res_data.body;
					let s = uni.getStorageSync(_this.id+"_NOTE");
					if(s&&s!="") {
						_this.cur_user.nickName = s;
					}
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/loadById/v1",
			// 	data:{id:this.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded"
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.cur_user = res_data.body;
			// 			let s = uni.getStorageSync(_this.id+"_NOTE");
			// 			if(s&&s!="") {
			// 				_this.cur_user.nickName = s;
			// 			}
			// 		}
			// 	}
			// })
			
			//是否超级用户
			
			_this.$http.post("/user/json/isSuperUser",
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.super_user = parseInt(res_data.msg);
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/isSuperUser",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.super_user = parseInt(res_data.msg);
			// 		}
			// 	}
			// })
			
			_this.$http.post("/user/json/isBlack",
				{uid:this.id},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					if(res_data.msg == "1") {
						_this.switchC = true;
					} else {
						_this.switchC = false;
					}
					
				} else {
					uni.showToast({
						title: res_data.msg,
						duration: 2000
					});
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/isBlack",
			// 	data:{uid:this.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			if(res_data.msg == "1") {
			// 				_this.switchC = true;
			// 			} else {
			// 				_this.switchC = false;
			// 			}
						
			// 		} else {
			// 			uni.showToast({
			// 				title: res_data.msg,
			// 				duration: 2000
			// 			});
			// 		}
			// 	}
			// })
			
			let darao = uni.getStorageSync(this.id+"_darao");
			if(darao&&darao!="") {
				this.switchA = darao;
			}
			
			let zhiding = uni.getStorageSync(this.id+"_zhiding");
			if(zhiding&&zhiding!="") {
				this.switchB = zhiding;
			}
		},
		methods: {
			removeFriend() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showActionSheet({
				    itemList: ['删除并清除聊天记录'],
				    success: function (res) {
				        //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						
						
						_this.$http.post("/user/friend/removeFriends",
							{uid:_this.id},
							{
								header:{
									"x-access-uid":_this.$store.state.user.id,
									"x-access-client":_this.$clientType
								}
							}
						).then(res=>{
							let res_data = eval(res.data);
							if(res_data.code==200) { 
								uni.showToast({
								    title: "删除成功",
								    duration: 800
								});
								setTimeout(()=>{
									
									_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
									_this.$store.commit("setCur_chat_msg_list",[]);
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
									let list =_this.$store.state.ar_list.filter(item=>{
										if(item.id==_this.id) {
											return false;
										}
										return true;
									})
									_this.$store.commit("setAr_list",list);
									let list_1 = _this.$store.state.friend_list;
									list_1 = list_1.filter(item1=>{
										let temp = item1.list.filter(item=>{
											if(item.member_uuid==_this.id) {
												return false;
											}
											return true;
										})
										item1.list = temp;
										if(item1.list.length<=0) return false;
										return true;
									})
									_this.$store.commit("setFriend_list",list_1);
									
									uni.navigateTo({
										url:"/pages/index/index"
									})
									
								},800);
							} else {
								uni.showToast({
								    title: res_data.msg,
								    duration: 2000
								});
							}
						})
						
						
						// uni.request({
						// 	method:"POST",
						// 	url: _this.$store.state.req_url + "/user/friend/removeFriends",
						// 	data:{uid:_this.id},
						// 	header:{
						// 		"Content-Type":"application/x-www-form-urlencoded",
						// 		"x-access-uid":_this.$store.state.user.id
						// 	},
						// 	success(res) {
						// 		let res_data = eval(res.data);
						// 		if(res_data.code==200) { 
						// 			uni.showToast({
						// 			    title: "删除成功",
						// 			    duration: 800
						// 			});
						// 			setTimeout(()=>{
										
						// 				_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
						// 				uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
						// 				_this.$store.commit("setCur_chat_msg_list",[]);
						// 				uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
						// 				uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
						// 				let list =_this.$store.state.ar_list.filter(item=>{
						// 					if(item.id==_this.id) {
						// 						return false;
						// 					}
						// 					return true;
						// 				})
						// 				_this.$store.commit("setAr_list",list);
						// 				let list_1 = _this.$store.state.friend_list;
						// 				list_1 = list_1.filter(item1=>{
						// 					let temp = item1.list.filter(item=>{
						// 						if(item.member_uuid==_this.id) {
						// 							return false;
						// 						}
						// 						return true;
						// 					})
						// 					item1.list = temp;
						// 					if(item1.list.length<=0) return false;
						// 					return true;
						// 				})
						// 				_this.$store.commit("setFriend_list",list_1);
										
						// 				uni.navigateTo({
						// 					url:"/pages/index/index"
						// 				})
										
						// 			},800);
						// 		} else {
						// 			uni.showToast({
						// 			    title: res_data.msg,
						// 			    duration: 2000
						// 			});
						// 		}
						// 	}
						// })
						
						
				    },
				    fail: function (res) {
						console.log("按取消");
				        //console.log(res.errMsg);
				    }
				});
			},
			editNote() {
				uni.navigateTo({
					url:"/pages/chat/user/note?fid="+this.id
				})
			},
			createGroup() {
				uni.navigateTo({
					url:"/pages/chat/group/createGroup?fid="+this.id
				})
			},
			goMsgRecord() {
				uni.navigateTo({
					url:"/pages/chat/user/message_record"
				})
			},
			clearChatMsg(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否清空聊天记录?',
				    success: function (res) {
						if (res.confirm) {
							_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list",[]);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
							    title: '清除成功',
							    duration: 2000
							});
							
							//清空云数据
							_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+(user.id+"#"+_this.id)+"',CMD:'CLEARCHATMSG_SINGLE_CLOUD'}");
							
						} 
					},
				});	
				
			},
			clearChatMsgBoth(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否双向清空聊天记录?',
				    success: function (res) {
						if (res.confirm) {
							_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list",[]);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
							    title: '清除成功',
							    duration: 2000
							});
							//通知对方清空数据
							_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+(user.id+"#"+_this.id)+"',CMD:'CLEARCHATMSG'}");
						} 
					},
				});	
				
			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id+"_darao",e.detail.value);
			},
			SwitchC(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				this.switchC = e.detail.value;
				let actionName = "";
				if(this.switchC) {
					actionName = "addBlack";
				} else {
					actionName = "removeBlack";				
				}
				
				
				_this.$http.post("/user/json/"+actionName,
					{uid:this.id},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						
					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/"+actionName,
				// 	data:{uid:this.id},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
							
				// 		} else {
				// 			uni.showToast({
				// 			    title: res_data.msg,
				// 			    duration: 2000
				// 			});
				// 		}
				// 	}
				// })
				
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				uni.setStorageSync(this.id+"_zhiding",e.detail.value);
				
				let l = this.$store.state.ar_list;
				let list1 = [];	//没有置顶的
				let list2 = [];//置顶的
				l.forEach(item=>{
					let zhiding = uni.getStorageSync(item.id+"_zhiding");
					if(zhiding) {
						item.top = 0;
						list2.push(item);
					} else {
						list1.push(item);
					}
				});
				list1.sort(function(a,b){
					return b.createDateTime-a.createDateTime;
				})
				list2.sort(function(a,b){
					return b.createDateTime-a.createDateTime;
				})
				
				this.$store.commit("setAr_list_show",list2.concat(list1));
				
			},
		}
	}
</script>

<style>

</style>
