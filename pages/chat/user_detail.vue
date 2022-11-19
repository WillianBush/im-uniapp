<template>
	<view>
		<!--<cu-custom bgColor="bg-white"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content"></block><block v-if="isMyFri" slot="right">
			<text @tap="goMgr(user.id)" style="font-size: 48upx;color: #555;margin-right: 14px;" class="lg text-gray cuIcon-more"><span></span></text>
		</block></cu-custom>-->

		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
		</view>


		<view style="background: #fff;display: flex;height:220upx" >
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left" :style="'height:120upx;width:120upx;background-image:url('+$store.state.img_url+user.headpic+');'"></view>
			</view>
			<view  v-if="user.id!='-1'" style="margin-left: 20upx;">
				<view @click="copy(user.nickName)" style="margin:auto auto;font-size:34upx;margin-top:20upx;height:34upx;font-weight: 800;margin-left:20upx">{{user.nickName}}
				<text style="font-size:20upx;font-weight: 400;color:#999;" v-if="user.nickName_real&&user.nickName_real!=''">({{user.nickName_real}})</text>
				</view>
				
				<view @click="copy(user.memberId)" style="margin:auto auto;font-size:28upx;margin-top:26upx;height:34upx;margin-left:20upx;color:#777">ID号：{{user.memberId}}</view>
			</view>
			<view  v-else style="margin-left: 20upx;line-height:190upx;">
				<view style="margin:auto auto;font-size:34upx;height:34upx;font-weight: 800;margin-left:20upx">{{user.nickName}}</view>
			</view>
			
			 
		</view> 
		
		<view v-show="showGroupStopSpeak" class="cu-item cu-form-group margin-top">
			<view class="title">禁止在此群发言</view>
			<switch @change="GroupStopSpeak" :class="groupStopSpeak?'checked':''" :checked="groupStopSpeak?true:false"></switch>
		</view>
		
	<block v-if="user.id!=$store.state.user.id">
		<view v-if="isMyFri" @tap="goChat(id)" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;" >
				<text style="color: #485D83;font-size: 50upx;position: relative;top:6upx;" class="iconfont icon-icon--"></text>
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">发消息</text>
			</view>
		</view>	
		
		<view v-else @tap="addFriend(id)" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;" >
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">添加好友</text>
			</view>
		</view>	
	</block>	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				user:{},
				isMyFri:false,
				room_id:"",
				groupStopSpeak:false,
			}
		},
		computed:{
			showGroupStopSpeak() {
				if(this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.owner_UUID&&
					(this.$store.state.cur_chat_entity.owner_UUID==this.id||this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(this.id)>=0)) {
					return false;
				}
				if(this.room_id&&this.room_id!="") {
					if(this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.owner_UUID&&
						(this.$store.state.cur_chat_entity.owner_UUID==this.$store.state.user.id||this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(this.$store.state.user.id)>=0)) {
						return true;
					} 
				}  
				return false;
			}
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;
			if(e.room_id&&e.room_id!=undefined) {
				this.room_id = e.room_id;
				
				
				_this.$http.post("/room/json/isStopSpeak4User",
					{roomid:_this.room_id,uid:_this.id},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						if(res_data.msg=="0") {
							_this.groupStopSpeak = false;
						} else {
							_this.groupStopSpeak = true;
						}
					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				});				
			}
			
			
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
					_this.user = res_data.body;
					let s = uni.getStorageSync(_this.user.id+"_NOTE");
					if(s&&s!="") {
						_this.user.nickName_real = _this.user.nickName;
						_this.user.nickName=s;
					}
				}
			})
					
			_this.$http.post("/user/friend/isMyFri/v1",
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
					if(res_data.msg=="1") {
						_this.isMyFri = true;
					}
				}
			})
		},
		methods: {
			goback () {
				this.$emit('goBack');
			},
			loadData(id,room_id){
				console.log("aaaaaaccccccc","1112223333")
				this.id = id;
				this.room_id = room_id;

				let _this = this;
				if(room_id && room_id!=undefined) {


					_this.$http.post("/room/json/isStopSpeak4User",
							{roomid:_this.room_id,uid:_this.id},
							{
								header:{
									"x-access-uid":_this.$store.state.user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							if(res_data.msg=="0") {
								_this.groupStopSpeak = false;
							} else {
								_this.groupStopSpeak = true;
							}
						} else {
							uni.showToast({
								title: res_data.msg,
								duration: 2000
							});
						}
					});
				}


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
						_this.user = res_data.body;
						let s = uni.getStorageSync(_this.user.id+"_NOTE");
						if(s&&s!="") {
							_this.user.nickName_real = _this.user.nickName;
							_this.user.nickName=s;
						}
					}
				})

				_this.$http.post("/user/friend/isMyFri/v1",
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
						if(res_data.msg=="1") {
							_this.isMyFri = true;
						}
					}
				})

			},
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function () {
						console.log('success');  //调用方法成功
					}
				})
			},
			GroupStopSpeak(e) {
				let _this = this;
				this.groupStopSpeak = e.detail.value;
				
				
				_this.$http.post("/room/json/uStopSpeakSingle",
					{roomid:_this.room_id,uid:_this.id},
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
				// 	url: _this.$store.state.req_url + "/room/json/uStopSpeakSingle",
				// 	data:{roomid:_this.room_id,uid:_this.id},
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
			goMgr(_id) {
				uni.navigateTo({
					url:"/pages/chat/user/mgr?id="+_id
				})
			},
			addFriend(_id) {
				uni.navigateTo({
					url:"/pages/addressBook/new_friend/add_friend_verify?uuid="+_id
				})
			},
			goChat(_id) {
				uni.navigateTo({
					url:"/pages/home/index?id="+_id+"&typeid=2"
				})
			}
			
		}
	}
</script>

<style>

</style>
