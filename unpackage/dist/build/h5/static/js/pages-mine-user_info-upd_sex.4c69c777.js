(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-upd_sex"],{"274a":function(t,e,a){"use strict";a.r(e);var i=a("3a2e"),o=a("4502");for(var n in o)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(n);var r=a("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"35f45af8",null,!1,i["a"],void 0);e["default"]=u.exports},"3a2e":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改性别")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),a("v-uni-radio-group",{staticClass:"block",on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.RadioChange.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"cu-form-group margin-top"},[a("v-uni-view",{staticClass:"title"},[t._v("男")]),a("v-uni-radio",{class:"男"==t.radio?"checked":"",attrs:{checked:"男"==t.radio,value:"男"}})],1),a("v-uni-view",{staticClass:"cu-form-group "},[a("v-uni-view",{staticClass:"title"},[t._v("女")]),a("v-uni-radio",{class:"女"==t.radio?"checked":"",attrs:{checked:"女"==t.radio,value:"女"}})],1)],1)],1)},o=[]},4502:function(t,e,a){"use strict";a.r(e);var i=a("ed68"),o=a.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},ed68:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{radio:this.user.sex}},onLoad:function(t){},computed:(0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("user",["user"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("user",["updateSex"])),{},{RadioChange:function(t){this.radio=t.detail.value},tijiao:function tijiao(){var _this=this,user=this.user;(0,_api.updateSex)({sex:this.radio,u:user.id}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.updateSex(res_data.msg)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))}})};exports.default=_default}}]);