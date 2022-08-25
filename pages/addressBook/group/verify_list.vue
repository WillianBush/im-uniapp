<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">他人申请入群</block>
		</cu-custom>
		<scroll-view scroll-y class="indexes" :style="[{height:'calc(100vh - 100upx)'}]" :scroll-with-animation="true"
		 :enable-back-to-top="true">

			<view v-if="list.length>0" style="padding:20upx 0;" class="cu-list menu" :class="[true?'sm-border':'',false?'card-menu ':'']">
				<block v-for="item in list">
					<view class="cu-item" style="    display: block;background: #fff;height: 120upx;padding-top:20upx">
						<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ item.user_img +')' }" style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<text class="text-grey" style="float:left;margin-left: 10px;margin-top:15upx">{{item.user_name}}</text>
						<button @tap="verify(item.id,2)" style="float:right;margin-top:8upx;" class="cu-btn">拒绝</button>
						<button @tap="verify(item.id,1)" style="float:right;margin-top:8upx;margin-right: 12upx;background-color: #07C160;color:#fff"
						 class="cu-btn">通过</button>
					</view>
					<view style="clear: both;
				padding: 16upx 20px;
				color: #999;
				font-size: 26upx;background: #fff;">
						申请加入群组：{{item.room_name}}
						<text style="float: right;">{{item.date}}</text>
					</view>
					<view class="margin-bottom" style="clear: both;
				padding: 16upx 20px;
				color: #999;
				font-size: 26upx;background: #fff;padding-bottom:30upx;">
						验证内容：{{item.txt}}
					</view>

				</block>





			</view>


			<view v-else style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;">
				暂无申请信息
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				list: [],
				kw: "",
				kw1: ""
			};
		},
		onShow() {
			this.initData();
		},
		onReady() {},
		methods: {
			initData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				
				this.$http.post("/room/json/verify_list",
					{
						header:{
							"x-access-uid": user.id,
							"x-access-client":_this.$clientType
						}
					}
					
				).then(res=>{
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body
					}
				});
				
				// uni.request({
				// 	method: "POST",
				// 	url: _this.$store.state.req_url + "/room/json/verify_list",
				// 	header: {
				// 		"Content-Type": "application/x-www-form-urlencoded",
				// 		"x-access-uid": user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if (res_data.code == 200) {
				// 			_this.list = res_data.body
				// 		}
				// 	}
				// })
			},
			verify(_id, _t) {
				let _this = this;
				let user = uni.getStorageSync("USER");

				uni.showModal({
					title: '请确认',
					 content: _t==2?'拒绝通过':'验证通过',
					success: function(r) {
						if (r.confirm) {
							
							_this.$http.post("/room/json/verifyDo",
								{
									raid: _id,
									t: _t
								},
								{
									header:{
										"x-access-uid": user.id,
										"x-access-client":_this.$clientType
									}
								}
								
							).then(res=>{
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: "操作成功"
									});
									_this.$store.commit("setUnDoRoomAddCount", _this.$store.state.unDoRoomAddCount-1);
									_this.initData();
									if (_t == 1) {
										//通过
										_this.$store.state.ar_list.forEach(item => {
											if (item.id == res_data.body.id) {
												item.img = res_data.body.img;
												//item.top5Hp = _this.$store.state.cur_chat_entity.top5Hp;
												return;
											}
										})
										_this.$store.state.ar_list_show.forEach(item => {
											if (item.id == res_data.body.id) {
												item.img = res_data.body.img;
												//item.top5Hp = _this.$store.state.cur_chat_entity.top5Hp;
												return;
											} 
										})
									} else if (_t == 2) {
										//拒绝	
									}
								
								} else {
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res_data.msg
									});
								}
							});
							
							// uni.request({
							// 	method: "POST",
							// 	url: _this.$store.state.req_url + "/room/json/verifyDo",
							// 	data: {
							// 		raid: _id,
							// 		t: _t
							// 	},
							// 	header: {
							// 		"Content-Type": "application/x-www-form-urlencoded",
							// 		"x-access-uid": user.id
							// 	},
							// 	success(res) {
							// 		let res_data = eval(res.data);
							// 		if (res_data.code == 200) {
							// 			uni.showToast({
							// 				icon: 'none',
							// 				position: 'bottom',
							// 				title: "操作成功"
							// 			});
							// 			_this.$store.commit("setUnDoRoomAddCount", _this.$store.state.unDoRoomAddCount-1);
							// 			_this.initData();
							// 			if (_t == 1) {
							// 				//通过
							// 				_this.$store.state.ar_list.forEach(item => {
							// 					if (item.id == res_data.body.id) {
							// 						item.img = res_data.body.img;
							// 						//item.top5Hp = _this.$store.state.cur_chat_entity.top5Hp;
							// 						return;
							// 					}
							// 				})
							// 				_this.$store.state.ar_list_show.forEach(item => {
							// 					if (item.id == res_data.body.id) {
							// 						item.img = res_data.body.img;
							// 						//item.top5Hp = _this.$store.state.cur_chat_entity.top5Hp;
							// 						return;
							// 					} 
							// 				})
							// 			} else if (_t == 2) {
							// 				//拒绝	
							// 			}

							// 		} else {
							// 			uni.showToast({
							// 				icon: 'none',
							// 				position: 'bottom',
							// 				title: res_data.msg
							// 			});
							// 		}
							// 	}
							// })
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			goSearchFriend() {
				uni.navigateTo({
					url: "/pages/addressBook/new_friend/search"
				})
			},
			goMyGroup() {
				uni.navigateTo({
					url: "/pages/addressBook/group/index"
				})
			},
			search() {
				this.kw = this.kw1;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	.content {
		clear: both;
	}

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
		color: #333
	}
</style>
