<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true" ><block slot="backText"></block><block slot="content">余额充值</block><block slot="right">
		</block></cu-custom>
		<view class="withdraw">

			<view class="withdraw-head">
				<view class="withdraw-head-to">充值方式</view>
				<view class="withdraw-head-way">
					<view  class="withdraw-head-way-1" style="line-height: 44upx;">
						<!-- <image class="way-icon" :src="$store.state.img_url+'/img_sys/bank_logo/ICBC.png'"></image> -->
						<view class="way-text">{{bank.bankName}}</view>
						<view class="way-text">{{bank.bankCardNum}}</view>
						<view class="way-text">{{bank.bankAccountrer}}</view>

					</view>
					<view class="withdraw-head-way-2">金额最低{{ moneyMin }}元,最高{{moneyMax}}元</view>
				</view>
			</view>
			<view class="withdraw-body">
				<text>充值金额</text>
				<view class="input-money">
					<text class="rmb">￥</text>
					<input v-model.number="extract" type="text" @focus.prevent="stopKeyborad" class="t-input" />
				</view>
				<!--
				<view class="info-money">
					<view>
						<text class="info-money-num" style="color: #888;">充值金额最低{{ moneyMin }}元起,最高{{moneyMax}}元</text>
					</view>
				</view>
				-->
				<view style="margin-top:40upx" :class="'tx' + (is_post ? '-active' : '')"><button  @tap="tijiao">充值</button></view>
			</view>

			<view :class="['keyboard', keyboradShow ? '' : 'active', isIphoneX ? 'isIphone' : '']">
				<block v-for="(item, index) in 9" :key="index">
					<view class="keyboard-item" @tap="keyboradKey(index + 1)">{{ index + 1 }}</view>
				</block>
				<view class="keyboard-item hide"></view>
				<view class="keyboard-item" @tap="keyboradKey(0)"><text>0</text></view>
				<view class="keyboard-item delte" @tap="keyboradDel()"><image class="img" src="@/static/images/del.png" mode="aspectFill" :lazy-load="true"></image></view>
			</view>


		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			extract: '',//输入的金额
			showModal: false,
			is_post: false,
			moneyMin: 0,//最低充值金额
			moneyMax: 0,//最高充值金额
			keyboradShow: false,
			isIphoneX: false,
			isRefuse: false,
			bank:{}
		};
	},
	watch: {
		extract(oldVal, newVal) {}
	},
	onLoad(e) {
		let _this = this;
		let user = uni.getStorageSync("USER");
		this.loadData();



	},
	computed:{
		i18n () {
			return this.$t('index')
		}
	},
	methods: {

		async loadData() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			//const res = await this.$api.json('pool');
			//this.lowest = res.least_money;
			//this.fee = res.fee;
			//this.pool = res.pool;

			_this.$http.post("/user/json/getCzData",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.moneyMin = res_data.body.moneyMin;
					_this.moneyMax = res_data.body.moneyMax;
				} else {
					uni.showToast({
						icon: 'none',
						title: res_data.msg
					});
				}
			})


			_this.$http.post("/sysConfig/json/getBankInfo",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.bank = res_data.body;
				} else {
					uni.showToast({
						icon: 'none',
						title: res_data.msg
					});
				}
			})



			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/getCzData",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			_this.moneyMin = res_data.body.moneyMin;
			// 			_this.moneyMax = res_data.body.moneyMax;
			// 		} else {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: res_data.msg
			// 			});
			// 		}
			// 	}
			// })

			setTimeout(()=>{
				_this.$nextTick(() => {
					_this.keyboradShow = true;
				});
			},100)

		},
		stopKeyborad() {
			uni.hideKeyboard();
		},
		keyboradKey(key) {
			this.extract = this.extract * 10 + key;
			this.checkMoney();
		},
		keyboradDel() {
			if (this.extract && this.extract > 0) {
				let val = parseInt(this.extract / 10);
				if (val == 0) val = '';
				this.extract = val;
				this.checkMoney();
			}
		},

		checkMoney() {
			if (!this.extract || this.extract < this.moneyMin|| this.extract > this.moneyMax) {
				this.is_post = false;
			}  else {
				this.is_post = true;
			}
			if (parseFloat(this.extract).toString() == 'NaN') {
				this.is_post = false;
				uni.showToast({
					icon:"none",
					title:"输入金额不合法"
				})
			}
		},

		tijiao() {
			if(!this.is_post) return;
			let _this = this;
			let user = uni.getStorageSync("USER");
			this.showModal = false;
			if (this.isRefuse) return;

			_this.$http.post("/user/pay/offlinecz",
				{price:_this.extract},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					uni.showModal({
					    title: '信息提示',
					    content: res_data.msg,
						showCancel:false,
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateBack({
					            	delta:1
					            })
					        }
					    }
					});
				} else {
					uni.showToast({
					    title: res_data.msg,
					    duration: 2000
					});
				}
			})

			this.isRefuse = true;
			this.is_post = true;

		}
	},
	onPullDownRefresh() {
		this.extract = '';
		this.loadData();
		this.is_post = false;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 500);
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.withdraw {
	padding: 20px;
	&-head {
		background-color: #f7f7f7;
		display: flex;
		align-content: center;
		padding: 20px 20px;
		font-size: 14px;
		&-to {
			width:140upx;
		}
		&-way {
			display: flex;
			flex-direction: column;
			align-content: center;
			margin-left: 20px;
			&-1 {
				color: #576b95;
				margin-bottom: 10px;
				.way-icon {
					width: 16px;
					height: 16px;
					margin-right: 5px;
					top: 2px;
				}
			}
			&-2 {
				color: #acacac;
				font-size: 12px;
			}
		}
	}
	&-body {
		background-color: #fff;
		padding: 20px 30px;
		font-size: 14px;
		.input-money {
			display: flex;
			align-content: center;
			font-weight: 600;
			border-bottom: 0.5px solid #eaeef1;
			.rmb {
				font-size: 2em;
				top: 10px;
				position: relative;
			}
			.t-input {
				height: 1.9em;
				font-size: 2.5em;
				border: none;
				position: relative;
				left: 3.5%;
				outline: none;
			}
		}
		.info-money {
			margin-top: 10px;
			font-size: 12px;
			margin-bottom: 20px;
			&-num {
				color: #b2b2b2;
			}
			&-all {
				color: #576b95;
			}
		}
		.tx {
			button {
				color: #b2b2b2;
			}
		}
		.tx-active {
			button {
				color: #fff;
				background: #E54D42;
			}
		}
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ebebeb;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition: all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #ebebeb;
		border-top: none;
		border-left: none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
	.fee {
		em {
			font-size: 0.5rem;
			font-style: normal;
		}
	}
}
</style>
