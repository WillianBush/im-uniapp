(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-message_record"],{"0d5a":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var a={uParse:i("8ca9").default},s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("历史聊天记录")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-chat"},[t.chatLogs.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa","margin-top":"60upx","font-size":"28upx"}},[t._v("暂无聊天记录")]):t._e(),i("v-uni-scroll-view",{attrs:{"scroll-y":!0,"refresher-enabled":!1,"refresher-triggered":t.refresherTriggered},on:{refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresherrefresh.apply(void 0,arguments)},refresherrestore:function(e){arguments[0]=e=t.$handleEvent(e),t.refresherrestore.apply(void 0,arguments)},refresherabort:function(e){arguments[0]=e=t.$handleEvent(e),t.refresherabort.apply(void 0,arguments)},scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.scrollLower.apply(void 0,arguments)}}},[t._l(t.chatLogs,(function(e,a){return[e.opt&&"undo"==e.opt?[i("v-uni-view",{staticStyle:{display:"none"}})]:"SYS_TXT"==e.type?[i("v-uni-view",{staticClass:"cu-info round"},[i("v-uni-rich-text",{attrs:{nodes:e.txt}})],1)]:"USER_CARD"==e.type?[e.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickCard(e)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+t.$store.state.img_url+e.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[t._v("ID："+t._s(e.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[t._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickCard(e)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+t.$store.state.img_url+e.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[t._v("ID："+t._s(e.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[t._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.date))])],1)]:"USER_TRANSFER"==e.type?[e.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:e.status&&1==e.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickTransfer(e)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:e.status&&1==e.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[e.status&&1==e.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("已收款")]):e.status&&2==e.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[t._v("¥"+t._s(e.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:e.status&&1==e.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickTransfer(e)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:e.status&&1==e.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[e.status&&1==e.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("已收钱")]):e.status&&2==e.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[t._v("¥"+t._s(e.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.date))])],1)]:"USER_RED"==e.type?[e.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:e.opened&&1==e.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickHongbao(e)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v(t._s(e.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:e.opened&&1==e.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickHongbao(e)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v(t._s(e.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.date))])],1)]:[e.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[0==e.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[t._v("未读")]):t._e(),1==e.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[t._v("已读")]):t._e(),i("v-uni-view",{staticClass:"content bg-green shadow",staticStyle:{"background-color":"#98E165",color:"#222"}},["uparse"==e.psr?i("u-parse",{attrs:{content:e.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickVoice(e.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative","text-align":"left",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.sub_txt)+'"')])],1):"video"==e.psr?i("v-uni-video",{attrs:{direction:"0",src:t.$store.state.img_url+e.txt}}):i("v-uni-rich-text",{attrs:{nodes:e.txt}})],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"content shadow",staticStyle:{color:"#222"}},["uparse"==e.psr?i("u-parse",{attrs:{content:e.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickVoice(e.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.sub_txt)+'"')])],1):"video"==e.psr?i("v-uni-video",{attrs:{direction:"0",src:t.$store.state.img_url+e.txt}}):i("v-uni-rich-text",{attrs:{nodes:e.txt}})],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.date))])],1)]]})),t.moreShow?i("v-uni-view",{staticStyle:{color:"rgb(170, 170, 170)","text-align":"center","margin-top":"30rpx","margin-bottom":"20rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.loadmore.apply(void 0,arguments)}}},[t._v("点击加载更多...")]):t._e(),t.moreShow?t._e():i("v-uni-view",{staticStyle:{color:"rgb(170, 170, 170)","text-align":"center","margin-top":"30rpx","margin-bottom":"20rpx"}},[t._v("暂无更多...")])],2)],1),i("openRed",{directives:[{name:"show",rawName:"v-show",value:t.showOpenRed,expression:"showOpenRed"}],on:{hide:function(e){arguments[0]=e=t.$handleEvent(e),t.hideOpenRed.apply(void 0,arguments)},openRedDetail:function(e){arguments[0]=e=t.$handleEvent(e),t.openRedDetail.apply(void 0,arguments)}}})],1)},n=[]},"3bc0":function(t,e,i){"use strict";i.r(e);var a=i("ee37"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},"3bda":function(t,e,i){"use strict";i.r(e);var a=i("7745"),s=i("3bc0");for(var n in s)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(n);i("ab4f");var r=i("f0c5"),o=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"71c11066",null,!1,a["a"],void 0);e["default"]=o.exports},5822:function(t,e,i){var a=i("f68f");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("3d1aba38",a,!0,{sourceMap:!1,shadowMode:!1})},"5e85":function(t,e,i){"use strict";i.r(e);var a=i("0d5a"),s=i("6600");for(var n in s)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(n);var r=i("f0c5"),o=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"1e69b101",null,!1,a["a"],void 0);e["default"]=o.exports},6600:function(t,e,i){"use strict";i.r(e);var a=i("c440"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},7745:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"background-color":"#EF504A",width:"82%",height:"800upx",position:"fixed",left:"50%",top:"50%","z-index":"99999","-webkit-transform":"translate(-50%,-50%)","-moz-transform":"translate(-50%,-50%)",transform:"translate(-50%,-50%)","border-radius":"8px"}},[i("v-uni-view",{staticStyle:{height:"550upx"}},[i("v-uni-text",{staticClass:"lg text-gray cuIcon-close",staticStyle:{"font-size":"42upx",color:"#222",position:"relative",top:"20upx",left:"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[i("span")]),i("v-uni-view",{staticStyle:{"margin-top":"20upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar xl round ",style:"background-image: url("+t.$store.state.img_url+t.$store.state.temp.bean.fromHeadpic+");"}),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"20upx",color:"#EDE1B7"}},[t._v(t._s(t.$store.state.temp.bean.fromName))]),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[t._v(t._s(t.$store.state.temp.bean.descri))]),1==t.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[t._v("红包已抢完")]):t._e(),2==t.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"50upx",color:"#EDE1B7"}},[t._v("已过期")]):t._e()],1)],1),i("v-uni-view",{staticStyle:{"background-color":"#E13C36",height:"250upx","border-bottom-left-radius":"8px","border-bottom-right-radius":"8px"}},[t.redOpened4My(t.$store.state.temp.bean)||0!=t.$store.state.temp.bean.status?i("v-uni-view",{staticStyle:{color:"#EDD3AD","text-align":"center",position:"relative",top:"40px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRedDetail.apply(void 0,arguments)}}},[t._v("查看红包详情")]):i("v-uni-view",{staticClass:"openHongbao ",class:{move:t.opening},staticStyle:{width:"160upx",height:"160upx",background:"#EBDFAF","border-radius":"50%","text-align":"center","line-height":"160upx",color:"#CD4F39","font-size":"50upx",position:"relative",left:"38%",top:"-24%"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRed.apply(void 0,arguments)}}},[t._v("開")])],1)],1)},s=[]},ab4f:function(t,e,i){"use strict";var a=i("5822"),s=i.n(a);s.a},c440:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("14d9"),__webpack_require__("3c65"),__webpack_require__("e9c4"),__webpack_require__("99af");var _defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_uParse=_interopRequireDefault(__webpack_require__("8ca9")),_open=_interopRequireDefault(__webpack_require__("3bda")),_utils=__webpack_require__("bcf4"),innerAudioContext=uni.createInnerAudioContext(),_default={components:{uParse:_uParse.default,openRed:_open.default},data:function(){var t;return t={toid:"",list:[],allList:[],player:null,selVoiceIndex:-1,domHeight:0,c_type:1,InputBottom:0},(0,_defineProperty2.default)(t,"toid",""),(0,_defineProperty2.default)(t,"entity",{}),(0,_defineProperty2.default)(t,"txt",""),(0,_defineProperty2.default)(t,"temp_txt",""),(0,_defineProperty2.default)(t,"moreShow",!0),(0,_defineProperty2.default)(t,"showjia",!0),(0,_defineProperty2.default)(t,"emotion",1),(0,_defineProperty2.default)(t,"showItem",0),(0,_defineProperty2.default)(t,"scrollTop",0),(0,_defineProperty2.default)(t,"style",{pageHeight:0,contentViewHeight:0,footViewHeight:90,mitemHeight:0}),(0,_defineProperty2.default)(t,"sendCount",0),(0,_defineProperty2.default)(t,"RECORDER",""),(0,_defineProperty2.default)(t,"AUDIO",uni.createInnerAudioContext()),(0,_defineProperty2.default)(t,"recordTimer",null),(0,_defineProperty2.default)(t,"recordLength",0),(0,_defineProperty2.default)(t,"voicePath",""),(0,_defineProperty2.default)(t,"isRecord",!1),(0,_defineProperty2.default)(t,"intervalTime",0),(0,_defineProperty2.default)(t,"timer",null),(0,_defineProperty2.default)(t,"v_base64",""),(0,_defineProperty2.default)(t,"winSize",{}),(0,_defineProperty2.default)(t,"showShade",!1),(0,_defineProperty2.default)(t,"showPop",!1),(0,_defineProperty2.default)(t,"popButton",["复制","转发","收藏","删除","撤消"]),(0,_defineProperty2.default)(t,"popButtonStore",["复制","转发","收藏","删除","撤消"]),(0,_defineProperty2.default)(t,"popStyle",""),(0,_defineProperty2.default)(t,"pickerUserIndex",-1),(0,_defineProperty2.default)(t,"chatLogs",[]),(0,_defineProperty2.default)(t,"temp_content",""),(0,_defineProperty2.default)(t,"temp_uuid",""),(0,_defineProperty2.default)(t,"chatCfg",{}),(0,_defineProperty2.default)(t,"temp_bean",null),(0,_defineProperty2.default)(t,"showOpenRed",!1),(0,_defineProperty2.default)(t,"showname",""),(0,_defineProperty2.default)(t,"refresherTriggered",!1),(0,_defineProperty2.default)(t,"_refresherTriggered",!1),(0,_defineProperty2.default)(t,"numPag",1),(0,_defineProperty2.default)(t,"allPageNum",1e4),(0,_defineProperty2.default)(t,"pageSize",50),(0,_defineProperty2.default)(t,"status","more"),(0,_defineProperty2.default)(t,"pageParams",{pageNumber:"1",pageCount:"30"}),(0,_defineProperty2.default)(t,"timer",null),(0,_defineProperty2.default)(t,"syncMessageArr",[]),t},onLoad:function(t){this.toid=t.id;this.tongbuMsg(this.pageParams.pageCount,this.pageParams.pageNumber)},computed:{i18n:function(){return this.$t("index")}},methods:{loadmore:function(){this.pageParams.pageNumber++,this.pageParams.pageNumber,this.pageParams.pageNumber,this.tongbuMsg(this.pageParams.pageCount,this.pageParams.pageNumber)},refresherrefresh:function(){this._refresherTriggered||(this._refresherTriggered=!0,this.refresherTriggered||(this.refresherTriggered=!0),this.pageParams.pageNumber++,this.loadStoreData(this.pageParams.pageCount,this.pageParams.pageNumber))},refresherrestore:function(){this.refresherTriggered=!1,this._refresherTriggered=!1},refresherabort:function(){this.refresherTriggered=!1,this._refresherTriggered=!1},scrollLower:function(){},closeRefresh:function(){this.refresherTriggered=!1,this._refresherTriggered=!1},tongbuMsg:function tongbuMsg(){var _this2=this,_this=this;uni.showLoading(),_this.$http.post("/chat_msg/syncMsgData",{chatid:_this.$store.state.cur_chat_entity.id,pageNumber:this.pageParams.pageNumber},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(201==res_data.code)setTimeout((function(){_this2.moreShow=!1,uni.hideLoading(),uni.showToast({title:"暂无更多",icon:"none"})}),400);else if(200==res_data.code){if(res_data.body&&0!=res_data.body.list.length){for(var cList=[],i=0;i<res_data.body.list.length;i++)cList.push(res_data.body.list[i][0]);_this.syncMessageArr.unshift.apply(_this.syncMessageArr,cList);var user=uni.getStorageSync("USER");_this.$store.commit("setCur_chat_msg_list",[]),_this2.$store.state.cur_chat_msg_list=_this.syncMessageArr,_this2.$store.state.chatMessageMap.has(user.id+"#"+_this2.toid)&&_this2.$store.commit("updateChatMessageMap",{key:user.id+"#"+_this2.toid,value:_this2.$store.state.cur_chat_msg_list}),0!=_this2.$store.state.cur_chat_msg_list.length&&_this2.$store.state.cur_chat_msg_list[_this2.$store.state.cur_chat_msg_list.length-1].bean.simple_content,uni.setStorageSync(user.id+"#"+_this2.toid+"_CHAT_MESSAGE",JSON.stringify(_this2.$store.state.cur_chat_msg_list))}if(_this2.pageParams=res_data.body,_this2.pageParams.pageNumber>1){for(var _i=0;_i<res_data.body.list.length;_i++)res_data.body.list[_i]=res_data.body.list[_i][0].bean;_this.chatLogs=_this.chatLogs.concat(res_data.body.list),uni.hideLoading()}else uni.hideLoading(),_this2.chatLogs=res_data.body.list;for(var _i2=0;_i2<_this2.chatLogs.length;_i2++)_this2.chatLogs[_i2]=_this2.chatLogs[_i2][0].bean;setTimeout((function(){uni.hideLoading()}),400)}})).catch((function(t){}))},loadStoreData:function loadStoreData(pSize,pNumber){var _this3=this,_this=this,user=uni.getStorageSync("USER");user&&_this.$http.post("/chat/listPage",{pageSize:pSize,pageNumber:pNumber,toMemberid:_this.$store.state.cur_chat_entity.id},{}).then((function(res_1){var res_data_1=eval(res_1.data);200==res_data_1.code?(_this3.pageParams.pageNumber=res_data_1.body.pageNumber,_this3.pageParams.pageNumber>1?_this.allList=_this.allList.concat(res_data_1.body.list):_this.allList=res_data_1.body.list,_this3.closeRefresh()):_this3.closeRefresh()}))},getPopButton:function(t){return"复制"==t?"icon-fuzhi":"转发"==t?"icon-zhuanfa":"收藏"==t?"icon-collection-b":"删除"==t?"icon-shanchu":"撤消"==t?"icon-shangjiachexiaoshenqingrenzhengliebiao":""},clickCard:function(t){this.goUserDetail(t.muuid)},sendCard:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/card/sendCard"}),this.$store.state.temp.bean=this.entity,this.$store.state.temp.bean.name=this.entity.nickName,this.$store.state.temp.bean.img=this.entity.headpic},goTransfer:function(){this.$store.state.temp.bean=this.entity,uni.navigateTo({url:"/pages/chat/transfer/transfer"}),this.showPop=!1,this.showItem=0,this.InputBottom=0},openRedDetail:function(){this.showOpenRed=!1,uni.navigateTo({url:"/pages/chat/red/red_detail"})},hideOpenRed:function(){this.showOpenRed=!1},clickHongbao:function(t){var e=uni.getStorageSync("USER"),i=uni.getStorageSync(e.id+"_RED_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[t.redUUID],a[t.redUUID]&&(t=a[t.redUUID])}this.temp_bean=t,this.showOpenRed=!0,this.$store.state.temp.bean=this.temp_bean},clickTransfer:function(t){var e=uni.getStorageSync("USER"),i=uni.getStorageSync(e.id+"_TRANSFER_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[t.utid],a[t.utid]&&(t=a[t.utid])}this.temp_bean=t,this.$store.state.temp.bean=this.temp_bean,uni.navigateTo({url:"../transfer/transfer_receive"})},sendRed:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/red/sendRed?chatType=user&toid="+this.entity.id})},goFavourite:function(){uni.navigateTo({url:"/pages/mine/favourite_list"})},clickChat:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0},scrollToBottom:function(){setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),100)},clickVoice:function(t,e){var i=this;if(this.selVoiceIndex==e)return this.selVoiceIndex=-1,void(this.player&&this.player.stop());this.selVoiceIndex=e,this.player=plus.audio.createPlayer(t),this.player.play((function(){i.selVoiceIndex=-1}),(function(t){}))},getWindowSize:function(){var t=this;uni.getSystemInfo({success:function(e){t.winSize={witdh:e.windowWidth,height:e.windowHeight}}})},goUserDetail:function(t){uni.navigateTo({url:"/pages/chat/user_detail?id="+t})},goMgr:function(t){t?uni.navigateTo({url:"/pages/chat/user/mgr?id="+t}):uni.showToast({icon:"none",title:"操作太快啦，稍作休息。"})},send:function(){var t={txt:this.txt,toUid:this.toid,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(t)+"',CMD:'USER_CHAT_SEND_TXT'}")},InputFocus:function(t){this.InputBottom=t.detail.height},InputBlur:function(t){this.InputBottom=0}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},ee37:function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("c975"),i("e9c4"),i("498a");var a={data:function(){return{opening:!1}},methods:{redOpened4My:function(t){return!!(t&&t.opener_ids&&t.opener_ids.indexOf(this.$store.state.user.id)>=0)},openRedDetail:function(){var t=this;uni.$on("show_red_detail",(function(){t.$emit("openRedDetail"),uni.$off("show_red_detail")}));var e={redUUID:this.$store.state.temp.bean.redUUID,uid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'RED_DETAIL_LIST'}")},close:function(){this.opening=!1,this.$emit("hide")},openRed:function(){var t=this;this.opening=!0;var e={redUUID:this.$store.state.temp.bean.redUUID,open_uid:this.$store.state.user.id,chatid:this.$store.state.temp.bean.chatid};this.$store.state.temp.bean.toGroupid&&""!=this.$store.state.temp.bean.toGroupid.trim()?this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'GROUP_CHAT_OPEN_RED'}"):this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'USER_CHAT_OPEN_RED'}"),uni.$on("show_red_detail",(function(){t.$emit("openRedDetail"),uni.$off("show_red_detail"),setTimeout((function(){t.opening=!1}),500)}))}}};e.default=a}).call(this,i("5a52")["default"])},f68f:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.openHongbao.move[data-v-71c11066]{-webkit-animation:3s move-data-v-71c11066 infinite;animation:3s move-data-v-71c11066 infinite;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}@-webkit-keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}@-moz-keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}@keyframes move-data-v-71c11066{0%{transform:rotateY(0deg);-webkit-transform:rotateY(0deg)}100%{transform:rotateY(1turn);-webkit-transform:rotateY(1turn)}}',""]),t.exports=e}}]);