<template>
	<view> 
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true"><block slot="content">请选择好友</block>
		<block slot="right">
		<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;background: #58BB46;padding:10upx 40upx;border-radius: 6upx;" class="lg text-gray ">发送</uni-text>
		</block>
		</cu-custom>
		
		
		<view class="cu-bar bg-white search" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1"    type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @tap="search()" style="background: #FFAA01;"  class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - 100upx - 100upx - 100upx)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
		  <checkbox-group @change="radioChange" style="width:100%">
			<block v-for="(item,index) in friend_list" :key="index">
				<view :class="'indexItem-' + item.h" :id="'indexes-' + item.h" :data-index="item.h">
					<view class="padding">{{item.h}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view  class="cu-item" v-for="(items,index1) in item.list" :key="index1">
							<!--
							<view class="cu-avatar round lg">{{item.h}}</view>
							-->
							<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ items.headpic +')' }"  style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
							<view class="content">
								<view class="text-grey" style="float:left;">{{items.name}}</view>
								<checkbox :checked="fid==items.member_uuid"  class='round blue '  :value="items.member_uuid"></checkbox>  
								<!--
								<view class="text-gray text-sm">
									有{{sub+2}}个主子需要伺候
								</view>
								-->
							</view>
						</view>
					</view>
				</view>
			</block>
			</checkbox-group>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="friend_list.length<=0">
				暂无可邀请的好友
			</view>
		</scroll-view>
		<view style="bottom:50upx" class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw:"",
				kw1:"",
				ids:[],
				fid:""
			};
		},
		onLoad(e) {
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
			
			if(this.$store.state.friend_list.length<=0) {
				
				_this.$http.post("/user/friend/list/v1",
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						_this.$store.commit("setFriend_list",res_data.body);
						res_data.body.forEach(item=>{
							let i = {};
							i.name = item.h;
							_this.list.push(i);
						})
						
					}
				})
					
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/friend/list/v1",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			_this.$store.commit("setFriend_list",res_data.body);
				// 			res_data.body.forEach(item=>{
				// 				let i = {};
				// 				i.name = item.h;
				// 				_this.list.push(i);
				// 			})
							
				// 		}
				// 	}
				// })
			}
				
			
				
			
			
			
		},
		computed:{
			friend_list() {
				let _this = this;
				let nlist = this.$store.state.friend_list;
				
				nlist = nlist.filter((item)=>{
					let l = item.list.filter((item1)=>{
						let flag = true;
						if(this.kw.trim()!="") {
							if(item1.member_uuid=="-1") {
								return false;							 
							}
							if(item1.name.indexOf(_this.kw.trim())<0) {
								 flag = false;
							}
						} else {
							if(item1.member_uuid=="-1") {
								return false;							 
							}
						}
						 return flag;
					 })
					 console.log("l:"+l.length);
					if(l.length>0) return true;
					else return false;
					 
				});
				
				
				
				this.list = [];
				nlist.forEach(item=>{
					let i = {};
					i.name = item.h;
					_this.list.push(i);
				})
				
				
				return nlist;
			}
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec();
			
		},
		methods: {
			tijiao(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				if(this.ids.length==0) {
					uni.showToast({
					    icon: 'none',
					    title: "请选择好友"
					});
					return;
				}
				// console.log(_this.$store.state.temp.base64);
				
				_this.$http.post("/chat/sendQrcode",
					{
						mids:this.ids.toString(),
						base64:_this.$store.state.temp.base64
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
						_this.$store.state.temp.base64 = "";//清空
						uni.showToast({
							icon:"none",
						    title: '发送成功',
						    duration: 1500
						});
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					} else {
						uni.showToast({
						    icon: 'none',
						    title: res_data.msg
						});
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/chat/sendQrcode",
				// 	data:{
				// 		mids:this.ids.toString(),
				// 		base64:_this.$store.state.temp.base64
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) { 
				// 			_this.$store.state.temp.base64 = "";//清空
				// 			uni.showToast({
				// 				icon:"none",
				// 			    title: '发送成功',
				// 			    duration: 1500
				// 			});
				// 			setTimeout(()=>{
				// 				uni.navigateBack();
				// 			},1500)
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
				
				
			},
			radioChange(e) {
				this.ids = e.target.value;
			},
			showMsg() {
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: "功能未开启"
				});
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

<style >
	uni-checkbox{
		float:right;
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
		color:#333
	}
</style>
