<template>
	<view>


		<div  style="
		margin: auto auto;
		margin-top: 15px;">
			<div>
				<el-input maxlength="11" v-model="txt" placeholder="请输入手机号" />
			</div>
			<div style="margin-top:30px;text-align: center">
				<el-button type="primary" style="width:130px" @tap="tijiao()" >提交</el-button>
			</div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt: this.$store.state.user.telphone
			}
		},
		onLoad(e) {

		},
		methods: {
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;
				if (_this.txt.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}

				_this.$http.post("/user/json/updateTel", {
					newTel: this.txt,
					u: user.id
				}, {
					header: {
						"x-access-uid": user.id,
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.$store.state.user.telphone = res_data.msg;
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
