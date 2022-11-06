<template>
    <view class="start-wrap u-flex u-row-center">
        <image class="start-img" src="/static/splash.png" mode="aspectFill" @load="loadImage"></image>
        <updatepage ref="updatepage"></updatepage>
    </view>
</template>

<script>
    import VersionUtil from "../../utils/VersionUtil"
    import store from "store"//使用vuex对状态进行管理
    import updatepage from "../../components/user/updatepage/updatepage.vue";
    export default {
        components: {
            updatepage
        },
        data() {
            return {
            };
        },
        methods: {
            loadImage() {
            },
            compareVersion(netV, nativeV) {
                if (netV && nativeV) {
                    //将两个版本号拆成数字
                    var arr1 = netV.split('.'),
                        arr2 = nativeV.split('.');
                    var minLength = Math.min(arr1.length, arr2.length),
                        position = 0,
                        diff = 0;
                    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
                    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
                        position++;
                    }
                    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
                    //若curV大于reqV，则返回true
                    return diff > 0;
                } else {
                    //输入为空
                    console.log("版本号不能为空");
                    return false;
                }
            },
            checkVersion(){
                let _this = this;
                //android:1,ios:2
                let _appType;
                let _appName = uni.getSystemInfoSync().appName;

                switch(uni.getSystemInfoSync().platform){
                    case 'android':
                        //console.log('客户端是Android')
                        _appType = "1";
                        _this.getSerivceVersion(_appType,_appName);
                        break;
                    case 'ios':
                        // console.log('客户端是iOS')
                        _appType = "2";
                        _this.getSerivceVersion(_appType,_appName);
                        break;
                    // case 'devtools':
                    //    console.log('客户端是在开发者工具上')
                    //    break;
                    // default:
                    //    console.log('客户端是在其他工具上')
                    //    break;
                }

                _this.getSerivceVersion(1,"约伴");
            },
            getSerivceVersion(_appType,_appName){
                let _this = this;
                let timestamp = new Date().getTime()
                _this.$http.get("/user/appversion/json/getAppVersion?site_id=1&device_type="+_appType+"&app_id="+_appName+"&_t="+timestamp,
                    {
                        header:{
                            "x-access-uid":_this.$store.state.user.id,
                            "x-access-client":_this.$clientType
                        }
                    }
                ).then(res=>{
                    let res_data = eval(res.data);

                    console.log("tttttt" , res_data);
                    if(res_data.code==200) {
                        console.log("_this.$store.state.SYS_VERSION:"+_this.$store.state.SYS_VERSION);
                        console.log("res_data.body.version:"+res_data.body.version);

                        //不显示
                        if(res_data.body.is_show == 0){
                            _this.init();
                            return
                        }

                        let nativeV = _this.$store.state.SYS_VERSION;
                        let netV = res_data.body.version;
                        let vUpdate = this.compareVersion(netV,nativeV);

                        console.log("res_data.body.vUpdate:"+vUpdate);
                        if(vUpdate) {
                            //打开升级页面
                            _this.$nextTick(()=>{
                                _this.$refs.updatepage.upgrade();
                            })
                        }else{
                            _this.init()
                        }
                    }else{
                        _this.init();
                    }
                })
            },
            init(){
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

                            _this.$http.post("/user/accessRecord/json/listPage",
                                {
                                    pageSize:50,//数量
                                    pageNumber:1//页数
                                },
                                {
                                    header:{
                                        "x-access-uid":user.id,
                                        "x-access-client":_this.$clientType
                                    }
                                }
                            ).then(res_1 => {
                                let res_data_1 = eval(res_1.data);
                                if (res_data_1.code == 200) {
                                    let unreadSum = 0;
                                    console.log(res_data_1.body.length);
                                    res_data_1.body.list.forEach(item => {

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
                                    let list = res_data_1.body.list;
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

                                } else if (res_data_1.code == 502) {
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
                            //进入首页
                            uni.navigateTo({
                                url: "/pages/index/index"
                            })
                        } else {
                            uni.navigateTo({
                                url: "/pages/login/login"
                            })
                        }
                    }else{
                        uni.navigateTo({
                            url: "/pages/login/login"
                        })
                    }
                }, 2000)
            }
        },
        onShow: async function () {
            await this.$onLaunched;
            let _this = this;
            //#ifdef H5
                _this.init();
            //#endif

            // #ifdef APP-PLUS
                //检查是否需要更新
                _this.checkVersion();
            //#endif
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


