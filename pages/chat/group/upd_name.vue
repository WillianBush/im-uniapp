<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">修改群昵称</block>
			<block slot="right">
				<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">提交</uni-text>
			</block>
		</cu-custom>

		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
			<input maxlength="-1" v-model="txt" placeholder="请输入昵称" />
		</view>
	</view>
</template>

<script>
	import {
		updateName
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				txt: this.curChatEntity.name
			}
		},
		onLoad(e) {

		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('chat', [
				'curChatEntity',
				'arList',
				'arListShow'
			]),
			...mapState('user', [
				'user',
			]),
		},
		methods: {
			...mapMutations('chat',['setCurChatEntityName']),
			tijiao() {
				let _this = this;
				let user = this.user;

				updateName({
					name: this.txt,
					roomid: this.curChatEntity.roomUUID
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.setCurChatEntityName(res_data.msg)
						_this.arList.forEach(item => {
							if (item.id == _this.curChatEntity.roomUUID) {
								item.title = _this.curChatEntity.name;
								return;
							}
						})
						_this.arListShow.forEach(item => {
							if (item.id == _this.curChatEntity.roomUUID) {
								item.title = _this.curChatEntity.name;
								return;
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				})
			}
		}
	}
</script>

<style>

</style>