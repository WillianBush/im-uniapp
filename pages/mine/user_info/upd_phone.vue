<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">修改手机号</block>
			<block slot="right">
				<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">提交</uni-text>
			</block>
		</cu-custom>

		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
			<input maxlength="11" v-model="txt" placeholder="请输入手机号" />
		</view>

	</view>
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
		computed:{
			i18n () {
				return this.$t('index')
			}
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
