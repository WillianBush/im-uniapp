<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			移除群组成员
		</view>

		</block></cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">

			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" @input="search_list()" type="text" placeholder="搜索"
						confirm-type="search"></input>
				</view>

			</view>

			<view style=" width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view v-if="item.id!=user.id"
						style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in list1">
						<view @tap="goUserDetail(item.id)" class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic)+');'">
						</view>
						<view @tap="goUserDetail(item.id)"
							style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
							{{item.nickName}}
						</view>
						<button @tap="removeMember(item.id)" style="margin-top:0upx"
							class="cu-btn round bg-red shadow">移除</button>
					</view>
					<view v-if="list.length<=1" style="text-align: center;color:#aaa">
						<uni-view class="padding">暂无可移除的好友</uni-view>
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
		removeMember
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
				id: "",
				list: [],
				list1: [],
				kw: "",
			}
		},
		computed: {
			...mapState('app', [
				'imgUrl'
			]),
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('user', [
				'user',
			]),
		},
		watch: {
			keyid: function(newVal, oldVal) {
				this.loadMemberList()
			}
		},
		onLoad() {
			this.loadMemberList()

		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setArList',
				'setArListShow'
			]),
			getHeadPic(img){
				return getHeadPic(img,this.imgUrl)
			},
			goback() {
				this.$emit('goBack');
				uni.navigateBack()
				
			},
			loadMemberList() {
				let _this = this;
				getMemberList({
					roomid: _this.curChatEntity.id
				}, ).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
						let temp = _this.list.filter((item1) => {
							if (_this.curChatEntity.owner_UUID == item1.id || _this.curChatEntity.memberMgr_ids.indexOf(item1.id) >= 0) {
								return false;
							}
							let s = uni.getStorageSync(item1.id + "_NOTE");
							if (s && s != "") {
								item1.nickName = s;
							}
							return true;
						})
						_this.list1 = temp;
						console.log("=========list:",_this.list1)
					}
				}).catch(error => {
					console.log("=====error",error)
					
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
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.curChatEntity.id
				})
			},
			removeMember(_id) {
				let _this = this;
				uni.showModal({
					title: '请确认',
					content: '要移除此用户吗?',
					success: function(res) {
						if (res.confirm) {
							removeMember({
								roomid: _this.curChatEntity.id,
								mid: _id
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										title: '移除成功',
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
									_this.setCurChatEntity(res_data.body)
									let tempArList = _this.arList
									tempArList.forEach(item => {
										if (item.id == res_data.body.roomUUID) {
											item.img = res_data.body.img
										}
									});
									_this.setArList(tempArList)
									let tempArListShow = _this.arListShow;
									tempArListShow.forEach(item => {
										if (item.id == res_data.body.roomUUID) {
											item.img = res_data.body.img
										}
									})
									_this.setArListShow(tempArListShow)
								}
							}).catch(error => {
								console.log("=====error",error)
								
							})
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>