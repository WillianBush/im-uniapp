<template>
    <view>
        <cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
            <block slot="backText"></block>
            <block slot="content">视频播放</block>
        </cu-custom>
        <view class="center" style="width:100%;height:1200upx;">
            <video :src="videoUrl" style="border-radius: 12upx;">></video>
        </view>
    </view>
</template>


<script setup>
    export default {
        name: "MyVideo",

        data() {
            return {
                videoUrl: ""
            }
        },
        // navigate.vue页面接受参数
	    computed:{
		    i18n () {
			    return this.$t('index')
		    }
	    },
        onLoad: function (option) {
            let _this = this;
            if (option.item) {
                _this.videoUrl = option.item;
            }
        }

    }
</script>

<style>
    .center {
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
