<template>
	<view>
		<view  style="overflow: scroll">
			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				群组成员({{totalList.length}}人)
			</view>

			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" type="text" placeholder="搜索" confirm-type="search"></input>
				</view>

				<view class="action">
					<button @tap="search()" style="background: #FFAA01;"
						class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
				</view>
			</view>

			<view style="background: #fff;width: 96%;
		margin: auto auto;
		margin-top: 10px;" class="ultra-cover">

				<view class="modal-cover">
					<view @tap="goUserDetail(item.id)"
						style="display: inline-block;width:20%;margin-bottom:20upx;text-align: center;"
						v-for="(item,index) in totalList">
						<view class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic)+');'">
						</view>
						<view
							style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
							{{item.nickName}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getMember,
		getMemberListPage,
		getRoomCfg
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils';
	export default {
		data() {
			return {
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				id: "",
				totalAllListCount: 0,
				totalList: [],
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50, //50条
				status: "more", // 加载状态
				timer: null,
				kw: ""
				
			}
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
			]),
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			this.loadStoreData(this.pageSize, this.numPag);
		},
		methods: {
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			search(a) {
				if (typeof a !== 'undefined' && a != null && a !== '') {
					let _this = this;
					getMember({
						roomid: _this.curChatEntity.id,
						nickname: a,
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							let item = res_data.body;
							if (item) {
								_this.totalList = [];
								_this.totalList = item;
							}
						}
					})
				} else {
					this.refresherrefresh();
				}
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
				//清空
				this.totalList = [];
				this.numPag = 1;
				this.loadStoreData(this.pageSize, this.numPag);
			},
			refresherrestore() {
				console.log('自定义下拉刷新被复位');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort() {
				console.log('自定义下拉刷新被中止    ');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			scrollLower() {
				console.log('我滚动到底部了')
				if (this.numPag >= this.allNum) {
					this.status = "noMore"
					return
				} else {
					this.status = "loading"
				}
				this.numPag = this.numPag + 1;
				this.timer = setTimeout(() => {
					console.log('我滚动到底部了2' + this.numPag)
					this.loadStoreData(this.pageSize, this.numPag);

				}, 1000);
			},
			closeRefresh() {
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},
			loadStoreData(pSize, pNumber) {
				let _this = this;
				getMemberListPage({
					roomid: _this.curChatEntity.id,
					pageSize: pSize, //数量
					pageNumber: pNumber //页数
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let list = res_data.body.records;
						list.forEach((item1) => {
							let s = uni.getStorageSync(item1.id + "_NOTE");
							if (s && s != "") {
								item1.nickName = s;
							}
						})
						_this.totalAllListCount = res_data.body.totalCount;
						_this.totalList = _this.totalList.concat(list);
					}
					_this.closeRefresh();
				})
			},
			goback() {
				this.$emit('goBack');
			},
			search_list() {
				let _this = this;
				this.list1 = this.list;
				if (this.kw.trim() != "") {
					this.list1 = this.list1.filter((item) => {
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					})
				}
			},
			goUserDetail(_id) {
				let _this = this;
				getRoomCfg().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if (res_data.body.lookGroupMemberDetailForRole == 0) {
							flag = true;
						} else if (res_data.body.lookGroupMemberDetailForRole == 1) {
							if (_this.user.id == _this.curChatEntity.owner_UUID) {
								flag = true;
							}
						} else if (res_data.body.lookGroupMemberDetailForRole == 2) {
							if (_this.user.id == _this.curChatEntity.owner_UUID ||
								_this.curChatEntity.memberMgr_ids.indexOf(_this.user.id) >= 0) {
								flag = true;
							}
						}
						if (flag) {
							uni.navigateTo({
								url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this
									.curChatEntity.id
							})
						}
					}
				})
			}
		},
		computed: {},
		watch: {},
	}
</script>

<style>
	.ultra-cover {
		height: 500px;
		overflow: scroll;
	}

	.-webkit-scrollbar {
		/* 隐藏默认的滚动条 */
		-webkit-appearance: none;
	}

	.-webkit-scrollbar:vertical {
		/* 设置垂直滚动条宽度 */
		width: 2px;
	}


	/* 这里不需要用到这个 */
	.-webkit-scrollbar:horizontal {
		/* 设置水平滚动条厚度 */
		height: 2px;
	}

	.-webkit-scrollbar-thumb {
		/* 滚动条的其他样式定制，注意，这个一定也要定制，否则就是一个透明的滚动条 */
		border-radius: 8px;
		border: 2px solid rgba(255, 255, 255, .4);
		background-color: rgba(0, 0, 0, .5);
	}

	.modal-cover {
		width: 100%;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
</style>