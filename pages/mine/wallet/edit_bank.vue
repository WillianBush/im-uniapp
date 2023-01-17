<template>
	<view style="background-color: #fff;height: 100vh;" >
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">编辑银行卡</block>
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

		<button v-show="loading" @tap="tijiao" style="width: 94%;margin: auto auto;margin-top:60upx;background-color: #1AA034" class="cu-btn block bg-red margin-tb-sm lg" loading>修改</button>
		<button v-show="!loading" @tap="tijiao" style="width: 94%;margin: auto auto;margin-top:60upx;background-color: #1AA034;" class="cu-btn block bg-red margin-tb-sm lg">修改</button>
		 <button  @tap="remove" style="width: 94%;margin: auto auto;margin-top:40upx;" class="cu-btn block bg-red lg" >删除</button>
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
				id:"",
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad(e) {
			let _this = this;
			let user = this.$store.state.user;
			this.id = e.id;

			_this.$http.post("/user/bank/json/load",
				{id:e.id},
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					let o = res_data.body;
					if(o.code == "ICBC"){_this.index = 0;}
					else if(o.code == "BOC"){_this.index = 1;}
					else if(o.code == "ABC"){_this.index = 2;}
					else if(o.code == "CCB"){_this.index = 3;}
					else if(o.code == "CMB"){_this.index = 4;}
					else if(o.code == "COMM"){_this.index = 5;}
					else if(o.code == "GDB"){_this.index = 6;}
					_this.belonger = o.belonger;
					_this.cardCode = o.cardCode;

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
			// 	url: _this.$store.state.req_url + "/user/bank/json/load",
			// 	data:{id:e.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			let o = res_data.body;
			// 			if(o.code == "ICBC"){_this.index = 0;}
			// 			else if(o.code == "BOC"){_this.index = 1;}
			// 			else if(o.code == "ABC"){_this.index = 2;}
			// 			else if(o.code == "CCB"){_this.index = 3;}
			// 			else if(o.code == "CMB"){_this.index = 4;}
			// 			else if(o.code == "COMM"){_this.index = 5;}
			// 			else if(o.code == "GDB"){_this.index = 6;}
			// 			_this.belonger = o.belonger;
			// 			_this.cardCode = o.cardCode;

			// 		} else {
			// 			uni.showToast({
			// 			    icon: 'none',
			// 				position: 'bottom',
			// 			    title: res_data.msg
			// 			});
			// 		}
			// 	}
			// })
		},
		methods: {
			remove() {
				let _this = this;
				let user = this.$store.state.user;
				uni.showModal({
				    title: '请确认',
				    content: '确认删除吗?',
				    success: function (res) {
				        if (res.confirm) {

							_this.$http.post("/user/bank/json/remove",
								{id:_this.id},
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
										icon:"none",
									    title: "删除成功",
									    duration: 300
									});

									setTimeout(()=>{
										uni.navigateBack();
									},300);


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
							// 	url: _this.$store.state.req_url + "/user/bank/json/remove",
							// 	data:{id:_this.id},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":user.id
							// 	},
							// 	success(res) {
							// 		_this.loading = false;
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {

							// 			uni.showToast({
							// 				icon:"none",
							// 			    title: "删除成功",
							// 			    duration: 300
							// 			});

							// 			setTimeout(()=>{
							// 				uni.navigateBack();
							// 			},300);


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
					},
				});

			},
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
					id:this.id
				}
				this.loading = true;

				_this.$http.post("/user/bank/json/update",
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
						    title: "更新成功",
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
				// 	url: _this.$store.state.req_url + "/user/bank/json/update",
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
				// 			    title: "更新成功",
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
