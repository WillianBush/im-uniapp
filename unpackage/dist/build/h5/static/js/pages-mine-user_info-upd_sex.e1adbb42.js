(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-upd_sex"],{"1aca":function(t,e,a){"use strict";a.r(e);var s=a("84f9"),i=a("2a49");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var n,r=a("f0c5"),u=Object(r["a"])(i["default"],s["b"],s["c"],!1,null,"6da3f6bd",null,!1,s["a"],n);e["default"]=u.exports},"2a49":function(t,e,a){"use strict";a.r(e);var s=a("c9f4"),i=a.n(s);for(var o in s)"default"!==o&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e["default"]=i.a},"84f9":function(t,e,a){"use strict";var s;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return s}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改性别")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),a("v-uni-radio-group",{staticClass:"block",on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.RadioChange.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"cu-form-group margin-top"},[a("v-uni-view",{staticClass:"title"},[t._v("男")]),a("v-uni-radio",{class:"男"==t.radio?"checked":"",attrs:{checked:"男"==t.radio,value:"男"}})],1),a("v-uni-view",{staticClass:"cu-form-group "},[a("v-uni-view",{staticClass:"title"},[t._v("女")]),a("v-uni-radio",{class:"女"==t.radio?"checked":"",attrs:{checked:"女"==t.radio,value:"女"}})],1)],1)],1)},o=[]},c9f4:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{radio:this.$store.state.user.sex}},onLoad:function(t){},methods:{RadioChange:function(t){this.radio=t.detail.value},tijiao:function tijiao(){var _this=this,user=this.$store.state.user;_this.$http.post("/user/json/updateSex",{sex:this.radio,u:user.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.$store.state.user.sex=res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))}}};exports.default=_default}}]);