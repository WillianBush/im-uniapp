<template>
	<view style="background:#fff">
    <cu-custom bgColor="bg-blue" :isBack="true" ><block slot="content">商品详情</block></cu-custom>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item>
          <image style="margin:2% 2%;width:96%"  :src="$store.state.img_url+baseInfo.img" />
      </swiper-item>
    </swiper>
    <view class="shop-area">
      <view>
      <text style="color:#999;font-size:28rpx;margin-right:10rpx">价格:</text>
      <text style="color:darkred;font-size:46rpx">{{baseInfo.prize}}</text>
      </view>
      <view  class="title">
        {{baseInfo.name}}
      </view>
<!--      <view  class="descbribe">-->
<!--        {{baseInfo.commodity_info}}-->
<!--      </view>-->
      <view class="divider"></view>
      <view class="details">
          <text>无需配送</text>
          <text style="float:right">剩余{{baseInfo.in_stock}}</text>
      </view>
      <view class="note-area">
        <text style="color:#999;margin-right:15rpx">服务</text>
        <text>收货后结算，不支持售后退货服务</text>
      </view>
        <view class="shop-detail">
            <view class="plate">
                <text class="plate-title">
                    <text>—</text>
                    商品列表
                    <text>—</text>
                </text>
            </view>
            <view class="goods-describe">
                {{baseInfo.commodity_info}}
            </view>
        </view>
    </view>


    <view class="bottom-btns">
        <view style="display: inline-block;text-align: left;width:38%;font-size:26rpx">
        <text style="font-size:32rpx;margin-right:10%;margin-left:2%;color:darkred;">
            应付:￥{{baseInfo.prize}}
        </text>

        </view>
        <text class="cart-btn btn-1" @click="contact">加入购物车</text>
        <text class="cart-btn btn-2" @click="contact">立即购买</text>
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
				baseInfo:"",
        indicatorDots: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
				isShowModal:false
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
            this.baseInfo = JSON.parse(option.key)

		},
		methods:{
			contact(){
				uni.showToast({
					icon: 'none',
					position: 'top',
					title: '请联系咨询员'
				});
			},
			notice(){
				uni.navigateTo({
					url:"/pages/faxian/notice/index"
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
  .shop-area{
    margin:3% 3%;
  }
	.margin-top {
		margin-top:10px
	}
  image{
    width:100%;
    height:100%;
  }
  .plate{
      display:block;
      text-align: center;
  }
  .plate-title{
    font-size:30rpx;
    font-weight:700;
  }
  .plate-title:before{
    content: "";
    width: 5.33vw;
    height: 1.6vw;
    position: absolute;
    left:-8vw;
    top: 6.67vw;
    font-size: 3.2vw;
    background: url(../imgs/img.png) 0% 0% / cover;
  }
  .bottom-btns{
      padding:1% 0%;
      border-top:2px solid #F7F8FA;
      position: fixed;
      bottom: -1px;
      color: white;
      left: 0;
      right: 0;
      text-align: right;
      padding-right: 1%;
  }
  .cart-btn{
      font-size:28rpx;
      line-height:39px;
      text-align: center;
      width:220rpx;
      display:inline-block;

  }
  .btn-1{
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      color:#1ba784;
      background:#d9f6ef;
  }
  .btn-2{

      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      background:darkred;
  }
  .swiper{
    height:600rpx;
  }
  .title{
    font-size:34rpx;
    margin:3% 0 1%;
  }
  .descbribe{
    color:#999;
    font-size:28rpx;
  }
  .divider{
    margin:3% 0;
    border-bottom:1px solid #F7F8FA;
  }
  .details{
    color:#999;
    font-size:28rpx;
  }
  .note-area{
      border-top:8px solid #F7F8FA;
      border-bottom:8px solid #F7F8FA;
    margin:4% 0;
  }
    .shop-detail{
        min-height: 62vw;
    }
    .goods-describe{
        line-height:6vw;
        margin-top:20rpx;
        font-size:28rpx;
    }
</style>
