(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-notice-detail"],{"21bf":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("公告详情")]),a("template",{attrs:{slot:"right"},slot:"right"})],2),a("v-uni-view",{staticClass:"cu-card article ",staticStyle:{"padding-top":"30upx"}},[a("v-uni-view",{staticClass:"cu-item shadow"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-view",{staticStyle:{"text-align":"center","line-height":"46upx","font-size":"36upx"}},[t._v(t._s(t.bean.title))])],1),a("v-uni-view",{staticClass:"text-gray text-df",staticStyle:{"text-align":"center","margin-top":"34upx","font-size":"30upx"}},[t._v(t._s(t.bean.createDate))]),a("v-uni-view",{staticClass:"content",staticStyle:{"margin-top":"52upx"}},[a("v-uni-view",{staticClass:"desc"},[a("v-uni-rich-text",{staticClass:"text-content",staticStyle:{"font-size":"30upx"},attrs:{nodes:t.bean.content}})],1)],1)],1)],1)],1)},s=[]},"4e9e":function(module,exports,__webpack_require__){"use strict";(function(__f__){Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{bean:{}}},onLoad:function onLoad(e){__f__("log",e.id," at pages/faxian/notice/detail.vue:32");var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/notice/detail",{id:e.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.bean=res_data.body)}))},methods:{}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])},"95e6":function(t,e,a){"use strict";a.r(e);var i=a("21bf"),n=a("d3d0");for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);var c,r=a("f0c5"),o=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"7a0f3111",null,!1,i["a"],c);e["default"]=o.exports},d3d0:function(t,e,a){"use strict";a.r(e);var i=a("4e9e"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a}}]);