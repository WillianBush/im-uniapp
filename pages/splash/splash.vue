<template>
    <view class="start-wrap u-flex u-row-center">
        <image class="start-img" src="/static/splash.png" mode="aspectFill" @load="loadImage"></image>
    </view>
</template>

<script>
    import store from "store"//使用vuex对状态进行管理
    export default {
        data() {
            return {};
        },
        methods: {
            loadImage() {
                setTimeout(() => {

                    console.log('res_user--' + store.state.user)
                    let user = uni.getStorageSync("USER");
                    if (user) {
                        console.log('res_user1111--')
                        uni.navigateTo({
                            url: "/pages/index/index"
                        })
                    } else {
                        uni.navigateTo({
                            url: "/pages/login/login"
                        })
                    }

                }, 2000);
            }
        },
        onShow: function () {
            let _this = this;
            setTimeout(function () {
                console.log('Splash Show--')
                //这里的主要目的是为了，更新好友在线的状态，因为当处于appHide的时候。程序没有通知到位的情况下需要更新消息列表
                let user = uni.getStorageSync("USER");
                if (user) {

                    let v = {
                        uid: user.id,
                        status: 1//APP处于前台
                    }
                    setTimeout(() => {
                        this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'" + JSON.stringify(v) + "',CMD:'APP_HIDE_SHOW'}");
                    }, 1000)

                    store.commit("setUser", user);
                    if (_this.$store.state.ar_list.length == 0) {

                        _this.$http.post("/user/accessRecord/json/list",
                            {
                                header: {
                                    "x-access-uid": user.id,
                                    "x-access-client": _this.$clientType
                                }
                            }
                        ).then(res_1 => {
                            let res_data_1 = eval(res_1.data);
                            if (res_data_1.code == 200) {
                                let unreadSum = 0;
                                console.log(res_data_1.body.length);
                                res_data_1.body.forEach(item => {

                                    let s = uni.getStorageSync(item.id + "_NOTE");
                                    if (s && s != "") {
                                        item.title = s;
                                    }

                                    let last_txt = uni.getStorageSync(user.id + "#" + item.id + '_CHAT_MESSAGE_LASTCONTENT');
                                    if (last_txt.indexOf("<img") >= 0) {
                                        item.content = "[图片]";
                                    } else if (last_txt.indexOf("upload/chat/voice") >= 0) {
                                        item.content = "[语音]";
                                    } else if (last_txt.indexOf("upload/chat/video") >= 0) {
                                        item.content = "[视频]";
                                    } else {
                                        item.content = last_txt;
                                    }


                                    let unRead = uni.getStorageSync(user.id + "#" + item.id + '_CHAT_MESSAGE_UNREAD');
                                    if (unRead && unRead != "") {
                                        unreadSum += parseInt(unRead);
                                        item.unread = parseInt(unRead);
                                    } else {
                                        item.unread = 0;
                                    }

                                    let aite_count = uni.getStorageSync(item.id + "#AITE_COUNT");
                                    if (aite_count && aite_count != "") {
                                        item.aiteCount = parseInt(aite_count);
                                    }

                                    let zhiding = uni.getStorageSync(item.id + "_zhiding");
                                    if (zhiding) {
                                        item.top = 0;
                                    }

                                });
                                let list = res_data_1.body;
                                list.sort(function (a, b) {
                                    if (a.top == b.top) {
                                        return b.createDateTime - a.createDateTime;
                                    } else {
                                        return a.top - b.top;
                                    }
                                })


                                _this.$store.commit("setAr_list", list)
                                _this.$store.commit("setUnReadMsgSum", unreadSum)

                                //_this.$store.commit("setAr_list_show",list)

                            } else if(res_data_1.code == 502){
                                uni.navigateTo({
                                    url: "/pages/empty/empty"
                                })
                            } else {
                                uni.showToast({
                                    icon: 'none',
                                    title: "获取列表失败"
                                });
                            }
                        })
                    } else {
                        uni.navigateTo({
                            url: "/pages/login/login"
                        })
                    }
                }
            }, 2000)
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
    }
</style>


