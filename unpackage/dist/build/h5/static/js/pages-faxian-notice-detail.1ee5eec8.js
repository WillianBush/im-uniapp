(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-notice-detail"],{"0630":function(t,e,a){"use strict";a.r(e);var n=a("0e8f"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"0bb9":function(t,e,a){"use strict";a.r(e);var n=a("b33d"),i=a("0630");for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);var o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"a55f97b2",null,!1,n["a"],void 0);e["default"]=c.exports},"0e8f":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _api=__webpack_require__("99bd"),_default={data:function(){return{bean:{}}},onLoad:function onLoad(e){var _this=this,user=uni.getStorageSync("USER");(0,_api.noticeDetail)({id:e.id}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.bean=res_data.body)})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))},methods:{}};exports.default=_default},b33d:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("公告详情")]),a("template",{attrs:{slot:"right"},slot:"right"})],2),a("v-uni-view",{staticClass:"cu-card article ",staticStyle:{"padding-top":"30upx"}},[a("v-uni-view",{staticClass:"cu-item shadow"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-view",{staticStyle:{"text-align":"center","line-height":"46upx","font-size":"36upx"}},[t._v(t._s(t.bean.title))])],1),a("v-uni-view",{staticClass:"text-gray text-df",staticStyle:{"text-align":"center","margin-top":"34upx","font-size":"30upx"}},[t._v(t._s(t.bean.createDate))]),a("v-uni-view",{staticClass:"content",staticStyle:{"margin-top":"52upx"}},[a("v-uni-view",{staticClass:"desc"},[a("v-uni-rich-text",{staticClass:"text-content",staticStyle:{"font-size":"30upx"},attrs:{nodes:t.bean.content}})],1)],1)],1)],1)],1)},i=[]}}]);