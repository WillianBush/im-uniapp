(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-favourite_list"],{"36a1":function(t,e,i){"use strict";i.r(e);var a=i("c24b"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"46fd":function(t,e,i){var a=i("fa4e");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("abd2e702",a,!0,{sourceMap:!1,shadowMode:!1})},"53aa":function(t,e,i){"use strict";var a=i("46fd"),n=i.n(a);n.a},9677:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickChat.apply(void 0,arguments)}}},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.i18n.mycollection))])],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - 100upx)"}],attrs:{"scroll-y":"true","scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[t._l(t.list,(function(e,a){return[i("v-uni-view",{key:a+"_0",staticStyle:{"margin-top":"20upx","background-color":"#fff",padding:"30upx"},on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.onLongPress(i,e)}}},[i("v-uni-view",[i("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1),i("v-uni-view",{staticStyle:{"font-size":"24upx",color:"#999","margin-top":"14upx"}},[t._v(t._s(e.bean.fromName)+"\n\t\t\t\t\t\t"+t._s(e.bean.date))])],1)]})),t.list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v(t._s(t.i18n.noinformation))]):t._e()],2),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showShade,expression:"showShade"}],staticClass:"shade",on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.hidePop.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.hidePop.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pop",class:{show:t.showPop},staticStyle:{"text-align":"center"},style:t.popStyle},t._l(t.popButton,(function(e,a){return i("v-uni-view",{key:a,attrs:{"data-name":e,"data-index":a},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pickerMenu.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"iconfont",class:t.popButtonIcon[a],staticStyle:{"font-size":"34upx","margin-right":"16upx"}}),t._v(t._s(e))],1)})),1)],1)],1)},n=[]},c24b:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("99af");var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){var t;return t={StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:""},(0,_defineProperty2.default)(t,"list",[]),(0,_defineProperty2.default)(t,"p",1),(0,_defineProperty2.default)(t,"loadMoreing",!1),(0,_defineProperty2.default)(t,"winSize",{}),(0,_defineProperty2.default)(t,"showShade",!1),(0,_defineProperty2.default)(t,"showPop",!1),(0,_defineProperty2.default)(t,"popButton",["转发","删除"]),(0,_defineProperty2.default)(t,"popButtonIcon",["icon-zhuanfa","icon-shanchu"]),(0,_defineProperty2.default)(t,"popStyle",""),(0,_defineProperty2.default)(t,"pickerUserIndex",-1),(0,_defineProperty2.default)(t,"chatCfg",{}),(0,_defineProperty2.default)(t,"temp_item",null),t},onShow:function(){this.loadData()},onReady:function(){},onLoad:function(){this.getWindowSize()},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("user",["user"])),(0,_vuex.mapState)("chat",["temp"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("chat",["setTempContent"])),{},{clickChat:function(){this.showPop=!1},getWindowSize:function(){var t=this;uni.getSystemInfo({success:function(e){t.winSize={witdh:e.windowWidth,height:e.windowHeight}}})},onLongPress:function(t,e){var i=this;console.log(88),this.showPop&&(this.showPop=!1),this.temp_item=e;var a=[t.touches[0],""],n=a[0],o=a[1];o=n.clientY>this.winSize.height/2?"bottom:".concat(this.winSize.height-n.clientY,"px;"):"top:".concat(n.clientY,"px;"),n.clientX>this.winSize.witdh/2?o+="right:".concat(this.winSize.witdh-n.clientX+15,"px"):o+="left:".concat(n.clientX+15,"px"),this.popStyle=o,this.showShade=!0,this.$nextTick((function(){setTimeout((function(){i.showPop=!0}),10)}))},hidePop:function(){var t=this;this.showPop=!1,setTimeout((function(){t.showShade=!1}),250)},pickerMenu:function pickerMenu(e){var _this=this,user=uni.getStorageSync("USER"),name=e.currentTarget.dataset.name;"转发"==name?(_this.setTempContent(_this.temp_item.bean.oldTxt),uni.navigateTo({url:"/pages/chat/transpond"})):"删除"==name&&(0,_api.delCollect)({id:this.temp_item.id}).then((function(res){var res_data=eval(res.data);200==res_data.code&&_this.loadData()})),this.hidePop()},listTap:function(){this.showShade||console.log("列表触摸事件触发")},search:function(){this.kw=this.kw1,this.loadData()},loadData:function loadData(){var _this=this,user=uni.getStorageSync("USER");(0,_api.collectList)({kw:_this.kw}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(res_data.body.forEach((function(item){item.bean=eval("("+item.jsonstr+")")})),_this.list=res_data.body)})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))},loadMore:function loadMore(){if(!this.loadMoreing){this.loadMoreing=!0;var _this=this,user=this.user;-1!=this.p?(this.p=this.p+1,(0,_api.collectList)({p:this.p,kw:_this.kw}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(res_data.body.length<=0?_this.p=-1:(res_data.body.forEach((function(item){item.bean=eval("("+item.jsonstr+")")})),_this.list=_this.list.concat(res_data.body)))})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))):_this.loadMoreing=!1}}})};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},f32f:function(t,e,i){"use strict";i.r(e);var a=i("9677"),n=i("36a1");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("53aa");var s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"1b5caff5",null,!1,a["a"],void 0);e["default"]=r.exports},fa4e:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 列式弹性盒子 */.flex_col[data-v-1b5caff5]{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;align-items:center;align-content:center}\n/* 弹性盒子弹性容器 */.flex_col .flex_grow[data-v-1b5caff5]{width:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.flex_row .flex_grow[data-v-1b5caff5]{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}\n/* 弹性盒子允许换行 */.flex_col.flex_wrap[data-v-1b5caff5]{-ms-flex-wrap:wrap;flex-wrap:wrap}\n/* 列表 */.list[data-v-1b5caff5]{background-color:#fff;font-size:%?28?%;color:#333;-webkit-user-select:none;user-select:none;touch-callout:none}.list > uni-view[data-v-1b5caff5]{padding:%?24?% %?30?%;position:relative}.list > uni-view[data-v-1b5caff5]:active, .list > uni-view.active[data-v-1b5caff5]{background-color:#f3f3f3}.list > uni-view uni-image[data-v-1b5caff5]{height:%?80?%;width:%?80?%;border-radius:4px;margin-right:%?20?%}.list > uni-view > uni-view[data-v-1b5caff5]{line-height:%?40?%}.list > uni-view > uni-view .time[data-v-1b5caff5],\n.list > uni-view > uni-view .info[data-v-1b5caff5]{color:#999;font-size:%?24?%}.list > uni-view > uni-view .time[data-v-1b5caff5]{width:%?150?%;text-align:right}.list > uni-view > uni-view .info[data-v-1b5caff5]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list > uni-view[data-v-1b5caff5]:not(:first-child){margin-top:1px}.list > uni-view[data-v-1b5caff5]:not(:first-child)::after{content:"";display:block;height:0;border-top:#ccc solid 1px;width:%?620?%;position:absolute;top:-1px;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)\n  /* 1px像素 */}\n/* 遮罩 */.shade[data-v-1b5caff5]{position:fixed;z-index:100;top:0;-webkit-touch-callout:none}.shade .pop[data-v-1b5caff5]{position:fixed;z-index:101;width:%?180?%;box-sizing:border-box;font-size:%?28?%;text-align:left;color:#333;background-color:#4c4c4c;color:#fff;box-shadow:0 0 5px rgba(0,0,0,.5);line-height:%?80?%;transition:-webkit-transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s,-webkit-transform .15s ease-in-out 0s;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-transform:scale(0);transform:scale(0);border-radius:8px}.shade .pop.show[data-v-1b5caff5]{-webkit-transform:scale(1);transform:scale(1)}.shade .pop > uni-view[data-v-1b5caff5]{padding:0 %?20?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}.shade .pop > uni-view[data-v-1b5caff5]:active{background-color:#f3f3f3}.indexes[data-v-1b5caff5]{position:relative}.indexBar[data-v-1b5caff5]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-1b5caff5]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-1b5caff5]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-1b5caff5]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-1b5caff5]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-1b5caff5]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-1b5caff5]{color:#333}',""]),t.exports=e}}]);