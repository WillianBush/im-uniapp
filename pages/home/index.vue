<template>
	<view>
		<view @tap="hideShowMenu()" style="padding-top:50upx;background-color: #fff;width: 30%;float: left">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action" style="font-size: 36upx;font-weight: 600;">
					<text class="cuIcon-title text-orange " style="color: green"></text>
					<text style="min-width:73px;">
						消息列表<text style="font-size: 12px;"> ({{delayTimeStr}})</text>
					</text>
				</view>
				<div class="auto-refresh">
					<switch v-if="isEmployee" @change="isOpenRefresh"></switch>
				</div>
				<text @tap.stop="showMenuFn()"
					style="float:right;font-size:48upx;cursor: pointer;color:#333;margin-top:6upx;margin-right:40upx"
					class="iconfont icon-jia"></text>
			</view>
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" @input="search_list()" type="text" placeholder="输入搜索的关键词"
						confirm-type="search"></input>
				</view>
				<button class="refresh-btn" @click="refresherrefresh">刷新</button>

			</view>
			<view v-show="showMenu" :style="super_user==1?'height: 310upx;':'height: 310upx;'" style="position: absolute;
					width: 280upx;
					background: #4A484D;
					top: 140upx;
					left: calc(30% - 87px);
					z-index: 9999;
					border-radius: 12upx;
					color: #fff;
					padding: 20upx;">
				<view @tap.stop="createGroup()" style="float:left;width:98%;padding-bottom:10upx;cursor: pointer;"><text
						style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-liaotian1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">发起群聊</text></view>
				<view  @tap.stop="addFriend()"
					style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;cursor: pointer;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-tianjiahaoyou1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">添加好友</text>
				</view>
				<view  @tap.stop="searchGroup()"
					style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;cursor: pointer;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-chazhao"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">查找群组</text>
				</view>
				<view v-if="super_user==1" @tap.stop="searchUser"
					style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;cursor: pointer;"><text
						style="float:left;font-size:44upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-zuoce-tongxun-gaoliang"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">超级通讯</text></view>
			</view>

			<scroll-view style="height: calc(100vh - 135px);width: 100%;" :scroll-y="modalName==null" class="page"
				:class="modalName!=null?'show':''">
				<view class="cu-list menu-avatar">
					<view style="text-align: center;background: #fff;height: 80px;line-height: 80px;color: #999;"
						v-if="arListShow&&arListShow.length<=0">暂无聊天信息</view>
					<view @tap="goChat(item)" class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
						v-for="(item,index) in arListShow" :key="index" @touchstart="ListTouchStart"
						@touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
						<view v-if="chatCfg.showUserOnline==1"
							:class="{unline_pic:item.typeid=='2'&&item.online==0&&item.id!='-1'}"
							class="cu-avatar round lg" :style="{'backgroundImage': 'url('+getHeadPic(item.img) +')'}">
						</view>
						<view v-else class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+getHeadPic(item.img) +')'}">
						</view>
						<view class="content" style="min-width: 120px;z-index: 20;background: #fff;">
							<view class="text-black">{{item.title}}{{item.typeid == '1' ? '（群聊）' : ''}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut" style="position: relative;top: 4px;">
									<text style="margin-right: 6px;"
										v-if="item.typeid=='2'&&item.online==0&&item.id!='-1'">最近登陆于{{item.lastLoginDate}}
							
									</text>
									<text style="margin-right: 6px;color:red"
										v-if="item.aiteCount>0">-[你有{{item.aiteCount}}条消息]</text>
									{{item.content}}
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{item.createDate}}</view>
							<view v-if="item.unread>0" class="cu-tag round bg-red sm">{{item.unread}}</view>
						</view>
						<view class="move">
							<view v-if="item.top>0" @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
								@tap.stop="zhidingItem(item)" class="bg-grey">置顶</view>
							<view v-else @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
								@tap.stop="cancelZhidingItem(item)" class="bg-grey">取消置顶</view>

							<view @touchend.stop="" @touchmove.stop="" @touchstart.stop="" @tap.stop="removeItem(item)"
								class="bg-red">删除</view>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
		<view v-show="!msgToId && !msgToGroupId && isBlank"
			style="height: 100vh;width: 80%; float: left; border-left: 1px solid #ddd; background:#eee">
			<img src="../../static/logo1.png" width="100px" height="100px"
				style="margin-top: calc(50vh - 50px);margin-left: calc(50% - 50px);"></img>
		</view>

		<view style="height: calc(100vh - 50upx);width: 70%; float: left; border-left: 1px solid #ddd">
			<scroll-view :scroll-y="modalName==null" style="width: 100%" class="page"
				:class="modalName!=null?'show':''">
				<GroupChat :msgToGroupId="msgToGroupId" :toName="toName" :isGroupChat="isGroupChat" :isRandom="random" :msgToId="msgToId"
					@openModal="openModal" @openAtModal="openAtModal"></GroupChat>
			</scroll-view>
		</view>
		<view v-if="visiable"
			style="width: 100%; height: 100%;color:#fff;background-color: #0006; position: fixed;left: 0;top:0; z-index: 10;">
			<text @click="closeModal" class="cuIcon-close"
				style="font-size: 36px; cursor: pointer; position:absolute; top:15px; right: 15px"></text>
			<UserMgr v-if="mgrType=='user'" :mgrId="mgrId" :friendPic="friendPic" :toid="toId"></UserMgr>
			<GroupMgr v-if="mgrType=='group'" :mgrId="mgrId" :toid="toId"></GroupMgr>
			<Aite v-if="mgrType=='at'" :roomid="roomid" @closeModal="closeModal"></Aite>
			<CreateGroup v-if="mgrType=='createGroup'"></CreateGroup>
		</view>
	</view>
