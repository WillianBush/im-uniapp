<template>
  <view style="height: 100vh">
    <view class="index-net-status" v-show="isCloseNet()"
      >网络已断开，请检查网络稳定性</view
    >

    <home ref="homeRef" v-show="PageCur == 'home'"></home>
   <addressBook v-show="PageCur == 'addressBook'"></addressBook>
    <hotItem
      v-if="PageCur == 'hotItem' && hotItem.show_type == 1"
    ></hotItem>
    <faxian v-show="PageCur == 'faxian'"></faxian>
    <mine v-show="PageCur == 'mine'"></mine>
    <view
      ref="footerView"
      class="cu-bar tabbar bg-white shadow foot"
      style="position: fixed; z-index: 999999"
    >
      <view class="action" @click="NavChange" data-cur="home">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-xiaoxi"
            :style="'color:' + (PageCur == 'home' ? '#3F92F8' : '#888')"
            style="font-size: 50upx"
            ><span></span
          ></text>
          <view
            v-show="unReadMsgSum > 0"
            style="top: 0"
            class="cu-tag badge"
            >{{ unReadMsgSum }}</view
          >
        </view>
        <view
          style="margin-top: 2upx"
          :style="'color:' + (PageCur == 'home' ? '#3F92F8' : '#888')"
          >消息</view
        >
      </view>
      <view class="action" @click="NavChange" data-cur="addressBook">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-tongxunlu1"
            :style="'color:' + (PageCur == 'addressBook' ? '#3F92F8' : '#888')"
            style="font-size: 52upx"
            ><span></span
          ></text>
          <view
            v-show="
             unDoFriendAddCount + unDoRoomAddCount >
              0
            "
            style="top: 0"
            class="cu-tag badge"
            >{{
              unDoFriendAddCount + unDoRoomAddCount
            }}</view
          >
        </view>
        <view
          style="margin-top: 2upx"
          :style="'color:' + (PageCur == 'addressBook' ? '#3F92F8' : '#888')"
          >通讯录</view
        >
      </view>

      <block v-if="hotItem && hotItem.show_type == 1">
        <view
          @click="NavChange"
          data-cur="hotItem"
          v-show="
           hotItem && hotItem.show == 1
          "
          class="action text-gray"
        >
          <button
            v-show="
            hotItem&&( hotItem.logo == '' || hotItem.logo)
            "
            class="cu-btn cuIcon-hotfill bg-green shadow"
            style="
              background-color: rgb(229, 77, 66);
              color: #fff;
              font-size: 44upx;
              width: 50upx;
              height: 50upx;
              padding: 0px;
              border-radius: 50%;
              line-height: 52upx;
            "
          ></button>
          <button
            v-if="
              hotItem && hotItem.logo != ''
            "
            class="cu-btn cuIcon bg-white shadow"
            :style="
              'background-image:url(' +
              imgUrl +
              hotItem.logo +
              ')'
            "
            style="
              color: #fff;
              font-size: 44upx;
              background-size: 100%;
              background-repeat: no-repeat;
              width: 50upx;
              height: 50upx;
              padding: 0px;
              border-radius: 50%;
              line-height: 52upx;
            "
          ></button>
          <view style="margin-top: 2upx; color: #e54d42">{{
            hotItem?hotItem.name:''
          }}</view>
        </view>
      </block>
      <block v-else>
        <view
          @click="NavChange"
          data-cur="hotItem"
          v-show="
            hotItem  && hotItem.show == 1
          "
          class="action text-gray add-action"
        >
          <button
            v-show="
             hotItem&&(hotItem.logo == '' || !hotItem.logo) 
            "
            class="cu-btn cuIcon-hotfill bg-green shadow"
            style="
              background-color: rgb(229, 77, 66);
              color: #fff;
              font-size: 44upx;
            "
          ></button>
          <button
            v-show="
              hotItem && hotItem.logo != ''
            "
            class="cu-btn cuIcon-a bg-white shadow"
            :style="
              'background-image:url(' +
              imgUrl +
            (hotItem?hotItem.logo:'') +
              ')'
            "
            style="
              color: #fff;
              font-size: 44upx;
              background-size: 100%;
              background-repeat: no-repeat;
            "
          ></button>
          <view style="margin-top: 2upx; color: #e54d42">{{
          hotItem? hotItem.name:''
          }}</view>
        </view>
      </block>

      <view class="action" @click="NavChange" data-cur="faxian">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-faxian"
            :style="'color:' + (PageCur == 'faxian' ? '#3F92F8' : '#888')"
            style="font-size: 50upx"
            ><span></span
          ></text>
        </view>
        <view
          style="margin-top: 2upx"
          :style="'color:' + (PageCur == 'faxian' ? '#3F92F8' : '#888')"
          >发现</view
        >
      </view>
      <view class="action" @click="NavChange" data-cur="mine">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-wode"
            :style="'color:' + (PageCur == 'mine' ? '#3F92F8' : '#888')"
            style="font-size: 46upx"
            ><span></span
          ></text>
        </view>
        <view
          style="margin-top: 2upx; padding-top: 4upx"
          :style="'color:' + (PageCur == 'mine' ? '#3F92F8' : '#888')"
          >我的</view
        >
      </view>
    </view>
  </view>
</template>

<script>
	import { mapState,mapMutations,mapActions } from 'vuex'
