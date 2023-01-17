<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">黑名单列表</block><block slot="right">
		</block></cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">


			<view style=" width:100%">
					<view   style="padding-top:30upx;padding-bottom:30upx;">
						<view v-if="item.id!=$store.state.user.id" style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;" v-for="(item,index) in list">
							<view  class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
							<view style="height:30upx;margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">{{item.nickName}}</view>
							<button  @tap="removeBlack(item.id)" style="margin-top:8upx"  class="cu-btn round bg-red shadow">移除</button>
						</view>
						<view v-if="list.length<=0" style="text-align: center;color:#aaa">
							<uni-view  class="padding">暂无可移除的黑名单</uni-view>
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
				id:"",
				list:[]
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			this.$http.post("/user/json/getBlackList",
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}

			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.list = res_data.body;
				}
			});

			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/getBlackList",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		//console.log(res.data);
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			_this.list = res_data.body;
			// 		}
			// 	}
			// })

		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		methods: {
			removeBlack(_id) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '要移出此用户吗?',
				    success: function (res) {
				        if (res.confirm) {

							this.$http.post("/user/json/removeBlack",
								{uid:_id},
								{
									header:{
										"x-access-uid":_this.$store.state.user.id,
										"x-access-client":_this.$clientType
									}
								}

							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									uni.showToast({
									    title: '移除成功',
									    duration: 2000
									});
									let nlist = [];
									_this.list.forEach(item=>{
										if(item.id!=_id) {
											nlist.push(item);
										}
									});
									_this.list = nlist;
								}
							});

				           // uni.request({
				           // 	method:"POST",
				           // 	url: _this.$store.state.req_url + "/user/json/removeBlack",
				           // 	data:{
				           // 		uid:_id
				           // 	},
				           // 	header:{
				           // 		"Content-Type":"application/x-www-form-urlencoded",
				           // 		"x-access-uid":_this.$store.state.user.id
				           // 	},
				           // 	success(res) {
				           // 		let res_data = eval(res.data);
				           // 		if(res_data.code==200) {
				           // 			uni.showToast({
				           // 			    title: '移除成功',
				           // 			    duration: 2000
				           // 			});
				           // 			let nlist = [];
				           // 			_this.list.forEach(item=>{
				           // 				if(item.id!=_id) {
				           // 					nlist.push(item);
				           // 				}
				           // 			});
				           // 			_this.list = nlist;
				           // 		}
				           // 	}
				           // })
				        }
				    }
				});
			}
		}
	}
</script>

<style>

</style>
