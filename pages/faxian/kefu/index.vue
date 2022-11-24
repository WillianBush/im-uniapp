<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">联系客服</block><block slot="right">
		</block></cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">

	<view class="cu-bar bg-white search">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input v-model="kw" @input="search_list()" type="text" placeholder="搜索" confirm-type="search"></input>
		</view>

	</view>
			<view style=" width:100%">
					<view   style="padding-top:30upx;padding-bottom:30upx;">
						<view  style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;" v-for="(item,index) in serviceList1">
							<view class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
							<view  style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">{{item.nickName}}</view>
							<button  @tap="goChat(item)"  style="margin-top:0upx"  class="cu-btn round bg-red shadow">咨询</button>
						</view>
						<view v-if="serviceList1.length<=0" style="text-align: center;color:#aaa">
							<uni-view  class="padding">暂无客服信息</uni-view>
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
				serviceList:[],
				serviceList1:[],
				kw:"",
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			_this.$http.post("/kefu/list",
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {
					_this.serviceList = res_data.body;
					let temp = _this.serviceList.filter((item1)=>{
						let s = uni.getStorageSync(item1.id+"_NOTE");
						if(s&&s!="") {
							item1.nickName=s;
						}
						return true;
					 })
					 _this.serviceList1 = temp;
				}
			})


		},
		methods: {
			goChat(item) {
				if(item.id==this.$store.state.user.id) {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '不能与自己聊天'
					});
					return;
				}
				uni.navigateTo({
					url:"/pages/chat/user/index?toid="+item.id
				})
			},
			search_list(){
				let _this = this;
				this.serviceList1 = this.serviceList;
				if(this.kw.trim()!="") {
					this.serviceList1 = this.serviceList1.filter((item)=>{
						 if(item.nickName.indexOf(_this.kw.trim())>=0) {
							 return true;
						 }
						 return false;
					 })
				}
			},
			goUserDetail(_id){
				let _this = this;
				uni.navigateTo({
					url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
				})
			}
		}
	}
</script>

<style>

</style>
