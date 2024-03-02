<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			添加群成员禁言
		</view>


		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw" @input="search_list()" type="text" placeholder="搜索" confirm-type="search"></input>
			</view>

		</view>

		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">


			<view style=" width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view style="display: inline-block;width:20%;margin-bottom:20upx;text-align: center;"
						v-for="(item,index) in list1">
						<view class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic)+');'">
						</view>
						<view
							style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
							{{item.nickName}}
						</view>
						<button @tap="addSss(item.id)" style="margin-top:0upx"
							class="cu-btn round bg-red shadow">禁言</button>
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
		getMemberList,
		uStopSpeakSingle,
		getRoomCfg
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils'
	export default {
		data() {
			return {
				id: "",
				list: [],
				list1: [],
				kw: "",

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
				'reqUrl'
			]),
		},
		mounted() {
			this.initData()
		},
		onLoad(e){},
		methods: {
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			goback() {
				this.$emit('goBack');
			},
			initData() {
				let _this = this;
				console.log("===========load")

				getMemberList({
					roomid: _this.curChatEntity.id,
					memberType: 0
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
						let temp = _this.list.filter((item1) => {
							if (_this.curChatEntity.owner_UUID == item1.id ||
								_this.curChatEntity.memberMgr_ids.indexOf(item1.id) < 0) {
								return false;
							}
							let s = uni.getStorageSync(item1.id + "_NOTE");
							if (s && s != "") {
								item1.nickName = s;
							}
							return true;
						})
						_this.list1 = temp;
						console.log("===========list1", _this.list1)
					}
				}).catch(error => {
					console.log("=====error", error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			addSss(_id) {
				let _this = this;
				uStopSpeakSingle({
					roomid: _this.curChatEntity.id,
					uid: _id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							title: "操作成功",
							duration: 2000
						});

						let nlist = [];
						_this.list.forEach(item => {
							if (item.id != _id) {
								nlist.push(item);
							}
						});
						let nlist1 = [];
						_this.list1.forEach(item => {
							if (item.id != _id) {
								nlist1.push(item);
							}
						});
						_this.list = nlist;
						_this.list1 = nlist1;

					} else {
						uni.showToast({
							title: res_data.msg,
							duration: 2000
						});
					}
				})
			},
			search_list() {
				let _this = this;
				this.list1 = this.list;

				if (this.kw.trim() != "") {
					this.list1 = this.list1.filter((item) => {
						if (_this.curChatEntity.owner_UUID == item.id ||
							_this.curChatEntity.memberMgr_ids.indexOf(item.id) >= 0) {
							return false;
						}
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					})
				} else {
					this.list1 = this.list1.filter((item) => {
						if (_this.curChatEntity.owner_UUID == item.id ||
							_this.curChatEntity.memberMgr_ids.indexOf(item.id) >= 0) {
							return false;
						}
						return true;
					});
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
							if (_this.user.id == _this.owner_UUID) {
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
				}).catch(error => {
					console.log("=====error", error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			}
		}
	}
</script>

<style>

</style>