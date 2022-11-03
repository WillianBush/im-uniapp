<!--群聊天页面，点击右上角设置-->
<template>
	<view v-if="$store.state.cur_chat_entity&&$store.state.cur_chat_entity.owner_UUID&&$store.state.cur_chat_entity.owner_UUID!=''" style="padding-bottom:60upx;">
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">群组信息</block><block slot="right">
		</block></cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">
	<view v-if="$store.state.isEmployee" style="height:60upx;width:90%;margin:auto auto;padding-top: 20upx;">
		<text style="float:left;font-weight: 800;
    color:#333">群成员</text>
		<text style="float:right;margin-top:6upx;" class="lg text-gray cuIcon-right"></text>
		<text @tap="lookMemberList()" style="font-size: 26upx;float:right;    color: #aaa;">查看{{$store.state.cur_chat_entity.memberCount}}名群成员</text>
		
	</view>

			<view v-if="$store.state.isEmployee" style="display: flex; width:100%">
					<view   style="padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;flex:1;    line-height: 140upx;">
						<view @tap="goUserDetail(index)" v-for="(item,index) in $store.state.cur_chat_entity.top5Hp" class="cu-avatar round margin-left" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item+');'"></view>
						<text @tap="yaoqi()" style="position: relative;
    top: 36upx;font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx" class="iconfont icon-tianjiatupian"></text>
					</view>
					
			</view>
			
			 
		</view> 
		
		<view style="clear: both;   width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">
	
	<view v-if="($store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0)&&$store.state.shimingCfg.shiming==1" @tap="lookNotShimingMemberList()" class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">查看未实名群成员</text>
		</view>
	</view>
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="goAddMember()" class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">邀请群成员</text>
		</view>
	</view>
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="goRemoveMember()" class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">移除群成员</text>
		</view>
	</view>
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID"  @tap="goMgrset"  class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">群设置</text>
		</view>
	</view>
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0"  @tap="goSssList"  class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">成员禁言管理</text>
		</view>
	</view>
	
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="editGroupName()" class="cu-item arrow margin-top" >
		<view class="content">
			<text class="text-grey" style="color:#333">群组名称</text>
			<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.cur_chat_entity.name}}</text>
		</view>
	</view>
	
	<view v-else  class="cu-item margin-top" >
		<view class="content">
			<text class="text-grey" style="color:#333">群组名称</text>
			<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.cur_chat_entity.name}}</text>
		</view>
	</view>
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0"  class="cu-item  margin-top" >
		<view class="content">
			<text class="text-grey" style="color:#333">群组ID</text>
			<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.cur_chat_entity.roomid}}</text>
		</view>
	</view>
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
		||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0"  @tap="edit_pic()" class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">群组头像</text>
			<view  class="cu-avatar round lg" :style="'width:60upx;height:60upx;float: right;background-image: url('+$store.state.img_url+$store.state.cur_chat_entity.img+');'"></view>
		</view>
	</view>
	
	<view v-if="false" @tap="goQrcode"  class="cu-item arrow" >
		<view class="content">
			<text class="text-grey" style="color:#333">群二维码</text>
			<text style="color:#666;font-size:22px;float: right; position: relative; right: -20upx;" class="lg text-gray cuIcon-qr_code"><span></span></text>
		</view>
	</view>
	
	<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
		||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="editGroupNotice()" class="cu-item arrow "  >
		<view class="content">
			<text class="text-grey" style="color:#333">群公告</text>
		</view>
	</view>
	<view v-else class="cu-item  "  >
		<view class="content">
			<text class="text-grey" style="color:#333">群公告</text>
		</view>
	</view>
	<view style="position: relative;top:-10upx;color:#bbb;font-size: 26upx;background: #fff;
			padding:20upx;line-height: 40upx;word-wrap:break-word;
