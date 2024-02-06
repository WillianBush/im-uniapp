<template>
	<view>
		<div style="
		margin: auto auto;
		margin-top: 15px;">
			<div>
				<el-input maxlength="11" v-model="txt" placeholder="请输入手机号" />
			</div>
			<div style="margin-top:30px;text-align: center">
				<el-button type="primary" style="width:130px" @tap="tijiao()">提交</el-button>
			</div>
		</div>

	</view>
</template>

<script>
	import {
		updateTel
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				txt: this.user.telphone
			}
		},
		computed: {
			...mapState('user', [
				'user',
			]),
		},
		methods: {
			...mapMutations('user', ['updateTelPhone']),
			tijiao() {
				let _this = this;
				let user = this.user;
				if (_this.txt.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				updateTel({
					newTel: this.txt,
					u: user.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.updateTelPhone(res_data.msg)
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				}).catch(error => {
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