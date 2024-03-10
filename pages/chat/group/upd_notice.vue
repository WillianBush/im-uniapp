<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			修改群公告
			<text @tap="tijiao()"
				style="float:right;font-size: 30upx;color: #0086b3; margin-right: 10px;cursor: pointer;"
				class="lg text-gray ">提交</text>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="txt" style="height:400upx;color:#000" maxlength="-1" placeholder="输入群公告"></textarea>
		</view>
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
		props: {
			notice: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				txt: this.notice
			}
		},
		computed: {
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
			...mapMutations('chat', ['setCurChatEntityDescri']),
			goback() {
				this.$emit('goBack');
				uni.navigateBack()
				
			},
			tijiao() {
				let _this = this;
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