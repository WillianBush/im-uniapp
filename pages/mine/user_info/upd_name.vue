<template>
	<view>
		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
			<el-input maxlength="-1" v-model="name" placeholder="请输入昵称" />
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
				name: ""
			}
		},
		computed: {
			...mapState('user', [
				'user',
			]),
		},
		mounted() {
				this.name = this.user.nickName
		},
		methods: {
			...mapMutations('user', ['updateUsername']),
			...mapActions('user',['updateUserInfo'])
			tijiao() {
				let _this = this;
				let user = this.user;

				updateNickName({
					nickName: this.name,
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
						_this.updateUserInfo()
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				}).catch(error => {
					console.log("=====error",error)
					
				})
			}
		}
	}
</script>

<style>

</style>