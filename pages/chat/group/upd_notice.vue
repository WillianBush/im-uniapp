<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">修改群公告</block>
			<block slot="right">
				<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">提交</uni-text>
			</block>
		</cu-custom>

		<view class="cu-form-group margin-top">
			<textarea v-model="txt" style="height:400upx;" maxlength="-1" placeholder="输入群公告"></textarea>
		</view>

	</view>
</template>

<script>
	import {
		updateDescri
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				txt: this.curChatEntity.descri
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
			...mapMutations('chat',['setCurChatEntityDescri']),
			tijiao() {
				let _this = this;
				let user = this.user;
				updateDescri({
					descri: this.txt,
					roomid: this.curChatEntity.roomUUID
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.setCurChatEntityDescri(res_data.msg);
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>