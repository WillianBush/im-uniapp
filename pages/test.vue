<template>
	<div style="margin-top: 100upx;">test{{status}}</div>
</template>

<script>
	export default {
		data(){
			return {
				status:"sate"
			}
		},
		onLaunch: function() {
			
		},
		onLoad(e) {},
		onShow: function(e) {
			
			
		},
		mounted() {
			this.connetcSocket()
		},
		onHide: function() {
		},
		methods: {
			connetcSocket(){
				let _this = this;
				let socket = uni.connectSocket({
					url: "ws://180.178.43.202/ws",
					success(data) {
						_this.status = _this.status +";链接成功;"
						console.log("=======success",data)
					},
					fail(e) {
						console.log("=======success",e)
						_this.status = _this.status +";链接失败fail;"
						uni.showToast({
							title: "ws链接失败" +e,
							duration: 20000
						});
					},
				});
				socket.onOpen(res=>{
					console.log("=======onOpen",res)
					_this.status = _this.status +";链接onOpen;"
					
				})
				socket.onClose(res=>{
					console.log("=======onClose",res)
					_this.status = _this.status +";链接onClose;"
					
				})
				socket.onError((error)=>{
					uni.showToast({
						title: "链接错误"+error,
						duration: 2000
					});
					console.log("=======onError",error)
					_this.status = _this.status +";链接onError;" +JSON.stringify(error);
					
				})
			}
		}
	
	}
</script>

<style>
</style>