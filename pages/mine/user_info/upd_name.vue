<template>
	<view>
		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
			<el-input maxlength="-1" v-model="txt" placeholder="请输入昵称" />
		</view>
		<div style="margin-top:30px;text-align: center">
			<el-button type="primary" style="width:130px" @tap="tijiao()">提交</el-button>
		</div>
	</view>
</template>

<script>
	import {
		updateNickName
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				txt: this.user.nickName
			}
		},
		computed: {
			...mapState('user', [
				'user',
			]),
		},
		methods: {
			...mapMutations('user', ['updateUsername']),

			tijiao() {
				let _this = this;
				let user = this.user;

				updateNickName({
					nickName: this.txt,
					u: user.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.updateUsername(res_data.msg)
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				}).catch(error => {
					console.log("=====error",error)
					
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