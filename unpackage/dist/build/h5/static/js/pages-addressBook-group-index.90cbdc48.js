(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-group-index"],{"0dd4":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{}},mounted:function mounted(){var _this=this,user=uni.getStorageSync("USER");this.$http.post("/user/json/room/list",{type:"1"},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.commit("setGroup_list",res_data.body):uni.showToast({icon:"none",title:"获取列表失败"})}))},onReady:function(){},methods:{getList:function getList(){uni.showLoading({title:"加载中"});var _this=this,user=uni.getStorageSync("USER");this.$http.post("/user/json/room/list",{type:"1"},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(_this.$store.commit("setGroup_list",res_data.body),uni.hideLoading()):uni.showToast({icon:"none",title:"获取列表失败"})}))},goRoomAddList:function(){uni.navigateTo({url:"/pages/addressBook/group/verify_list"})},goSearch:function(){uni.navigateTo({url:"/pages/addressBook/group/search"})},goChat:function(t){uni.navigateTo({url:"/pages/chat/group/index?toid="+t.roomUUID})}}};exports.default=_default},2525:function(t,e,i){"use strict";i.r(e);var a=i("3d06"),o=i("b899");for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("785b");var s=i("f0c5"),r=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"4376484a",null,!1,a["a"],void 0);e["default"]=r.exports},"3d06":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("群聊")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"}},[i("v-uni-text",{staticStyle:{"margin-right":"20px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getList.apply(void 0,arguments)}}},[t._v("刷新")]),i("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSearch.apply(void 0,arguments)}}},[t._v("搜索")])],1)],1)],2),i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{height:"100upx"},attrs:{style:"height: 100upx;"}},[i("v-uni-view",{staticClass:"cu-item",class:"arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goRoomAddList()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"iconfont icon-qun-tongguo",staticStyle:{color:"#F56B2D","font-size":"54upx",top:"10upx",position:"relative"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{"margin-left":"10px"}},[t._v("他人申请加入群组")]),t.$store.state.unDoRoomAddCount>0?i("v-uni-view",{staticClass:"cu-tag badge",staticStyle:{top:"38upx",right:"72upx"}},[t._v(t._s(t.$store.state.unDoRoomAddCount))]):t._e()],1)],1)],1),i("v-uni-view",{staticStyle:{height:"80upx","line-height":"80upx","text-align":"center",color:"#888"}},[t._v(t._s(t.$store.state.group_list.length)+"个群聊")]),i("v-uni-scroll-view",{staticClass:"indexes",style:"height:calc(100vh - "+t.CustomBar+"px - 100upx - 80upx)",attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[[i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(t.$store.state.group_list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"cu-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goChat(e)}}},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.img+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey"},[t._v(t._s(e.name))])],1)],1)})),1)],t.$store.state.group_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无群聊信息")]):t._e()],2)],1)},o=[]},"785b":function(t,e,i){"use strict";var a=i("e01d"),o=i.n(a);o.a},b899:function(t,e,i){"use strict";i.r(e);var a=i("0dd4"),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},bc0e:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.indexes[data-v-4376484a]{position:relative}.indexBar[data-v-4376484a]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-4376484a]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-4376484a]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-4376484a]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-4376484a]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-4376484a]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-4376484a]{color:#333}.cu-list.menu-avatar>.cu-item[data-v-4376484a]::after{border:0}.cu-list.menu-avatar>.cu-item[data-v-4376484a]:before{content:"";position:absolute;right:0;top:-1px;width:80%;height:.5px;background-color:#f0f0f0}.cu-bar .content[data-v-4376484a]{text-align:left}.cu-bar[data-v-4376484a]{display:block!important}',""]),t.exports=e},e01d:function(t,e,i){var a=i("bc0e");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("ee8c72f6",a,!0,{sourceMap:!1,shadowMode:!1})}}]);