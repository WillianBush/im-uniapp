(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-favourite_list"],{"266c":function(e,t,i){var n=i("797e");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("3d616d68",n,!0,{sourceMap:!1,shadowMode:!1})},"6b63":function(e,t,i){"use strict";var n=i("266c"),o=i.n(n);o.a},7558:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickChat.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:e.kw1,callback:function(t){e.kw1=t},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.search()}}},[e._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - 100upx)"}],attrs:{"scroll-y":"true","scroll-into-view":"indexes-"+e.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0},on:{scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.loadMore.apply(void 0,arguments)}}},[e._l(e.list,(function(t,n){return[i("v-uni-view",{key:n+"_0",staticStyle:{"margin-top":"20upx","background-color":"#fff",padding:"30upx"},on:{longpress:function(i){arguments[0]=i=e.$handleEvent(i),e.onLongPress(i,t)}}},[i("v-uni-view",[i("v-uni-rich-text",{attrs:{nodes:t.bean.txt}})],1),i("v-uni-view",{staticStyle:{"font-size":"24upx",color:"#999","margin-top":"14upx"}},[e._v(e._s(t.bean.fromName)+" "+e._s(t.bean.date))])],1)]})),e.list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[e._v("暂无信息")]):e._e()],2),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.showShade,expression:"showShade"}],staticClass:"shade",on:{longpress:function(t){arguments[0]=t=e.$handleEvent(t),e.hidePop.apply(void 0,arguments)},click:function(t){arguments[0]=t=e.$handleEvent(t),e.hidePop.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pop",class:{show:e.showPop},staticStyle:{"text-align":"center"},style:e.popStyle},e._l(e.popButton,(function(t,n){return i("v-uni-view",{key:n,attrs:{"data-name":t,"data-index":n},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pickerMenu.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"iconfont",class:e.popButtonIcon[n],staticStyle:{"font-size":"34upx","margin-right":"16upx"}}),e._v(e._s(t))],1)})),1)],1)],1)},o=[]},"797e":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 列式弹性盒子 */.flex_col[data-v-04267812]{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;align-items:center;align-content:center}\n/* 弹性盒子弹性容器 */.flex_col .flex_grow[data-v-04267812]{width:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.flex_row .flex_grow[data-v-04267812]{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}\n/* 弹性盒子允许换行 */.flex_col.flex_wrap[data-v-04267812]{-ms-flex-wrap:wrap;flex-wrap:wrap}\n/* 列表 */.list[data-v-04267812]{background-color:#fff;font-size:%?28?%;color:#333;-webkit-user-select:none;user-select:none;touch-callout:none;&>uni-view{padding:%?24?% %?30?%;position:relative;&:active,\n&.active{background-color:#f3f3f3}uni-image{height:%?80?%;width:%?80?%;border-radius:4px;margin-right:%?20?%}&>uni-view{line-height:%?40?%;.time,\n.info{color:#999;font-size:%?24?%}.time{width:%?150?%;text-align:right}.info{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}}&>uni-view:not(:first-child){margin-top:1px;&::after{content:"";display:block;height:0;border-top:#ccc solid 1px;width:%?620?%;position:absolute;top:-1px;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)\t/* 1px像素 */}}}\n/* 遮罩 */.shade[data-v-04267812]{position:fixed;z-index:100;top:0;\n/*right: 0; */\n/*bottom: 0; */\n/*left: 0; */-webkit-touch-callout:none;.pop{position:fixed;z-index:101;width:%?180?%;box-sizing:border-box;font-size:%?28?%;text-align:left;color:#333;background-color:#4c4c4c;color:#fff;box-shadow:0 0 5px rgba(0,0,0,.5);line-height:%?80?%;transition:-webkit-transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s,-webkit-transform .15s ease-in-out 0s;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-transform:scale(0);transform:scale(0);border-radius:8px;&.show{-webkit-transform:scale(1);transform:scale(1)}&>uni-view{padding:0 %?20?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;&:active{background-color:#f3f3f3}}}}.indexes[data-v-04267812]{position:relative}.indexBar[data-v-04267812]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-04267812]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-04267812]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-04267812]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-04267812]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-04267812]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-04267812]{color:#333}',""]),e.exports=t},b636f:function(e,t,i){"use strict";i.r(t);var n=i("7558"),o=i("b64c");for(var a in o)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("6b63");var s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"04267812",null,!1,n["a"],void 0);t["default"]=r.exports},b64c:function(e,t,i){"use strict";i.r(t);var n=i("f39c"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},f39c:function(module,exports,__webpack_require__){"use strict";(function(__f__){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("99af");var _defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_default={data:function(){var e;return e={StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:""},(0,_defineProperty2.default)(e,"list",[]),(0,_defineProperty2.default)(e,"p",1),(0,_defineProperty2.default)(e,"loadMoreing",!1),(0,_defineProperty2.default)(e,"winSize",{}),(0,_defineProperty2.default)(e,"showShade",!1),(0,_defineProperty2.default)(e,"showPop",!1),(0,_defineProperty2.default)(e,"popButton",["转发","删除"]),(0,_defineProperty2.default)(e,"popButtonIcon",["icon-zhuanfa","icon-shanchu"]),(0,_defineProperty2.default)(e,"popStyle",""),(0,_defineProperty2.default)(e,"pickerUserIndex",-1),(0,_defineProperty2.default)(e,"chatCfg",{}),(0,_defineProperty2.default)(e,"temp_item",null),e},onShow:function(){this.loadData()},onReady:function(){},onLoad:function(){this.getWindowSize()},methods:{clickChat:function(){this.showPop=!1},getWindowSize:function(){var e=this;uni.getSystemInfo({success:function(t){e.winSize={witdh:t.windowWidth,height:t.windowHeight}}})},onLongPress:function(e,t){var i=this;__f__("log",88," at pages/mine/favourite_list.vue:102"),this.showPop&&(this.showPop=!1),this.temp_item=t;var n=[e.touches[0],""],o=n[0],a=n[1];a=o.clientY>this.winSize.height/2?"bottom:".concat(this.winSize.height-o.clientY,"px;"):"top:".concat(o.clientY,"px;"),o.clientX>this.winSize.witdh/2?a+="right:".concat(this.winSize.witdh-o.clientX+15,"px"):a+="left:".concat(o.clientX+15,"px"),this.popStyle=a,this.showShade=!0,this.$nextTick((function(){setTimeout((function(){i.showPop=!0}),10)}))},hidePop:function(){var e=this;this.showPop=!1,setTimeout((function(){e.showShade=!1}),250)},pickerMenu:function pickerMenu(e){var _this=this,user=uni.getStorageSync("USER"),name=e.currentTarget.dataset.name;"转发"==name?(_this.$store.state.temp.content=_this.temp_item.bean.oldTxt,uni.navigateTo({url:"/pages/chat/transpond"})):"删除"==name&&_this.$http.post("/user/favourite/json/remove",{id:this.temp_item.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&_this.loadData()})),this.hidePop()},listTap:function(){this.showShade||__f__("log","列表触摸事件触发"," at pages/mine/favourite_list.vue:210")},search:function(){this.kw=this.kw1,this.loadData()},loadData:function loadData(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/user/favourite/json/getList",{kw:_this.kw},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(res_data.body.forEach((function(item){item.bean=eval("("+item.jsonstr+")")})),_this.list=res_data.body)}))},loadMore:function loadMore(){if(!this.loadMoreing){this.loadMoreing=!0;var _this=this,user=this.$store.state.user;-1!=this.p?(this.p=this.p+1,_this.$http.post("/user/favourite/json/getList",{p:this.p,kw:_this.kw},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(res_data.body.length<=0?_this.p=-1:(res_data.body.forEach((function(item){item.bean=eval("("+item.jsonstr+")")})),_this.list=_this.list.concat(res_data.body)))}))):_this.loadMoreing=!1}}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])}}]);