
<template>
	<view>
    <cu-custom bgColor="bg-blue" :isBack="true" ><block slot="content">商品列表</block></cu-custom>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item v-for="(item,index) in shopList">
          <image  :src="$store.state.img_url+item.img" />
      </swiper-item>
    </swiper>
    <view class="plate">
      <text class="plate-title">
        <text>—</text>
            商品详情
        <text>—</text>
      </text>
    </view>
    <view class="shop-list">
      <view class="shop-item" v-for="(item,index) in shopList" :key="index" @click="toDetail(item)">
        <img class="detail-img" :src="$store.state.img_url+item.img">
        <view class="shop-text">
        <text class="item-title">{{item.name}}</text>
        <text class="item-des">退货包运费

            <text style="font-size:28rpx;color:#999;margin-left:15rpx">库存{{item.in_stock}}件</text></text>
        <text class="item-amount">
          <text style="font-size:38rpx;color:darkred">￥{{item.prize}}</text>
        </text>
        </view>
      </view>
    </view>
        <view style="display:block;text-align: center;line-height:30px;margin-top:20px;margin-bottom:30px">
            ——暂无更多——
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
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        shopList:[],
				isShowModal:false
			}
		},
    onLoad(e) {
      this.getShopInfo()
      this.getShopCategory()
    },
		methods:{
      toDetail(e){//抵达商品子页面
        uni.navigateTo({
          url:"/pages/faxian/site/shopDetail?key="+ encodeURIComponent(JSON.stringify(e))
        })
      },
      getShopInfo(){  //获取商品信息分类
	      let user = this.$store.state.user;
        this.$http.get("/user/appversion/json/getCommodity",
	        {header:{
			        "x-access-uid":user.id,
			        "x-access-client":this.$clientType
		        }}
        ).then(res=>{
          if(res.data.code==200) {
          	this.shopList = res.data.body
          }
        })
      },
      getShopCategory(){  //获取商品分类接口
	      let user = this.$store.state.user;
        this.$http.get("/user/appversion/json/getCommodityCategory",
            {header:{
		      "x-access-uid":user.id,
			      "x-access-client":this.$clientType
	      }}
        ).then(res=>{
          if(res.data.code==200) {
          }
        })
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
  image{
    width:100%;
    height:100%;
  }
  .plate{
    margin-top:35rpx;
    display:block;
    text-align:center;
  }
  .plate-title{
    font-size:30rpx;
    font-weight:700;
  }
  .shop-list{

  }
  .item-title{
    display:block;
    margin-top:8rpx;
    overflow:hidden;
  }
  .item-des{
    display:block;
    font-size:20rpx;
    color:#999;
  }
  .shop-item{
      padding:2% 3%;
    border-radius:14rpx;
    background:rgba(255, 255, 255, 0.8);
    font-size:30rpx;
    margin-top:3%;
    display:inline-block;
    width:47%;
    margin-left:2%;
  }
  .item-amount{
    display:block;
    margin-top:10rpx;
  }
  .shop-text{
    padding:0rpx 0 12rpx 0rpx;
  }
    .detail-img{
        height:170px;
        width:100%;
    }
</style>
