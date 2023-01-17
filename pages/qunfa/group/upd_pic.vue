<template>
	<view style="height: 100vh;background-color: #fff;">
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">修改群头像</block><block slot="right">
		</block></cu-custom>

		<view  style="
		text-align: center;height:400upx;background-color: #fff;padding-top:60upx;">
				<view  class="cu-avatar round lg" :style="'margin:auto auto;width:160upx;height:160upx;background-image: url('+$store.state.img_url+$store.state.cur_chat_entity.img+');'"></view>
				<view style="margin-top: 50upx;"><button @tap="ChooseImage()" class="cu-btn round bg-green shadow">更换群头像</button></view>
				<view style="margin-top: 40upx;"><button @tap="clearImage()" class="cu-btn round bg-red shadow">使用默认头像</button></view>
			</view>



		</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:this.$store.state.cur_chat_entity.name
			}
		},
		onLoad(e) {

		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		methods: {
			clearImage() {
				let _this = this;

				_this.$http.post("/room/json/clearHeadpic",
					{roomid:_this.$store.state.cur_chat_entity.id},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						console.log("-----");
						_this.$store.commit("setCur_chat_entity",res_data.body);
						uni.showToast({
							icon:"success",
							title:"操作成功",
							duration:800
						})

					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})
			},
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: [ 'compressed'], //可以指定是原图还是压缩图，默认二者都有
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
							 url:_this.$store.state.req_url+ '/user/file/uploadRoomHeadpic',
							 header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-roomid":_this.$store.state.cur_chat_entity.roomUUID
							 },
							 // filePath  需要上传的文件
							 filePath: res.tempFilePaths[0],
							 name: 'file',
							 success(res1) {
								let res_data = eval("("+res1.data+")");
								console.log(res_data);
								 // 显示上传信息
								 if(res_data.code==200) {
									 uni.showToast({
									    icon: 'success',
									    title: "更换成功"
									 });
									 _this.$store.state.cur_chat_entity.img =  res_data.msg;

									 _this.$store.state.ar_list.forEach(item=>{
									 	if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
									 		item.img = _this.$store.state.cur_chat_entity.img;
									 		return;
									 	}
									 })
									 _this.$store.state.ar_list_show.forEach(item=>{
									 	if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
									 		item.img = _this.$store.state.cur_chat_entity.img;
									 		return;
									 	}
									 })

								 } else {
									 uni.showToast({
									    icon: 'none',
									    title: res_data.msg
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

<style>

</style>