export default {
  data() {
    return {
      backButtonPress: 0, //2次退出应用计时
      PageCur: "home",
      hot_wv: null,
      time_t: new Date().getTime(),
    };
  },
  computed: {
    i18n() {
      return this.$t("index");
    },
	...mapState('app',{
		hotItem:state =>state.hotItem,
		imgUrl:state =>state.imgUrl,
		footerViewHeight:state=>state.footerViewHeight
	}),
	...mapState('user',{
		isEmployee: state =>state.isEmployee,
		user: state=>state.user,
		friendList: state => state.friendList,
		unReadMsgSum: state => state.unReadMsgSum
	}),
	...mapState('socket',{
		isOpenSocket:state =>state.isOpenSocket,
		continueCloseCount:state =>state.continueCloseCount
	}),
	...mapState('chat',{
		unDoFriendAddCount:state =>state.unDoFriendAddCount,
		unDoRoomAddCount:state =>state.unDoRoomAddCount
	})
  },
  methods: {
	...mapMutations('chat',[
		'setCurChatEntity',
		'setCurChatMsgList'
	]),
	...mapMutations('app',[
		'setHotItemWebViewShow'
	]),  
	...mapActions('app',[
		'getImageDomainAction',
		'getFooterHotItemAction',
		'getSystemInfo',
		'getListWithMidAction'
	]),
	...mapActions('user',[
		'isEmployeeAction',
		'updateUserInfo',
		'getShimingCfgAction',
		'getFriendListAction'
	]),
    NavChange: function (e) {
      let _this = this;
      let user = uni.getStorageSync("USER");
      if (this.hot_wv) {
        this.hot_wv.hide();
      }
      if (e.currentTarget.dataset.cur == "hotItem") {
        if (his.hotItem&&this.hotItem.show_type == 2) {
          uni.navigateTo({
            url: "/pages/hotItem/hotItem_app",
          });
          return;
        } else {
          // #ifdef H5
          this.footerViewHeight =
            this.$refs["footerView"].$el.clientHeight;
          // #endif
          this.url = this.hotItem.url;
          this.siteName = this.hotItem.name;
          // #ifdef APP-PLUS
          if (this.hot_wv) {
            this.hot_wv.show();
          } else {
			this.getSystemInfo().then(res=>{
				let info = uni.createSelectorQuery().select(".tabbar");
				info
				  .boundingClientRect(function (data) {
				    //data - 各种参数
				    //console.log(data.height)  // 获取元素宽度
				    let currentWebview = _this.$scope.$getAppWebview();
				    if (!_this.hot_wv) {
				      _this.hot_wv = plus.webview.create(
				        _this.url,
				        "custom-webview",
				        {
				          plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				          "uni-app": "none", //不加载uni-app渲染层框架，避免样式冲突
				          top: _this.StatusBar + 5,
				          bottom: data.height + 2, //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				          height:
				            uni.getSystemInfoSync().screenHeight -
				            _this.StatusBar -
				            5 -
				            data.height -
				            2,
				          zindex: 1,
				          scalable: true,
				        }
				      );
				      //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
				      //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
				      currentWebview.append(_this.hot_wv);
				    }
				  })
				  .exec();
			}).catch(error =>{
				uni.showToast({
				  title: "系统信息获取失败",
				  duration: 1000,
				});
			})  
          }
          // #endif
        }
      } else if (e.currentTarget.dataset.cur == "mine") {
       this.getShimingCfgAction();
      } else {
        if (e.currentTarget.dataset.cur == "addressBook") {
          if (
            !this.friendList ||
            this.friendList.length <= 0
          ) {
            this.getFriendListAction();
          } else {
            // this.$store.state.friend_list.forEach((item) => {
            //   item.list.forEach((item1) => {
            //     let s = uni.getStorageSync(item1.member_uuid + "_NOTE");
            //     if (s && s != "") {
            //       item1.name = s;
            //     }
            //   });
            // });
          }
        }
      }
	  this.setHotItemWebViewShow(e.currentTarget.dataset.cur == "hotItem")
      _this.PageCur = e.currentTarget.dataset.cur;
      if (e.currentTarget.dataset.cur == "faxian") {
			this.getListWithMidAction();
      }
    },
    isCloseNet() {
      if (
        !this.isOpenSocket &&
        this.continueCloseCount > 10
      ) {
        return true;
      }
      return false;
    },
	clearMsg(){
		  this.setCurChatEntity(null);
		  this.setCurChatMsgList([]);
	},
  },
  onShow() {
		//清除当前窗口数据
		this.clearMsg();
  },
  mounted() {				
		if (!this.imgUrl) {
			this.getImageDomainAction()
		}
		
		if (!this.isEmployee) {
		 this.isEmployeeAction();
		}
		this.getFooterHotItemAction();
		if (!this.user) {
		  let user = uni.getStorageSync("USER");
		  if (user) {
		   this.updateUserInfo();
		  } else {
			uni.reLaunch({
			  url: "pages/login/login",
			});
		  }
		}
  },
  onBackPress() {
		// #ifdef APP-PLUS
		this.backButtonPress++;
		if (this.backButtonPress > 1) {
		  plus.runtime.quit();
		} else {
		  plus.nativeUI.toast("再按一次退出应用");
		}
		setTimeout(function () {
		  this.backButtonPress = 0;
		}, 1000);
		// #endif

		//H5并不支持浏览器返回按钮
		// #ifdef H5
		uni.navigateBack();
		// #endif
		return true;
  },
};
</script>

<style scoped>
uni-web-view {
  z-index: 0 !important;
}
.index-net-status {
  position: fixed;
  top: 0;
  z-index: 99999999999;
  background: #e54d42;
  width: 100%;
  height: 60upx;
  line-height: 60upx;
  color: #fff;
  text-align: center;
  font-size: 24upx;
  opacity: 0.92;
}
</style>
