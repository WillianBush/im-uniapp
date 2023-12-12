<template>
	<view>
		<cu-custom bgColor="bg-orange"  :isBack="true" :nameToLeft="true"><block slot="backText">签到记录</block><block slot="content"></block><block  slot="right">
		</block></cu-custom>
		 <scroll-view @scrolltolower="loadMore" scroll-y="true" :style="'height: calc(100vh - '+CustomBar+'px);padding-bottom: 50upx;'" >
			<view class="list-view" v-if="list.length>0">
				<view class="list-item" v-for="(item, index) in list" :key="index" hover-class="hover" :hover-stay-time="150" bindtap="detail">
					<view class="content-box">
						<view class="des-box">
							<view class="tit" style="font-size: 32upx;">{{ item.dataStr }}</view>
							<view class="time" style="font-size: 28upx;">签到</view>
						</view>
					</view>
					<view  class="money" :class="{ less:  item.coin<0 }">{{ item.coin<0 ? '' : '+' }}{{ item.coin }} 金币</view>
				</view>
			</view>
			<view style="    text-align: center;
    margin-top: 40px;
    color: #999;" v-else>暂无签到记录</view>
		</scroll-view>
	
			
			
		</view>	
	</view> 
</template>
 
<script>
	export default {
		data() {
			return {
				is_withdraw: false,
				loadMoreing:false,
				list:[],//用于显示的
				list1:[],//本月收入
				p1:1,//当为-1时则已经是所有数据都加载完了
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			let _this = this;
			let user = this.$store.state.user;
			_this.$http.post("/user/signin/getList",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				uni.hideLoading();
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.list1 = res_data.body;
					_this.list = _this.list1;
				}
			})
		},
		methods: {
			
			loadMore() {
				if(this.loadMoreing) return;
				this.loadMoreing = true;
				
				let _this = this;
				let user = this.$store.state.user;
				
				this.list = this.list1;
				this.p1 = this.p1 + 1;
				
				
				_this.$http.post("/user/signin/getList",
					{
						p:this.p1
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
						if(res_data.body.length<=0) {
							_this.p1 = -1;
						} else {
							_this.list1 = _this.list1.concat(res_data.body);
							_this.list = _this.list1;
						}
					}
					_this.loadMoreing = false;
				})
				
				
			}	
		}
	}
</script>


<style lang="scss" scoped>
page {
	background-color: #fff;
}
.ns {
	width: 100%;
	height: 60px;
	text-align: center;
	line-height: 200rpx;
	color: white;
	font-size: 34rpx;
	font-weight: bold;
	background: linear-gradient(to right, #ff8440, #ff1e0f);
}
.top {
	margin-top: 20rpx;
}
.flexView {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	.scrollView {
		width: 100%;
		height: 100%;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
		padding-bottom: 116rpx;
		.head-read {
			background: linear-gradient(to right, #ff8440, #ff1e0f);
			background-color: #ff8440;
			padding-bottom: 100rpx;
			.flex {
				display: flex;
				align-items: center;
				padding: 50rpx;
				position: relative;
				.read-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
					overflow: hidden;
					margin-right: 20rpx;
					border: 4rpx solid rgba(255, 255, 255, 0.3);
				}
				.flex-box {
					flex: 1;
					min-width: 0;
					font-size: 26rpx;
					color: #333;
					&-text {
						margin: 10rpx 0;
						color: #f5f5f5;
						font-weight: normal;
					}
				}
				.arrow {
					position: relative;
					padding-right: 30rpx;
					span {
						font-size: 28rpx;
						color: white;
					}
					&:after {
						content: ' ';
						display: inline-block;
						height: 12rpx;
						width: 12rpx;
						border-width: 4rpx 4rpx 0 0;
						border-color: #848484;
						border-style: solid;
						transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
						position: relative;
						top: -4rpx;
						position: absolute;
						top: 50%;
						margin-top: -8rpx;
						right: 4rpx;
						border-radius: 2rpx;
					}
				}
				.arrow-one:after {
					border-color: white;
					margin-top: -6rpx;
				}
			}
		}
		.white-box {
			width: 94%;
			background: white;
			border-radius: 10rpx;
			margin: -120rpx auto 20rpx;
			box-shadow: 0 6rpx 20rpx #e7e7e7;
			.tx {
				padding-top: 26rpx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-content: center;
				&-grid {
					box-sizing: border-box;
					&:first-child {
						margin-left: 40rpx;
					}
					&-comm-sign {
						display: block;
						border-radius: 40rpx 0 0 40rpx;
						font-size: 26rpx;
						padding: 16rpx 44rpx;
						background: linear-gradient(to right, #fef082, #ffc551);
						background-color: #fef082;
						color: #cf4400;
					}
					&-text {
						display: block;
						color: #333;
						font-size: 26rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						.title {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff6423;
						}
						.money {
							font-size: 60rpx;
							color: #ff6423;
							letter-spacing: 2rpx;
							margin-bottom: 10rpx;
							&-b {
								font-size: 28rpx;
							}
						}
					}
				}
			}
			.palace {
				padding-bottom: 20rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				&-grid {
					flex: 1;
					position: relative;
					box-sizing: border-box;
					&:not(:last-child) {
						&:after {
							width: 1rpx;
							height: 80rpx;
							background: #fddece;
							content: ' ';
							display: inline-block;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					&-text {
						display: block;
						text-align: center;
						color: #333;
						font-size: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&-name {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff8a4a;
						}
						&-data {
							font-size: 32rpx;
							color: #ff8a4a;
							letter-spacing: 2rpx;
							margin-bottom: 5rpx;
							&-b {
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
}
.list-view {
	position: relative;
	width: 100%;
	overflow: hidden;
}

.list-item {
	width: 100%;
	padding: 30rpx 28rpx;
	box-sizing: border-box;
	background: #fff;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	border-bottom: 1rpx solid #eaeef1;
}

.item-last::after {
	left: 0 !important;
}

.content-box {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.des-box {
	min-height: 80rpx;
	padding-left: 28rpx;
	box-sizing: border-box;
	vertical-align: top;
	color: #333;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.tit {
	font-size: 30rpx;
	//max-width: 420rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.source {
	margin: 12rpx 0;
}
.time {
	color: #888;
}

.money {
	font-size: 38rpx;
	font-weight: 500;
	color: #ff1e0f;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-left: 20rpx;
}

.less {
	color: #4caf50 !important;
}
.tip {
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	font-size: 24rpx;
	color: #888;
}
</style>

