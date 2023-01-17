<template>
	<view style="background-color: #fff;height: 100vh;" >
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">手机验证</block>
		<!--
		<block slot="right">
		<text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</text></block>
		-->
		</cu-custom>

		<view style="    font-size: 52upx;
    text-align: center;
    margin-top: 80upx;
    font-weight: 800;">
			{{$store.state.user.telphone}}
		</view>
		<view class="cu-form-group" style="width: 94%;margin: auto auto;
				border-radius: 5px;margin-top:50upx;border-bottom: 1px solid #eee;" >
			<view class="title">验证码</view>
			<input v-model="code" style="" placeholder="输入手机验证码" name="input"></input>
			<button @tap="getVerCode" class='cu-btn bg-green shadow'>{{getVerCodeSecond}}</button>
		</view>

		<button @tap="verifySmsCode" style="width: 94%;margin: auto auto;margin-top:50upx;" class="cu-btn block bg-red margin-tb-sm lg" :loading="loading">提交验证</button>

	</view>
</template>

<script>
	var  countDown;
	export default {
		data() {
			return {
				isRunCode:false,
				setTime:60,
				second: 0, //倒计时
				codeText:"获取验证码",
				code:"",
				loading:false,
			}
		},
		computed:{
				i18n () {
					return this.$t('index')
			},
			_setTime() {
				//处理值
				const setTime = Number(this.setTime)
				return setTime>0 ? setTime : 60
			},
			getVerCodeSecond(){
				//验证码倒计时计算
				if(this.second<=0){
					return this.codeText;
				}else{
					if(this.second<10){
						return this.second+" s";
					}else{
						return this.second+" s";
					}
				}

			}
		},
		methods: {
			runCode(){
				//开始倒计时
				let _this=this;
				if(this.isRunCode){
					//判断是否开始倒计时，避免重复点击
					return false;
				}
				this.isRunCode= true
				this.second = this._setTime //倒数秒数


				countDown = setInterval(function(){
					_this.second--;
					if(_this.second==0){
						_this.isRunCode= false
						clearInterval(countDown)
					}
				},1000)
			},
			verifySmsCode() {
				let _this = this;
				if (_this.code.trim() == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请输入手机验证码'
				    });
				    return false;
				}
				this.loading = true;
				_this.$http.post("/user/json/verifySmsCode",
					{
						tel:_this.$store.state.user.telphone,
						code:_this.code
					},
					{
						header:{
							//"x-access-uid":user.id
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					this.loading = false;
					let res_data = eval(res.data);
					if(res_data.code==200) {
						uni.navigateTo({
							url:"/pages/mine/wallet/pay_pwd_set?forget_token="+res_data.msg
						})
					}  else {
						uni.showToast({
							icon: 'none',
							title: res_data.msg
						});
					}
				})

			},
			getVerCode(){
				let _this = this;


				if(!this.isRunCode) {

					_this.$http.post("/user/json/sendSms/v1",
						{
							tel:_this.$store.state.user.telphone
						},
						{
							header:{
								//"x-access-uid":user.id
								"x-access-client":_this.$clientType
							}
						}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.runCode();
						}  else {
							uni.showToast({
								icon: 'none',
								title: res_data.msg
							});
						}
					})


				}



			}
		}
	}
</script>

<style>

</style>
