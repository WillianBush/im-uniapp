(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-shiming"],{"2e2a":function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[e("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[e("template",{attrs:{slot:"backText"},slot:"backText"}),e("template",{attrs:{slot:"content"},slot:"content"},[t._v("实名认证")])],2),0==t.shiming.status?e("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[e("v-uni-view",{staticStyle:{"font-size":"28upx",color:"#999"}},[t._v("审核中，请耐心等待审核！")])],1):t._e(),1==t.shiming.status?e("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[e("v-uni-view",{staticStyle:{"font-size":"28upx",color:"green","font-weight":"800"}},[t._v("审核通过")])],1):t._e(),2==t.shiming.status?e("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[e("v-uni-view",{staticStyle:{"font-size":"28upx",color:"red"}},[t._v("审核失败，请编辑后再提交")]),e("v-uni-view",{staticStyle:{color:"#999","margin-top":"20upx"}},[t._v(t._s(t.shiming.statusReason))])],1):t._e(),e("v-uni-view",{staticClass:"cu-form-group",staticStyle:{width:"94%",margin:"auto auto","border-radius":"5px","margin-top":"40upx","border-bottom":"1px solid #eee"}},[e("v-uni-view",{staticClass:"title"},[t._v("真实姓名")]),1!=t.shiming.status?e("v-uni-input",{attrs:{placeholder:"输入真实姓名"},model:{value:t.realname,callback:function(i){t.realname=i},expression:"realname"}}):e("v-uni-input",{attrs:{disabled:""},model:{value:t.realname,callback:function(i){t.realname=i},expression:"realname"}})],1),e("v-uni-view",{staticClass:"cu-form-group",staticStyle:{width:"94%",margin:"auto auto","border-radius":"5px","border-bottom":"1px solid #eee","border-top":"0px"}},[e("v-uni-view",{staticClass:"title"},[t._v("身份证号")]),1!=t.shiming.status?e("v-uni-input",{attrs:{placeholder:"输入身份证"},model:{value:t.idcard,callback:function(i){t.idcard=i},expression:"idcard"}}):e("v-uni-input",{attrs:{disabled:""},model:{value:t.idcard,callback:function(i){t.idcard=i},expression:"idcard"}})],1),0!=t.shiming.status?e("v-uni-button",{staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"94%",margin:"auto auto","margin-top":"50upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tijiao.apply(void 0,arguments)}}},[t._v("提交认证")]):t._e()],1)},n=[]},"469f":function(t,i,e){"use strict";var a=e("bbf2"),n=e.n(a);n.a},b56a:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("ac1f"),__webpack_require__("00b4"),__webpack_require__("498a");var _api=__webpack_require__("99bd"),_default={data:function(){return{realname:"",idcard:"",shiming:{},is_post:!1}},computed:{i18n:function(){return this.$t("index")}},onLoad:function onLoad(){var _this=this;(0,_api.getShimingInfo)().then((function(res){var res_data=eval(res.data);200==res_data.code&&res_data.body&&null!=res_data.body&&(_this.shiming=res_data.body,_this.realname=res_data.body.realname,_this.idcard=res_data.body.idcard)}))},methods:{checkIDCard:function(t){for(var i=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],e=t+"",a=t[17],n=e.substring(0,17),s=n.split(""),o=s.length,r=0,c=0;c<o;c++)r+=s[c]*i[c];var u=r%11,d=["1","0","X","9","8","7","6","5","4","3","2"][u],l=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(t);return!(a!==d||!l)},tijiao:function tijiao(){if(!this.is_post){var _this=this;""!=this.realname.trim()?""!=this.idcard.trim()?this.checkIDCard(this.idcard.trim())?(this.is_post=!0,(0,_api.updateShiming)({realname:_this.realname,idcard:_this.idcard}).then((function(res){_this.is_post=!1;var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"提交成功,耐心等待审核!"}),_this.shiming=res_data.body):uni.showToast({icon:"none",position:"none",title:res_data.msg})}))):uni.showToast({icon:"none",position:"bottom",title:"身份证号填写有误"}):uni.showToast({icon:"none",position:"bottom",title:"身份证不能为空"}):uni.showToast({icon:"none",position:"bottom",title:"真实姓名不能为空"})}}}};exports.default=_default},bbf2:function(t,i,e){var a=e("e8b4");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("ff94a184",a,!0,{sourceMap:!1,shadowMode:!1})},c166:function(t,i,e){"use strict";e.r(i);var a=e("2e2a"),n=e("cd4a");for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);e("469f");var o=e("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"905bff96",null,!1,a["a"],void 0);i["default"]=r.exports},cd4a:function(t,i,e){"use strict";e.r(i);var a=e("b56a"),n=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);i["default"]=n.a},e8b4:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".margin-top[data-v-905bff96]{margin-top:%?50?%}",""]),t.exports=i}}]);