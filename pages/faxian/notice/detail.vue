<template>
	<view style="background-color: #fff;height: 100vh;">
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">公告详情</block><block slot="right">
		</block></cu-custom>
		
		
		<view class="cu-card article " style="padding-top:30upx;" >
			<view class="cu-item shadow">
				<view class="title"><view style=" text-align: center;line-height: 46upx;font-size: 36upx;">{{bean.title}}</view></view>
				<view style="    text-align: center;
    margin-top: 34upx; 
    font-size: 30upx;"  class="text-gray text-df">{{bean.createDate}}</view>
				<view class="content" style="margin-top:52upx;">
					<view class="desc">
						<rich-text class="text-content" style="font-size:30upx" :nodes="bean.content"></rich-text>
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
				bean:{}
			}
		},
		onLoad(e) {
			console.log(e.id);
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			_this.$http.post("/notice/detail",
				{id:e.id},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.bean = res_data.body;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
