(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-notice-index"],{"4b97":function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{list:[]}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/notice/list",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)}))},methods:{detail:function(t){uni.navigateTo({url:"/pages/faxian/notice/detail?id="+t.id})}}};exports.default=_default},"4bda":function(t,e,i){"use strict";i.r(e);var a=i("911e"),n=i("ab7c");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);var c,u=i("f0c5"),r=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"33184812",null,!1,a["a"],c);e["default"]=r.exports},"911e":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("公告")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),t.list.length>0?i("v-uni-view",{staticClass:"cu-timeline margin-top"},[t._l(t.list,(function(e){return[i("v-uni-view",{staticClass:"cu-time"},[t._v(t._s(e.dateStr))]),t._l(e.list,(function(e){return i("v-uni-view",{staticClass:"cu-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.detail(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-capsule radius"},[i("v-uni-view",{staticClass:"cu-tag bg-cyan"},[t._v(t._s(e.amOrPm))]),i("v-uni-view",{staticClass:"cu-tag line-cyan"},[t._v(t._s(e.timeStr))])],1),i("v-uni-view",{staticClass:"margin-top"},[t._v(t._s(e.title))])],1)],1)}))]}))],2):i("v-uni-view",{staticClass:"cu-timeline ",staticStyle:{"text-align":"center",color:"#888","margin-top":"100upx"}},[t._v("暂无公告信息")])],1)},s=[]},ab7c:function(t,e,i){"use strict";i.r(e);var a=i("4b97"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a}}]);