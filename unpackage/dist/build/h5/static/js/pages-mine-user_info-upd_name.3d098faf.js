(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-upd_name"],{"8f9a":function(t,e,a){"use strict";a.r(e);var n=a("afe4"),s=a("aed9");for(var i in s)"default"!==i&&function(t){a.d(e,t,(function(){return s[t]}))}(i);var o,r=a("f0c5"),u=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"2987bba2",null,!1,n["a"],o);e["default"]=u.exports},aed9:function(t,e,a){"use strict";a.r(e);var n=a("b4ec"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a},afe4:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改昵称")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),a("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{margin:"auto auto","margin-top":"15px"}},[a("v-uni-input",{attrs:{maxlength:"-1",placeholder:"请输入昵称"},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}})],1)],1)},i=[]},b4ec:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{txt:this.$store.state.user.nickName}},onLoad:function(t){},methods:{tijiao:function tijiao(){var _this=this,user=this.$store.state.user;_this.$http.post("/user/json/updateNickName",{nickName:this.txt,u:user.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.$store.state.user.nickName=res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))}}};exports.default=_default}}]);