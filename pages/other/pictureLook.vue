<template>
    <view class="chlidCenter" style="background: #eee;color:#000;" >
        <image :src="$store.state.currentPicLookUrl" mode="aspectFit" @load="loadImage" style="width: 1200px;height: 700px"></image>
    </view>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            loadImage() {},
            goback () {
                this.$emit('goBack');
            },
        },
        onShow: async function () {
            await this.$onLaunched;
            let _this = this;
        }
    }
</script>

<style lang="scss">
    page {
        height: 100%;
    }

    .start-wrap, .start-img {
        width: 100%;
        height: 100%;
    }.chlidCenter{
        display: flex;
        flex-direction: column;
        align-items: center;//水平居中
        justify-content: center;//垂直居中
         }
</style>


