(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-upd_name"],{4822:function(t,e,a){"use strict";a.r(e);var i=a("a96a"),n=a("85f3");for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);var o=a("f0c5"),r=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,"1582751e",null,!1,i["a"],void 0);e["default"]=r.exports},"85f3":function(t,e,a){"use strict";a.r(e);var i=a("d565"),n=a.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a},a96a:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{margin:"auto auto","margin-top":"15px"}},[a("el-input",{attrs:{maxlength:"-1",placeholder:"请输入昵称"},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}})],1),a("div",{staticStyle:{"margin-top":"30px","text-align":"center"}},[a("el-button",{staticStyle:{width:"130px"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],1)},n=[]},d565:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{txt:this.$store.state.user.nickName}},onLoad:function(t){},methods:{tijiao:function tijiao(){var _this=this,user=this.$store.state.user;_this.$http.post("/user/json/updateNickName",{nickName:this.txt,u:user.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(_this.$emit("userShow",!1),_this.$http.post("/user/json/logout",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(uni.closeSocket(),uni.removeStorageSync("USER"),_this.$store.commit("clearData"),uni.navigateTo({url:"/pages/login/login"}))})),uni.showToast({icon:"success",position:"bottom",title:"修改成功，请重新登录。"}),_this.$store.state.user.nickName=res_data.msg):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))}}};exports.default=_default}}]);