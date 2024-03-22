<template>
	<view>


		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group margin-top">
				<view class="title">男</view>
				<radio :class="radio=='男'?'checked':''" :checked="radio=='男'?true:false" value="男"></radio>
			</view>

			<view class="cu-form-group ">
				<view class="title">女</view>
				<radio :class="radio=='女'?'checked':''" :checked="radio=='女'?true:false" value="女"></radio>
			</view>

		</radio-group>

		<div style="text-align: center;margin-top:20px">
			<el-button type="primary" style="width:130px" @click="tijiao">提交</el-button>
		</div>



	</view>
</template>

<script>
	import {
		updateSex
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				radio: this.user.sex
			}
		},
		computed: {
			...mapState('user', [
				'user',
			]),
		},
		methods: {
			...mapMutations('user', ['updateSex']),
			RadioChange(e) {
				this.radio = e.detail.value
			},
			tijiao() {
				let _this = this;
				let user = this.user;
				updateSex({
					sex: this.radio,
					u: user.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.updateSex(res_data.msg)
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