<template>
	<view style="background-color: #fff;height: 100vh;" >
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">添加银行卡</block>
		<!--
		<block slot="right">
		<text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</text></block>
		-->
		</cu-custom>
		<view style="background-color: #eee;height:20upx;"> </view>
		<view class="cu-form-group">
			<view class="title">银行名称</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">银行卡类型</view>
			<view style="float:right; color:#aaa;text-align: right;">储蓄卡</view>
		</view>
		<view class="cu-form-group">
			<view class="title">持卡人姓名</view>
			<input v-model="belonger" placeholder="请输入持卡人姓名" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="padding-left:30upx;">银行卡号</view>
			<input v-model="cardCode" placeholder="请输入银行卡号" name="input"></input>
		</view>

		<view style="background-color: #eee;height:20upx;"> </view>

		<button v-show="loading" @tap="tijiao" style="width: 94%;margin: auto auto;margin-top:60upx;" class="cu-btn block bg-red margin-tb-sm lg" loading>提交</button>
		<button v-show="!loading" @tap="tijiao" style="width: 94%;margin: auto auto;margin-top:60upx;" class="cu-btn block bg-red margin-tb-sm lg">提交</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:-1,
				picker: ['工商银行', '中国银行', '农业银行','建设银行','招商银行','交通银行','广发银行'],
				bankCode:['ICBC','BOC','ABC','CCB','CMB','COMM','GDB'],
				belonger:"",
				cardCode:"",
				loading:false,
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;

				if(this.index==-1) {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: "请选择银行"
					});
					return;
				}
				if(this.belonger.trim()=="") {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: "请输入持卡人姓名"
					});
					return;
				}
				if(this.cardCode.trim()=="") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "请输入银行卡号"
					});
					return;
				}

				let v = {
					name:this.picker[this.index],
					code:this.bankCode[this.index],
					belonger:this.belonger,
					cardCode:this.cardCode,
				}
				this.loading = true;

				_this.$http.post("/user/bank/json/add",
					v,
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					_this.loading = false;
					let res_data = eval(res.data);
					if(res_data.code==200) {

						uni.showToast({
						    title: "添加成功",
						    duration: 800
						});

						setTimeout(()=>{
							uni.navigateBack();
						},800);


					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				})


				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/bank/json/add",
				// 	data:v,
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		_this.loading = false;
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {

				// 			uni.showToast({
				// 			    title: "添加成功",
				// 			    duration: 800
				// 			});

				// 			setTimeout(()=>{
				// 				uni.navigateBack();
				// 			},800);


				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 				position: 'bottom',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })

			}
		}
	}
</script>

<style>

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
