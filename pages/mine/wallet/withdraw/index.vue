<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true" ><block slot="backText"></block><block slot="content">余额提现</block><block slot="right">
		</block></cu-custom>
		<view class="withdraw">
			
			<view class="withdraw-head">
				<view class="withdraw-head-to">到账渠道</view>
				<view class="withdraw-head-way">
					<view @tap="selBank" class="withdraw-head-way-1">
						<image class="way-icon" :src="$store.state.req_url+'/img_sys/bank_logo/'+ bank.code + '.png'"></image>
						<text class="way-text">{{bank.name}}</text>
						<text style=" 
    overflow: hidden;
    margin-top: 4upx;
    " class="way-text">({{bank.simpleCardCode}})</text>
					</view>
					<view class="withdraw-head-way-2">仅支持整数，72小时内到账</view>
				</view>
			</view>
			<view class="withdraw-body">
				<text>提现金额</text> 
				<view class="input-money">
					<text class="rmb">￥</text>
					<input v-model.number="extract" type="text" @focus.prevent="stopKeyborad" class="t-input" />
				</view>
				<view class="info-money">
					<view v-if="is_out">
						<text class="info-money-num" style="color: #ff1e0f;">输入金额超过可提现余额，账户余额{{ pool }}元</text>
					</view>
					<view v-else-if="is_lowest">
						<text class="info-money-num" style="color: #ff1e0f;">最低{{ lowest }}元起提现，账户余额{{ pool }}元</text>
					</view>
					<view v-else>
						<text class="info-money-num">当前可提现余额{{ pool }}元，</text>
						<text class="info-money-all" @click="getAll">全部提现</text>
					</view>
				</view>
				<view :class="'tx' + (is_post ? '-active' : '')"><button  @click="handleShowModel">提现</button></view>
			</view>

			<view :class="['keyboard', keyboradShow ? '' : 'active', isIphoneX ? 'isIphone' : '']">
				<block v-for="(item, index) in 9" :key="index">
					<view class="keyboard-item" @tap="keyboradKey(index + 1)">{{ index + 1 }}</view>
				</block>
				<view class="keyboard-item hide"></view>
				<view class="keyboard-item" @tap="keyboradKey(0)"><text>0</text></view>
				<view class="keyboard-item delte" @tap="keyboradDel()"><image class="img" src="@/static/images/del.png" mode="aspectFill" :lazy-load="true"></image></view>
			</view>

			<view class="cu-modal" :class="showModal ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end"><view class="content">提现确认</view></view>
					<view class="padding-xl" style="text-align: left;">
						<view>
							<text>提现金额：</text>
							<text class="text-red fee">
								{{ money }}
								<em>元</em>
							</text>
						</view>
						<view class="margin-top-sm">
							<text>实际到账：</text>
							<text class="text-red fee">
								{{ real_money }}
								<em>元</em>
							</text>
						</view>
						<view class="margin-top-sm">
							<text>服务费：</text>
							<text class="text-red fee">
								{{ service_fee }}
								<em>元</em>
							</text>
						</view>
						<view class="margin-top-sm">
							<text>服务费率：</text>
							<text class="text-red">{{ fee }}%</text>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn margin-left" @tap="showModal = false">我再想想</button>
							<button class="cu-btn bg-green margin-left" @tap="getMoney">确认提现</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pool: 0,//用户余额
			extract: '',//输入的金额
			service_fee: 0.0,//服务费
			showModal: false,
			is_out: false,
			is_lowest: false,
			is_post: false,
			lowest: 0,//最低提现金额
			fee: 10,//服务费率%
			money: '',//提现金额
			real_money: '',//实际提现金额
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
		let bank_id = "";
		if(e.bank_id&&e.bank_id.trim()!="") {
			bank_id = e.bank_id.trim();
		} else {
			let str = uni.getStorageSync("last_tx_bank_id");
			if(str&&str.trim()!="") {
				bank_id = str;
			}
		}
		
		_this.$http.post("/user/bank/json/getDefault",
			{id:bank_id},
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
			} else if(res_data.code==201) {  
				uni.showToast({
					icon:"none",
				    title: "请先添加银行卡",
				    duration: 1000
				});
				
				setTimeout(()=>{
					uni.navigateBack();
				},1000);
				
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
		// 	url: _this.$store.state.req_url + "/user/bank/json/getDefault",
		// 	data:{id:bank_id},
		// 	header:{
		// 		"Content-Type":"application/x-www-form-urlencoded",
		// 		"x-access-uid":user.id
		// 	},
		// 	success(res) {
		// 		let res_data = eval(res.data);
		// 		if(res_data.code==200) {  
		// 			_this.bank = res_data.body;
		// 		} else if(res_data.code==201) {  
		// 			uni.showToast({
		// 				icon:"none",
		// 			    title: "请先添加银行卡",
		// 			    duration: 1000
		// 			});
					
		// 			setTimeout(()=>{
		// 				uni.navigateBack();
		// 			},1000);
					
		// 		} else {
		// 			uni.showToast({
		// 				icon: 'none',
		// 				position: 'bottom',
		// 				title: res_data.msg
		// 			});
		// 		}
		// 	}
		// })
		
		
		
	},
	methods: {
		selBank(){
			uni.redirectTo({
				url:"../sel_bank_list"
			})
		}, 
		async loadData() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			//const res = await this.$api.json('pool');
			//this.lowest = res.least_money;
			//this.fee = res.fee;
			//this.pool = res.pool;
			
			_this.$http.post("/user/json/getTxData",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.lowest = res_data.body.txMoneyMin;
					_this.fee = res_data.body.txFee;
					_this.pool = res_data.body.money;
				} else {
					uni.showToast({
						icon: 'none',
						title: res_data.msg
					});
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/getTxData",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.lowest = res_data.body.txMoneyMin;
			// 			_this.fee = res_data.body.txFee;
			// 			_this.pool = res_data.body.money;
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
		getAll() {
			this.extract = parseInt(this.pool);
			this.checkMoney();
		},
		checkMoney() {
			if (!this.extract || this.extract < this.lowest) {
				this.is_lowest = true;
				this.is_post = false;
			} else if (this.extract > this.pool) {
				this.is_out = true;
				this.is_lowest = false;
				this.is_post = false;
			} else {
				this.is_out = false;
				this.is_lowest = false;
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
		handleShowModel() {
			if (this.isRefuse) return;
			this.checkMoney();
			if (!this.is_post) return;
			this.money = this.extract;
			this.service_fee = Number((this.extract * (this.fee / 100)).toString().match(/^\d+(?:\.\d{0,2})?/));
			this.real_money = Number((this.extract - this.service_fee).toString().match(/^\d+(?:\.\d{0,2})?/));
			this.showModal = true;
		},
		getMoney() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			this.showModal = false;
			if (this.isRefuse) return;
			this.isRefuse = true;
			
			
			_this.$http.post("/user/json/txAdd/v1",
				{
					pay:"3",
					money:this.extract,
					bank_name:this.bank.name,
					bank_addr:"",
					bank_belonger:this.bank.belonger,
					bank_code:this.bank.cardCode,
					code:this.bank.code
				},
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.pool = _this.pool - parseFloat(_this.extract)
					_this.extract = '';
					
					uni.showModal({
					    title: '提示',
						showCancel:false,
					    content: '提现申请已提交，请耐心等待审核！',
					    success: function (res) {
					        if (res.confirm) {
					           uni.redirectTo({
									url:"../index"
					           })
					        }
					    }
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res_data.msg
					});
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/txAdd/v1",
			// 	data:{
			// 		pay:"3",
			// 		money:this.extract,
			// 		bank_name:this.bank.name,
			// 		bank_addr:"",
			// 		bank_belonger:this.bank.belonger,
			// 		bank_code:this.bank.cardCode,
			// 		code:this.bank.code
			// 	},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	}, 
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.pool = _this.pool - parseFloat(_this.extract)
			// 			_this.extract = '';
						
			// 			uni.showModal({
			// 			    title: '提示',
			// 				showCancel:false,
			// 			    content: '提现申请已提交，请耐心等待审核！',
			// 			    success: function (res) {
			// 			        if (res.confirm) {
			// 			           uni.redirectTo({
			// 							url:"../index"
			// 			           })
			// 			        }
			// 			    }
			// 			});
			// 		} else {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: res_data.msg
			// 			});
			// 		}
			// 	}
			// })
		}
	},
	onPullDownRefresh() {
		this.extract = '';
		this.loadData();
		this.is_out = false;
		this.is_lowest = false;
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
