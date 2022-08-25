<template>
	<view> 
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">查找群组</block><block slot="right">
			
		</block></cu-custom>
		
		<view class="cu-bar bg-white search" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1"  type="text" placeholder="输入群组昵称或ID" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @tap="search()"  class="cu-btn bg-gradual-green shadow-blur round">查找</button>
			</view>
		</view>
		
		<scroll-view scroll-y class="indexes" :style="[{height:'calc(100vh - 100upx)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
		 
		 <view v-if="list.length>0" style="margin-top:10px;" class="cu-list menu"
		  :class="[true?'sm-border':'',false?'card-menu ':'']">
		  
		    <view v-for="item in list" class="cu-item" >
		    	<view  class="content" style="height:120upx;padding-top:18upx;" > 
					<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ item.img +')' }"  style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
					<view style="float:left;">
						<view class="text-grey" style="margin-left: 10px;">{{item.name}}</view>
						<view class="text-grey" style="color:#999;font-size: 24upx; margin-left: 10px;">
						创建者：{{item.owner}}</view>
					</view>
		    		
					<button @tap="goVerify(item.id)" style="float:right;margin-top:8upx" v-if="item.status==0" class="cu-btn">申请加入</button>
					<text v-else-if="item.status==1" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" v-else>已加入</text>
					<text v-else-if="item.status==2" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" v-else>等待验证</text>
		    	</view>
		    </view>  
			
				


		</view>	
		 
			
			<view v-else  style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" >
				暂无信息
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
				kw:"",
				kw1:""
			};
		},
		
		onReady() {
		
			
		},
		methods: {
			goVerify(_uuid){
				uni.navigateTo({
					url:"/pages/addressBook/group/add_verify?uuid="+_uuid
				})
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
					    title: '请输入关键字'
					});
					return;
				}
				this.kw = this.kw1;
				
				this.$http.post("/room/json/search_list",
					{
						kw:this.kw
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
					} else {
						uni.showToast({
						    icon: 'none',
						    title: res_data.msg
						});
					}
				});
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/room/json/search_list",
				// 	data:{
				// 		kw:this.kw
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			_this.list = res_data.body
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 			    title: res_data.msg
				// 			});
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
