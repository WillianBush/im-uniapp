
<template>
  <view>
    <!-- <button @click="upgrade">upgrade</button> -->
    <view class="download">
      <uni-popup ref="popup" type="center">
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
              <view class="cancel" @click="hiddenUppop" style="border: 1px solid #ddd;
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
export default {
  data: () => ({
    // 新版本字符串【需要赋值】
    versionStr: "",
    // 是否更新
    upgrading: false,
    // 下载时间
    downloadTime: 0,
    // 定时器
    timer: null,
    // 是否强制更新
    isForceUpgrade: true,
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
    // 取消更新
    hiddenUppop() {
      this.$refs.popup.close();
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
			let _appType = "";
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       //console.log('客户端是Android')
				   _appType = "android";
			       break;
			    case 'ios':
			      // console.log('客户端是iOS')
				   _appType = "ios";
			       break;
			    // case 'devtools':
			    //    console.log('客户端是在开发者工具上')
			    //    break;
			    // default:
			    //    console.log('客户端是在其他工具上')
			    //    break;
			}
			_this.$http.post("/sysConfig/json/getSysVersion",
				{
					appType:_appType
				},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) { 
					console.log("_this.$store.state.SYS_VERSION:"+_this.$store.state.SYS_VERSION);
					console.log("res_data.body.version:"+res_data.body.version);
					if(_this.$store.state.SYS_VERSION==res_data.body.version) {
						uni.showToast({
						  title: "当前版本已是最新版本",
						  duration: 2000,
						  icon: "none",
						});
					} else {
						_this.versionStr = res_data.body.version;
						_this.downloadUrl = res_data.body.url;
						_this.details = res_data.body.details;
						_this.$refs.popup.open();
					}
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
      if (!this.upgrading) {
        let versionInfo = this.getVersionAndPlatform();
        console.log(versionInfo);
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
        // 如果是强制更新
        this.isForceUpgrade = false;
        // 这里是模拟更新
        this.timer = setInterval(() => {
          this.downloadTime++;
          if (this.downloadTime >= 100) {
            this.downloadTime = 0;
            if (this.$refs.popup) {
              this.$refs.popup.close();

              setTimeout(() => {
                this.upgrading = false;
              }, 200);
            }

            clearInterval(this.timer);
          }
        }, 1000);
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
      }
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
      // 建立下载任务
      this.downloadTask = uni.downloadFile({
        // 下载地址
        url: this.downloadUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            // 把当前app保存下载
            uni.saveFile({
              tempFilePath: res.tempFilePaths,
              success: (resp) => {
                // 保存成功
                var savedFilePath = resp.savedFilePath;
                // 安装
                this.installApplications({
                  filePath: savedFilePath,
                  success: (res) => {
                    console.info(res);
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
              },
              fail: (err) => {
                // 保存失败
                console.error(err);
              },
            });
          }
        },
      });

      this.downloadTask.onProgressUpdate((res) => {
        // 下载进度
        this.downloadTime = res.progress;
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
    installApplications(filePath, success, error) {
      plus.runtime.install(
        filePath,
        { force: this.isForceUpgrade },
        success,
        error
      );
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
