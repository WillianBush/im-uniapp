(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-user-message_record"],{"061a":function(e,t,i){"use strict";i.r(t);var a=i("98a7"),s=i("7678");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("3b9a");var o=i("f0c5"),r=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,"71c11066",null,!1,a["a"],void 0);t["default"]=r.exports},1297:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.openHongbao.move[data-v-71c11066]{-webkit-animation:3s move-data-v-71c11066 infinite;animation:3s move-data-v-71c11066 infinite;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}@-webkit-keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}@-moz-keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}@keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}',""]),e.exports=t},"3b9a":function(e,t,i){"use strict";var a=i("fcf2"),s=i.n(a);s.a},7678:function(e,t,i){"use strict";i.r(t);var a=i("a484"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},"7d5d":function(e,t,i){"use strict";i.r(t);var a=i("8008"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},8008:function(module,exports,__webpack_require__){"use strict";(function(__f__){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("14d9"),__webpack_require__("3c65"),__webpack_require__("e9c4"),__webpack_require__("99af");var _defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_uParse=_interopRequireDefault(__webpack_require__("a6b6")),_open=_interopRequireDefault(__webpack_require__("061a")),_utils=__webpack_require__("264b"),innerAudioContext=uni.createInnerAudioContext(),_default={components:{uParse:_uParse.default,openRed:_open.default},data:function(){var e;return e={toid:"",list:[],allList:[],player:null,selVoiceIndex:-1,domHeight:0,c_type:1,InputBottom:0},(0,_defineProperty2.default)(e,"toid",""),(0,_defineProperty2.default)(e,"entity",{}),(0,_defineProperty2.default)(e,"txt",""),(0,_defineProperty2.default)(e,"temp_txt",""),(0,_defineProperty2.default)(e,"moreShow",!0),(0,_defineProperty2.default)(e,"showjia",!0),(0,_defineProperty2.default)(e,"emotion",1),(0,_defineProperty2.default)(e,"showItem",0),(0,_defineProperty2.default)(e,"scrollTop",0),(0,_defineProperty2.default)(e,"style",{pageHeight:0,contentViewHeight:0,footViewHeight:90,mitemHeight:0}),(0,_defineProperty2.default)(e,"sendCount",0),(0,_defineProperty2.default)(e,"RECORDER",uni.getRecorderManager()),(0,_defineProperty2.default)(e,"AUDIO",uni.createInnerAudioContext()),(0,_defineProperty2.default)(e,"recordTimer",null),(0,_defineProperty2.default)(e,"recordLength",0),(0,_defineProperty2.default)(e,"voicePath",""),(0,_defineProperty2.default)(e,"isRecord",!1),(0,_defineProperty2.default)(e,"intervalTime",0),(0,_defineProperty2.default)(e,"timer",null),(0,_defineProperty2.default)(e,"v_base64",""),(0,_defineProperty2.default)(e,"winSize",{}),(0,_defineProperty2.default)(e,"showShade",!1),(0,_defineProperty2.default)(e,"showPop",!1),(0,_defineProperty2.default)(e,"popButton",["复制","转发","收藏","删除","撤消"]),(0,_defineProperty2.default)(e,"popButtonStore",["复制","转发","收藏","删除","撤消"]),(0,_defineProperty2.default)(e,"popStyle",""),(0,_defineProperty2.default)(e,"pickerUserIndex",-1),(0,_defineProperty2.default)(e,"chatLogs",[]),(0,_defineProperty2.default)(e,"temp_content",""),(0,_defineProperty2.default)(e,"temp_uuid",""),(0,_defineProperty2.default)(e,"chatCfg",{}),(0,_defineProperty2.default)(e,"temp_bean",null),(0,_defineProperty2.default)(e,"showOpenRed",!1),(0,_defineProperty2.default)(e,"showname",""),(0,_defineProperty2.default)(e,"refresherTriggered",!1),(0,_defineProperty2.default)(e,"_refresherTriggered",!1),(0,_defineProperty2.default)(e,"numPag",1),(0,_defineProperty2.default)(e,"allPageNum",1e4),(0,_defineProperty2.default)(e,"pageSize",50),(0,_defineProperty2.default)(e,"status","more"),(0,_defineProperty2.default)(e,"pageParams",{pageNumber:"1",pageCount:"30"}),(0,_defineProperty2.default)(e,"timer",null),(0,_defineProperty2.default)(e,"syncMessageArr",[]),e},onLoad:function(e){this.toid=e.id;this.tongbuMsg(this.pageParams.pageCount,this.pageParams.pageNumber)},methods:{loadmore:function(){this.pageParams.pageNumber++,__f__("log","watch=>",this.pageParams.pageNumber," at pages/chat/user/message_record.vue:410"),__f__("log","watch=>",this.pageParams.pageNumber+"1"," at pages/chat/user/message_record.vue:411"),this.tongbuMsg(this.pageParams.pageCount,this.pageParams.pageNumber)},refresherrefresh:function(){__f__("log","自定义下拉刷新被触发"," at pages/chat/user/message_record.vue:415");this._refresherTriggered||(this._refresherTriggered=!0,this.refresherTriggered||(this.refresherTriggered=!0),this.pageParams.pageNumber++,this.loadStoreData(this.pageParams.pageCount,this.pageParams.pageNumber))},refresherrestore:function(){__f__("log","自定义下拉刷新被复位"," at pages/chat/user/message_record.vue:430");this.refresherTriggered=!1,this._refresherTriggered=!1},refresherabort:function(){__f__("log","自定义下拉刷新被中止    "," at pages/chat/user/message_record.vue:436");this.refresherTriggered=!1,this._refresherTriggered=!1},scrollLower:function(){__f__("log","我滚动到底部了"," at pages/chat/user/message_record.vue:442")},closeRefresh:function(){this.refresherTriggered=!1,this._refresherTriggered=!1},tongbuMsg:function tongbuMsg(){var _this2=this,_this=this;uni.showLoading(),_this.$http.post("/chat_msg/syncMsgData",{chatid:_this.toid,pageNumber:this.pageParams.pageNumber},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(201==res_data.code)setTimeout((function(){_this2.moreShow=!1,uni.hideLoading(),uni.showToast({title:"暂无更多",icon:"none"})}),400);else if(200==res_data.code){if(res_data.body&&0!=res_data.body.list.length){for(var cList=[],i=0;i<res_data.body.list.length;i++)cList.push(res_data.body.list[i][0]);_this.syncMessageArr.unshift.apply(_this.syncMessageArr,cList);var user=uni.getStorageSync("USER");_this.$store.commit("setCur_chat_msg_list",[]),_this2.$store.state.cur_chat_msg_list=_this.syncMessageArr,_this2.$store.state.chatMessageMap.has(user.id+"#"+_this2.toid)&&_this2.$store.commit("updateChatMessageMap",{key:user.id+"#"+_this2.toid,value:_this2.$store.state.cur_chat_msg_list}),0!=_this2.$store.state.cur_chat_msg_list.length&&_this2.$store.state.cur_chat_msg_list[_this2.$store.state.cur_chat_msg_list.length-1].bean.simple_content,uni.setStorageSync(user.id+"#"+_this2.toid+"_CHAT_MESSAGE",JSON.stringify(_this2.$store.state.cur_chat_msg_list))}if(_this2.pageParams=res_data.body,_this2.pageParams.pageNumber>1){for(var _i=0;_i<res_data.body.list.length;_i++)res_data.body.list[_i]=res_data.body.list[_i][0].bean;_this.chatLogs.unshift.apply(_this.chatLogs,res_data.body.list),uni.hideLoading()}else uni.hideLoading(),_this2.chatLogs=res_data.body.list;for(var _i2=0;_i2<_this2.chatLogs.length;_i2++)_this2.chatLogs[_i2]=_this2.chatLogs[_i2][0].bean;setTimeout((function(){uni.hideLoading()}),400)}})).catch((function(e){__f__("log","err=>",e," at pages/chat/user/message_record.vue:533")}))},loadStoreData:function loadStoreData(pSize,pNumber){var _this3=this,_this=this,user=uni.getStorageSync("USER");user&&_this.$http.post("/chat/listPage",{pageSize:pSize,pageNumber:pNumber,toMemberid:_this.toid},{}).then((function(res_1){var res_data_1=eval(res_1.data);__f__("log","test_test",res_data_1," at pages/chat/user/message_record.vue:551"),200==res_data_1.code?(_this3.pageParams.pageNumber=res_data_1.body.pageNumber,_this3.pageParams.pageNumber>1?_this.allList=_this.allList.concat(res_data_1.body.list):_this.allList=res_data_1.body.list,_this3.closeRefresh()):_this3.closeRefresh()}))},getPopButton:function(e){return"复制"==e?"icon-fuzhi":"转发"==e?"icon-zhuanfa":"收藏"==e?"icon-collection-b":"删除"==e?"icon-shanchu":"撤消"==e?"icon-shangjiachexiaoshenqingrenzhengliebiao":""},clickCard:function(e){this.goUserDetail(e.muuid)},sendCard:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/card/sendCard"}),this.$store.state.temp.bean=this.entity,this.$store.state.temp.bean.name=this.entity.nickName,this.$store.state.temp.bean.img=this.entity.headpic},goTransfer:function(){this.$store.state.temp.bean=this.entity,uni.navigateTo({url:"/pages/chat/transfer/transfer"}),this.showPop=!1,this.showItem=0,this.InputBottom=0},openRedDetail:function(){this.showOpenRed=!1,uni.navigateTo({url:"/pages/chat/red/red_detail"})},hideOpenRed:function(){this.showOpenRed=!1},clickHongbao:function(e){__f__("log",e," at pages/chat/user/message_record.vue:609");var t=uni.getStorageSync("USER"),i=uni.getStorageSync(t.id+"_RED_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[e.redUUID],a[e.redUUID]&&(e=a[e.redUUID])}this.temp_bean=e,this.showOpenRed=!0,this.$store.state.temp.bean=this.temp_bean},clickTransfer:function(e){var t=uni.getStorageSync("USER"),i=uni.getStorageSync(t.id+"_TRANSFER_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[e.utid],a[e.utid]&&(e=a[e.utid])}this.temp_bean=e,this.$store.state.temp.bean=this.temp_bean,uni.navigateTo({url:"../transfer/transfer_receive"})},sendRed:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/red/sendRed?chatType=user&toid="+this.entity.id})},goFavourite:function(){uni.navigateTo({url:"/pages/mine/favourite_list"})},clickChat:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0},scrollToBottom:function(){setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),100)},clickVoice:function(e,t){var i=this;if(this.selVoiceIndex==t)return this.selVoiceIndex=-1,void(this.player&&(this.player.stop(),__f__("log","停止了"," at pages/chat/user/message_record.vue:677")));__f__("log",e," at pages/chat/user/message_record.vue:682"),this.selVoiceIndex=t,this.player=plus.audio.createPlayer(e),this.player.play((function(){i.selVoiceIndex=-1,__f__("log","播放完了"," at pages/chat/user/message_record.vue:688")}),(function(e){__f__("log","播放失败"," at pages/chat/user/message_record.vue:690")}))},getWindowSize:function(){var e=this;uni.getSystemInfo({success:function(t){e.winSize={witdh:t.windowWidth,height:t.windowHeight}}})},goUserDetail:function(e){uni.navigateTo({url:"/pages/chat/user_detail?id="+e})},goMgr:function(e){e?uni.navigateTo({url:"/pages/chat/user/mgr?id="+e}):uni.showToast({icon:"none",title:"操作太快啦，稍作休息。"})},send:function(){var e={txt:this.txt,toUid:this.toid,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'USER_CHAT_SEND_TXT'}")},InputFocus:function(e){this.InputBottom=e.detail.height},InputBlur:function(e){this.InputBottom=0}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])},"98a7":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticStyle:{"background-color":"#EF504A",width:"82%",height:"800upx",position:"fixed",left:"50%",top:"50%","z-index":"99999","-webkit-transform":"translate(-50%,-50%)","-moz-transform":"translate(-50%,-50%)",transform:"translate(-50%,-50%)","border-radius":"8px"}},[i("v-uni-view",{staticStyle:{height:"550upx"}},[i("v-uni-text",{staticClass:"lg text-gray cuIcon-close",staticStyle:{"font-size":"42upx",color:"#222",position:"relative",top:"20upx",left:"20upx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.close.apply(void 0,arguments)}}},[i("span")]),i("v-uni-view",{staticStyle:{"margin-top":"20upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar xl round ",style:"background-image: url("+e.$store.state.img_url+e.$store.state.temp.bean.fromHeadpic+");"}),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"20upx",color:"#EDE1B7"}},[e._v(e._s(e.$store.state.temp.bean.fromName))]),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[e._v(e._s(e.$store.state.temp.bean.descri))]),1==e.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[e._v("红包已抢完")]):e._e(),2==e.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[e._v("已过期")]):e._e()],1)],1),i("v-uni-view",{staticStyle:{"background-color":"#E13C36",height:"250upx","border-bottom-left-radius":"8px","border-bottom-right-radius":"8px"}},[e.redOpened4My(e.$store.state.temp.bean)||0!=e.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{color:"#EDD3AD","text-align":"center",position:"relative",top:"40px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openRedDetail.apply(void 0,arguments)}}},[e._v("查看红包详情")]):i("v-uni-view",{staticClass:"openHongbao ",class:{move:e.opening},staticStyle:{width:"160upx",height:"160upx",background:"#EBDFAF","border-radius":"50%","text-align":"center","line-height":"160upx",color:"#CD4F39","font-size":"50upx",position:"relative",left:"38%",top:"-24%"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openRed.apply(void 0,arguments)}}},[e._v("開")])],1)],1)},s=[]},a484:function(e,t,i){"use strict";(function(e){i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("c975"),i("e9c4"),i("498a");var a={data:function(){return{opening:!1}},methods:{redOpened4My:function(e){return!!(e&&e.opener_ids&&e.opener_ids.indexOf(this.$store.state.user.id)>=0)},openRedDetail:function(){var t=this;uni.$on("show_red_detail",(function(){e("log","---"," at components/hongbao/open.vue:76"),t.$emit("openRedDetail"),uni.$off("show_red_detail")}));var i={redUUID:this.$store.state.temp.bean.redUUID,uid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(i)+"',CMD:'RED_DETAIL_LIST'}")},close:function(){this.opening=!1,this.$emit("hide")},openRed:function(){var t=this;this.opening=!0;var i={redUUID:this.$store.state.temp.bean.redUUID,open_uid:this.$store.state.user.id,chatid:this.$store.state.temp.bean.chatid};this.$store.state.temp.bean.toGroupid&&""!=this.$store.state.temp.bean.toGroupid.trim()?(e("log","-----1"," at components/hongbao/open.vue:100"),this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(i)+"',CMD:'GROUP_CHAT_OPEN_RED'}")):(e("log","-----2"," at components/hongbao/open.vue:103"),this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(i)+"',CMD:'USER_CHAT_OPEN_RED'}")),uni.$on("show_red_detail",(function(){t.$emit("openRedDetail"),uni.$off("show_red_detail"),setTimeout((function(){t.opening=!1}),500)}))}}};t.default=a}).call(this,i("0de9")["log"])},d18b:function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var a={uParse:i("a6b6").default},s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[e._v("历史聊天记录")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-chat"},[e.chatLogs.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa","margin-top":"60upx","font-size":"28upx"}},[e._v("暂无聊天记录")]):e._e(),i("v-uni-scroll-view",{attrs:{"scroll-y":!0,"refresher-enabled":!1,"refresher-triggered":e.refresherTriggered},on:{refresherrefresh:function(t){arguments[0]=t=e.$handleEvent(t),e.refresherrefresh.apply(void 0,arguments)},refresherrestore:function(t){arguments[0]=t=e.$handleEvent(t),e.refresherrestore.apply(void 0,arguments)},refresherabort:function(t){arguments[0]=t=e.$handleEvent(t),e.refresherabort.apply(void 0,arguments)},scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.scrollLower.apply(void 0,arguments)}}},[e._l(e.chatLogs,(function(t,a){return[t.opt&&"undo"==t.opt?[i("v-uni-view",{staticStyle:{display:"none"}})]:"SYS_TXT"==t.type?[i("v-uni-view",{staticClass:"cu-info round"},[i("v-uni-rich-text",{attrs:{nodes:t.txt}})],1)]:"USER_CARD"==t.type?[t.fromUid==e.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickCard(t)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+e.$store.state.img_url+t.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[e._v(e._s(t.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[e._v("ID："+e._s(t.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[e._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[e._v(e._s(t.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.goUserDetail(t.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickCard(t)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+e.$store.state.img_url+t.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[e._v(e._s(t.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[e._v("ID："+e._s(t.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[e._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"date "},[e._v(e._s(t.date))])],1)]:"USER_TRANSFER"==t.type?[t.fromUid==e.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:t.status&&1==t.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickTransfer(t)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:t.status&&1==t.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[t.status&&1==t.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v("已收款")]):t.status&&2==t.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[e._v(e._s(t.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[e._v("¥"+e._s(t.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[e._v(e._s(t.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.goUserDetail(t.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:t.status&&1==t.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickTransfer(t)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:t.status&&1==t.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[t.status&&1==t.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v("已收钱")]):t.status&&2==t.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[e._v(e._s(t.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[e._v("¥"+e._s(t.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[e._v(e._s(t.date))])],1)]:"USER_RED"==t.type?[t.fromUid==e.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:t.opened&&1==t.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickHongbao(t)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v(e._s(t.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[e._v(e._s(t.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.goUserDetail(t.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:t.opened&&1==t.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickHongbao(t)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[e._v(e._s(t.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[e._v(e._s(t.date))])],1)]:[t.fromUid==e.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[0==t.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[e._v("未读")]):e._e(),1==t.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[e._v("已读")]):e._e(),i("v-uni-view",{staticClass:"content bg-green shadow",staticStyle:{"background-color":"#98E165",color:"#222"}},["uparse"==t.psr?i("u-parse",{attrs:{content:t.txt},on:{preview:function(t){arguments[0]=t=e.$handleEvent(t),e.preview.apply(void 0,arguments)},navigate:function(t){arguments[0]=t=e.$handleEvent(t),e.navigate.apply(void 0,arguments)}}}):"voice"==t.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickVoice(t.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"4upx"}},[e._v(e._s(t.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative","text-align":"left",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"6upx"}},[e._v(e._s(t.sub_txt)+'"')])],1):"video"==t.psr?i("v-uni-video",{attrs:{direction:"0",src:e.$store.state.img_url+t.txt}}):i("v-uni-rich-text",{attrs:{nodes:t.txt}})],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[e._v(e._s(t.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+e.$store.state.img_url+t.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.goUserDetail(t.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"content shadow",staticStyle:{color:"#222"}},["uparse"==t.psr?i("u-parse",{attrs:{content:t.txt},on:{preview:function(t){arguments[0]=t=e.$handleEvent(t),e.preview.apply(void 0,arguments)},navigate:function(t){arguments[0]=t=e.$handleEvent(t),e.navigate.apply(void 0,arguments)}}}):"voice"==t.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.clickVoice(t.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"4upx"}},[e._v(e._s(t.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"6upx"}},[e._v(e._s(t.sub_txt)+'"')])],1):"video"==t.psr?i("v-uni-video",{attrs:{direction:"0",src:e.$store.state.img_url+t.txt}}):i("v-uni-rich-text",{attrs:{nodes:t.txt}})],1)],1),i("v-uni-view",{staticClass:"date "},[e._v(e._s(t.date))])],1)]]})),e.moreShow?i("v-uni-view",{staticStyle:{color:"rgb(170, 170, 170)","text-align":"center","margin-top":"30rpx","margin-bottom":"20rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.loadmore.apply(void 0,arguments)}}},[e._v("点击加载更多...")]):e._e(),e.moreShow?e._e():i("v-uni-view",{staticStyle:{color:"rgb(170, 170, 170)","text-align":"center","margin-top":"30rpx","margin-bottom":"20rpx"}},[e._v("暂无更多...")])],2)],1),i("openRed",{directives:[{name:"show",rawName:"v-show",value:e.showOpenRed,expression:"showOpenRed"}],on:{hide:function(t){arguments[0]=t=e.$handleEvent(t),e.hideOpenRed.apply(void 0,arguments)},openRedDetail:function(t){arguments[0]=t=e.$handleEvent(t),e.openRedDetail.apply(void 0,arguments)}}})],1)},n=[]},ecb9:function(e,t,i){"use strict";i.r(t);var a=i("d18b"),s=i("7d5d");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);var o=i("f0c5"),r=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,"5ef5cb8c",null,!1,a["a"],void 0);t["default"]=r.exports},fcf2:function(e,t,i){var a=i("1297");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("4f06").default;s("7778537e",a,!0,{sourceMap:!1,shadowMode:!1})}}]);