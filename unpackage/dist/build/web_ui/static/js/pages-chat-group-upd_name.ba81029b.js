(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-upd_name"],{"615e":function(t,e,a){"use strict";var s;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return s}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改群昵称")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),a("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{margin:"auto auto","margin-top":"15px"}},[a("v-uni-input",{attrs:{maxlength:"-1",placeholder:"请输入昵称"},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}})],1)],1)},i=[]},"6ee3":function(t,e,a){"use strict";a.r(e);var s=a("615e"),o=a("aaaa");for(var i in o)"default"!==i&&function(t){a.d(e,t,(function(){return o[t]}))}(i);var n,r=a("f0c5"),c=Object(r["a"])(o["default"],s["b"],s["c"],!1,null,"4c716eb8",null,!1,s["a"],n);e["default"]=c.exports},"9e92":function(module,exports,__webpack_require__){"use strict";__webpack_require__("4160"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{txt:this.$store.state.cur_chat_entity.name}},onLoad:function(t){},methods:{tijiao:function tijiao(){var _this=this,user=this.$store.state.user;_this.$http.post("/room/json/updateName",{name:this.txt,roomid:this.$store.state.cur_chat_entity.roomUUID},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.$store.state.cur_chat_entity.name=res_data.msg,_this.$store.state.ar_list.forEach((function(t){t.id!=_this.$store.state.cur_chat_entity.roomUUID||(t.title=_this.$store.state.cur_chat_entity.name)})),_this.$store.state.ar_list_show.forEach((function(t){t.id!=_this.$store.state.cur_chat_entity.roomUUID||(t.title=_this.$store.state.cur_chat_entity.name)}))):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))}}};exports.default=_default},aaaa:function(t,e,a){"use strict";a.r(e);var s=a("9e92"),o=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,(function(){return s[t]}))}(i);e["default"]=o.a}}]);