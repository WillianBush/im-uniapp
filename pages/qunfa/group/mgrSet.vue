<template>
	<view v-if="$store.state.cur_chat_entity">
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">群设置</block><block slot="right">
		</block></cu-custom>
		<view style="clear: both;   width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">

	<view  class="cu-form-group">
		<view class="title">群禁言</view>
		<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
	</view>



			<view class="cu-form-group margin-top">
				<view class="title">允许群成员邀请好友入群</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">群聊邀请进群审核验证</view>
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>

			<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID" @tap="goAddRoomMgr()" class="cu-item cu-form-group  arrow" >
				<view class="content">
					<text class="text-grey" style="color:#333">添加群管理</text>
				</view>
			</view>
			<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID" @tap="goRoomMgr()" class="cu-item cu-form-group arrow" >
				<view class="content">
					<text class="text-grey" style="color:#333">群管理列表</text>
				</view>
			</view>


			<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID" class="cu-item margin-top" style="" @tap="dissolveGroup()" >
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">解散群组</text>
				</view>
			</view>

			<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID" class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="showModal()" >
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">转让群组</text>
				</view>
			</view>



		</view>

		<view class="cu-modal " :class="showTransferGroupModal?'show':''" >
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">转让群组</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<input v-model="to_member_id" placeholder="请填写转入用户ID" name="input"></input>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="transferGroup">转让</view>
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

			this.switchC = this.$store.state.cur_chat_entity.stopSpeak==1;

			this.switchA = this.$store.state.cur_chat_entity.yaoqingAble==1;

			this.switchB = this.$store.state.cur_chat_entity.yaoqingAuditAble==1;


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
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		methods: {

			goAddRoomMgr() {
				uni.navigateTo({
					url:"/pages/chat/group/add_room_mgr"
				})
			},
			goRoomMgr() {
				uni.navigateTo({
					url:"/pages/chat/group/room_mgr"
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
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {
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
									console.log("-----");
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
				let _this = this;
				this.switchA = e.detail.value;

				let v = 0;
				if(this.switchA) {
					v = 1;
				}


				_this.$http.post("/room/json/uCnfSet",
					{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAble:v},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.$store.state.cur_chat_entity.yaoqingAble=1;
					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})


				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/room/json/uCnfSet",
				// 	data:{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAble:v},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			_this.$store.state.cur_chat_entity.yaoqingAble=1;
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
				let _this = this;
				this.switchB = e.detail.value;

				let v = 0;
				if(this.switchB) {
					v = 1;
				}


				_this.$http.post("/room/json/uCnfSet",
					{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAuditAble:v},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.$store.state.cur_chat_entity.yaoqingAuditAble=1;
					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})


				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/room/json/uCnfSet",
				// 	data:{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAuditAble:v},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			_this.$store.state.cur_chat_entity.yaoqingAuditAble=1;
				// 		} else {
				// 			uni.showToast({
				// 			    title: res_data.msg,
				// 			    duration: 2000
				// 			});
				// 		}
				// 	}
				// })
			},
		}
	}
</script>

<style>

</style>
