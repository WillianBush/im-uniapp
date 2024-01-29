<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="content">选择朋友</block>
		</cu-custom>
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view @tap="search()" class="action">
				<button style="background: #FFAA01;" class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'calc(100vh - 100upx - 100upx - 100upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">
			<block v-for="(item,index) in friend_list" :key="index">
				<view :class="'indexItem-' + item.h" :id="'indexes-' + item.h" :data-index="item.h">
					<view class="padding">{{item.h}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view @tap="selFriend(items)" class="cu-item" v-for="(items,index1) in item.list" :key="index1">
							<view class="cu-avatar round lg"
								:style="{'backgroundImage': 'url('+imgUrl+ items.headpic +')' }"
								style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
							<view class="content">
								<view class="text-grey" style="float:left;">{{items.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="friend_list.length<=0">
				暂无好友
			</view>
		</scroll-view>
		<view style="bottom:25upx" class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur"
					@touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>

		<neil-modal :show="show" @close="closeModal" @confirm="sendConfirm" confirm-text="发送" cancel-text="取消">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view style="font-weight: 800;">发送给：</view>
				<view style="margin-top: 16upx;display: flex;">
					<view style="" class="cu-avatar radius" :style="'background-image:url('+imgUrl+temp.bean.img+');'">
					</view>
					<view style="margin-left:20upx;margin-top:10upx;">{{temp.bean.name}}</view>
				</view>
				<view style="margin-top: 14upx;clear:both;font-size: 24upx;color:#999;">[个人名片] {{selFriendBean.name}}
				</view>
			</view>
		</neil-modal>

	</view>
</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {
		createRoom,
		friendList
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		MessageType
	} from '../../../const/MessageType';
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw: "",
				kw1: "",
				ids: [],
				fid: "",
				show: false,
				selFriendBean: {},
			};
		},
		onLoad(e) {
			if (e.fid && e.fid != "") {
				this.fid = e.fid;
				this.ids.push(e.fid)
			}
		},
		mounted() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			if (this.friendList.length <= 0) {
				friendList().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.setFriendList(res_data.body)
						res_data.body.forEach(item => {
							let i = {};
							i.name = item.h;
							_this.list.push(i);
						})

					}
				});
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('chat', [
				'curChatEntity',
				'arList',
				'temp'
			]),
			...mapState('user', [
				'user',
				'userToken',
				'friendList'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			friend_list() {
				let _this = this;
				let nlist = [];
				nlist = this.friendList.concat();
				if (this.kw.trim() != "") {
					nlist = nlist.filter((item) => {
						let flag = false;
						item.list.filter((item1) => {
							if (item1.member_uuid == "-1") {
								return false;
							}
							if (item1.name.indexOf(_this.kw.trim()) >= 0) {
								flag = true;
								return true;
							}
							return false;
						})
						return flag;
					});
				} else {
					nlist = nlist.filter((item) => {
						let flag = false;
						item.list.filter((item1) => {
							if (item1.member_uuid == "-1") {
								return false;
							}
							flag = true;
							return true;
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
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec();

		},
		methods: {
			...mapMutations('user', [
				'setFriendList'
			]),
			...mapMutations('chat', [
				'addArList'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			sendConfirm() {
				if (this.temp.bean.roomUUID && this.temp.bean.roomUUID != "") {
					//群
					this.WEBSOCKET_SEND({
						body: {
							muuid: this.selFriendBean.member_uuid,
							toGroupid: this.temp.bean.id,
							fromUid: this.user.id
						},
						CMD: MessageType.CHAT_SEND_CARD
					});
				} else {
					//私人
					this.WEBSOCKET_SEND({
						body: {
							muuid: this.selFriendBean.member_uuid,
							toUid: this.temp.bean.id,
							fromUid: this.user.id
						},
						CMD: MessageType.CHAT_SEND_CARD
					})
				}
				setTimeout(() => {
					uni.navigateBack();
					setTimeout(() => {
						uni.$emit("scrollTopFn");
					}, 200)
				}, 100)

			},
			closeModal() {
				this.show = false;
			},
			selFriend(item) {
				this.selFriendBean = item;
				this.show = true;
			},
			tijiao() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (this.ids.length == 0) {
					uni.showToast({
						icon: 'none',
						title: "请选择好友"
					});
					return;
				}
				createRoom({
					mids: this.ids.toString()
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.addArList(res_data.body)
						uni.showModal({
							title: '提示',
							content: '创建成功',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									//去群里
									uni.navigateTo({
										url: "/pages/chat/group/index?toid=" + res_data.body.id
									})
								}
							}
						});

					} else {
						uni.showToast({
							icon: 'none',
							title: res_data.msg
						});
					}
				});
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

<style>
	uni-checkbox {
		float: right;
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