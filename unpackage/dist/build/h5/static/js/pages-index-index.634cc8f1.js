(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"6eec":function(t,e,s){"use strict";s.r(e);var o=s("a9c7"),a=s("7a8a");for(var i in a)["default"].indexOf(i)<0&&function(t){s.d(e,t,(function(){return a[t]}))}(i);var n=s("f0c5"),r=Object(n["a"])(a["default"],o["b"],o["c"],!1,null,"18cda18c",null,!1,o["a"],void 0);e["default"]=r.exports},"7a8a":function(t,e,s){"use strict";s.r(e);var o=s("a094"),a=s.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){s.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},a094:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b");var showedSignInIds="",_default={data:function(){return{pageConfigs:[],backButtonPress:0,PageCur:"home",hot_wv:null,showSignIn:!1,time_t:(new Date).getTime()}},computed:{i18n:function(){return this.$t("index")}},methods:{goSignIn:function(){uni.navigateTo({url:"/pages/mine/signIn"})},hideSignIn:function(){this.showSignIn=!1},NavChange:function NavChange(e){var _this2=this,_this=this,user=uni.getStorageSync("USER");if(this.hot_wv,this.hot_wv&&this.hot_wv.hide(),"hotItem"==e.currentTarget.dataset.cur){if(2==this.$store.state.hotItem.show_type)return void uni.navigateTo({url:"/pages/hotItem/hotItem_app"});this.$store.state.footerViewHeight=_this.$refs["footerView"].$el.clientHeight,this.url=this.$store.state.hotItem.url,this.siteName=this.$store.state.hotItem.name}else"mine"==e.currentTarget.dataset.cur?(uni.getStorageSync("locale"),_this.$http.post("/sysConfig/json/getShimingCfg",{header:{"x-access-client":_this.$clientType}}).then((function(t){200==t.data.code&&_this.$store.commit("setShimingCfg",t.data.body)}))):"addressBook"==e.currentTarget.dataset.cur&&(!this.$store.state.friend_list||this.$store.state.friend_list.length<=0?_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setFriend_list",res_data.body),_this.$store.state.friend_list.forEach((function(t){t.list.forEach((function(t){var e=uni.getStorageSync(t.member_uuid+"_NOTE");e&&""!=e&&(t.name=e)}))})))})):this.$store.state.friend_list.forEach((function(t){t.list.forEach((function(t){var e=uni.getStorageSync(t.member_uuid+"_NOTE");e&&""!=e&&(t.name=e)}))})));"hotItem"==e.currentTarget.dataset.cur?_this.$store.commit("setHotItem_webView_show",!0):_this.$store.commit("setHotItem_webView_show",!1),_this.PageCur=e.currentTarget.dataset.cur,"faxian"==e.currentTarget.dataset.cur&&_this.$http.post("/fxs/json/getListWithMid",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(t){_this2.pageConfigs=t.data.body,_this2.pageConfigs,_this.$store.commit("setFaxian_site_list",t.data.body)}))},isCloseNet:function(){return!this.$websocket.state.is_open_socket&&this.$websocket.state.continueCloseCount>10}},onShow:function(){this.$store.commit("setCur_chat_entity",null),this.$store.commit("setCur_chat_msg_list",[]),showedSignInIds.indexOf(this.$store.state.user.id)},mounted:function mounted(){var _this=this;if(this.$store.commit("setCur_chat_entity",null),this.$store.commit("setCur_chat_msg_list",[]),_this.$store.state.img_url||_this.$http.post("/user/file/getDomain",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.commit("setImgDomain",res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})),_this.$store.state.isEmployee||_this.$http.post("/user/employeeDefaultMessage/json/isEmployee",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res.statusCode?_this.$store.commit("setIsEmployee","Yes"===res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})),_this.$http.post("/sysConfig/json/getFooterHotItem",{header:{"x-access-client":_this.$clientType}}).then((function(t){_this.$store.commit("setHotItem",t.data.body)})),!this.$store.state.user){var user=uni.getStorageSync("USER");user?_this.$http.post("/user/json/load/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setUser",res_data.body),uni.setStorageSync("USER",res_data.body))})):uni.reLaunch({url:"pages/login/login"})}},onBackPress:function(){return uni.navigateBack(),!0}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},a9c7:function(t,e,s){"use strict";s.d(e,"b",(function(){return o})),s.d(e,"c",(function(){return a})),s.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{staticStyle:{height:"100vh"}},[s("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.isCloseNet(),expression:"isCloseNet()"}],staticStyle:{position:"fixed",top:"0","z-index":"99999999999",background:"#E54D42",width:"100%",height:"60upx","line-height":"60upx",color:"#fff","text-align":"center","font-size":"24upx",opacity:".92"}},[t._v("网络已断开，请检查网络稳定性")]),s("home",{directives:[{name:"show",rawName:"v-show",value:"home"==t.PageCur,expression:"PageCur=='home'"}],ref:"homeRef"}),s("addressBook",{directives:[{name:"show",rawName:"v-show",value:"addressBook"==t.PageCur,expression:"PageCur=='addressBook'"}]}),"hotItem"==t.PageCur&&1==t.$store.state.hotItem.show_type?s("hotItem"):t._e(),s("faxian",{directives:[{name:"show",rawName:"v-show",value:"faxian"==t.PageCur,expression:"PageCur=='faxian'"}]}),s("mine",{directives:[{name:"show",rawName:"v-show",value:"mine"==t.PageCur,expression:"PageCur=='mine'"}]}),s("v-uni-view",{ref:"footerView",staticClass:"cu-bar tabbar bg-white shadow foot",staticStyle:{position:"fixed","z-index":"999999"}},[s("v-uni-view",{staticClass:"action",attrs:{"data-cur":"home"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"cuIcon-cu-image"},[s("v-uni-text",{staticClass:"iconfont icon-xiaoxi",staticStyle:{"font-size":"50upx"},style:"color:"+("home"==t.PageCur?"#3F92F8":"#888")},[s("span")]),s("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.unReadMsgSum>0,expression:"$store.state.unReadMsgSum>0"}],staticClass:"cu-tag badge",staticStyle:{top:"0"}},[t._v(t._s(t.$store.state.unReadMsgSum))])],1),s("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("home"==t.PageCur?"#3F92F8":"#888")},[t._v("消息")])],1),s("v-uni-view",{staticClass:"action",attrs:{"data-cur":"addressBook"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"cuIcon-cu-image"},[s("v-uni-text",{staticClass:"iconfont icon-tongxunlu1",staticStyle:{"font-size":"52upx"},style:"color:"+("addressBook"==t.PageCur?"#3F92F8":"#888")},[s("span")]),s("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.unDoFriendAddCount+t.$store.state.unDoRoomAddCount>0,expression:"($store.state.unDoFriendAddCount+$store.state.unDoRoomAddCount)>0"}],staticClass:"cu-tag badge",staticStyle:{top:"0"}},[t._v(t._s(t.$store.state.unDoFriendAddCount+t.$store.state.unDoRoomAddCount))])],1),s("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("addressBook"==t.PageCur?"#3F92F8":"#888")},[t._v("通讯录")])],1),1==t.$store.state.hotItem.show_type?[s("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:null!=t.$store.state.hotItem&&1==t.$store.state.hotItem.show,expression:"$store.state.hotItem!=null&&$store.state.hotItem.show==1"}],staticClass:"action text-gray ",attrs:{"data-cur":"hotItem"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:""==t.$store.state.hotItem.logo||!t.$store.state.hotItem.logo,expression:"$store.state.hotItem.logo==''||!$store.state.hotItem.logo"}],staticClass:"cu-btn cuIcon-hotfill bg-green shadow",staticStyle:{"background-color":"rgb(229, 77, 66)",color:"#fff","font-size":"44upx",width:"50upx",height:"50upx",padding:"0px","border-radius":"50%","line-height":"52upx"}}),s("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.hotItem.logo&&""!=t.$store.state.hotItem.logo,expression:"$store.state.hotItem.logo&&$store.state.hotItem.logo!=''"}],staticClass:"cu-btn cuIcon bg-white  shadow",staticStyle:{color:"#fff","font-size":"44upx","background-size":"100%","background-repeat":"no-repeat",width:"50upx",height:"50upx",padding:"0px","border-radius":"50%","line-height":"52upx"},style:"background-image:url("+t.$store.state.img_url+t.$store.state.hotItem.logo+")"}),s("v-uni-view",{staticStyle:{"margin-top":"2upx",color:"#E54D42"}},[t._v(t._s(t.$store.state.hotItem.name))])],1)]:[s("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:null!=t.$store.state.hotItem&&1==t.$store.state.hotItem.show,expression:"$store.state.hotItem!=null&&$store.state.hotItem.show==1"}],staticClass:"action text-gray add-action",attrs:{"data-cur":"hotItem"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:""==t.$store.state.hotItem.logo||!t.$store.state.hotItem.logo,expression:"$store.state.hotItem.logo==''||!$store.state.hotItem.logo"}],staticClass:"cu-btn cuIcon-hotfill bg-green shadow",staticStyle:{"background-color":"rgb(229, 77, 66)",color:"#fff","font-size":"44upx"}}),s("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.hotItem.logo&&""!=t.$store.state.hotItem.logo,expression:"$store.state.hotItem.logo&&$store.state.hotItem.logo!=''"}],staticClass:"cu-btn cuIcon-a bg-white  shadow",staticStyle:{color:"#fff","font-size":"44upx","background-size":"100%","background-repeat":"no-repeat"},style:"background-image:url("+t.$store.state.img_url+t.$store.state.hotItem.logo+")"}),s("v-uni-view",{staticStyle:{"margin-top":"2upx",color:"#E54D42"}},[t._v(t._s(t.$store.state.hotItem.name))])],1)],s("v-uni-view",{staticClass:"action",attrs:{"data-cur":"faxian"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"cuIcon-cu-image"},[s("v-uni-text",{staticClass:"iconfont icon-faxian",staticStyle:{"font-size":"50upx"},style:"color:"+("faxian"==t.PageCur?"#3F92F8":"#888")},[s("span")])],1),s("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("faxian"==t.PageCur?"#3F92F8":"#888")},[t._v("VIP")])],1),s("v-uni-view",{staticClass:"action",attrs:{"data-cur":"mine"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"cuIcon-cu-image"},[s("v-uni-text",{staticClass:"iconfont icon-wode",staticStyle:{"font-size":"46upx"},style:"color:"+("mine"==t.PageCur?"#3F92F8":"#888")},[s("span")])],1),s("v-uni-view",{staticStyle:{"margin-top":"2upx","padding-top":"4upx"},style:"color:"+("mine"==t.PageCur?"#3F92F8":"#888")},[t._v("我的")])],1)],2),t.$store.state.signInCnf?[s("v-uni-view",{staticClass:"cu-modal",class:t.showSignIn?"show":"",staticStyle:{"z-index":"999999999"}},[s("v-uni-view",{staticClass:"cu-dialog",staticStyle:{width:"600upx"}},[s("v-uni-view",{staticClass:"bg-img",staticStyle:{height:"400upx"},style:"background-image:url("+t.$store.state.img_url+"/img_sys/signin.png)"},[s("v-uni-view",{staticClass:"cu-bar justify-end text-white"},[s("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hideSignIn.apply(void 0,arguments)}}},[s("v-uni-text",{staticClass:"cuIcon-close "})],1)],1)],1),s("v-uni-view",{staticClass:"cu-bar bg-white",staticStyle:{"text-align":"center"}},[s("v-uni-button",{staticClass:"cu-btn round bg-red",staticStyle:{margin:"auto auto",padding:"0 52upx"},style:"background-color: "+t.$store.state.signInCnf.signInBtnBgColor_index,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSignIn.apply(void 0,arguments)}}},[t._v("立即签到")])],1)],1)],1)]:t._e()],2)},a=[]}}]);