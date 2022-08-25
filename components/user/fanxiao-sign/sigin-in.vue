<template>
	<view>
		<view class="sign_conent_box">
			<view class="sign_conent">
				<view class="sign_conent_title">
					你已连续签到
					<span class="sign_conent_title_span">{{$store.state.signInCnf.curMonthSignInSum}}</span>
					天
				</view>
				<block v-if="sign_list.length>0">
				<view  class="sign_list_aligns">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="scroll_view_items" v-for="(item, index) in sign_list" :key="index">
							<!--  -->
							<view class="scroll_view_itemsv">
								<view class="scroll_view_item">
									<view class="scroll_view_item_img_box">
										<image src="../../../static/sign_bg.png" class="scroll_view_item_img" mode=""></image>
										<view class="scroll_view_item_top">{{ item.discount }}</view>
									</view>
									<view class="scroll_view_item_tips">签到{{ item.day }}天</view>
								</view>
								<view class="scroll_xian" v-show="index !== sign_list.length - 1"></view>
							</view>
						</view>
					</scroll-view>
					<view style="color: #bbb;font-size: 13px;text-align: right;
					    margin-top: 10px;">还可以左右拖拉</view>
				</view>
				<view v-if="$store.state.signInCnf.isToDaySignIn=='0'" class="sign_conent_btn" @tap="cksigin">今日签到</view>	
				<view v-else style="background: #ccc;" class="sign_conent_btn" >今日已签到</view>	
				
				</block>
				<block v-else>
					<view v-if="$store.state.signInCnf.isToDaySignIn=='0'" style="margin-top:40upx;" class="sign_conent_btn" @tap="cksigin">今日签到</view>
					<view v-else style="background: #ccc;margin-top:40upx;" class="sign_conent_btn" >今日已签到</view>	
				</block>
				
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		sign_list: {}
	},
	data() {
		return {};
	},
	methods: {
		cksigin() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			if(user) {
				_this.$http.post("/user/signin/add",
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					} 
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						uni.showToast({
						    title: '签到成功',
						    duration: 2000
						});
						
					} else {
						
						uni.showToast({
							icon:"none",
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})
			}	
			
		}
	}
};
</script>

<style lang="scss">
.sign_conent_box {
	width: 100%;
	display: flex;
	justify-content: center;
	.sign_conent {
		width: 686upx;
		background: white;
		border-radius: 20upx;
		padding: 40upx 32upx;
		box-sizing: border-box;
		.sign_conent_title {
			width: 100%;
			font-size: 36upx;
			font-weight: bold;
			color: #333333;
			.sign_conent_title_span {
				color: #ff6526 !important;
			}
		}
		.sign_list_aligns {
			width: 100%;
			padding: 48upx 0 64upx 0;
			box-sizing: border-box;
			.scroll-view_H {
				width: 100%;
				display: flex;
				white-space: nowrap;
				.scroll_view_items {
					display: inline-block;
				}
				.scroll_view_itemsv {
					display: flex;
				}
				.scroll_view_item {
					.scroll_view_item_img_box {
						width: 108upx;
						height: 108upx;
						position: relative;
						.scroll_view_item_top {
							font-size: 20upx;
							color: #bf8d46;
							font-weight: bold;
							position: absolute;
							top: 32upx;
							width: 100%;
							text-align: center;
							z-index: 1;
						}
						.scroll_view_item_bottom {
							font-size: 12upx;
							color: #ffe29d;
							position: absolute;
							bottom: 18upx;
							left: 42upx;
							z-index: 2;
						}
					}
					.scroll_view_item_tips {
						width: 108upx;
						text-align: center;
						font-size: 26upx;
						padding-top: 16upx;
						color: #333333;
					}
					.scroll_view_item_img {
						width: 108upx;
						height: 108upx;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 0;
					}
				}
				.scroll_xian {
					width: 64upx;
					height: 2upx;
					background: #ffe4d9;
					margin-top: 52upx;
				}
			}
		}
		.sign_conent_btn {
			width: 100%;
			border-radius: 45upx;
			background: linear-gradient(270deg, #fcae3a 0%, #f15d25 100%);
			color: #ffffff;
			text-align: center;
			padding: 22upx 0;
			font-size: 32upx;
		}
	}
}
</style>
