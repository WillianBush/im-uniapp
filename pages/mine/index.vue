<template>
	<view style="background-color: #fff;">
		<scroll-view style="height: calc(100vh - 100upx);" class="page" >
			<view class="bg-blue" >
				<view @tap="goUserInfo()" style="width:100%;height:340upx;padding-top:130upx">

					<view class="cu-avatar xl round margin-left" :style="'float:left;background-image: url('+$store.state.img_url+$store.state.user.headpic +');'"></view>
					<view style="float:left;margin-left: 10px;margin-top:6px;">
						<view style="    font-size: 16px;font-weight: 800;">{{$store.state.user.nickName}}</view>
						<view style="margin-top: 6px;">ID号：{{$store.state.user.memberId}}</view>
					</view>

					<view style="float:right;margin-top: 20px;margin-right:14px;">
						<text style="color:#fff;font-size:22px" class="lg text-gray cuIcon-qr_code"><span></span></text>
						<text style="color:#fff;margin-left:5px;font-size:16px" class="lg text-gray cuIcon-right"><span></span></text>
					</view>
					<block v-if="$store.state.signInCnf">
						<view v-if="$store.state.signInCnf.useSignIn==1" @tap="goSignIn" style="    position: absolute;top: 14px;right: 20px;">
							<text class="iconfont icon-qiandao" style="color: #fff;    font-size: 56upx;"></text>
						</view>	
					</block>

				</view>
  
 
  
				<view style="border-top-left-radius: 20px;border-top-right-radius: 20px;margin-top:10px;background: #F1F1F1;" class="cu-list menu"
				 :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
				 
					<view v-show="false" @tap="goWallet()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							
							<!--<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/qianbao.png);background-size: 100% 100%;"></view>-->
							<text style="color:#EC3A4E" class="iconfont icon-qianbao"></text>
							<text class="text-black" style="margin-left: 10px;">我的钱包</text>
						</view>
					</view>
					
					<view v-if="$store.state.shimingCfg.shiming==1"  @tap="goShiming()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/zijin.png);background-size: 100% 100%;"></view>
							-->
							<text style="color:#EF4023;font-size:44upx" class="iconfont icon-shimingrenzheng"></text>
							<text class="text-black" style="margin-left: 10px;">实名认证</text>
						</view>
					</view> 
				
					<view  v-show="false" @tap="goBill()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/zijin.png);background-size: 100% 100%;"></view>
							-->
							<text style="color:#2588C4;font-size:44upx" class="iconfont icon-ziyuan"></text>
							<text class="text-black" style="margin-left: 10px;">资金明细</text>
						</view>
					</view>

					<!--是否开启不断刷新-->
					<view v-if="$store.state.isEmployee" class="cu-item">
						<view class="content">

							<view class="cu-form-group margin-top">
								<text class="text-black">开启刷新</text>-->
								<switch @change="isOpenRefresh"></switch>
							</view>
						</view>
					</view>
					
					<view  @tap="goFavourite()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#FF99BB;font-size:44upx" class="iconfont icon-shoucang"></text>
							<text class="text-black" style="margin-left: 10px;">收藏</text>
						</view>
					</view>

					
					<!-- <view @tap="goUserInfo()" class="cu-item t1" style="border:0px;" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-shezhi"></text>
							<text class="text-black" style="margin-left: 10px;">设置</text>
						</view>
					</view> -->
					<view @tap="goQrcode"  class="cu-item arrow" >
						<view class="content"> 
						<text style="color:#F5BC50;font-size:46upx;float: left; position: relative; left: -6px;" class="lg  cuIcon-qr_code"><span></span></text>
							<text class="text-black" style="margin-left: -6px;" >二维码</text>
							
						</view>
					</view>

					<block  v-for="(item,index) in $store.state.greetingList">
						<view @tap="goSetGreeting(index)" v-show="$store.state.isEmployee" class="cu-item t1" style="border:0px;" :class="true?'arrow':''">
							<view class="content">
								<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-xiaoxi2"></text>
								<text class="text-black" style="margin-left: 10px;">{{"设置问候语-"+item.invite_code}}</text>
							</view>
						</view>
					</block>

					<!--
					<view class="cu-item">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-banquan"></text>
							<text class="text-black" style="margin-left: 10px;">版权说明</text>
							<text class="text-grey" style="float:right;margin-right:10px;font-size: 26upx;color: #bbb;">抖聊</text>
						</view>
					</view>
					-->

					<view @tap="checkUpdate()" class="cu-item arrow " style="padding-right:70upx;margin-top:20upx;">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-app_icons--"></text>
							<text class="text-black" style="margin-left: 10px;">检查更新</text>
							<text class="text-grey" style="float:right;font-size: 26upx;color: #bbb;">当前版本：{{$store.state.SYS_VERSION}}</text>
						</view>
					</view> 
					
					<view class="cu-item" @tap="logout()" >
						<view class="content"> 
						<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/logout.png);background-size: 100% 100%;"></view>
						-->
							<text style="color:#FA9B4E;font-size:44upx" class="iconfont icon-tuichu"></text>
							<text class="text-black" style="margin-left: 10px;">退出</text>
						</view>
					</view>
					<!--
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<button class="cu-btn content" open-type="contact">
				<text class="cuIcon-btn text-olive"></text>
				<text class="text-grey">Open-type 按钮</text>
			</button>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
				<text class="cuIcon-discoverfill text-orange"></text>
				<text class="text-grey">Navigator 跳转</text>
			</navigator>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-emojiflashfill text-pink"></text>
				<text class="text-grey">头像组</text>
			</view>
			<view class="action">
				<view class="cu-avatar-group">
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
				</view>
				<text class="text-grey text-sm">4 人</text>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-btn text-green"></text>
				<text class="text-grey">按钮</text>
			</view>
			<view class="action">
				<button class="cu-btn round bg-green shadow">
					<text class="cuIcon-upload"></text> 上传</button>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
				<text class="text-grey">标签</text>
			</view>
			<view class="action">
				<view class="cu-tag round bg-orange light">音乐</view>
				<view class="cu-tag round bg-olive light">电影</view>
				<view class="cu-tag round bg-blue light">旅行</view>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-warn text-green"></text>
				<text class="text-grey">文本</text>
			</view>
			<view class="action">
				<text class="text-grey text-sm">小目标还没有实现！</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content padding-tb-sm">
				<view>
					<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
				<view class="text-gray text-sm">
					<text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
			</view>
			<view class="action">
				<switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
			</view>
		</view>
		-->

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		async mounted() {
			await this.$onLaunched;
			let _this = this;
			console.log("abc22222", "2222222")
			console.log("abc333333", _this.$store.state.isEmployee)

			setTimeout(()=>{
				if (_this.$store.state.isEmployee) {
					_this.getGreetingMsg(_this);
				}
			},1000);

		},
		methods:{
			goSignIn(){
				uni.navigateTo({
					url:"/pages/mine/signIn"
				}) 
			},
			checkUpdate(){
				let _this = this;
				_this.$refs.updatepage.upgrade();
			},
			goShiming() {
				uni.navigateTo({
					url:"/pages/mine/shiming"
				}) 
			},
			goFavourite() {
				uni.navigateTo({
					url:"/pages/mine/favourite_list"
				}) 
			},
			isOpenRefresh(e){
				let _this = this;
				_this.$store.state.isOpenRefresh = e.detail.value;
			},
			goBill() {
				uni.navigateTo({
					url:"/pages/mine/wallet/bill"
				}) 
			},
			goQrcode() {
				uni.navigateTo({
					url:"/pages/mine/user_info/qrCode"
				})
			},
			goWallet(){
				uni.navigateTo({
					url:"/pages/mine/wallet/index"
				})
			},
			go1() {
				uni.navigateTo({
					url:"/pages/mine/g1"
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url:"/pages/mine/user_info/index"
				})
			},
			goSetGreeting(index) {
				uni.navigateTo({
					url:"/pages/mine/greeting_set/index?item="+index
				})
			},
			logout() {
				let _this = this;

				uni.showModal({
					title: '提示',
					content: '确定要退出登陆吗？',
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							_this.$http.post("/user/json/logout",
									{
										header:{
											"x-access-uid":_this.$store.state.user.id,
											"x-access-client":_this.$clientType
										}
									}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									//uni.clearStorageSync();
									uni.closeSocket();
									uni.removeStorageSync("USER");
									_this.$store.commit("clearData");
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							})
						}
					}
				})

				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/logout",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			//uni.clearStorageSync();
				// 			uni.removeStorageSync("USER");
				// 			_this.$store.commit("clearData");
				// 			uni.navigateTo({
				// 				url:"/pages/login/login"
				// 			})
				// 		}
				// 	}
				// })
				
				
			},
			getGreetingMsg(_this) {
				let user = this.$store.state.user;
				if(user){
					_this.$http.get("/user/employeeDefaultMessage/json/getMyHelloMessage",
							{
								header:{
									"x-access-uid":user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						console.log("abc1111",res_data)
						if(res_data.code==200) {
							const data = res.data.body.rows;
							_this.$store.state.greetingList = data;
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res_data.msg
							});
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	.iconfont{
		font-size: 38upx;
	}
		
	.t1:after {
		border:0px!important;
	} 
</style>
