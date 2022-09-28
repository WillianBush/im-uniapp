<template>
	<view> 
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="content">个人信息</block></cu-custom>
		
		
	
	
	
	
		 
		 <view style="margin-top:10px;" class="cu-list menu"
		  :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
		  
		  
		  <view  @tap="ChooseImage" class="cu-item cu-item1" :class="true?'arrow':''" style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;" >
		  	<view class="content">
		  		<text class="text-grey" style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;" >头像</text>	
		  		<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
		  			<view class="cu-avatar radius margin-left" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+$store.state.user.headpic+');'"></view>
		  		</view>
		  	</view>
		  </view> 
		  
		  
		    <view @tap="updName()" class="cu-item" :class="true?'arrow':''">
		    	<view class="content"> 
		    		<text class="text-grey" style="float:left;margin-left: 10px;color: #8799a3;">昵称</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.nickName}}</text>
		    	</view> 
		    </view>  
			
			<view @tap="updPhone" class="cu-item arrow" >
				<view class="content"> 
					<text style="float:left;margin-left: 10px;color: #8799a3;">手机号</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.telphone}}</text>
				</view> 
			</view> 
			
			<view @tap="" class="cu-item" >
				<view class="content"> 
					<text class="text-grey" style="float:left;margin-left: 10px;color: #8799a3;">账号</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;margin-right:60upx;font-size: 26upx;">{{$store.state.user.username}}</text>
				</view> 
			</view> 
			
			<view @tap="goQrcode"  class="cu-item arrow" >
				<view class="content"> 
					<text class="text-grey" style="color: #8799a3;" >二维码名片</text>
					<text style="font-size:22px;float: right; position: relative; right: -20upx;" class="lg text-gray cuIcon-qr_code"><span></span></text>
				</view>
			</view>
			
			<!--
			<view @tap="" class="cu-item" :class="true?'arrow':''">
				<view class="content"> 
					<text class="text-grey" style="float:left;margin-left: 10px;">个性签名</text>
				</view> 
			</view> 
			-->
			<view @tap="updSex()"  class="cu-item" :class="true?'arrow':''">
				<view class="content"> 
					<text  style="float:left;margin-left: 10px;color: #8799a3;">性别</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.sex}}</text>
				</view> 
			</view> 
			
			
		</view>	
		
		
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			};
		},
		mounted() {
			let _this = this;
				
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/friend/list/v1",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.$store.commit("setFriend_list",res_data.body);
			// 			res_data.body.forEach(item=>{
			// 				let i = {};
			// 				i.name = item.h;
			// 				_this.list.push(i);
			// 			})
						
			// 		}
			// 	}
			// })
			
			
		},
		onReady() {
			
			
		},
		methods: {
			goQrcode() {
				uni.navigateTo({
					url:"/pages/mine/user_info/qrCode"
				})
			},
			updSex(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_sex"
				})
			},
			updName(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_name"
				})
			},
			updPhone(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_phone"
				})
			},
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						//大于2M。则报
						if(res.tempFiles[0].size>1024*2048) {
							uni.showToast({
							   icon: 'none',
							   title: "图片大小不能高于2M"
							});
							return;
						}
						
						 var uper = uni.uploadFile({
							 // 需要上传的地址
							 url:_this.$store.state.req_url+ '/user/file/uploadHeadpic',
							 header:{
								"x-access-uid":_this.$store.state.user.id,
								//"Content-Type":"application/x-www-form-urlencoded"
							 },
							 // filePath  需要上传的文件
							 filePath: res.tempFilePaths[0],
							 name: 'file',
							 success(res1) {
								 let json = eval("("+res1.data+")");
								 // 显示上传信息
								 if(json.code==200) {
									 uni.showToast({
									    icon: 'success',
									    title: "上传成功"
									 });
									 _this.$store.state.user.headpic = json.msg
								 } else {
									 uni.showToast({
									    icon: 'none',
									    title: json.msg
									 });
								 }
							 }
						 });
					}
				});
			}
		}
	}
</script>

<style scoped>
	.cu-item1:after {
		border-bottom:0px!important;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.text-grey {
		color:#333
	}
</style>
