<template>
	<view class="content">
		<cu-custom bgColor="bg-blue"  :isBack="true" ><block slot="backText"></block><block slot="content">设置支付密码</block>
		<!--
		<block slot="right">
		<text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</text></block>
		-->
		</cu-custom>

		<view class="login">
			<view class="l_top" style="margin-bottom:100upx;">
				<view class="l_text" style="">请输入6位支付密码，注意不要重复或连续数字</view>
			</view>
			<view class="l_top">
				<view class="mima">
					<view class="item">
						<view v-if="len<=0" :class="{line:show}"></view>
						<view v-if="len>=1" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==1" :class="{line:show}"></view>
						<view v-if="len>=2" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==2" :class="{line:show}"></view>
						<view v-if="len>=3" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==3" :class="{line:show}"></view>
						<view v-if="len>=4" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==4" :class="{line:show}"></view>
						<view v-if="len>=5" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==5" :class="{line:show}"></view>
						<view v-if="len>=6" class="dot"></view>

					</view>
					<view v-if="len>5" class="dot">{{numlength}}</view>
					<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
					 v-model="trade_pwd" />
				</view>
			</view>
		</view>
		<view class="keypan">
			<view class="titles">
				<span @click="back()">取消</span>
				<span @click='setpwd'>确认</span>
			</view>
			<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key']" v-for="(items,index) in boardlists"
			 :key="index" @click="writepwd(items.id)">{{items.con}}</view>
		</view>



	</view>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';


	export default {

		computed: {
			...mapGetters(['statusBarHeight'])
		},
		data() {
			return {
				forget_toen:"",
				paypwd_old:"",
				trade_pwd: '',
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				nextsteep: false,
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "x",
						checked: false
					},

				]
			};
		},
		onReady(){
		},
		computed: {
				i18n () {
					return this.$t('index')
			},
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的

				}
				return this.trade_pwd.length
			}
		},
		closeChange(res){
			console.log(res)
			//this.text=res
		},
		onLoad(e) {
			// console.log(e.paypwd_old);
			let  _this = this;
			this.paypwd_old = e.paypwd_old;
			this.forget_token = e.forget_token;
		},
		methods: {
			tijiao() {
				console.log(trade_pwd);
			},
			writepwd(num) {
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				this.numarr.push(num);
				if (this.numarr.length > 6) {
					return
				}
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");


			},
			//密码框
			back() {
				//uni.navigateBack();
				this.trade_pwd = "";
				this.numarr = [];
			},
			//回退方法
			close() {
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
			},
			blur1() {
				this.show = false
			},
			focus1() {

				this.show = true
			},

			// 确认执行的方法
			setpwd() {
				let _this = this;
				if (this.trade_pwd.length < 6) {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '密码长度不能少于6位'
					});
					return;
				}
				// 密码长度为6位以后执行方法
				//console.log(this.trade_pwd);
				_this.$http.post("/user/json/updatePayPwd",
					{paypwd:this.trade_pwd,paypwd_old:this.paypwd_old,forget_token:this.forget_token},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.trade_pwd = "";
						_this.numarr = [];
						uni.showToast({
						    title: '设置成功',
						    duration: 2000
						});
						setTimeout(()=>{
							uni.navigateBack();
						},800)
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
				// 	url: _this.$store.state.req_url + "/user/json/updatePayPwd",
				// 	data:{paypwd:this.trade_pwd,paypwd_old:this.paypwd_old},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			_this.trade_pwd = "";
				// 			_this.numarr = [];
				// 			uni.showToast({
				// 			    title: '设置成功',
				// 			    duration: 2000
				// 			});
				// 			setTimeout(()=>{
				// 				uni.navigateBack();
				// 			},800)
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

		}

	};
</script>
<style lang="scss" scoped>
	.content {
		width: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100vh;
		font-weight: 400;

		.keypan {
			width: 100%;
			height: 500upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #E6E6E6;

			.titles {
				width: 100%;
				height: 80upx;
				background: #E6E6E6;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				color: #292824;
				margin:auto auto;
				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.pan_num_key {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				background: #fff;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 80upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);

			}

			.pan_num_checked {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 80upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);
				animation: checked_bg 0.08s ease;
			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			height: 300upx;

			.l_top {
				width: 700upx;
				height: 200upx;
				margin: 0 auto;
				position: relative;

				.l_text {
					width: 445upx;
					height: 69upx;
					line-height: 58upx;
					font-size: 28upx;
					text-align: center;
					margin: auto;
					top: 100upx;
					position: relative;

				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {

			flex-direction: row;
			width: 680upx;
			height: 78upx;
			margin: 0 auto;
			position: relative;

			.item {
				width: 92upx;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				float: left;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #E5E5E5;
				margin-left: 20upx;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
