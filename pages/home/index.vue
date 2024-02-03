<template>
	<view @tap="hideShowMenu()" style="padding-top:50upx;background-color: #fff;">
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" style="font-size: 36upx;font-weight: 600;">
				<text class="cuIcon-title text-green "></text>
				{{$t('index.MessageList')}}(<text> {{delayTime}}</text>)
				<button @tap="refresherrefresh()"
					style="background: #FFAA01;margin-left:30rpx;font-size:25rpx;font-weight:normal;height:22px"
					class="cu-btn bg-gradual-green shadow-blur round">{{ i18n.refresh }}</button>
			</view>
			<text @tap.stop="showMenuFn()"
				style="float:right;font-size:48upx;color:#333;margin-top:6upx;margin-right:40upx"
				class="iconfont icon-jia"></text>
		</view>
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @input="searchList($event.target.value)" type="text" :placeholder="i18n.plsinput"
					confirm-type="search"></input>
			</view>

		</view>
		<!--#ifdef APP-PLUS -->
		<view v-show="showMenu" :style="true?'height: 380upx;':'height: 300upx;'" style="position: absolute;
				width: 280upx;

				background: #4A484D;
				top: 140upx;
				right: 40upx;
				z-index: 9999;
				border-radius: 12upx;
				color: #fff;
				padding: 20upx;">
			<view @tap.stop="scanCode()" style="float:left;width:98%;padding-bottom:10upx;"><text
					style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-saoyisao"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.scan }}</text>
			</view>
			<view @tap.stop="createGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
				<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-liaotian1"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.sponsor }}</text>
			</view>
			<view @tap.stop="addFriend()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
				<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-tianjiahaoyou1"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.add }}</text>
			</view>
			<view @tap.stop="searchGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
				<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-chazhao"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{i18n.search}}</text>
			</view>
			<view @tap.stop="searchUser" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;"><text
					style="float:left;font-size:44upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-zuoce-tongxun-gaoliang"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{i18n.supertel}}</text>
			</view>
		</view>
		<!--#endif -->
		<!--#ifdef H5 -->
		<view v-show="showMenu" :style="super_user==1?'height: 330upx;':'height: 250upx;'" style="position: absolute;
				width: 280upx;

				background: #4A484D;
				top: 140upx;
				right: 40upx;
				z-index: 9999;
				border-radius: 12upx;
				color: #fff;
				padding: 20upx;">
			<view @tap.stop="createGroup()" style="float:left;width:98%;padding-bottom:10upx;"><text
					style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-liaotian1"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.sponsor }}</text>
			</view>
			<view @tap.stop="addFriend()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
				<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-tianjiahaoyou1"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.add }}</text>
			</view>
			<view @tap.stop="searchGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
				<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-chazhao"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.search }}</text>
			</view>
			<view v-if="super_user==1" @tap.stop="searchUser"
				style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;"><text
					style="float:left;font-size:44upx;margin-top:6upx;margin-left:10upx"
					class="iconfont icon-zuoce-tongxun-gaoliang"></text><text
					style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">{{ i18n.supertel }}</text>
			</view>
		</view>
		<!--#endif -->

		<scroll-view style="height: calc(100vh - 100upx - 100upx - 100upx - 50upx);" :scroll-y="modalName==null"
			class="page" :class="modalName!=null?'show':''" :refresher-enabled="true"
			:refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore" @refresherabort="refresherabort" @scrolltolower="scrollLower">
			<view class="cu-list menu-avatar">
				<view style="    text-align: center;
	background: #fff;
    height: 80px;
    line-height: 80px;
    color: #999;" v-if="arListShow&&arListShow.length<=0">{{ i18n.nomore }}</view>
				<view @tap="goChat(item)" class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
					v-for="(item,index) in arListShow" :key="index" @touchstart="ListTouchStart"
					@touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view v-if="chatCfg&&chatCfg.showUserOnline==1"
						:class="{unline_pic:item.typeid=='2'&&item.online==0&&item.id!='-1'}" class="cu-avatar round lg"
						:style="{'backgroundImage': 'url('+getHeadPic(item.img) +')'}">

					</view>
					<view v-else class="cu-avatar round lg"
						:style="{'backgroundImage': 'url('+getHeadPic(item.img) +')'}">

					</view>
					<view class="content">
						<view class="text-black">{{item.title}}{{item.typeid == '1' ?  i18n.groupchat  : ''}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut" style="position: relative;top: 4px;">
								<text style="margin-right: 6px;"
									v-if="item.typeid=='2'&&item.online==0&&item.id!='-1'">{{ i18n.lastlogin }}{{item.lastLoginDate}}
									- </text>
								<text style="margin-right: 6px;color:red"
									v-if="item.aiteCount>0">[{{ i18n.youhave }}{{item.aiteCount}}{{i18n.listmsg}}]</text>
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createDate}}</view>

						<view v-if="item.unread>0" class="cu-tag round bg-red sm">{{item.unread}}</view>
						<view v-else style="font-size: 46upx;color: #ccc;" class="cuIcon-commentfill text-gray"></view>
					</view>
					<view class="move">
						<view v-if="item.top>0" @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
							@tap.stop="zhidingItem(item)" class="bg-grey">{{i18n.totop}}</view>
						<view v-else @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
							@tap.stop="cancelZhidingItem(item)" class="bg-grey">{{i18n.nottop}}</view>

						<view @touchend.stop="" @touchmove.stop="" @touchstart.stop="" @tap.stop="removeItem(item)"
							class="bg-red">{{i18n.delete}}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				showMenu: false,
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				list: [],
				super_user: 0,
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50, //50条
				status: "more", // 加载状态
				timer: null
			};
		},
		computed: {

			i18n() {
				return this.$t('index')
			},
			...mapState('chat',{
				chatCfg:state =>state.chatCfg,
				arListShow:state => state.arListShow
			}),
			...mapState('app',{
				imgUrl:state =>state.imgUrl
			}),
			...mapState('socket',{
				delayTime:state =>state.delayTime
			}),
			delayTime(){
				if(this.$store.state.socket.delayTime < 0){
					return "--"
				}
				return `${this.$store.state.socket.delayTime}ms`
			}
		},
		watch: {

		},
		methods: {
			...mapMutations('chat',[
				'setArList'
			]),
			getHeadPic(headpic) {
				if (headpic && headpic.indexOf('static/header') != -1) {
					return headpic;
				} else {
					return this.imgUrl + headpic;
				}
			},
			...mapActions('chat',[
				'listPageAction',
				'scanCode',
				'cancelZhidingItem',
				'zhidingItem',
				'removeItem',
				'searchMsgListAction',
				'getChatCfgAction'
			]),
			...mapActions('user',[
				'isSuperUserAction'
			]),
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
				//清空
				// this.setArList([]);
				this.numPag = 1;
				this.loadStoreData(this.pageSize, this.numPag);
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
			scrollLower() {
				if (this.numPag >= this.allNum) {
					this.status = "noMore"
					return
				} else {
					this.status = "loading"
				}
				this.numPag = this.numPag + 1;
				this.timer = setTimeout(() => {
					//TODO
					this.loadStoreData(this.pageSize, this.numPag);

				}, 1000);
			},
			loadStoreData(pSize, pNumber) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (user) {
					this.listPageAction({
						pageSize: pSize, //数量
						pageNum: pNumber //页数
					}).then(res=>{
						this.closeRefresh();
					}).catch(error=>{
						this.closeRefresh();
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
				let _this = this;
				let user = uni.getStorageSync("USER");
				this.ListTouchEnd();
				//使用setTimeout的目的在于先左移动再进行删除
				setTimeout(function() {
					this.removeItem(item.arid)
				}, 500)

			},
			createGroup() {
				uni.navigateTo({
					url: "/pages/chat/group/createGroup"
				})
				this.showMenu = false;
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
				this.isSuperUserAction().then(res=>{
					if(res !=-1){
						_this.super_user = res;
					}
				})
				this.showMenu = !this.showMenu;
			},
			searchList(a) {
				if (typeof a !== 'undefined' && a != null && a !== '') {
					this.searchMsgListAction(a);
				} else {
					this.refresherrefresh();
				}
			},
			goChat(item) {
					if (item.id == "-1") {
						uni.navigateTo({
							url: "/pages/chat/guang_fang_chat"
						})
					} else {
						if (item.typeid == "2") {
							uni.navigateTo({
								url: "/pages/chat/user/index?toid=" + item.id
							})
						} else {
							uni.navigateTo({
								url: "/pages/chat/group/index?toid=" + item.id
							})
						}
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
				//console.log(uni.upx2px(-100));
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
			let _this = this;
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

	.cu-list.menu-avatar>.cu-item::after {
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

	.unline_pic {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}
</style>