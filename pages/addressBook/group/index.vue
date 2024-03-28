<template>
	<view>
		<view v-show="PageCur=='main'">
			<view style="height: 45px;line-height: 45px;background: #eee; font-size: 15px;padding-left: 5px">
				<text class="cuIcon-back" @click="goback()" style="float:left; margin:0 5px;  cursor: pointer;"></text>
				群聊
				<text @tap="goSearch()"
					style="float:right;font-size: 30upx; cursor: pointer;color: #000; font-size: 15px; margin-right: 5px"
					class="lg text-gray ">搜索</text>
			</view>

			<view class="cu-list menu" style="height: 100upx;">
				<view @tap="goRoomAddList()" class="cu-item" :class="true?'arrow':''">
					<view class="content">
						<text style="color:#F56B2D;font-size:54upx;top: 10upx; position: relative;"
							class="iconfont icon-qun-tongguo"></text>
						<text class="text-grey" style="margin-left: 10px;">他人申请加入群组</text>
						<view v-if="unDoRoomAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">
							{{unDoRoomAddCount}}
						</view>
					</view>
				</view>
			</view>

			<view style="height:80upx;line-height: 80upx;text-align: center;font-size: 16px;color:#888">
				{{groupList.length}}个群聊
			</view>
			<scroll-view scroll-y class="indexes" :style="'height:calc(100vh - '+'px - 100upx - 80upx)'"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<block>
					<view class="cu-list menu-avatar no-padding">
						<view @tap="goChat(item)" class="cu-item" v-for="(item,index) in groupList" :key="index">

							<view class="cu-avatar round lg"
								:style="{'backgroundImage': 'url('+getHeadPic(item.img)  +')' }"
								style="width: 30px;height: 30px;background-size: 100% 100%;"></view>
							<view class="content">
								<view class="text-grey">{{item.name}}</view>
							</view>
						</view>
					</view>
				</block>
				<view style="height: 100upx;text-align: center;background: #fff;margin-top: 20upx;line-height: 100upx;
    color: #999;" v-if="groupList.length<=0">
					暂无群聊信息
				</view>
			</scroll-view>
		</view>
		<verifyList v-show="PageCur=='list'" :keyid="randomKeyId" @goBack="showGroup"></verifyList>
		<groupSearch v-show="PageCur=='search'" @goBack="showGroup"></groupSearch>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	import {
		roomList
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils';
	export default {
		props: {
			keyid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				PageCur: 'main',
				randomKeyId: 0
			};
		},
		computed: {
			...mapState('app', [
				'imgUrl',
				'reqUrl',
			]),
			...mapState('user', [
				'user',
				'unDoRoomAddCount',
				'unDoFriendAddCount',
				'groupList'
			]),
		},
		watch: {
			keyid: function(newVal, oldVal) {
				this.fetchData();
			}
		},
		methods: {
			...mapMutations('user', [
				'setGroupList'
			]),
			getHeadPic(headpic) {
				return getHeadPic(headpic,this.imgUrl)
			},
			fetchData() {
				let _this = this;
				roomList({
					type: "1"
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.setGroupList(res_data.body)
						uni.hideLoading()
					} else {
						uni.showToast({
							icon: 'none',
							title: "获取列表失败"
						});
					}
				}).catch(error => {
					console.log("=====error",error)
					
				});
			},
			showGroup() {
				this.PageCur = 'main';
			},
			goback() {
				this.$emit("goBack")
			},
			goRoomAddList() {
				this.PageCur = 'list';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			goSearch() {
				this.PageCur = 'search';
			},
			goChat(item) {
				this.$emit('goGroupChat', item.roomUUID);
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
		color: #333
	}

	.cu-list .cu-item,
	.cu-list.menu-avatar>.cu-item {
		cursor: pointer;
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

	.cu-bar .content {
		text-align: left;
	}
</style>