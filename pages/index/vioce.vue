<template>
  <view class="record-container">
    <button @touchstart="startRecord" @touchend="endRecord">按住说话,松开结束</button>

    <button @tap="playVoice">播放录音（{{intIntervalTime}}s）</button>

    <view class="status">录音中{{intIntervalTime}}s>>></view>
  </view>
</template>

<script>
const recorderManager = uni.getRecorderManager();

const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
  data() {
    return {
      text: "uni-app",

      voicePath: "",
      isRecord: false, // 记录状态,录音中或者是未开始
      intervalTime: 0,
      timer: null
    };
  },

  onLoad() {
    let self = this;

    recorderManager.onStop(function(res) {
      console.log("录音停止了" + JSON.stringify(res)); //返回录音的临时保存地址, 可用于后面的播放
      self.voicePath = res.tempFilePath;
    });
  },

  computed: {
    intIntervalTime() {
      // 用于显示整数的秒数
      return Math.round(this.intervalTime);
    },

    i18n () {
      return this.$t('index')
    }
  },

  methods: {
    startRecord() {
      this.timer = setInterval(() => {
        this.intervalTime += 0.5;
        if (this.intervalTime >= 0.5 && !this.isRecord) {
          //如果用户录制的时间太短,就不会去开启录音, 因为有个bug: recorderManager.stop()在短时间内开启在关闭的话,实际上他还在不停地录音,不知道你们有没有遇到过
		uni.showToast({
		    title: '正在录音',
		    image: '../../static/luyin.png',
			duration: 60000
		});
          this.isRecord = true;
          this.intervalTime = 0;
          recorderManager.start({
			duration: 10000*5, //指定录音的时长，单位 ms
            format: "amr",
          });
        }
		if(this.intervalTime >= 60){
			this.endRecord();
		}
      }, 500);


    },

    endRecord() {
      if (this.intervalTime <= 0.5) {
        uni.showToast({
            title: '录音太短',
            image: '../../static/luyin.png',
        	duration: 1500
        });
      }else if(this.intervalTime >= 60){
		  uni.showToast({
		      title: '最长60s录音',
		      image: '../../static/luyin.png',
		  	duration: 1500
		  });
	  }

      clearInterval(this.timer);

      if (this.isRecord) {
		  uni.hideToast()
        setTimeout(() => {
          recorderManager.stop();

          this.isRecord = false;

          console.log(this.isRecord);
        }, 500); //延迟小段时间停止录音, 更好的体验
      }
    },

    playVoice() {
      console.log("播放录音");

      if (this.voicePath) {
        innerAudioContext.src = this.voicePath;

        innerAudioContext.play();
      }
    }
  }
};
</script>

<style>
.record-container {
  padding-top: 100upx;
}

.status {
  text-align: center;
}
</style>
