<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="false">
			<block slot="content">{{i18n.addressbook}}({{memberList.length}})</block>
		</cu-custom>


		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @tap="search()" style="background: #FFAA01;"
					class="cu-btn bg-gradual-green shadow-blur round">{{i18n.searchinput}}</button>
				<button @tap="getRefresh()" style="margin-left:20rpx;background: #3F92F8;"
					class="cu-btn bg-gradual-green shadow-blur round">{{i18n.refresh}}</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'calc(100vh - 100upx - 100upx - 150upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">

			<view style="margin-top:10px;" class="cu-list menu"
				:class="[true?'sm-border':'',false?'card-menu margin-top':'']">
				<view @tap="goNewFriends()" class="cu-item" :class="true?'arrow':''">
					<view class="content">
						<text style="float:left;color:#FCBF00;font-size:50upx"
							class="iconfont icon-tianjiahaoyou"></text>
						<text class="text-grey" style="float:left;margin-left: 10px;">{{i18n.anewfriend}}</text>
						<view v-if="unDoFriendAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">
							{{unDoFriendAddCount}}</view>
					</view>
				</view>
				<view @tap="goMyGroup()" class="cu-item" :class="true?'arrow':''">
					<view class="content">
						<text style="color:#009FE8;font-size:50upx" class="iconfont icon-qunzhong"></text>
						<text class="text-grey" style="margin-left: 10px;">{{i18n.group}}</text>
						<view v-if="unDoRoomAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">
							{{unDoRoomAddCount}}</view>
					</view>
				</view>
				<view @tap="goBlacklist()" class="cu-item" :class="true?'arrow':''">
					<view class="content">
						<text style="color:#999;font-size:50upx" class="iconfont icon-heimingdan"></text>
						<text class="text-grey" style="margin-left: 10px;">{{i18n.blacklist}}</text>
					</view>
				</view>
			</view>

			<block v-for="(item,index) in friend_list" :key="index">
				<view :class="'indexItem-' + item.h" :id="'indexes-' + item.h" :data-index="item.h">
					<view class="padding">{{item.h}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view @tap="goUserDetail(items)" class="cu-item" v-for="(items,index1) in item.list"
							:key="index1">
							<view class="cu-avatar round lg"
								:style="{'backgroundImage': 'url('+getHeadPic(items.headpic) +')' }"
								style="width: 84upx;height: 84upx;background-size: 100% 100%;"></view>
							<view class="content">
								<view class="text-grey">{{items.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="friend_list.length<=0">
				{{i18n.nofriend}}
			</view>
		</scroll-view>
		<view style="bottom:50upx" class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 80px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur"
					@touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	import {
		friendList
	} from '../../common/api';
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
				listCurID: '',
				list: [],
				listCur: '',
				kw: "",
				kw1: "",
				memberList: [], //会员列表
			};
		},
		mounted() {
			this.getRefresh()
		},
		computed: {
			...mapState('user', [
				'user',
				'friendList',
				'unDoFriendAddCount',
				'unDoRoomAddCount'
			]),
			...mapState('app', [
				'imgUrl',
			]),
			...mapState('chat',['memberLength']),
			friend_list() {
				let _this = this;
				if (!this.friendList) return [];
				let nlist = this.friendList;
				if (this.kw.trim() != "") {
					nlist = nlist.filter((item) => {
						let flag = false;
						item.list.filter((item1) => {
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
			},
			i18n() {
				return this.$t('index')
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
				'setMemberLength'
			]),
			getHeadPic(headpic) {
				if (headpic && headpic.indexOf('static/header') != -1) {
					return headpic;
				} else {
					return this.imgUrl + headpic;
				}
			},
			getRefresh() {
				this.kw1 = ""
				console.log("=====getRefresh")
				uni.showLoading({
					title: '加载中'
				});
				let _this = this;
				friendList().then(res => {
					uni.hideLoading()
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.setFriendList(res_data.body)
						res_data.body.forEach(item => {
							let i = {};
							i.name = item.h;
							_this.list.push(i);
						})
						res.data.body.forEach((item, index) => { //循环拿到聊天人员列表name。根据name长度获取人数
							item.list.forEach((item, index) => {
								_this.memberList.push(item.name)
							})
						})
						_this.setMemberLength(_this.memberList.length)
					}
				}).catch(error=>{
					uni.hideLoading()
					console.log("####error:",error)
					
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			goBlacklist() {
				uni.navigateTo({
					url: "/pages/addressBook/blacklist/index"
				})
			},
			goUserDetail(item) {
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + item.member_uuid 
				})
			},
			goNewFriends() {
				uni.navigateTo({
					url: "/pages/addressBook/new_friend/new_friend_list"
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
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 10upx 20upx 20upx 10upx;
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
		padding: 10upx 0;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
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