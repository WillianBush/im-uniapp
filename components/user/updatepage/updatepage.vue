
<template>
  <view>
    <!-- <button @click="upgrade">upgrade</button> -->
    <view class="download">
      <uni-popup ref="popup" type="center" :mask-click="false">
        <view class="upgrade">
          <view class="logo">
            <image src="./static/upgrade.png" mode="widthFix" />
          </view>
          <view class="content">
            <view class="title" style="    color: #EF5656;    margin-bottom: 20upx;">
              <text >{{upgrading?"正在升级":"发现新版本"+versionStr}}</text>
            </view>
            <view class="container">
              <view class="descriptions">
                <text>{{upgrading?"正在为您下载,请耐心等待":"本次版本更新描述内容:"}}</text>
              </view>
              <view class="details" v-if="!upgrading">
                <!-- <view class="item" v-for="(item , index) of 3" :key="item">
                  <text>{{index + 1}} . 修复bug {{item}}{{item == 1?',修复了遗留问题购物车数据格式显示问题,解决了XXXXX号问题.':''}}</text>
                </view> -->
                <rich-text  :nodes="details"></rich-text>
              </view>
              <view v-else class="prpgroess">
                <progress
                        :percent="downloadTime"
                        active-mode="forwards"
                        activeColor="red"
                        active
                        stroke-width="4"
                        show-info
                />
              </view>
            </view>
            <view v-if="!upgrading" class="btn-group">
              <view v-if="!forceUpdate" class="cancel" @click="hiddenUppop" style="border: 1px solid #ddd;
    color: #666;">
                <text>暂不升级</text>
              </view>
              <view class="confirm" @click="upgradeEvent">
                <text>立即升级</text>
              </view>
            </view>
            <view v-else class="btn-group">
              <view v-if="!isForceUpgrade" class="cancel" @click="abortDownload" style="border: 1px solid #ddd;
    color: #666;">
                <text>取消下载</text>
              </view>
              <view v-if="!isForceUpgrade" class="confirm" @click="hiddenUpgradeEvent">
                <text>后台下载</text>
              </view>
            </view>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import Vue from "vue";
  import uniPopup from "./uni-popup/uni-popup.vue";
  import uniPopupMessage from "./uni-popup/uni-popup-message.vue";
  import uniPopupDialog from "./uni-popup/uni-popup-dialog.vue";
  import {
  	mapState,
  	mapActions,
  	mapMutations
  } from 'vuex'
  export default {
    data: () => ({
      deviceType:"",
      //是否强更新 1：强更，0：非强更
      forceUpdate:0,
      // 新版本字符串【需要赋值】
      versionStr: "",
      // 是否更新
      upgrading: false,
      // 下载时间
      downloadTime: 0,
      // 定时器
      timer: null,
      // 是否强制更新
      isForceUpgrade: false,
      // 下载任务
      downloadTask: null,
      // 下载地址【需要赋值】
      downloadUrl: "",
      //更新内容【需要赋值】
      details:"",
    }),
    // 使用的组件
    components: {
      uniPopup,
      uniPopupMessage,
      uniPopupDialog,
    },
    methods: {
		...mapActions('app',[
			'checkAppVersion'
		]),
      // 取消更新
      hiddenUppop() {
        this.$refs.popup.close();
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1];
        let name = currentPage.route;
        if(name.indexOf("splash") === -1){//如果是我的页面调用的
            return;
        }

        let user = uni.getStorageSync("USER");
        if (user) {
          //进入首页
          uni.navigateTo({
            url: "/pages/index/index"
          })
        }else{
          uni.navigateTo({
            url: "/pages/login/login"
          })
        }
      },
      // 检测更新
      upgrade() {
        let _this = this;
        // #ifdef H5
          uni.showToast({
            title: "H5版本无需更新",
            duration: 2000,
            icon: "none",
          });
        // #endif

        // #ifdef APP-PLUS
          //android:1,ios:2
          let _appType;
          let _appName = uni.getSystemInfoSync().appName;
          switch(uni.getSystemInfoSync().platform){
            case 'android':
              //console.log('客户端是Android')
              _appType = "1";
              _this.deviceType = "1";
              break;
            case 'ios':
              // console.log('客户端是iOS')
              _appType = "2";
              _this.deviceType = "2";
              break;
                  // case 'devtools':
                  //    console.log('客户端是在开发者工具上')
                  //    break;
                  // default:
                  //    console.log('客户端是在其他工具上')
                  //    break;
          }
          let timestamp = new Date().getTime()
		  _this.checkAppVersion().then(res=>{
			  if(res.vUpdate){
				  _this.forceUpdate = res.body.force_update == "1";
				  _this.versionStr = res.body.version;
				  _this.downloadUrl = res.body.down_url;
				  _this.details = res.body.descript;
				  _this.$refs.popup.open();
			  }
		  })
        // #endif

        // 这是5+sdk调用原生的toast,如果你不喜欢上面的,那么把上面注释或者删除,使用这个,
        // 里面的消息可以自定义
        /**
         * plus.nativeUI.toast("恭喜您的应用是最新版本!");
         */
      },
      // 点击更新
      upgradeEvent() {
        let _this = this;
        //如果是ios，就是直接跳转到页面
        if(_this.deviceType == "2"){
            plus.runtime.openUrl(encodeURI(_this.downloadUrl));
            return;
        }

          // 如果是正式更新需要打开下面这行注释
          // 这里只是做了简单的判断
          // 这里可以更据平台来下载
          // -------------------------
          // if (versionInfo) {
          // -------------------------
          // 注意这里逻辑需要自己去组织一下
          // 如果是iOS
          // 调用第三方程序打开指定的URL
          // -------------------------
          //  plus.runtime.openURL( url, errorCB, identity );
          // -------------------------
          this.upgrading = true;
          // 注意：
          // 支持以下类型安装包：
          // 1. 应用资源安装包（wgt），扩展名为'.wgt'；
          // 2. 应用资源差量升级包（wgtu），扩展名为'.wgtu'；
          //  3. 系统程序安装包（apk），要求使用当前平台支持的安装包格式。
          // 注意：仅支持本地地址，调用此方法前需把安装包从网络地址或其他位置放置到运行时环境可以访问的本地目录。
          // 这是5+sdk install 的地址 : http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.install
          // -----------------------
          // 正式下载请打开这里的注释
          this.downloadApplications();
          // }
          // -----------------------
      },
      // 后台下载
      hiddenUpgradeEvent() {
        this.$refs.popup.close();
      },
      // 检测平台和当前app版本号
      getVersionAndPlatform() {
        // 这里try-catch是因为，当前代码是在浏览器上调试的
        // 由于浏览器不支持所以加了try-catch
        // 你可以删除
        try {
          // 获取版本号
          let version = plus.runtime.version;
          // 获取当前平台
          // - Android
          // - Ios
          // 两种平台
          let platform = plus.os.name;
          return {
            version: version,
            platform: platform,
          };
        } catch {
          console.error("当前平台不支持5+SDK!");
        }
      },
      // 下载
      downloadApplications() {
        let _this = this;
        // 建立下载任务
        this.downloadTask = uni.downloadFile({
          // 下载地址
          url: this.downloadUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              console.log("download99999990---====",res)
              console.log("download99999991---====","下载成功")
              console.log("download99999992---====",res.tempFilePath)


              _this.installApplications(res.tempFilePath);
            }
          },
        });

        this.downloadTask.onProgressUpdate((res) => {
          // 下载进度
          this.downloadTime = ((res.totalBytesWritten/res.totalBytesExpectedToWrite)*100).toFixed();
          console.log("下载进度" + res.progress);
          console.log("已经下载的数据长度" + res.totalBytesWritten);
          console.log("预期需要下载的数据总长度" + res.totalBytesExpectedToWrite);
        });
      },
      // 取消下载
      abortDownload() {
        this.downloadTime = 0;
        if (this.$refs.popup) {
          this.$refs.popup.close();
          setTimeout(() => {
            this.upgrading = false;
          }, 200);
        }

        clearInterval(this.timer);
        if (this.downloadTask) {
          this.downloadTask.abort();
        }
      },
      //安装
      installApplications(filePath) {
        plus.runtime.install(filePath);
      },
    },
    computed: {},
    watch: {},

    // vue周期函数--初始化执行完毕
    created() {},
    // vue周期函数--数据更新后
    beforeUpdate() {},

    // 小程序周期函数--监听页面加载
    onLoad(options) {},
    // 小程序周期函数--监听页面初次渲染完成
    onReady() {},
    // 小程序周期函数--监听页面显示
    onShow() {},
    // 小程序周期函数--监听页面隐藏
    onHide() {},
    // 小程序周期函数--监听页面卸载
    onUnload() {},
    // 小程序页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh() {},
    // 小程序页面上拉触底事件的处理函数
    onReachBottom() {},
    // 小程序用户点击右上角分享
    /* onShareAppMessage() {}, */
    // 小程序页面相关事件处理函数--监听页面滚动
    /* onPageScroll() {}, */
    // 小程序页面相关事件处理函数--tab页点击
    /* onTabItemTap() {} */
  };
</script>

<style>
  .download .logo {
    width: 208rpx;
  }

  .download .upgrade {
    position: relative;
    background: #fff;
    width: 468rpx;
    min-height: 238rpx;
    border-radius: 20rpx;
  }
  .download .logo image {
    width: 208rpx;
    position: absolute;
    top: -80rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .download .content {
    padding-top: 80rpx;
  }
  .download .content .title {
    text-align: center;
    font-size: 30rpx;
    font-weight: bold;
  }

  .download .content .container {
    color: #666;
  }
  .download .content .container .descriptions {
    padding: 0rpx 30rpx;
    text-align: center;
    font-size: 28rpx;
  }
  .download .content .container .details,
  .download .content .prpgroess {
    padding: 16rpx 46rpx;
    box-sizing: border-box;
    font-size: 24rpx;
  }
  .download .content .prpgroess {
    padding: 16rpx 22rpx;
    margin: 20rpx 0;
  }
  .download .content .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .download .content .btn-group view {
    width: 200rpx;
    height: 68rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14rpx;
    font-size: 24rpx;
    border-radius: 16rpx;
    line-height: 1.5;
  }
  .download .content .btn-group view:last-child {
    background: #ef5656;
    color: #fff;
  }
</style>
