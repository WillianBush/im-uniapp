<template>
	<view>
		<cu-custom  style="background-color: #EF504A;color:rgb(237, 225, 183);"  :isBack="true" ><block slot="backText">返回</block><block slot="content"></block></cu-custom>
		<view style="background-color: #EF504A;color:rgb(237, 225, 183);height:350upx;">
			<view style="padding-top:20upx;text-align: center;">
				<view class="cu-avatar xl round " :style="'background-image: url('+$store.state.img_url+$store.state.temp.bean.fromHeadpic +');'"></view>
				<view style="font-size: 34upx;margin-top:20upx;color:#EDE1B7">{{$store.state.temp.bean.fromName}}发的红包</view>
				<view style="font-size: 34upx;margin-top:20upx;color:#EDE1B7">{{$store.state.temp.bean.descri}}</view>
			</view>
		</view>
		<view style="color:#777;background-color: #F6FBF5;height:70upx;border-bottom: 1px solid #ddd;line-height: 70upx;">
			<view style="float:left;margin-left:20upx;">已领取{{$store.state.temp.bean.openedNumber}}/{{$store.state.temp.bean.number}}个</view>
			<view style="float:right;margin-right:20upx;">共{{numFilter($store.state.temp.bean.openedMoney)}}/{{numFilter($store.state.temp.bean.money)}}元</view>
		</view>
		<scroll-view scroll-y="true"  class="indexes"  :style="'background: #fff;height:calc(100vh - '+CustomBar+'px - 350upx - 70upx)'"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view v-for="(item,index) in $store.state.temp.open_hongbao_list" style="width:94%;margin:auto auto;display: flex;padding:20upx;20upx;height:130upx;border-bottom:1px solid #ddd;">
				<view class="cu-avatar xl round " :style="'background-image: url('+$store.state.img_url+item.member_headpic +');'" style="width:80upx;height:80upx;"></view>
				<view style="flex: 1;margin-left:20upx;margin-top:20upx;">
					<view style="font-weight: 400;">{{item.member_name}}</view>
				</view>
				<view style="flex: 1;text-align: right;">
					<view style="color:#C2261A;font-size: 32upx;">{{numFilter(item.money)}}元</view>
					<view style="color:#888;font-size:24upx;margin-top:10upx;">{{item.datestr}}</view>
				</view>
			</view>

		 </scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		methods: {
			// 第一保留小数点数值后两位，尾数四舍五入
			numFilter (value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(2)
				return realVal
			},
			//第二保留小数点后两位的过滤器，不会四舍五入
			numFilter1 (value) {
			// 截取当前数据到小数点后三位
			let tempVal = parseFloat(value).toFixed(3)
			let realVal = tempVal.substring(0, tempVal.length - 1)
			return realVal
			}
		}
	}
</script>

<style>

</style>
