<template>
	<view class="forget" style="background: #fff;height:100vh">

		<view class="content">
			<!-- 主体 -->
			<view class="main" style="margin-top:40upx; align-items: center;">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<el-input
					v-model="oldPassData"
					type="text"
					maxlength="25"
					placeholder="请输入当前密码"
					style="margin-top:30px;margin-bottom:30px"
				></el-input>
				<el-input
					v-model="passData"
					type="password"
					maxlength="25"
					placeholder="请输入新密码"
					isShowPass
				></el-input>

			</view>

			<wButton
				class="wbutton"
				text="重置密码"
				:rotate="isRotate"
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/user/watch-login/watch-input.vue' //input
	import wButton from '../../components/user/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				oldPassData: "", //旧密码
				passData: "", //密码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			getVerCode(){
				//获取验证码
				if (_this.oldPassData.length != 11) {
					uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});

				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
				},3000)
			},
			startRePass() {
				let _this = this;
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.oldPassData.length < 6) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '密码长度必须大于等于6'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码长度必须大于等于6'
			        });
			        return false;
			    }

				_this.isRotate=true

				this.$http.post("/user/json/repwd",
						{
							oldpwd:_this.oldPassData,
							newpwd:_this.passData,
						},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType,
							}
						}
				).then(res=>{
					_this.isRotate=false;
					let res_data = eval(res.data);
					if(res_data.code == 200){
						uni.showToast({
							title: "修改成功",
							duration: 2000,
							icon: "none",
						});
					}else{
						uni.showToast({
							title: res_data.msg,
							duration: 2000,
							icon: "none",
						});
					}
				})




			}
		}
	}
</script>

<style>
	@import url("../../components/user/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

