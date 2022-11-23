<template>
	<view>
			<div class="top-bar">
				<p>发现</p>
			</div>
		<view style="background-color: #fff;">
			<!-- #ifndef H5 -->
			<view class="cu-bar bg-white margin-top "  @tap="saoma()" style="border-bottom: 1px solid #eee;">
				<view class="action">
					<!--<svg t="1600755139441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6086" width="26" height="26"><path d="M824.4 367.8c-19.7 0-35.6-15.9-35.6-35.6v-48.4c0-30.7-25-55.7-55.8-55.7h-56.6c-19.7 0-35.6-15.9-35.6-35.6s15.9-35.6 35.6-35.6H733c70 0 126.9 56.9 126.9 126.9v48.4c0.1 19.7-15.8 35.6-35.5 35.6zM221.9 367.8c-19.7 0-35.6-15.9-35.6-35.6v-48.4c0-70 56.9-126.9 126.9-126.9h67.9c19.7 0 35.6 15.9 35.6 35.6s-15.9 35.6-35.6 35.6h-67.9c-30.7 0-55.8 25-55.8 55.7v48.4c0.1 19.7-15.8 35.6-35.5 35.6zM381.2 861.9h-67.9c-70 0-126.9-56.9-126.9-126.9v-67.7c0-19.6 15.9-35.6 35.6-35.6s35.6 15.9 35.6 35.6V735c0 30.7 25 55.7 55.8 55.7h67.9c19.7 0 35.6 15.9 35.6 35.6s-16.1 35.6-35.7 35.6zM733.1 861.9h-56.6c-19.7 0-35.6-15.9-35.6-35.6s15.9-35.6 35.6-35.6h56.6c30.7 0 55.8-25 55.8-55.7v-67.7c0-19.6 15.9-35.6 35.6-35.6s35.6 15.9 35.6 35.6V735c-0.1 70-57.1 126.9-127 126.9zM908.6 567.5H118.4c-29.5 0-53.4-23.9-53.4-53.4s23.9-53.4 53.4-53.4h790.2c29.5 0 53.4 23.9 53.4 53.4s-23.9 53.4-53.4 53.4z" fill="#009FE8" p-id="6087"></path></svg>-->
					<!--<view  style="float:left;width: 46upx;height: 46upx;background-image: url(../../static/tb/sao.png);background-size: 100% 100%;"></view>-->
					<text style="color:#009FE8;font-size:48upx" class="iconfont icon-saoyisao"></text>
					<text style="color:#222;margin-left:10px;">扫一扫</text>
				</view>
			</view>
			<!--#endif-->
		</view>
		<el-dialog
				width="30%"
				:visible.sync="noticeShow">
			<view style="background-color: #fff;height: 100vh;"  v-if="!isContent"
				  v-loading="loading">

				<view v-if="list.length>0" class="cu-timeline margin-top" >
					<block  v-for="item in list">
						<view class="cu-time">{{item.dateStr}}</view>
						<view v-for="item1 in item.list" class="cu-item" @tap="getNoticeDetail(item1)">
							<view class="content">
								<view class="cu-capsule radius">
									<view class="cu-tag bg-cyan">{{item1.amOrPm}}</view>
									<view class="cu-tag line-cyan">{{item1.timeStr}}</view>
								</view>
								<view class="margin-top">{{item1.title}}</view>
							</view>
						</view>
					</block>
				</view>
				<view v-else class="cu-timeline " style="    text-align: center;
    color: #888;margin-top:100upx;" >
					暂无公告信息
				</view>
			</view>
			<view style="background-color: #fff;height: 100vh;" v-if="isContent"
				  v-loading="loading">
				<div class="left-icon" @click="isContent = false">
					<image style="width:10px;height:16px;float:left;margin-top:3px"  src="@/static/images/back.png"></image>
					<span style="margin-left:10px;color:black;font-size:16px">返回</span>
				</div>
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
		</el-dialog>
		<view style="background-color: #fff;" class="margin-top">
			<view class="cu-bar bg-white" style="clear:both;border-bottom: 1px solid #eee;"  @tap="getNotices()">
				<view class="action">
						<text style="color:#59AAFF;font-size:48upx" class="iconfont icon-gonggao1"></text>
						<text style="color:#222;margin-left:10px">公告</text>
				</view>
			</view>
			<view style="width:90%;height:1px;float:right;"></view>
			<view class="cu-bar bg-white" style="clear:both;border-bottom: 1px solid #eee;"  @tap="kefu()">
				<view class="action">
						<text style="color:#FF3F33;font-size:48upx" class="iconfont icon-kefu"></text>
						<text style="color:#222;margin-left:10px">联系客服</text>
				</view>
			</view>


		</view>
		<view style="background-color: #fff;" class="margin-top">
			<block v-for="item in $store.state.faxian_site_list" >
				<view  class="cu-bar bg-white " style="clear: both;border-bottom: 1px solid #eee;"  @tap="goSite(item)">
					<view class="action ">
							<view :style="'background-image: url('+$store.state.img_url+item.logo+');'" style="float:left;width: 46upx;height: 46upx;background-size: 100% 100%;"></view>
							<text style="color:#222;margin-left:10px">{{item.name}}</text>
					</view>
				</view>
				<view style="width:90%;height:1px;float:right;"></view>
			</block>


