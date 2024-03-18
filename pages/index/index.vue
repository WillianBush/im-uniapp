<template>
	<view style="height: 100vh; margin-left:66px">
		<view class="ws-disconnect" v-show="isCloseNet()">网络已断开，请检查网络稳定性</view>
		
		<home :isBlank="isBlank" v-if="PageCur=='home'" :member="member"></home>
		<addressBook :isBlank="isBlank" v-else-if="PageCur=='addressBook'" @gotoChat="gotoChat"></addressBook>
		<faxian v-else-if="PageCur=='faxian'"></faxian>
		<mine v-else-if="PageCur=='mine'"></mine>
		<view ref="footerView" class="cu-bar tabbar bg-white shadow foot" style="position: fixed; z-index: 9;">
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view class="action" @click="switchNav" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<view class="cu-avatar radius" style="margin-right: 5px; border-radius: 50%"
						:style="'background-image:url('+getHeadPic(user.headpic)+');'"></view>
				</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view class="action" @click="switchNav" data-cur="home">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-xiaoxi" :style="'color:'+(PageCur=='home'?'#3F92F8':'#888')"
						style="font-size: 50upx;"><span></span></text>
					<view v-show="unReadMsgSum>0" style="top:0" class="cu-tag badge">
						{{unReadMsgSum}}
					</view>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='home'?'#3F92F8':'#888')">消息</view>
			</view>
			<view class="action" @click="switchNav" data-cur="addressBook">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-tongxunlu1" :style="'color:'+(PageCur=='addressBook'?'#3F92F8':'#888')"
						style="font-size: 52upx;"><span></span></text>
					<view v-show="(unDoFriendAddCount+unDoRoomAddCount)>0" style="top:0" class="cu-tag badge">
						{{unDoFriendAddCount+unDoRoomAddCount}}
					</view>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='addressBook'?'#3F92F8':'#888')">通讯录</view>
			</view>
			<view class="action" @click="switchNav" data-cur="faxian">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-faxian" :style="'color:'+(PageCur=='faxian'?'#3F92F8':'#888')"
						style="font-size: 50upx;"><span></span></text>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='faxian'?'#3F92F8':'#888')">发现</view>
			</view>
			<view class="action" @click="switchNav" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-wode" :style="'color:'+(PageCur=='mine'?'#3F92F8':'#888')"
						style="font-size: 46upx;"><span></span></text>
				</view>
				<view style="margin-top: 2upx;    padding-top: 4upx;"
					:style="'color:'+(PageCur=='mine'?'#3F92F8':'#888')">我的</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view @click="switchNav" data-cur="hotItem" class="action text-gray">
				<view class='cuIcon-cu-image'>
					<img src="../../static/logo.png" width="50px" height="50px"></img>
				</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		getHeadPic
	} from '../../common/utils';
	export default {
		data() {
			return {
				backButtonPress: 0, //2次退出应用计时
				PageCur: 'home',
				hot_wv: null,
				isBlank: false,
				time_t: new Date().getTime(),
				randomid: 0,
				member:null
			}
		},
		computed: {
			i18n() {
				return this.$t("index");
			},
			...mapState('app', {
				hotItem: state => state.hotItem,
				imgUrl: state => state.imgUrl,
				footerViewHeight: state => state.footerViewHeight
			}),
			...mapState('user', {
				isEmployee: state => state.isEmployee,
				user: state => state.user,
				friendList: state => state.friendList,
				unReadMsgSum: state => state.unReadMsgSum
			}),
			...mapState('socket', {
				isOpenSocket: state => state.isOpenSocket,
				continueCloseCount: state => state.continueCloseCount
			}),
			...mapState('chat', {
				unDoFriendAddCount: state => state.unDoFriendAddCount,
				unDoRoomAddCount: state => state.unDoRoomAddCount
			})
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatEntity',
				'setCurChatMsgList'
			]),
			...mapMutations('app', [
				'setHotItemWebViewShow'
			]),
			...mapActions('app', [
				'getImageDomainAction',
				'getFooterHotItemAction',
				'getSystemInfo',
				'getListWithMidAction'
			]),
			...mapActions('user', [
				'isEmployeeAction',
				'updateUserInfo',
				'getShimingCfgAction',
				'getFriendListAction'
			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			switchNav: function(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");

				if (this.hot_wv) {
					this.hot_wv.hide();
				}
				if (e.currentTarget.dataset.cur == "hotItem") { //最下方群发
					this.randomid = parseInt(Math.random() * 100000000);
					this.setCurChatMsgList([])
				} else if (e.currentTarget.dataset.cur == "mine") { //我的
					this.getShimingCfgAction();
				} else if (e.currentTarget.dataset.cur == "home") {
					this.isBlank = true;
				} else {
					if (e.currentTarget.dataset.cur == "addressBook") { //通讯录
						this.isBlank = true;
						if (
							!this.friendList ||
							this.friendList.length <= 0
						) {
							this.getFriendListAction();
						} else {
							// this.$store.state.friend_list.forEach((item) => {
							//   item.list.forEach((item1) => {
							//     let s = uni.getStorageSync(item1.member_uuid + "_NOTE");
							//     if (s && s != "") {
							//       item1.name = s;
							//     }
							//   });
							// });
						}
					}
				}

				this.setHotItemWebViewShow(e.currentTarget.dataset.cur == "hotItem")

				setTimeout(function() {
					_this.PageCur = e.currentTarget.dataset.cur;
					if (_this.PageCur == "faxian") {
						_this.getListWithMidAction();
					}
				}, 50)

			},
			isCloseNet() {
				if (
					!this.isOpenSocket &&
					this.continueCloseCount > 10
				) {
					return true;
				}
				return false;
			},
			gotoChat(member){
				this.member = member;
				this.PageCur = 'home';
				console.log("======gotoChat:",member)
			}
		},
		mounted() {
			let _this = this;
			//清除当前窗口数据
			this.setCurChatEntity(null);
			this.setCurChatMsgList([]);

			if (!_this.imgUrl) {
				this.getImageDomainAction()
			}

			if (!this.isEmployee) {
				this.isEmployeeAction();
			}
			this.getFooterHotItemAction();


			if (!this.user) {
				let user = uni.getStorageSync("USER");
				if (user) {
					this.updateUserInfo();
				} else {
					uni.reLaunch({
						url: "pages/login/login"
					})
				}

			}
		},
		onBackPress() {
			uni.navigateBack();
			return true;
		}
	}
</script>

<style scoped>
	uni-web-view {
		z-index: 0 !important;
	}

	.ws-disconnect {
		position: fixed;
		top: 0;
		z-index: 99999999999;
		background: #E54D42;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		color: #fff;
		text-align: center;
		font-size: 24upx;
		opacity: .92;
	}
</style>