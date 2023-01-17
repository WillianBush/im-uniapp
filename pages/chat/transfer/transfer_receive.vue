<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">{{$store.state.user.id==$store.state.temp.bean.fromUid?"我":$store.state.temp.bean.fromName}}的转账详情</block><block slot="right">
		</block></cu-custom>

		<view  :style="'text-align: center;height:calc(100vh - '+CustomBar+'px);background-color: #fff;padding-top:40upx;'">
				<view  class="cu-avatar round lg" :style="'margin:auto auto;width:160upx;height:160upx;background-image: url('+$store.state.img_url+$store.state.temp.bean.fromHeadpic+');'"></view>
				<view v-if="$store.state.temp.bean.status==0" style="font-size: 32upx;
    margin-top: 24upx;" >待收钱</view>
				<view v-if="$store.state.temp.bean.status==1" style="font-size: 32upx;
				margin-top: 24upx;color: green;" >已收款</view>
				<view v-if="$store.state.temp.bean.status==2" style="font-size: 32upx;
				margin-top: 24upx;color: #D81E25;" >已过期，款项已返回</view>
				<view style="    font-size: 70upx;
    font-weight: 600;
    margin-top: 16upx;">¥{{$store.state.temp.bean.money}}</view>

				<view v-if="$store.state.temp.bean.status==0&&$store.state.temp.bean.fromUid!=$store.state.user.id" style="margin-top: 40upx;">
					<button v-show="loading"  class="cu-btn round bg-green shadow" style=" background-color: #60CA37;   width: 80%;height: 40px;"><text class="cuIcon-loading2 cuIconfont-spin" style="font-size: 32upx;"></text>确认收款</button>
					<button v-show="!loading" @tap="clickBtn()" class="cu-btn round bg-green shadow" style=" background-color: #60CA37;   width: 80%;height: 40px;">确认收款</button>

				</view>

	<view v-if="$store.state.temp.bean.status==0" style="    position: relative;
	top: 10px;
	text-align: center;
	width: 100%;
	color: #777;">{{$store.state.temp.bean.expiredTimeStr}}内未确认，将退还给对方</view>


	<view style="    position: fixed;
    bottom: 60upx;
    text-align: center;
    width: 100%;
    color: #777;">转账时间：{{$store.state.temp.bean.createDate}}</view>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad(e) {
			console.log(this.$store.state.temp.bean);
		},
		methods: {
			clickBtn() {
				this.loading = true;
				let _this = this;
				setTimeout(()=>{
					let v = {
					   utid:_this.$store.state.temp.bean.utid,
					   uid:_this.$store.state.user.id,
					}
					_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_TRANSFER_RECEIVE'}");
				},300)


			}
		}
	}
</script>

<style>

</style>
