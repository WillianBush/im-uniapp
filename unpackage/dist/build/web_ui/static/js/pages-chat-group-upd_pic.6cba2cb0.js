(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-upd_pic"],{3015:function(t,e,s){"use strict";s.r(e);var a=s("640a"),i=s("4eef");for(var o in i)"default"!==o&&function(t){s.d(e,t,(function(){return i[t]}))}(o);var r,n=s("f0c5"),c=Object(n["a"])(i["default"],a["b"],a["c"],!1,null,"42d4a105",null,!1,a["a"],r);e["default"]=c.exports},"4eef":function(t,e,s){"use strict";s.r(e);var a=s("68a2"),i=s.n(a);for(var o in a)"default"!==o&&function(t){s.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"640a":function(t,e,s){"use strict";var a;s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return o})),s.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{staticStyle:{height:"100vh","background-color":"#fff"}},[s("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[s("template",{attrs:{slot:"backText"},slot:"backText"}),s("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改群头像")]),s("template",{attrs:{slot:"right"},slot:"right"})],2),s("v-uni-view",{staticStyle:{"text-align":"center",height:"400upx","background-color":"#fff","padding-top":"60upx"}},[s("v-uni-view",{staticClass:"cu-avatar round lg",style:"margin:auto auto;width:160upx;height:160upx;background-image: url("+t.$store.state.img_url+t.$store.state.cur_chat_entity.img+");"}),s("v-uni-view",{staticStyle:{"margin-top":"50upx"}},[s("v-uni-button",{staticClass:"cu-btn round bg-green shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage()}}},[t._v("更换群头像")])],1),s("v-uni-view",{staticStyle:{"margin-top":"40upx"}},[s("v-uni-button",{staticClass:"cu-btn round bg-red shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearImage()}}},[t._v("使用默认头像")])],1)],1)],1)},o=[]},"68a2":function(module,exports,__webpack_require__){"use strict";(function(__f__){__webpack_require__("4160"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{txt:this.$store.state.cur_chat_entity.name}},onLoad:function(t){},methods:{clearImage:function clearImage(){var _this=this;_this.$http.post("/room/json/clearHeadpic",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(__f__("log","-----"," at pages/chat/group/upd_pic.vue:44"),_this.$store.commit("setCur_chat_entity",res_data.body),uni.showToast({icon:"success",title:"操作成功",duration:800})):uni.showToast({title:res_data.msg,duration:2e3})}))},ChooseImage:function ChooseImage(){var _this=this;uni.chooseImage({count:4,sizeType:["compressed"],sourceType:["album"],success:function success(res){if(res.tempFiles[0].size>2097152)uni.showToast({icon:"none",title:"图片大小不能高于2M"});else var uper=uni.uploadFile({url:_this.$store.state.req_url+"/user/file/uploadRoomHeadpic",header:{"x-access-uid":_this.$store.state.user.id,"x-access-roomid":_this.$store.state.cur_chat_entity.roomUUID},filePath:res.tempFilePaths[0],name:"file",success:function success(res1){var res_data=eval("("+res1.data+")");__f__("log",res_data," at pages/chat/group/upd_pic.vue:89"),200==res_data.code?(uni.showToast({icon:"success",title:"更换成功"}),_this.$store.state.cur_chat_entity.img=res_data.msg,_this.$store.state.ar_list.forEach((function(t){t.id!=_this.$store.state.cur_chat_entity.roomUUID||(t.img=_this.$store.state.cur_chat_entity.img)})),_this.$store.state.ar_list_show.forEach((function(t){t.id!=_this.$store.state.cur_chat_entity.roomUUID||(t.img=_this.$store.state.cur_chat_entity.img)}))):uni.showToast({icon:"none",title:res_data.msg})}})}})}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])}}]);