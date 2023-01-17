<template>
	<view>
		<view v-show="PageCur=='main'">
			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				新的好友
				<text @tap="goSearchFriend()" style="float:right;font-size: 30upx;color: #000; margin-right: 5px;cursor: pointer;" class="lg text-gray ">添加朋友</text>
			</view>
			<scroll-view scroll-y class="indexes" :style="[{height:'calc(100vh - 100upx)'}]"
			 :scroll-with-animation="true" :enable-back-to-top="true">
				 <view v-if="list.length>0" style="margin-top:10px;padding:20upx 0;background: #fff;" class="cu-list menu"
				  :class="[true?'sm-border':'',false?'card-menu ':'']" >
					<view v-for="item in list" class="cu-item"  >
						<view v-if="item.from_member_uuid==$store.state.user.id" class="content">
							<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ item.to_headpic +')' }"  style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
							<text class="text-grey" style="float:left;margin-left: 10px;margin-top:15upx">{{item.to_name}}</text>
							<text v-if="item.status=='wait'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >等待确认</text>
							<text v-if="item.status=='success'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已添加</text>
							<text v-if="item.status=='faile'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已拒绝</text>
							<text v-if="item.status=='pass'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已过期</text>

						</view>
						<view v-if="item.to_member_uuid==$store.state.user.id"  class="content">
							<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ item.from_headpic +')' }"  style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
							<text class="text-grey" style="float:left;margin-left: 10px;margin-top:15upx">{{item.from_name}}</text>
							<button  v-if="item.status=='wait'" @tap="verify(item.id,2)" style="float:right;margin-top:8upx;" class="cu-btn">拒绝</button>
							<button  v-if="item.status=='wait'" @tap="verify(item.id,1)" style="float:right;margin-top:8upx;margin-right: 12upx;background-color: #07C160;color:#fff"
							 class="cu-btn">通过</button>
							<text v-if="item.status=='success'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已添加</text>
							<text v-if="item.status=='faile'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已拒绝</text>
							<view v-if="item.status=='wait'" style="clear: both;
								padding: 16upx 20px;
								color: #999;
								font-size: 26upx;">
								验证内容：{{item.content}}
							</view>
							<text v-if="item.status=='pass'" style="float:right;margin-top:15upx;color:#999;font-size: 26upx;" >已过期</text>
						</view>
					</view>
				</view>
				<view v-else  style="height: 100upx;text-align: center;background: #fff;margin-top: 20upx;line-height: 100upx;color: #999;" >
					暂无好友
				</view>
			</scroll-view>
		</view>
		<friendSearch v-show="PageCur=='search'"  @goBack="showGroup"></friendSearch>
	</view>
</template>

<script>
	export default {
		props: {
			keyid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				list: [],
				kw:"",
				kw1:"",
				PageCur: 'main'
			};
		},
		watch: {
		  keyid: function(newVal,oldVal){
			console.log('----------------------newVal',newVal)
			console.log('---------------------oldVal',oldVal)
			this.initData();
		  }
		},
		onShow() {
			this.initData();
		},
		computed:{
				i18n () {
					return this.$t('index')
			},
			friend_list() {
				let _this = this;
				let nlist = this.$store.state.friend_list;
				if(this.kw.trim()!="") {
					nlist = nlist.filter((item)=>{
						let flag = false;
						item.list = item.list.filter((item1)=>{
							 if(item1.name.indexOf(_this.kw.trim())>=0) {
								 flag = true;
								 return true;
							 }
							 return false;
						 })
						return flag;
					});
				}
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
			/**
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec();
			**/
		},
		methods: {
			initData(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				this.$http.post("/user/friend/add/list/v1",
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}

				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.list = res_data.body;
						let c = 0;
						_this.list.forEach(item=>{
							if(item.status=="wait") {
								c++;
							}
						});
						_this.$store.commit("setUnDoFriendAddCount",c);
					}
				});
			},
			showGroup() {
				this.PageCur = 'main';
			},
			goback () {
				this.$emit('goBack');
			},
			verify(_id, _t){
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: _t==2?'拒绝通过':'验证通过',
				    success: function (res) {
				        if (res.confirm) {

							_this.$http.post("/user/friend/verify/v1",
								{id:_id,t: _t},
								{
									header:{
										"x-access-uid":user.id,
										"x-access-client":_this.$clientType
									}
								}

							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									uni.showToast({
									    icon: 'none',
										position: 'bottom',
									    title: "操作成功"
									});
									_this.$store.commit("setUnDoFriendAddCount",_this.$store.state.unDoFriendAddCount-1);
									_this.initData();
									if(_t==1) {

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
											}
										});

									}
								} else {
									uni.showToast({
									    icon: 'none',
										position: 'bottom',
									    title: res_data.msg
									});
								}
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});

			},
			goSearchFriend(){
				this.PageCur = 'search';
				// uni.navigateTo({
				// 	url:"/pages/addressBook/new_friend/search"
				// })
			},
			goMyGroup() {
				uni.navigateTo({
					url:"/pages/addressBook/group/index"
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
	.content{
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
		color:#333
	}
</style>
