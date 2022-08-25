<template>
	<view style="background-color: #EF504A;width:82%;
			height: 800upx;
		    position: fixed;
		    left: 50%;
		    top: 50%;
		    z-index: 99999;
		    -webkit-transform: translate(-50%,-50%);
		    -moz-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    border-radius: 8px;">
			<view style="height:550upx;">
				<text @tap="close" style="font-size: 42upx;color:#222;position: relative;top: 20upx;left: 20upx;"  class="lg text-gray cuIcon-close"><span></span></text>
				
				<view style="margin-top:20upx;text-align: center;">
					<view class="cu-avatar xl round " :style="'background-image: url('+$store.state.img_url+$store.state.temp.bean.fromHeadpic +');'"></view>
					<view style="font-size: 34upx;margin-top:20upx;color:#EDE1B7">{{$store.state.temp.bean.fromName}}</view>
					<view style="font-size: 34upx;margin-top:50upx;color:#EDE1B7">{{$store.state.temp.bean.descri}}</view>
					<view v-if="$store.state.temp.bean.status==1" style="font-size: 34upx;margin-top:50upx;color:#EDE1B7">
						红包已抢完
					</view>
					<view v-if="$store.state.temp.bean.status==2" style="font-size: 34upx;margin-top:50upx;color:#EDE1B7">
						已过期
					</view>
				</view> 
			</view>
			
			<view style="background-color: #E13C36;height:250upx; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">
				<view @tap="openRedDetail" style="color: #EDD3AD;
    text-align: center;
    position: relative;
    top: 40px;" v-if="redOpened4My($store.state.temp.bean)||$store.state.temp.bean.status!=0">
					查看红包详情
				</view>
				<view v-else  @tap="openRed" class="openHongbao " :class="{move: opening}" style="width: 160upx;
	height: 160upx;
	background: #EBDFAF;
	border-radius: 50%;
	text-align: center;
	line-height: 160upx;
	color: #CD4F39;
	font-size: 50upx;
	position: relative;
	left: 38%;
	top:-24%;
	">開</view>
			</view>
			
		</view>
</template>

<script>
	export default {
		// props:{
		// 	bean:{
		// 		type:Object,
		// 		default:{}
		// 	}
		// },
		data() {
			return {
				opening:false,
			}
		},
		
		methods:{ 
			redOpened4My(_red) {
				if(_red&&_red.opener_ids&&_red.opener_ids.indexOf(this.$store.state.user.id)>=0) {
					return true;
				}
				return false;
			},
			openRedDetail() {
				let _this = this;
				uni.$on('show_red_detail',()=>{
					console.log("---");
					_this.$emit("openRedDetail");		
					uni.$off('show_red_detail');  
				})  
				 let v = {
				   redUUID:this.$store.state.temp.bean.redUUID,
				   uid:this.$store.state.user.id
			    }
				this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'RED_DETAIL_LIST'}");
			},
			close() { 
				this.opening = false;
				this.$emit("hide");
			},
			openRed() {
				let _this = this;
				this.opening = true;
				// this.$store.state.temp.bean = this.bean;
				let openv = {
				   redUUID:this.$store.state.temp.bean.redUUID,
				   open_uid:this.$store.state.user.id,
				   chatid:this.$store.state.temp.bean.chatid
				}
				if(this.$store.state.temp.bean.toGroupid&&this.$store.state.temp.bean.toGroupid.trim()!="") {
					console.log("-----1");
					this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(openv)+"',CMD:'GROUP_CHAT_OPEN_RED'}");
				} else {
					console.log("-----2");
					this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(openv)+"',CMD:'USER_CHAT_OPEN_RED'}");
				}
			    
				
				uni.$on('show_red_detail',()=>{
					_this.$emit("openRedDetail");	
					uni.$off('show_red_detail');  
					setTimeout(()=>{
						_this.opening = false;
					},500);
				})  
				
			    //myConstants.ws.send("{body:'"+JSON.stringify($scope.openv)+"',CMD:'GROUP_CHAT_OPEN_RED'}");
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.openHongbao.move {
	    animation: 3s move infinite;
	    transform-style: preserve-3d;
	}
	
	@mixin keyframes($a) {
	  @-webkit-keyframes #{$a} {
	    @content;
	  }
	  @-moz-keyframes #{$a} {
	    @content;
	  }
	  @keyframes #{$a} {
	    @content;
	  }
	}
	        
	@include keyframes(move) {
	    0% {
	        transform: rotateY(0deg);
	        -webkit-transform: rotateY(0deg);
	    }   
	    100% {
	        transform: rotateY(360deg);
	        -webkit-transform: rotateY(360deg);
	    }
	}   
</style>
">{{bean.fromName}}</view>
					<view style="font-size: 34upx;margin-top:50upx;color:#EDE1B7