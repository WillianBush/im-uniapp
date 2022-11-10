<template>
	<view class="forget" style="background: #fff;height:100vh">
		
		<view class="content">
			<view @tap="back" style="position: relative;
			top: 14px;
			left: 14px;
			color: #666; font-size: 32upx;   ">
				<text style="font-size: 40upx;" class="lg text-gray cuIcon-back"></text>
				</view>
			<!-- 主体 -->
			<view class="main" style="margin-top:40upx; align-items: center;">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="25"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="25"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
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
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
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
				uni.navigateTo({
					url:"login"
				})
			},
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
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
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
			startRePass() {
				let _this = this;
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号或帐号不正确'
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
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				
				_this.isRotate=true
				/***
				uni.request({
					method:"POST",
					url: _this.$store.state.req_url + "/user/json/load/v1",
					header:{
						"Content-Type":"application/x-www-form-urlencoded",
					},
					success(res) {
						let res_data = eval(res.data);
						if(res_data.code==200) {  
							
							_this.isRotate=false
						}
					}
				})
				**/
				
			
				
				
			}
		}
	}
</script>

<style>
	@import url("../../components/user/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

