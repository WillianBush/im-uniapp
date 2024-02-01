<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">黑名单列表</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">


			<view style=" width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view v-if="item.id!=user.id"
						style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in list">
						<view class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+imgUrl+item.headpic+');'">
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
	export default {
		data() {
			return {
				id: "",
				list: []
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			getBlackList().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			});
		},
		computed: {
			i18n() {
				return this.$t('index')
			},

			...mapState('user', [
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('app', [
				'imgUrl',
			])
		},
		methods: {
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
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: error.msg ? error.msg : "服务器异常!"
								});
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