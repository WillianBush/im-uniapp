(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-upd_pic"],{3278:function(t,e,a){"use strict";a.r(e);var i=a("6f01"),r=a("4735");for(var u in r)["default"].indexOf(u)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(u);var n=a("f0c5"),o=Object(n["a"])(r["default"],i["b"],i["c"],!1,null,"5623e7ad",null,!1,i["a"],void 0);e["default"]=o.exports},4735:function(t,e,a){"use strict";a.r(e);var i=a("cb65"),r=a.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},"6f01":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticStyle:{height:"100vh","background-color":"#fff"}},[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("修改群头像")]),a("template",{attrs:{slot:"right"},slot:"right"})],2),a("v-uni-view",{staticStyle:{"text-align":"center",height:"400upx","background-color":"#fff","padding-top":"60upx"}},[a("v-uni-view",{staticClass:"cu-avatar round lg",style:"margin:auto auto;width:160upx;height:160upx;background-image: url("+t.imgUrl+t.curChatEntity.img+");"}),a("v-uni-view",{staticStyle:{"margin-top":"50upx"}},[a("v-uni-button",{staticClass:"cu-btn round bg-green shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage()}}},[t._v("更换群头像")])],1),a("v-uni-view",{staticStyle:{"margin-top":"40upx"}},[a("v-uni-button",{staticClass:"cu-btn round bg-red shadow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearImage()}}},[t._v("使用默认头像")])],1)],1)],1)},r=[]},cb65:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b");var _defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{txt:this.curChatEntity.name}},onLoad:function(t){},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)((0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("chat",["curChatEntity","arList","arListShow"])),(0,_vuex.mapState)("user",["user"])),(0,_vuex.mapState)("app",["imgUrl","reqUrl"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("chat",["setCurChatEntity","setCurChatEntityImg"])),{},{clearImage:function clearImage(){var _this=this;(0,_api.clearHeadpic)({roomid:_this.curChatEntity.id}).then((function(res){var res_data=eval(res.data);200==res_data.code?(_this.setCurChatEntity(res_data.body),uni.showToast({icon:"success",title:"操作成功",duration:800})):uni.showToast({title:res_data.msg,duration:2e3})}))},ChooseImage:function ChooseImage(){var _this=this;uni.chooseImage({count:4,sizeType:["compressed"],sourceType:["album"],success:function success(res){var _header;if(res.tempFiles[0].size>2097152)uni.showToast({icon:"none",title:"图片大小不能高于2M"});else var uper=uni.uploadFile({url:_this.reqUrl+"/user/file/uploadRoomHeadpic",header:(_header={},(0,_defineProperty2.default)(_header,"member-token",_this.user.userToken),(0,_defineProperty2.default)(_header,"x-access-roomid",_this.curChatEntity.roomUUID),_header),filePath:res.tempFilePaths[0],name:"file",success:function success(res1){var res_data=eval("("+res1.data+")");console.log(res_data),200==res_data.code?(uni.showToast({icon:"success",title:"更换成功"}),_this.setCurChatEntityImg(res_data.msg),_this.arList.forEach((function(t){t.id!=_this.curChatEntity.roomUUID||(t.img=_this.curChatEntity.img)})),_this.arListShow.forEach((function(t){t.id!=_this.curChatEntity.roomUUID||(t.img=_this.curChatEntity.img)}))):uni.showToast({icon:"none",title:res_data.msg})}})}})}})};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])}}]);