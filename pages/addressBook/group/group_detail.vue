<template>
	<view>
		<cu-custom bgColor="bg-white"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content"></block>
		<!--
		<block v-if="isMyFri" slot="right">
			<text @tap="goMgr(user.id)" style="font-size: 48upx;color: #555;margin-right: 14px;" class="lg text-gray cuIcon-more"><span></span></text>
		</block>
		-->
		</cu-custom>

		<view style="background: #fff;display: flex;height:220upx" >
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left" :style="'height:120upx;width:120upx;background-image:url('+$store.state.img_url+room.img+');'"></view>
			</view>
			<view   style="margin-left: 20upx;">
				<view style="margin:auto auto;font-size:34upx;margin-top:20upx;height:34upx;font-weight: 800;margin-left:20upx">{{room.name}}</view>

				<view style="margin:auto auto;font-size:28upx;margin-top:26upx;height:34upx;margin-left:20upx;color:#777">创建者：{{room.ownerName}}</view>
				<!--
				<view style="margin:auto auto;font-size:28upx;margin-top:16upx;height:34upx;margin-left:20upx;color:#777">地区：--</view>
				-->
			</view>
		</view>

		<view v-if="isRoomMember" @tap="goChat(room.id)" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;" >
				<text style="color: #485D83;font-size: 50upx;position: relative;top:6upx;" class="iconfont icon-icon--"></text>
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">发消息</text>
			</view>
		</view>
		<view v-else @tap="joinRoom()" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;" >
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">申请加入群聊</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				room:{},
				isRoomMember:false,
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad(e) {
			let _this = this;
			let user = uni.getStorageSync("USER");
			this.id = e.id;

			this.$http.post("/room/json/load/v1",
				{roomid:this.id},
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}

			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.room = res_data.body;
				}
			});

			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/room/json/load/v1",
			// 	data:{roomid:this.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			_this.room = res_data.body;
			// 		}
			// 	}
			// })

			this.$http.post("/room/json/isRoomMember",
				{roomid:this.id},
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
						_this.isRoomMember = true;
					}
				}
			});


			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/room/json/isRoomMember",
			// 	data:{roomid:this.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			if(res_data.msg=="1") {
			// 				_this.isRoomMember = true;
			// 			}
			// 		}
			// 	}
			// })


		},
		methods: {
			goMgr(_id) {
				if(!_id){
					uni.showToast({
   icon: 'none',
   title: "操作太快啦，稍作休息。"
});
return
				}
				uni.navigateTo({
					url:"/pages/chat/user/mgr?id="+_id
				})
			},
			joinRoom() {
				uni.navigateTo({
					url:"/pages/addressBook/group/add_verify?uuid="+this.id
				})
			},
			goChat(_id) {
				uni.navigateTo({
					url:"/pages/chat/user/index?toid="+_id
				})
			}

		}
	}
</script>

<style>

</style>
