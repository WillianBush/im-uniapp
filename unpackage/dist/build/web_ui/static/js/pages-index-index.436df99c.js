(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"3f52":function(t,e,s){t.exports=s.p+"static/img/logo.0d783e27.png"},8185:function(t,e,s){"use strict";s.r(e);var i=s("9e8b"),a=s("86f5");for(var n in a)"default"!==n&&function(t){s.d(e,t,(function(){return a[t]}))}(n);var o,c=s("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"7acdeba1",null,!1,i["a"],o);e["default"]=r.exports},"86f5":function(t,e,s){"use strict";s.r(e);var i=s("9aeb"),a=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a},"9aeb":function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("4160"),__webpack_require__("e25e"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var showedSignInIds="",_default={data:function(){return{backButtonPress:0,PageCur:"home",hot_wv:null,showSignIn:!1,time_t:(new Date).getTime(),randomid:0}},onLoad:function(){},methods:{goSignIn:function(){uni.navigateTo({url:"/pages/mine/signIn"})},hideSignIn:function(){this.showSignIn=!1},NavChange:function NavChange(e){var _this=this,user=uni.getStorageSync("USER");this.hot_wv,this.hot_wv&&this.hot_wv.hide(),"hotItem"==e.currentTarget.dataset.cur?this.randomid=parseInt(1e8*Math.random()):"mine"==e.currentTarget.dataset.cur?_this.$http.post("/sysConfig/json/getShimingCfg",{header:{"x-access-client":_this.$clientType}}).then((function(t){200==t.data.code&&_this.$store.commit("setShimingCfg",t.data.body)})):"addressBook"==e.currentTarget.dataset.cur&&(!this.$store.state.friend_list||this.$store.state.friend_list.length<=0?_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setFriend_list",res_data.body),_this.$store.state.friend_list.forEach((function(t){t.list.forEach((function(t){var e=uni.getStorageSync(t.member_uuid+"_NOTE");e&&""!=e&&(t.name=e)}))})))})):this.$store.state.friend_list.forEach((function(t){t.list.forEach((function(t){var e=uni.getStorageSync(t.member_uuid+"_NOTE");e&&""!=e&&(t.name=e)}))}))),"hotItem"==e.currentTarget.dataset.cur?_this.$store.commit("setHotItem_webView_show",!0):_this.$store.commit("setHotItem_webView_show",!1),setTimeout((function(){_this.PageCur=e.currentTarget.dataset.cur,"faxian"==_this.PageCur&&_this.$http.post("/fxs/json/getList",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(t){_this.$store.commit("setFaxian_site_list",t.data.body)}))}),50)},isCloseNet:function(){return!this.$websocket.state.is_open_socket&&this.$websocket.state.continueCloseCount>10}},onShow:function(){this.$store.commit("setCur_chat_entity",null),this.$store.commit("setCur_chat_msg_list",[])},mounted:function mounted(){var _this=this;if(this.$store.commit("setCur_chat_entity",null),this.$store.commit("setCur_chat_msg_list",[]),_this.$store.state.img_url||_this.$http.post("/user/file/getDomain",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.commit("setImgDomain",res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})),_this.$store.state.isEmployee||_this.$http.post("/user/employeeDefaultMessage/json/isEmployee",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);"success"==res_data.status?_this.$store.commit("setIsEmployee","Yes"===res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})),_this.$http.post("/sysConfig/json/getFooterHotItem",{header:{"x-access-client":_this.$clientType}}).then((function(t){_this.$store.commit("setHotItem",t.data.body)})),!this.$store.state.user){var user=uni.getStorageSync("USER");user?_this.$http.post("/user/json/load/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setUser",res_data.body),uni.setStorageSync("USER",res_data.body))})):uni.reLaunch({url:"pages/login/login"})}},onBackPress:function(){return uni.navigateBack(),!0}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},"9e8b":function(t,e,s){"use strict";var i;s.d(e,"b",(function(){return a})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{height:"100vh","margin-left":"66px"}},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.isCloseNet(),expression:"isCloseNet()"}],staticStyle:{position:"fixed",top:"0","z-index":"99999999999",background:"#E54D42",width:"100%",height:"60upx","line-height":"60upx",color:"#fff","text-align":"center","font-size":"24upx",opacity:".92"}},[t._v("网络已断开，请检查网络稳定性")]),i("home",{directives:[{name:"show",rawName:"v-show",value:"home"==t.PageCur,expression:"PageCur=='home'"}],ref:"homeRef"}),i("addressBook",{directives:[{name:"show",rawName:"v-show",value:"addressBook"==t.PageCur,expression:"PageCur=='addressBook'"}]}),i("faxian",{directives:[{name:"show",rawName:"v-show",value:"faxian"==t.PageCur,expression:"PageCur=='faxian'"}]}),i("mine",{directives:[{name:"show",rawName:"v-show",value:"mine"==t.PageCur,expression:"PageCur=='mine'"}]}),i("qunfa",{directives:[{name:"show",rawName:"v-show",value:"hotItem"==t.PageCur,expression:"PageCur=='hotItem'"}],attrs:{keyid:t.randomid}}),i("v-uni-view",{ref:"footerView",staticClass:"cu-bar tabbar bg-white shadow foot",staticStyle:{position:"fixed","z-index":"9"}},[i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"cuIcon-cu-image"})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{"margin-right":"5px","border-radius":"50%"},style:"background-image:url("+t.$store.state.img_url+t.$store.state.user.headpic+");"})],1)],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"cuIcon-cu-image"})],1),i("v-uni-view",{staticClass:"action",attrs:{"data-cur":"home"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("v-uni-text",{staticClass:"iconfont icon-xiaoxi",staticStyle:{"font-size":"50upx"},style:"color:"+("home"==t.PageCur?"#3F92F8":"#888")},[i("span")]),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.unReadMsgSum>0,expression:"$store.state.unReadMsgSum>0"}],staticClass:"cu-tag badge",staticStyle:{top:"0"}},[t._v(t._s(t.$store.state.unReadMsgSum))])],1),i("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("home"==t.PageCur?"#3F92F8":"#888")},[t._v("消息")])],1),i("v-uni-view",{staticClass:"action",attrs:{"data-cur":"addressBook"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("v-uni-text",{staticClass:"iconfont icon-tongxunlu1",staticStyle:{"font-size":"52upx"},style:"color:"+("addressBook"==t.PageCur?"#3F92F8":"#888")},[i("span")]),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.unDoFriendAddCount+t.$store.state.unDoRoomAddCount>0,expression:"($store.state.unDoFriendAddCount+$store.state.unDoRoomAddCount)>0"}],staticClass:"cu-tag badge",staticStyle:{top:"0"}},[t._v(t._s(t.$store.state.unDoFriendAddCount+t.$store.state.unDoRoomAddCount))])],1),i("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("addressBook"==t.PageCur?"#3F92F8":"#888")},[t._v("通讯录")])],1),i("v-uni-view",{staticClass:"action",attrs:{"data-cur":"faxian"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("v-uni-text",{staticClass:"iconfont icon-faxian",staticStyle:{"font-size":"50upx"},style:"color:"+("faxian"==t.PageCur?"#3F92F8":"#888")},[i("span")])],1),i("v-uni-view",{staticStyle:{"margin-top":"2upx"},style:"color:"+("faxian"==t.PageCur?"#3F92F8":"#888")},[t._v("发现")])],1),i("v-uni-view",{staticClass:"action",attrs:{"data-cur":"mine"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("v-uni-text",{staticClass:"iconfont icon-wode",staticStyle:{"font-size":"46upx"},style:"color:"+("mine"==t.PageCur?"#3F92F8":"#888")},[i("span")])],1),i("v-uni-view",{staticStyle:{"margin-top":"2upx","padding-top":"4upx"},style:"color:"+("mine"==t.PageCur?"#3F92F8":"#888")},[t._v("我的")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"cuIcon-cu-image"})],1),i("v-uni-view",{staticClass:"action text-gray",attrs:{"data-cur":"hotItem"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.NavChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-cu-image"},[i("img",{attrs:{src:s("3f52"),width:"50px",height:"50px"}})])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"cuIcon-cu-image"})],1)],1),t.$store.state.signInCnf?[i("v-uni-view",{staticClass:"cu-modal",class:t.showSignIn?"show":"",staticStyle:{"z-index":"999999999"}},[i("v-uni-view",{staticClass:"cu-dialog",staticStyle:{width:"600upx"}},[i("v-uni-view",{staticClass:"bg-img",staticStyle:{height:"400upx"},style:"background-image:url("+t.$store.state.img_url+"/img_sys/signin.png)"},[i("v-uni-view",{staticClass:"cu-bar justify-end text-white"},[i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hideSignIn.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-close "})],1)],1)],1),i("v-uni-view",{staticClass:"cu-bar bg-white",staticStyle:{"text-align":"center"}},[i("v-uni-button",{staticClass:"cu-btn round bg-red",staticStyle:{margin:"auto auto",padding:"0 52upx"},style:"background-color: "+t.$store.state.signInCnf.signInBtnBgColor_index,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSignIn.apply(void 0,arguments)}}},[t._v("立即签到")])],1)],1)],1)]:t._e()],2)},n=[]}}]);