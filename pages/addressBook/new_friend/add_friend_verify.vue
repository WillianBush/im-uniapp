<template>
	<view> 
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">申请验证</block><block slot="right">
			<uni-text @tap="sendVerify()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">发送</uni-text>
		</block></cu-custom>
		
		<view class="cu-form-group margin-top" style="width: 96%;
    margin: auto auto;
    margin-top: 15px;">
			<textarea style="width:60%" maxlength="-1" v-model="kw" placeholder="请输入验证内容"></textarea>
		</view>
		<view style="    width: 90%;
		    margin: auto auto;
		    color: #999;
		    margin-top: .4rem;
		    font-size: .3rem">你需要发送验证申请，等待对方通过</view>
		
	
		
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
				kw:"",
				kw1:"",
				uuid:""
			};
		},
		
		onLoad(e) {
			this.uuid = e.uuid;
		},
		methods: {
			sendVerify(){
				let _this = this;
				let user = this.$store.state.user;
				let v = {
					txt:this.kw==''?"我是"+user.nickName:this.kw,
					mid:this.uuid
				}
				
				this.$http.post("/user/friend/sendVerify/v1",
					v,
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}
					
				).then(res=>{
					console.log(res.data);
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						// uni.navigateTo({
						// 	url:"/pages/addressBook/new_friend/new_friend_list"
						// })
						//let pages = getCurrentPages(); // 当前页面
						///let beforePage = pages[pages.length - 3];  
						
						uni.showToast({
						    title: "发送成功",
						    duration: 800
						});
						
						setTimeout(()=>{
							uni.navigateBack({
								delta: 2,
								success: function() {
									//beforePage.onLoad(); // 执行前一个页面的onLoad方法
								},
							});
						},800);
						
						
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				});
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/friend/sendVerify/v1",
				// 	data:v,
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		console.log(res.data);
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			// uni.navigateTo({
				// 			// 	url:"/pages/addressBook/new_friend/new_friend_list"
				// 			// })
				// 			//let pages = getCurrentPages(); // 当前页面
				// 			///let beforePage = pages[pages.length - 3];  
							
				// 			uni.showToast({
				// 			    title: "发送成功",
				// 			    duration: 800
				// 			});
							
				// 			setTimeout(()=>{
				// 				uni.navigateBack({
				// 					delta: 2,
				// 					success: function() {
				// 						//beforePage.onLoad(); // 执行前一个页面的onLoad方法
				// 					},
				// 				});
				// 			},800);
							
							
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 				position: 'bottom',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
				
			},
			goSearchFriend(){
				uni.navigateTo({
					url:"/pages/addressBook/new_friend/search"
				})
			},
			goMyGroup() {
				uni.navigateTo({
					url:"/pages/addressBook/group/index"
				})
			},
			search() {
				let _this = this;
				let user = this.$store.state.user;
				if(this.kw1.trim()=="") {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请输入手机号或昵称'
					});
					return;
				}
				this.kw = this.kw1;
				
				this.$http.post("/user/friend/searchByTelOrName/v1",
					{
						txt:this.kw
					},
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}
					
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						_this.list = res_data.body
					}
				});
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/friend/searchByTelOrName/v1",
				// 	data:{
				// 		txt:this.kw
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		console.log(res.data);
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			_this.list = res_data.body
				// 		}
				// 	}
				// })
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
</style>
