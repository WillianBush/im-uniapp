<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true"><block  slot="content">群聊</block>
		<block slot="right">
			<uni-text  style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">
				<text @click="getList" style="margin-right:20px">刷新</text>
				<text @click="goSearch">搜索</text>
				</uni-text>
		</block>
		</cu-custom>

	<view style="" class="cu-list menu" style="height: 100upx;">
		<view @tap="goRoomAddList()" class="cu-item" :class="true?'arrow':''">
			<view class="content">
				<text style="color:#F56B2D;font-size:54upx;top: 10upx; position: relative;" class="iconfont icon-qun-tongguo"></text>
				<text class="text-grey" style="margin-left: 10px;">他人申请加入群组</text>
				<view v-if="$store.state.unDoRoomAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">{{$store.state.unDoRoomAddCount}}</view>
			</view>
		</view>
	</view>

	<view style="height:80upx;line-height: 80upx;text-align: center;color:#888">
		{{$store.state.group_list.length}}个群聊
	</view>
		<scroll-view scroll-y class="indexes" :style="'height:calc(100vh - '+CustomBar+'px - 100upx - 80upx)'"
		 :scroll-with-animation="true" :enable-back-to-top="true">



			<block >
				<view class="cu-list menu-avatar no-padding">
					<view @tap="goChat(item)" class="cu-item" v-for="(item,index) in $store.state.group_list" :key="index">

						<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ item.img +')' }"  style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<view class="content">
							<view class="text-grey">{{item.name}}</view>
							<!--
							<view class="text-gray text-sm">
								有{{sub+2}}个主子需要伺候
							</view>
							-->
						</view>
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="$store.state.group_list.length<=0">
				暂无群聊信息
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		mounted() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			/**
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
			**/

			this.$http.post("/user/json/room/list",
				{type:"1"},
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}

			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					//_this.list = res_data.body;
					_this.$store.commit("setGroup_list",res_data.body)
				} else {
					uni.showToast({
						icon: 'none',
						title: "获取列表失败"
					});
				}
			});


			// uni.request({
			// 	method:"POST",
			// 	data:{type:"1"},
			// 	url: _this.$store.state.req_url + "/user/json/room/list",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			//_this.list = res_data.body;
			// 			_this.$store.commit("setGroup_list",res_data.body)
			// 		} else {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: "获取列表失败"
			// 			});
			// 		}
			// 	}
			// })


			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/room/json/verify_list",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			//_this.list = res_data.body;
			// 			_this.$store.commit("setGroup_list",res_data.body)
			// 		} else {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: "获取列表失败"
			// 			});
			// 		}
			// 	}
			// })


		},
		onReady() {


		},
		methods: {
			getList(){
				uni.showLoading({
					title: '加载中'
				});
				let _this = this;
				let user = uni.getStorageSync("USER");
				/**
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
				 **/

				this.$http.post("/user/json/room/list",
						{type:"1"},
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}

				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						//_this.list = res_data.body;
						_this.$store.commit("setGroup_list",res_data.body)
						uni.hideLoading()
					} else {
						uni.showToast({
							icon: 'none',
							title: "获取列表失败"
						});
					}
				});
			},
			goRoomAddList() {
				uni.navigateTo({
					url:"/pages/addressBook/group/verify_list"
				})
			},
			goSearch(){
				uni.navigateTo({
					url:"/pages/addressBook/group/search"
				})
			},
			goChat(item) {
				uni.navigateTo({
					url:"/pages/chat/group/index?toid="+item.roomUUID
				})
			}
		}
	}
</script>

<style>


	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.text-grey {
		color:#333
	}

	.cu-list.menu-avatar>.cu-item::after{
		border: 0;
	}
	.cu-list.menu-avatar>.cu-item:before {
	        content: "";
	        position: absolute;
	        right: 0;
	        top: -1px;
	        width: 80%;
	        height: 0.5px;
	        background-color: #f0f0f0;
	}
	 .cu-bar .content {
		text-align: left;
	 }
	.cu-bar{
		display:block!important;
	}
</style>