</template>

<script>
	import GroupChat from '@/pages/chat/group/index.vue';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		getHeadPic
	} from '../../common/utils';
	export default {
		components: {
			GroupChat
		},
		props: ['isBlank'],
		data() {
			return {
				isGroupChat: false,
				visiable: false,
				msgToId: '',
				msgToGroupId: '',
				mgrId: '',
				friendPic: '',
				toId: '',
				mgrType: 'user',
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				showMenu: false,
				modalName: null,
				gridCol: 3,
				random: 1,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				kw: "",
				list: [],
				super_user: 0,
				roomid: '',
				toName:''
			};
		},
		computed: {
			...mapState('chat', {
				chatCfg: state => state.chatCfg,
				arListShow: state => state.arListShow
			}),
			...mapState('app', ['imgUrl', 'reqUrl']),
			...mapState('socket', {
				delayTime: state => state.delayTime
			}),
			...mapState('user', ['isEmployee']),
			delayTimeStr() {
				if (this.delayTime < 0) {
					return "--"
				}
				return `${this.delayTime}ms`
			}
		},
		watch: {},

		methods: {
			...mapMutations('chat', [
				'setArList'
			]),
			...mapMutations('app', [
				'setOpenRefresh'
			]),
			getHeadPic(img) {
				return getHeadPic(img ,this.imgUrl)
			},
			...mapActions('chat', [
				'listPageAction',
				'scanCode',
				'cancelZhidingItem',
				'zhidingItem',
				'removeItem',
				'searchMsgListAction',
				'getChatCfgAction',
				'setArListShow'
			]),
			...mapActions('user', [
				'isSuperUserAction'
			]),
			isOpenRefresh(e) {
				this.setOpenRefresh(e.detail.value);
			},
			closeModal() {
				this.visiable = false;
			},
			openModal(obj) {
				this.mgrId = obj.id;
				this.mgrType = obj.type;
				this.friendPic = obj.friendPic;
				this.toId = obj.toId;
				this.visiable = true;
			},
			openAtModal(id) {
				this.visiable = true;
				this.mgrType = 'at';
				this.roomid = id;
			},
			refresherrefresh() {
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			refresherrestore() {
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort() {
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			loadStoreData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (user) {
					_this.listPageAction().then(res => {
						_this.closeRefresh();
					}).catch(error => {
						_this.closeRefresh();
					});
				}
			},
			closeRefresh() {
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},
			searchGroup() {
				uni.navigateTo({
					url: "/pages/addressBook/group/search"
				})
				this.showMenu = false;
			},
			cancelZhidingItem(item) {
				this.cancelZhidingItem(item);
				this.ListTouchEnd();
			},
			zhidingItem(item) {
				this.zhidingItem(item);
				this.ListTouchEnd();
			},
			removeItem(item) {
				this.ListTouchEnd();
				//使用setTimeout的目的在于先左移动再进行删除
				setTimeout(function() {
					this.removeItem(item.arid)
				}, 500)
			},
			createGroup() {
				this.showMenu = false;
				this.mgrType = "createGroup";
				this.visiable = true;
			},
			addFriend() {
				uni.navigateTo({
					url: "/pages/addressBook/new_friend/new_friend_list"
				})
				this.showMenu = false;
			},
			hideShowMenu() {
				this.showMenu = false;
			},
			searchUser() {
				uni.navigateTo({
					url: "/pages/super_user/search"
				})
				this.showMenu = false;
			},
			showMenuFn() {
				let _this = this;
				this.isSuperUserAction().then(res => {
					if (res != -1) {
						_this.super_user = res;
					}
				})
				this.showMenu = !this.showMenu;
			},
			search_list() {
				let _this = this;
				let list = this.arList;
				list = list.filter((item) => {
					return item.title.indexOf(_this.kw.trim()) >= 0 || item.subname.indexOf(_this.kw.trim()) >= 0
				});
				ths.setArListShow(list)
			},
			goChat(item) { //打开用户聊天详情
				setTimeout(() => {}, 1000);
				if (item.id == "-1" || item.typeid == "2") {
					this.msgToId = item.id;
					this.isGroupChat = false;
					this.random = this.random + 1
					this.toName = item.title
					console.log("========",this.toName)
				} else {
					this.msgToGroupId = item.id;
					this.isGroupChat = true;
					this.random = this.random + 1
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				if ((e.touches[0].pageX - this.listTouchStart) <= uni.upx2px(-100)) {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
				}

			},

			// ListTouch计算滚动
			ListTouchEnd(e) {

				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null;

			}
		},
		//因为这个home/index.vue是组件形式显示的。所有没有页面的生命周期只有mounted等
		mounted() {
			this.getChatCfgAction();
			this.refresherrefresh()
		}
	}
</script>

<style scoped>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.cu-list.menu-avatar>.cu-item {
		cursor: pointer;
	}

	.cu-list.menu-avatar>.cu-item::after {
		border-bottom: 1px solid #ddd;
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

	.unline_pic {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}

	.refresh-btn {
		background: #FFAA01;
		margin-right: 20rpx;
		font-size: 25rpx;
		font-weight: normal;
		line-height: 25px;
		color: white;
	}

	.auto-refresh {
		margin-left: 10rpx;
		font-size: 25rpx;
		font-weight: normal;
	}
</style>