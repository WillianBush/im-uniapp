<template>
	<view>
		<cu-custom  style="background-color: #EF504A;color:rgb(237, 225, 183);"  :isBack="true" ><block slot="backText"></block><block slot="content">我的红包</block></cu-custom>
		<view style="background-color: #fff;color:rgb(237, 225, 183);height:260upx;">
			<view style="padding-top:20upx;text-align: center;">
				<view class="cu-avatar xl round " :style="'background-image: url('+$store.state.img_url+$store.state.user.headpic +');'"></view>
				<view style="font-size: 30upx;margin-top:20upx;color:#333">{{$store.state.user.nickName}}</view>

			</view>
		</view>
		<view v-show="item_index==1" style="color:#777;background-color: #eee;height:70upx;border-bottom: 1px solid #eee;border-top: 1px solid #eee;line-height: 70upx;">
			<view style="float:left;margin-left:20upx;">共收到 {{$store.state.user.openRedPriceSum}} 元</view>
			<view style="float:right;margin-right:20upx;">抢红包数量 {{$store.state.user.openRedCount}} 个</view>
		</view>
		<view v-show="item_index==2" style="color:#777;background-color: #eee;height:70upx;border-bottom: 1px solid #eee;border-top: 1px solid #eee;line-height: 70upx;">
			<view style="float:left;margin-left:20upx;">共发出 {{$store.state.user.sendRedPriceSum}} 元</view>
			<view style="float:right;margin-right:20upx;">发红包数量 {{$store.state.user.sendRedCount}} 个</view>
		</view>
		<scroll-view @scrolltolower="loadmore1" v-show="item_index==1" scroll-y="true"  class="indexes"  :style="'background: #fff;height:calc(100vh - '+CustomBar+'px - 350upx - 70upx)'"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view v-for="(item,index) in item1_list" style="width:94%;margin:auto auto;display: flex;padding:20upx;20upx;height:130upx;border-bottom:1px solid #ddd;">
				<view style="flex: 1;margin-left:20upx;">
					<view v-if="$store.state.user.id==item.member_id" style="font-weight: 400;">我的{{item.redTypeStr}}</view>
					<view v-else style="font-weight: 400;">{{item.redSenderName}}的{{item.redTypeStr}}</view>
					<view style="color:#888;font-size:24upx;margin-top:20upx;">{{item.createDate}}</view>
				</view>
				<view style="flex: 1;text-align: right;">
					<view style="font-size: 32upx;">{{item.money}}元</view>
				</view>
			</view>
		 </scroll-view>

		 <scroll-view @scrolltolower="loadmore2" v-show="item_index==2" scroll-y="true"  class="indexes"  :style="'background: #fff;height:calc(100vh - '+CustomBar+'px - 350upx - 70upx)'"
		  :scroll-with-animation="true" :enable-back-to-top="true">
		 	<view v-for="(item,index) in item2_list" style="width:94%;margin:auto auto;display: flex;padding:20upx;20upx;height:130upx;border-bottom:1px solid #ddd;">
		 		<view style="flex: 1;margin-left:20upx;">
		 			<view style="font-weight: 400;">{{item.redTypeStr}}</view>
					<view style="color:#888;font-size:24upx;margin-top:20upx;">{{item.createDate}}</view>
		 		</view>
		 		<view style="flex: 1;text-align: right;">
		 			<view style="font-size: 32upx;">{{item.money}}元</view>
					<view v-if="item.openedNumber==item.number" style="color:#888;font-size:24upx;margin-top:20upx;">已领取</view>
					<view v-else style="color:#888;font-size:24upx;margin-top:20upx;">已领{{item.openedNumber}}/{{item.number}}个</view>
		 		</view>
		 	</view>
		  </scroll-view>

		 <view style="display: flex;width:100%;    text-align: center;
    height: 90upx;
    line-height: 90upx;
    font-size: 28upx;">
			 <view @tap="selIndex(1)" :class="item_index==1?'cur':''" style="flex:1;">
				 我收到的
			 </view>
			 <view @tap="selIndex(2)"  :class="item_index==2?'cur':''" style="flex:1">
			 	我发出的
			 </view>
		 </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				item_index:1,
				item1_list:[],
				item1_page:1,
				item2_list:[],
				item2_page:1,
			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad() {
			console.log("来");
			let _this = this;

			_this.$http.post("/red/json/openRecordList/v1",
				{p:_this.item1_page},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.item1_list = res_data.body;

				}
			})


			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/red/json/openRecordList/v1",
			// 	data:{p:_this.item1_page},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		console.log(res_data);
			// 		if(res_data.code==200) {
			// 			_this.item1_list = res_data.body;

			// 		}
			// 	}
			// })

		},
		methods: {
			loadmore1(){
				let _this = this;
				let p = _this.item1_page + 1;

				_this.$http.post("/red/json/openRecordList/v1",
					{p:p},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						if(res_data.body.length>0) {
							_this.item1_page = _this.item1_page + 1;
							_this.item1_list.concat(res_data.body);
						}
					}
				})



				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/red/json/openRecordList/v1",
				// 	data:{p:p},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			if(res_data.body.length>0) {
				// 				_this.item1_page = _this.item1_page + 1;
				// 				_this.item1_list.concat(res_data.body);
				// 			}
				// 		}
				// 	}
				// })
			},
			loadmore2(){
				let _this = this;
				let p = _this.item2_page + 1;

				_this.$http.post("/red/json/sendRecordList/v1",
					{p:p},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						if(res_data.body.length>0) {
							_this.item2_page = _this.item2_page + 1;
							_this.item2_list.concat(res_data.body);
						}
					}
				})



				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/red/json/sendRecordList/v1",
				// 	data:{p:p},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			if(res_data.body.length>0) {
				// 				_this.item2_page = _this.item2_page + 1;
				// 				_this.item2_list.concat(res_data.body);
				// 			}
				// 		}
				// 	}
				// })
			},
			selIndex(i) {
				let _this = this;
				this.item_index = i;
				console.log("id:"+_this.$store.state.user.id);
				if(i==1) {

					_this.$http.post("/red/json/openRecordList/v1",
						{p:_this.item1_page},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.item1_list = res_data.body;

						}
					})

					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/red/json/openRecordList/v1",
					// 	data:{p:_this.item1_page},
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":_this.$store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {
					// 			_this.item1_list = res_data.body;

					// 		}
					// 	}
					// })
				} else {

					_this.$http.post("/red/json/sendRecordList/v1",
						{p:_this.item2_page},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.item2_list = res_data.body;
							console.log(_this.item2_list.length);
						}
					})


					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/red/json/sendRecordList/v1",
					// 	data:{p:_this.item2_page},
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":_this.$store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {
					// 			_this.item2_list = res_data.body;
					// 			console.log(_this.item2_list.length);
					// 		}
					// 	}
					// })
				}
			}
		}
	}
</script>

<style scoped>
	.cur {
		border-bottom:6upx solid #EF504A;
		font-weight: 600;
	}
</style>
