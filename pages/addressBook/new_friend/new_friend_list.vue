<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">新的好友</block>
			<block slot="right">
				<text @tap="goSearchFriend()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">添加朋友</text>
			</block>
		</cu-custom>
		<scroll-view scroll-y class="indexes" :style="[{height:'calc(100vh - 100upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">

			<view v-if="list.length>0" style="margin-top:10px;padding:20upx 0;background: #fff;" class="cu-list menu"
				:class="[true?'sm-border':'',false?'card-menu ':'']">

				<view v-for="item in list" class="cu-item">
					<view v-if="item.from_member_uuid==user.id" class="content">
						<view class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+getHeadPic(item.to_headpic) +')' }"
							style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<text class="text-grey"
							style="float:left;margin-left: 10px;margin-top:15upx">{{item.to_name}}</text>
						<text v-if="item.status=='0'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">等待确认</text>
						<text v-if="item.status=='1'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已添加</text>
						<text v-if="item.status=='2'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已拒绝</text>
						<text v-if="item.status=='3'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已过期</text>

					</view>

					<view v-if="item.to_member_uuid==user.id" class="content">
						<view class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+getHeadPic(item.from_headpic) +')' }"
							style="float:left;width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<text class="text-grey"
							style="float:left;margin-left: 10px;margin-top:15upx">{{item.from_name}}</text>

						<button v-if="item.status=='0'" @tap="verify(item.id,2)" style="float:right;margin-top:8upx;"
							class="cu-btn">拒绝</button>
						<button v-if="item.status=='0'" @tap="verify(item.id,1)"
							style="float:right;margin-top:8upx;margin-right: 12upx;background-color: #07C160;color:#fff"
							class="cu-btn">通过</button>
						<text v-if="item.status=='success'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已添加</text>
						<text v-if="item.status=='faile'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已拒绝</text>
						<view v-if="item.status=='0'" style="clear: both;
						padding: 16upx 20px;
						color: #999;
						font-size: 26upx;">
							验证内容：{{item.content}}
						</view>
						<text v-if="item.status=='3'"
							style="float:right;margin-top:15upx;color:#999;font-size: 26upx;">已过期</text>
					</view>

				</view>
			</view>

			<view v-else style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;">
				暂无好友
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import {
		newFriendList,
		verifyFriend,
		friendList
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

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
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('user', [
				'user',
				'friendList',
				'unDoFriendAddCount'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			friend_list() {
				let _this = this;
				let nlist = this.friendList;
				if (this.kw.trim() != "") {
					nlist = nlist.filter((item) => {
						let flag = false;
						item.list = item.list.filter((item1) => {
							if (item1.name.indexOf(_this.kw.trim()) >= 0) {
								flag = true;
								return true;
							}
							return false;
						})
						return flag;
					});
				}
				this.list = [];
				nlist.forEach(item => {
					let i = {};
					i.name = item.h;
					_this.list.push(i);
				})

				return nlist;
			}
		},
		onReady() {

		},
		methods: {
			getHeadPic(headpic) {
				if (headpic && headpic.indexOf('static/header') != -1) {
					return headpic;
				} else {
					return this.imgUrl + headpic;
				}
			},
			...mapMutations('user', [
				'setUnDoFriendAddCount',
				'setFriendList'
			]),
			initData() {
				let _this = this;
				newFriendList().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
						let c = 0;
						_this.list.forEach(item => {
							if (item.status == "0") {
								c++;
							}
						});
						_this.setUnDoFriendAddCount(c)
					}
				}).catch(error => {
					console.log("####error:",error)
					
				});
			},
			verify(_id, _t) {
				let _this = this;
				uni.showModal({
					title: '请确认',
					content: _t == 2 ? '拒绝通过' : '验证通过',
					success: function(res) {
						if (res.confirm) {
							verifyFriend({
								id: _id,
								t: _t
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: "操作成功"
									});
									_this.setUnDoFriendAddCount(_this.unDoFriendAddCount - 1)
									_this.initData();
									if (_t == 1) {
										friendList().then(res => {
											let res_data = eval(res.data);
											if (res_data.code == 200) {
												_this.setFriendList(res_data.body);
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
							}).catch(error => {
								console.log("####error:",error)
								
							});
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