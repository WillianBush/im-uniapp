(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-shiming"],{"0f8e":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".margin-top[data-v-1442ff0e]{margin-top:%?50?%}",""]),t.exports=e},"33f8":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("ac1f"),__webpack_require__("00b4"),__webpack_require__("498a");var _default={data:function(){return{realname:"",idcard:"",shiming:{},is_post:!1}},onLoad:function onLoad(){var _this=this;_this.$http.post("/user/json/shiming_info",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&res_data.body&&null!=res_data.body&&(_this.shiming=res_data.body,_this.realname=res_data.body.realname,_this.idcard=res_data.body.idcard)}))},methods:{checkIDCard:function(t){for(var e=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],i=t+"",a=t[17],s=i.substring(0,17),n=s.split(""),o=n.length,r=0,c=0;c<o;c++)r+=n[c]*e[c];var u=r%11,d=["1","0","X","9","8","7","6","5","4","3","2"][u],l=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(t);return!(a!==d||!l)},tijiao:function tijiao(){if(!this.is_post){var _this=this;""!=this.realname.trim()?""!=this.idcard.trim()?this.checkIDCard(this.idcard.trim())?(this.is_post=!0,_this.$http.post("/user/json/shiming_update",{realname:_this.realname,idcard:_this.idcard},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){_this.is_post=!1;var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"提交成功,耐心等待审核!"}),_this.shiming=res_data.body):uni.showToast({icon:"none",position:"none",title:res_data.msg})}))):uni.showToast({icon:"none",position:"bottom",title:"身份证号填写有误"}):uni.showToast({icon:"none",position:"bottom",title:"身份证不能为空"}):uni.showToast({icon:"none",position:"bottom",title:"真实姓名不能为空"})}}}};exports.default=_default},"47c65":function(t,e,i){var a=i("0f8e");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("45901bbd",a,!0,{sourceMap:!1,shadowMode:!1})},"71aa":function(t,e,i){"use strict";var a=i("47c65"),s=i.n(a);s.a},"9d80":function(t,e,i){"use strict";i.r(e);var a=i("c8ad"),s=i("a0c5");for(var n in s)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(n);i("71aa");var o=i("f0c5"),r=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,"1442ff0e",null,!1,a["a"],void 0);e["default"]=r.exports},a0c5:function(t,e,i){"use strict";i.r(e);var a=i("33f8"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},c8ad:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("实名认证")])],2),0==t.shiming.status?i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[i("v-uni-view",{staticStyle:{"font-size":"28upx",color:"#999"}},[t._v("审核中，请耐心等待审核！")])],1):t._e(),1==t.shiming.status?i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[i("v-uni-view",{staticStyle:{"font-size":"28upx",color:"green","font-weight":"800"}},[t._v("审核通过")])],1):t._e(),2==t.shiming.status?i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[i("v-uni-view",{staticStyle:{"font-size":"28upx",color:"red"}},[t._v("审核失败，请编辑后再提交")]),i("v-uni-view",{staticStyle:{color:"#999","margin-top":"20upx"}},[t._v(t._s(t.shiming.statusReason))])],1):t._e(),i("v-uni-view",{staticClass:"cu-form-group",staticStyle:{width:"94%",margin:"auto auto","border-radius":"5px","margin-top":"40upx","border-bottom":"1px solid #eee"}},[i("v-uni-view",{staticClass:"title"},[t._v("真实姓名")]),1!=t.shiming.status?i("v-uni-input",{attrs:{placeholder:"输入真实姓名"},model:{value:t.realname,callback:function(e){t.realname=e},expression:"realname"}}):i("v-uni-input",{attrs:{disabled:""},model:{value:t.realname,callback:function(e){t.realname=e},expression:"realname"}})],1),i("v-uni-view",{staticClass:"cu-form-group",staticStyle:{width:"94%",margin:"auto auto","border-radius":"5px","border-bottom":"1px solid #eee","border-top":"0px"}},[i("v-uni-view",{staticClass:"title"},[t._v("身份证号")]),1!=t.shiming.status?i("v-uni-input",{attrs:{placeholder:"输入身份证"},model:{value:t.idcard,callback:function(e){t.idcard=e},expression:"idcard"}}):i("v-uni-input",{attrs:{disabled:""},model:{value:t.idcard,callback:function(e){t.idcard=e},expression:"idcard"}})],1),0!=t.shiming.status?i("v-uni-button",{staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"94%",margin:"auto auto","margin-top":"50upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao.apply(void 0,arguments)}}},[t._v("提交认证")]):t._e()],1)},s=[]}}]);