word-break:normal; " class="text-grey text-sm">{{$store.state.cur_chat_entity.descri}}</view>
	
	


			<view @tap="goMsgRecord()" class="cu-item arrow margin-top" >
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
			
			<view class="cu-item margin-top arrow" @tap="clearChatMsg()" >
				<view class="content">
					<text class="text-grey" style="color:#333">清空聊天记录</text>
				</view>
			</view>
			
			<view v-if="$store.state.user.id!=$store.state.cur_chat_entity.owner_UUID" class="cu-item margin-top arrow" @tap="tousu()" >
				<view class="content">
					<text class="text-grey" style="color:#333">投诉此群</text>
				</view>
			</view>
			
			<view v-if="$store.state.user.id!=$store.state.cur_chat_entity.owner_UUID" class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="outGroup()" >
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">退出群组</text>
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
				showTransferGroupModal:false,
				to_member_id:"",
				
			}
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;
			
			this.switchC = this.$store.state.cur_chat_entity.stopSpeak==1
			
			let darao = uni.getStorageSync(this.id+"_darao");
			if(darao&&darao!="") {
				this.switchA = darao;
			}
			
			let zhiding = uni.getStorageSync(this.id+"_zhiding");
			if(zhiding&&zhiding!="") {
				this.switchB = zhiding;
			}
			
			_this.$http.post("/sysConfig/json/getShimingCfg",
				{
					header:{
						//"x-access-uid":store.state.user.id
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				if(res.data.code==200) {
					console.log(res.data.body);
					_this.$store.commit("setShimingCfg",res.data.body);
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: this.$store.state.req_url + "/sysConfig/json/getShimingCfg",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded"
			// 	},
			// 	success(res) {
			// 		if(res.data.code==200) {  
			// 			console.log(res.data.body);
			// 			_this.$store.commit("setShimingCfg",res.data.body);
			// 		}
			// 	}
			// })
			
		},
		methods: {
			goUserDetail(_index){
				let _this = this;
				let arrs = _this.$store.state.cur_chat_entity.member_ids.split("#");
				let _id = arrs[_index];
				_this.$http.post("/sysConfig/json/getRoomCfg",
					{
						header:{
							//"x-access-uid":_this.$store.state.user.id
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if(res_data.body.lookGroupMemberDetailForRole==0) {
							flag = true;
						} else if(res_data.body.lookGroupMemberDetailForRole==1) {
							if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID) {
								flag = true;
							}
						}  else if(res_data.body.lookGroupMemberDetailForRole==2) {
							if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID
								||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user.id)>=0) {
								flag = true;
							}
						}
						
							
						if(flag) {
							uni.navigateTo({
								url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
							})
						}	
						
					}
				})
				
			},
			goSssList(){
				uni.navigateTo({
					url:"/pages/chat/group/sss_list"
				})
			},
			goMgrset() {
				uni.navigateTo({
					url:"/pages/chat/group/mgrSet"
				})
			},
			yaoqi(){
				uni.navigateTo({
					url:"/pages/chat/group/yaoqi"
				})
			},
			hideModal(){
				this.showTransferGroupModal = false;
			},
			showModal(){
				this.showTransferGroupModal = true;
			},
			tousu() {
				
			},
			goQrcode(){
				uni.navigateTo({
					url:"./qrCode"
				})
			},
			transferGroup(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				
				if(this.to_member_id.trim()=="") {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请填写用户ID'
					});
					return;
				}
				
				_this.$http.post("/room/json/transferGroup",
					{roomid:_this.$store.state.cur_chat_entity.id,toUid:_this.to_member_id.trim()},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					// console.log(res.data)
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						uni.showToast({
						   icon: 'success',
						   title: "转让成功"
						});
						setTimeout(function(){
							uni.navigateTo({
								url:"/pages/index/index"
							}) 
						},1500)
						
					} else {
						uni.showToast({
							icon:"none",
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/room/json/transferGroup",
				// 	data:{roomid:_this.$store.state.cur_chat_entity.id,toUid:_this.to_member_id.trim()},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		console.log(res.data)
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			uni.showToast({
				// 			   icon: 'success',
				// 			   title: "转让成功"
				// 			});
				// 			setTimeout(function(){
				// 				uni.navigateTo({
				// 					url:"/pages/index/index?nav=home"
				// 				}) 
				// 			},1500)
							
				// 		} else {
				// 			uni.showToast({
				// 				icon:"none",
				// 			    title: res_data.msg,
				// 			    duration: 2000
				// 			});
				// 		}
				// 	}
				// })
				
				
			},
			dissolveGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否解散此群组?',
				    success: function (res) {
						if (res.confirm) {
							
							_this.$http.post("/room/json/dissolve",
								{roomid:_this.$store.state.cur_chat_entity.id},
								{
									header:{
										"x-access-uid":_this.$store.state.user.id,
										"x-access-client":_this.$clientType
									}
								}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {  
									uni.navigateTo({
										url:"/pages/index/index"
									})
									
								} else {
									uni.showToast({
									    title: res_data.msg,
									    duration: 2000
									});
								}
							})
							
							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/room/json/dissolve",
							// 	data:{roomid:_this.$store.state.cur_chat_entity.id},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":_this.$store.state.user.id
							// 	},
							// 	success(res) {
							// 		console.log(res.data)
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {  
							// 			console.log("-----");
							// 			uni.navigateTo({
							// 				url:"/pages/index/index?nav=home"
							// 			})
										
							// 		} else {
							// 			uni.showToast({
							// 			    title: res_data.msg,
							// 			    duration: 2000
							// 			});
							// 		}
							// 	}
							// })
						} 
					},
				});	
			},
			outGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否退出此群组?',
				    success: function (res) {
						if (res.confirm) {
							_this.$http.post("/room/json/out",
								{roomid:_this.$store.state.cur_chat_entity.id},
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
										icon: 'none',
										title: "已成功退出此群组"
									});
									_this.$http.post("/user/accessRecord/json/listPage",
											{
												pageSize:50,//数量
												pageNumber:1//页数
											},
											{
												header:{
													"x-access-uid":user.id,
													"x-access-client":_this.$clientType
												}
											}
									).then(res_1=>{
										let res_data_1 = eval(res_1.data);
										if(res_data_1.code==200) {
											let unreadSum = 0;
											res_data_1.body.list.forEach(item=>{

												let s = uni.getStorageSync(item.id+"_NOTE");
												if(s&&s!="") {
													item.title = s;
												}

												let last_txt = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
												if(last_txt.indexOf("<img")>=0) {
													item.content = "[图片]";
												} else if(last_txt.indexOf("upload/chat/voice")>=0) {
													item.content = "[语音]";
												} else if(last_txt.indexOf("upload/chat/video")>=0) {
													item.content = "[视频]";
												}  else {
													item.content = last_txt;
												}

												let aite_count = uni.getStorageSync(item.id+"#AITE_COUNT");
												if(aite_count&&aite_count!="") {
													item.aiteCount = parseInt(aite_count);
												}

												let unRead = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
												if(unRead&&unRead!="") {
													unreadSum+=parseInt(unRead);
													item.unread = parseInt(unRead);
												} else {
													item.unread = 0;
												}

												let zhiding = uni.getStorageSync(item.id+"_zhiding");
												if(zhiding) {
													item.top = 0;
												}

											});
											let list = res_data_1.body.list;
											list.sort(function(a,b){
												if(a.top==b.top) {
													return b.createDateTime-a.createDateTime;
												} else {
													return a.top - b.top;
												}
											})
											_this.$store.commit("setAr_list",list)
											_this.$store.commit("setUnReadMsgSum",unreadSum)
										} else {
											uni.showToast({
												icon: 'none',
												title: "获取列表失败"
											});
										}
									});
									uni.navigateTo({
										url:"/pages/index/index"
									})
									
								} else {
									uni.showToast({
									    title: res_data.msg,
									    duration: 2000
									});
								}
							})
							
							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/room/json/out",
							// 	data:{roomid:_this.$store.state.cur_chat_entity.id},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":_this.$store.state.user.id
							// 	},
							// 	success(res) {
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {  
							// 			console.log("-----");
							// 			uni.navigateTo({
							// 				url:"/pages/index/index?nav=home"
							// 			})
										
							// 		} else {
							// 			uni.showToast({
							// 			    title: res_data.msg,
							// 			    duration: 2000
							// 			});
							// 		}
							// 	}
							// })
						} 
					},
				});	
				
				
			},
			edit_pic() {
				uni.navigateTo({
					url:"/pages/chat/group/upd_pic"
				})
			},
			editGroupNotice() {
				uni.navigateTo({
					url:"/pages/chat/group/upd_notice"
				})
			},
			editGroupName() {
				uni.navigateTo({
					url:"/pages/chat/group/upd_name"
				})
			},
			goAddMember() {
				uni.navigateTo({
					url:"/pages/chat/group/add_member"
				})
			},
			goRemoveMember() {
				uni.navigateTo({
					url:"/pages/chat/group/member_list_remove"
				})
			},
			lookNotShimingMemberList() {
				uni.navigateTo({
					url:"/pages/chat/group/not_shiming_member_list"
				})
			},
			lookMemberList(){
				uni.navigateTo({
					url:"/pages/chat/group/member_list"
				})
			},
			
			goMsgRecord() {
				uni.navigateTo({
					url:"/pages/chat/group/message_record"
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
							_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.$store.state.cur_chat_entity.id);
							uni.removeStorageSync(user.id+"#"+_this.$store.state.cur_chat_entity.id+'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list",[]);
							uni.removeStorageSync(user.id+"#"+_this.$store.state.cur_chat_entity.id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+_this.$store.state.cur_chat_entity.id+'_CHAT_MESSAGE_UNREAD');
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
			SwitchC(e) {
				let _this = this;
				this.switchC = e.detail.value;
				let stopSpeak = 0;
				if(e.detail.value) stopSpeak = 1;
				
				
				_this.$http.post("/room/json/uStopSpeak/v1",
					{roomid:_this.$store.state.cur_chat_entity.id,stopSpeak:stopSpeak},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						_this.$store.state.cur_chat_entity.stopSpeak = stopSpeak;
					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/room/json/uStopSpeak/v1",
				// 	data:{roomid:_this.$store.state.cur_chat_entity.id,stopSpeak:stopSpeak},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			_this.$store.state.cur_chat_entity.stopSpeak = stopSpeak;
				// 		} else {
				// 			uni.showToast({
				// 			    title: res_data.msg,
				// 			    duration: 2000
				// 			});
				// 		}
				// 	}
				// })
				
				
			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id+"_darao",e.detail.value);
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
