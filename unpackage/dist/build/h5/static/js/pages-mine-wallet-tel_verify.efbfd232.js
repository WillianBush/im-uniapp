(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-wallet-tel_verify"],{3626:function(module,exports,__webpack_require__){"use strict";var countDown;__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("a9e3"),__webpack_require__("498a");var _default={data:function(){return{isRunCode:!1,setTime:60,second:0,codeText:"获取验证码",code:"",loading:!1}},computed:{_setTime:function(){var t=Number(this.setTime);return t>0?t:60},getVerCodeSecond:function(){return this.second<=0?this.codeText:(this.second,this.second+" s")}},methods:{runCode:function(){var t=this;if(this.isRunCode)return!1;this.isRunCode=!0,this.second=this._setTime,countDown=setInterval((function(){t.second--,0==t.second&&(t.isRunCode=!1,clearInterval(countDown))}),1e3)},verifySmsCode:function verifySmsCode(){var _this2=this,_this=this;if(""==_this.code.trim())return uni.showToast({icon:"none",position:"bottom",title:"请输入手机验证码"}),!1;this.loading=!0,_this.$http.post("/user/json/verifySmsCode",{tel:_this.$store.state.user.telphone,code:_this.code},{header:{"x-access-client":_this.$clientType}}).then((function(res){_this2.loading=!1;var res_data=eval(res.data);200==res_data.code?uni.navigateTo({url:"/pages/mine/wallet/pay_pwd_set?forget_token="+res_data.msg}):uni.showToast({icon:"none",title:res_data.msg})}))},getVerCode:function getVerCode(){var _this=this;this.isRunCode||_this.$http.post("/user/json/sendSms/v1",{tel:_this.$store.state.user.telphone},{header:{"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.runCode():uni.showToast({icon:"none",title:res_data.msg})}))}}};exports.default=_default},"7ad9":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[n("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[n("template",{attrs:{slot:"backText"},slot:"backText"}),n("template",{attrs:{slot:"content"},slot:"content"},[t._v("手机验证")])],2),n("v-uni-view",{staticStyle:{"font-size":"52upx","text-align":"center","margin-top":"80upx","font-weight":"800"}},[t._v(t._s(t.$store.state.user.telphone))]),n("v-uni-view",{staticClass:"cu-form-group",staticStyle:{width:"94%",margin:"auto auto","border-radius":"5px","margin-top":"50upx","border-bottom":"1px solid #eee"}},[n("v-uni-view",{staticClass:"title"},[t._v("验证码")]),n("v-uni-input",{attrs:{placeholder:"输入手机验证码",name:"input"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("v-uni-button",{staticClass:"cu-btn bg-green shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getVerCode.apply(void 0,arguments)}}},[t._v(t._s(t.getVerCodeSecond))])],1),n("v-uni-button",{staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"94%",margin:"auto auto","margin-top":"50upx"},attrs:{loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.verifySmsCode.apply(void 0,arguments)}}},[t._v("提交验证")])],1)},i=[]},bc4c:function(t,e,n){"use strict";n.r(e);var o=n("3626"),i=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},c60a:function(t,e,n){"use strict";n.r(e);var o=n("7ad9"),i=n("bc4c");for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);var a=n("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"db312d72",null,!1,o["a"],void 0);e["default"]=r.exports}}]);