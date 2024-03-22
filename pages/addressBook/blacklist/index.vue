<template>
	<view>
		<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			黑名单列表
		</view>
		<view style="background: #fff;width: 96%;margin: auto auto;margin-top: 10px;" class="margin-top">
			<view style=" width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view v-if="item.id!=user.id"
						style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in list">
						<view class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic)+');'">
						</view>
						<view
							style="height:30upx;margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">
							{{item.nickName}}
						</view>
						<button @tap="removeBlack(item.id)" style="margin-top:8upx"
							class="cu-btn round bg-red shadow">移除</button>
					</view>
					<view v-if="list.length<=0" style="text-align: center;color:#aaa">
						<uni-view class="padding">暂无可移除的黑名单</uni-view>
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
		getBlackList,
		removeBlack
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils'
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
				list: []
			}
		},
		computed: {
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			])
		},
		watch: {
			keyid: function(newVal, oldVal) {
				this.fetchData();
			}
		},
		methods: {
			fetchData() {
				let _this = this;
				getBlackList().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
					}
				}).catch(error => {
					console.log("=====error",error)
					
				});
			},
			getHeadPic(headpic) {
				return getHeadPic(headpic, this.imgUrl)
			},
			goback() {
				uni.navigateBack()
			},
			removeBlack(_id) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '要移出此用户吗?',
					success: function(res) {
						if (res.confirm) {

							removeBlack({
								uid: _id
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
									_this.list = nlist;
								}
							}).catch(error => {
								console.log("=====error",error)
								
							});
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>