<!--				<view class="cu-bar bg-white " style="clear:both;"   @tap="goSite2()">-->
<!--					<view class="action">-->
<!--							<text style="color:#E71F19;font-size:48upx" class="iconfont icon-weibo"></text>-->
<!--							<text style="color:#222;margin-left:10px">新浪微博</text>-->
<!--					</view>-->
<!--				</view>-->

			<!-- <view class="cu-bar bg-white" style="clear:both;border-bottom: 1px solid #eee;"  @tap="androidWeb()">
				<view class="action">
					<text style="color:#FF3F33;font-size:48upx" class="iconfont icon-shoucang"></text>
					<text style="color:#222;margin-left:10px">Android快捷</text>
				</view>
			</view> -->

		</view>


		<view class="cu-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="text-red">关闭</text>
					</view>
				</view>
				<view class="padding-xl">
					功能暂未开放，敬请期待！
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data(){
			return{
				isShowModal:false,
				noticeShow:false,
				isContent:false,
				loading:false,
				list:[],
				bean:{}
			}
		},
		methods:{
			getNoticeDetail(e){

				this.loading = true
				this.isContent = true
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
					this.loading = false
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.bean = res_data.body;
					}
				})
			},
			getNotices(){
				this.loading = true
				this.noticeShow = true
				let _this = this;
				let user = uni.getStorageSync("USER");

				_this.$http.post("/notice/list",
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					this.loading = false
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.list = res_data.body;
					}
				})
			},
			detail(item) {
				uni.navigateTo({
					url:"/pages/faxian/notice/detail?id="+item.id
				})
			},
			kefu(){
				uni.navigateTo({
					url:"/pages/faxian/kefu/index"
				})
			},
			androidWeb(){
				uni.navigateTo({
					url:"/pages/faxian/site/site?url="+encodeURIComponent("http://client.t6prn1.xyz/")+"&name=聊天"
				})
			},
			saoma(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				// 允许从相机和相册扫码
				uni.scanCode({
				    success: function (res) {
				        //console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						if(res.result.indexOf("#group#")==0) {
							let roomid = res.result.split("#")[2];

							_this.$http.post("/room/json/isRoomMember",
								{
									roomid:roomid
								},
								{
									header:{
										"x-access-uid":user.id,
										"x-access-client":_this.$clientType
									}
								}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									if(res_data.msg=="1") {
										uni.navigateTo({
											url:"/pages/chat/group/index?toid="+roomid
										})
									} else {
										uni.navigateTo({
											url:"../addressBook/group/group_detail?id="+roomid
										})
									}
								} else {
									uni.showToast({
									    icon: 'none',
									    title: res_data.msg
									});
								}
							})

							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/room/json/isRoomMember",
							// 	data:{
							// 		roomid:roomid
							// 	},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":user.id
							// 	},
							// 	success(res) {
							// 		console.log(res.data);
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {
							// 			if(res_data.msg=="1") {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/group/index?toid="+roomid
							// 				})
							// 			} else {
							// 				uni.navigateTo({
							// 					url:"../addressBook/group/group_detail?id="+roomid
							// 				})
							// 			}
							// 		} else {
							// 			uni.showToast({
							// 			    icon: 'none',
							// 			    title: res_data.msg
							// 			});
							// 		}
							// 	}
							// })
						} else if(res.result.indexOf("#member#")==0) {
							let member_id = res.result.split("#")[2];
							//如果是自己的二维码
							if(member_id==_this.$store.state.user.id) {
								console.log("进来这里");
								uni.navigateTo({
									url:"/pages/index/index"
								})
								return;
							}


							_this.$http.post("/user/friend/isMyFri/v1",
								{
									uid:member_id
								},
								{
									header:{
										"x-access-uid":user.id,
										"x-access-client":_this.$clientType
									}
								}
							).then(res=>{
								console.log(res.data);
								let res_data = eval(res.data);
								if(res_data.code==200) {
									if(res_data.msg=="1") {
										uni.navigateTo({
											url:"/pages/chat/user/index?toid="+member_id
										})
									} else {
										uni.navigateTo({
											url:"/pages/chat/user_detail?id="+member_id
										})
									}
								} else {
									uni.showToast({
									    icon: 'none',
									    title: res_data.msg
									});
								}
							})

							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/user/friend/isMyFri/v1",
							// 	data:{
							// 		uid:member_id
							// 	},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":user.id
							// 	},
							// 	success(res) {
							// 		console.log(res.data);
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {
							// 			if(res_data.msg=="1") {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/user/index?toid="+member_id
							// 				})
							// 			} else {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/user_detail?id="+member_id
							// 				})
							// 			}
							// 		} else {
							// 			uni.showToast({
							// 			    icon: 'none',
							// 			    title: res_data.msg
							// 			});
							// 		}
							// 	}
							// })
						} else if(res.result.indexOf("http")==0) {
							uni.navigateTo({
								url:"/pages/faxian/site/site?url="+encodeURIComponent(res.result)
							})
						} else {
							uni.navigateTo({
								url:"/pages/faxian/txtContent/txtContent?txt="+res.result
							})
						}


				    }
				});
			},
			goSite(item) {
				uni.navigateTo({
					url:"/pages/faxian/site/site?url="+encodeURIComponent(item.url)+"&name="+item.name
				})
			},
			goSite1() {
				uni.navigateTo({
					url:"/pages/faxian/site/site?url="+encodeURIComponent("https://www.baidu.com/")+"&name=百度一下"
				})
			},
			goSite2() {
				uni.navigateTo({
					url:"/pages/faxian/site/site?url="+encodeURIComponent("https://m.weibo.cn")+"&name=新浪微博"
				})
			},
			showModal() {
				this.isShowModal = true;
			},

			hideModal() {
				this.isShowModal = false;
			}

		}
	}
</script>

<style scoped>
	.margin-top {
		margin-top:10px
	}
	.top-bar{
		background-color: rgb(238, 238, 238);
		width: 100%;
		color: rgb(0, 0, 0);
		border-bottom: 1px solid rgb(189, 186, 186);
		height: 45px;
		text-align: center;
		line-height: 45px;
		padding-top: 0px;
	}

	.left-icon{
		display: block;
		margin-top: 23px;
		margin-bottom:10px;
		cursor: pointer;
		margin-left: 15px;
	}
</style>
