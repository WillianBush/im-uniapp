(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-index","pages-mine-user_info-upd_name","pages-mine-user_info-upd_phone","pages-mine-user_info-upd_sex"],{"02c8":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-radio-group",{staticClass:"block",on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.RadioChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[e._v("男")]),i("v-uni-radio",{class:"男"==e.radio?"checked":"",attrs:{checked:"男"==e.radio,value:"男"}})],1),i("v-uni-view",{staticClass:"cu-form-group "},[i("v-uni-view",{staticClass:"title"},[e._v("女")]),i("v-uni-radio",{class:"女"==e.radio?"checked":"",attrs:{checked:"女"==e.radio,value:"女"}})],1)],1),i("div",{staticStyle:{"text-align":"center","margin-top":"20px"}},[i("el-button",{staticStyle:{width:"130px"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tijiao.apply(void 0,arguments)}}},[e._v("提交")])],1)],1)},n=[]},"07bf":function(e,t,i){"use strict";i.r(t);var a=i("23e8"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"23e8":function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("ac1f");var _defineProperty2=_interopRequireDefault(__webpack_require__("ade3")),_objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_forget=_interopRequireDefault(__webpack_require__("f152")),_upd_name=_interopRequireDefault(__webpack_require__("4bcb")),_upd_phone=_interopRequireDefault(__webpack_require__("6c51")),_upd_sex=_interopRequireDefault(__webpack_require__("274a")),_uqrcode=_interopRequireDefault(__webpack_require__("a582")),_utils=__webpack_require__("d648"),_vuex=__webpack_require__("26cb"),_api=__webpack_require__("99bd"),_default={components:{forget:_forget.default,upd_name:_upd_name.default,upd_phone:_upd_phone.default,upd_sex:_upd_sex.default},data:function(){return{forgetShow:!1,sexShow:!1,usernameShow:!1,phonenumShow:!1,qrcodeShow:!1,code_height:0,qrcodeBase64:""}},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapState)("app",["imgUrl","reqUrl"])),(0,_vuex.mapState)("user",["user","userToken"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("chat",["setTempBase64"])),{},{userShow:function(e){this.usernameShow=!1},getHeadPic:function(e){return(0,_utils.getHeadPic)(e,this.imgUrl)},goQrcode:function(){var e=this;this.qrcodeShow=!0,this.$nextTick((function(){e.getQr()}))},getQr:function(){var e=this;this.user;uni.getSystemInfo({success:function(t){var i=uni.createSelectorQuery().select(".qrcode_view");i.boundingClientRect((function(t){e.code_height=t.width,_uqrcode.default.make({canvasId:"qrcode1",componentInstance:e,text:"#member#"+e.user.id+"#",size:e.code_height,margin:0,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"jpg",correctLevel:_uqrcode.default.errorCorrectLevel.H}).then((function(t){e.qrcodeBase64=t}))})).exec()}})},modifyPwd:function(){this.forgetShow=!0},updSex:function(){uni.navigateTo({url:"/pages/mine/user_info/upd_sex"})},updName:function(){uni.navigateTo({url:"/pages/mine/user_info/upd_name"})},updPhone:function(){uni.navigateTo({url:"/pages/mine/user_info/upd_phone"})},ChooseImage:function ChooseImage(){var _this=this;uni.chooseImage({count:4,sizeType:["compressed"],sourceType:["album"],success:function success(res){if(res.tempFiles[0].size>2097152)uni.showToast({icon:"none",title:"图片大小不能高于2M"});else var token=uni.getStorageSync("token"),uper=uni.uploadFile({url:_this.reqUrl+"/user/file/uploadAvatar",header:(0,_defineProperty2.default)({},"member-token",token),filePath:res.tempFilePaths[0],name:"file",fail:function(e){uni.showToast({title:e.msg?e.msg:e,duration:1e3})},success:function success(res1){var json=eval("("+res1.data+")");200==json.code?(uni.showToast({icon:"success",title:"上传成功"}),_this.updateUserHeadpic(json.msg)):uni.showToast({icon:"none",title:json.msg})}})}})}})};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},"274a":function(e,t,i){"use strict";i.r(t);var a=i("02c8"),n=i("4502");for(var o in n)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(o);var r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"48fce30e",null,!1,a["a"],void 0);t["default"]=u.exports},"27a9":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{txt:this.user.nickName}},computed:(0,_objectSpread2.default)({},(0,_vuex.mapState)("user",["user"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("user",["updateUsername"])),{},{tijiao:function tijiao(){var _this=this,user=this.user;(0,_api.updateNickName)({nickName:this.txt,u:user.id}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.updateUsername(res_data.msg)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})).catch((function(e){uni.showToast({icon:"none",position:"bottom",title:e.msg?e.msg:"服务器异常!"})}))}})};exports.default=_default},4502:function(e,t,i){"use strict";i.r(t);var a=i("ed68"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"4bcb":function(e,t,i){"use strict";i.r(t);var a=i("a4f1"),n=i("d485");for(var o in n)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(o);var r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"17148470",null,!1,a["a"],void 0);t["default"]=u.exports},5602:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("div",{staticStyle:{margin:"auto auto","margin-top":"15px"}},[i("div",[i("el-input",{attrs:{maxlength:"11",placeholder:"请输入手机号"},model:{value:e.txt,callback:function(t){e.txt=t},expression:"txt"}})],1),i("div",{staticStyle:{"margin-top":"30px","text-align":"center"}},[i("el-button",{staticStyle:{width:"130px"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tijiao()}}},[e._v("提交")])],1)])])},n=[]},"6c51":function(e,t,i){"use strict";i.r(t);var a=i("5602"),n=i("aed9b");for(var o in n)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(o);var r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=u.exports},"71b4a":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'.cu-item1[data-v-d6e45fc8]:after{border-bottom:0!important}.indexes[data-v-d6e45fc8]{position:relative}.indexBar[data-v-d6e45fc8]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-d6e45fc8]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-d6e45fc8]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-d6e45fc8]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-d6e45fc8]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-d6e45fc8]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-d6e45fc8]{color:#333}.canvas-hide[data-v-d6e45fc8]{\n\t/* 1 */position:fixed;right:100vw;bottom:100vh;\n\t/* 2 */z-index:-9999;\n\t/* 3 */opacity:0}',""]),e.exports=t},a4f1:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{margin:"auto auto","margin-top":"15px"}},[i("el-input",{attrs:{maxlength:"-1",placeholder:"请输入昵称"},model:{value:e.txt,callback:function(t){e.txt=t},expression:"txt"}})],1),i("div",{staticStyle:{"margin-top":"30px","text-align":"center"}},[i("el-button",{staticStyle:{width:"130px"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tijiao()}}},[e._v("提交")])],1)],1)},n=[]},a723:function(e,t,i){"use strict";var a=i("f128"),n=i.n(a);n.a},aed9b:function(e,t,i){"use strict";i.r(t);var a=i("e289"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},c8cf:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("headbar",{attrs:{title:"个人信息",isback:!0}}),i("el-dialog",{attrs:{width:"30%",title:"修改昵称",visible:e.usernameShow},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.usernameShow=t}}},[i("upd_name",{on:{userShow:function(t){arguments[0]=t=e.$handleEvent(t),e.userShow.apply(void 0,arguments)}}})],1),i("el-dialog",{attrs:{width:"30%",title:"修改手机号",visible:e.phonenumShow},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.phonenumShow=t}}},[i("upd_phone")],1),i("el-dialog",{attrs:{width:"30%",title:"修改性别",visible:e.sexShow},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.sexShow=t}}},[i("upd_sex")],1),i("el-dialog",{attrs:{width:"30%",title:"忘记密码",visible:e.forgetShow},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.forgetShow=t}}},[i("forget")],1),i("el-dialog",{attrs:{width:"30%",title:"我的二维码名片",visible:e.qrcodeShow},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.qrcodeShow=t}}},[i("v-uni-view",{staticStyle:{margin:"auto auto","margin-top":"15px",width:"90%",height:"920upx","border-radius":"12px","background-color":"#fff","padding-top":"40upx"}},[i("v-uni-view",{staticStyle:{width:"90%",height:"120upx",margin:"auto auto"}},[i("v-uni-text",{staticClass:"cu-avatar round lg",style:"width:110upx;height:110upx;float: left;background-image: url("+e.getHeadPic(e.user.headpic)+");"}),i("v-uni-text",{staticStyle:{float:"left","font-size":"36upx","line-height":"120upx","margin-left":"28upx","font-weight":"600"}},[e._v(e._s(e.$store.state.user.nickName))])],1),i("v-uni-view",{staticClass:"qrcode_view",staticStyle:{width:"84%",margin:"auto auto","margin-top":"40upx"},style:"height:"+e.code_height+"px"},[i("v-uni-canvas",{staticClass:"canvas-hide",staticStyle:{width:"100%",height:"100%"},attrs:{"canvas-id":"qrcode1"}}),i("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.qrcodeBase64}})],1),i("v-uni-view",{staticStyle:{"text-align":"center","margin-top":"50upx",color:"#777","font-size":"26upx"}},[e._v("可点击右上角进行二维码分享或保存")])],1)],1),i("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{"margin-top":"10px"}},[i("v-uni-view",{staticClass:"cu-item cu-item1",class:"arrow",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ChooseImage.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[e._v("头像")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+e.getHeadPic(e.user.headpic)+");"})],1)],1)],1),i("v-uni-view",{staticClass:"cu-item",class:"arrow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.usernameShow=!0}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px",color:"#8799a3"}},[e._v("昵称")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[e._v(e._s(e.user.nickName))])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.phonenumShow=!0}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticStyle:{float:"left","margin-left":"10px",color:"#8799a3"}},[e._v("手机号")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[e._v(e._s(e.user.telphone))])],1)],1),i("v-uni-view",{staticClass:"cu-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px",color:"#8799a3"}},[e._v("账号")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","margin-right":"60upx","font-size":"26upx"}},[e._v(e._s(e.user.username))])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goQrcode.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#8799a3"}},[e._v("二维码名片")]),i("v-uni-text",{staticClass:"lg text-gray cuIcon-qr_code",staticStyle:{"font-size":"22px",float:"right",position:"relative",right:"-20upx"}},[i("span")])],1)],1),i("v-uni-view",{staticClass:"cu-item",class:"arrow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sexShow=!0}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticStyle:{float:"left","margin-left":"10px",color:"#8799a3"}},[e._v("性别")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[e._v(e._s(e.user.sex))])],1)],1),i("v-uni-view",{staticClass:"cu-item",class:"arrow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.forgetShow=!0}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticStyle:{float:"left","margin-left":"10px",color:"#8799a3"}},[e._v("修改密码")])],1)],1)],1)],1)},n=[]},d485:function(e,t,i){"use strict";i.r(t);var a=i("27a9"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},dc87:function(e,t,i){"use strict";i.r(t);var a=i("c8cf"),n=i("07bf");for(var o in n)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("a723");var r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"d6e45fc8",null,!1,a["a"],void 0);t["default"]=u.exports},e289:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{txt:this.user.telphone}},computed:(0,_objectSpread2.default)({},(0,_vuex.mapState)("user",["user"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("user",["updateTelPhone"])),{},{tijiao:function tijiao(){var _this=this,user=this.user;if(11!=_this.txt.length)return uni.showToast({icon:"none",position:"bottom",title:"手机号不正确"}),!1;(0,_api.updateTel)({newTel:this.txt,u:user.id}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.updateTelPhone(res_data.msg)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})).catch((function(e){uni.showToast({icon:"none",position:"bottom",title:e.msg?e.msg:"服务器异常!"})}))}})};exports.default=_default},ed68:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{radio:this.user.sex}},computed:(0,_objectSpread2.default)({},(0,_vuex.mapState)("user",["user"])),methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("user",["updateSex"])),{},{RadioChange:function(e){this.radio=e.detail.value},tijiao:function tijiao(){var _this=this,user=this.user;(0,_api.updateSex)({sex:this.radio,u:user.id}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",position:"bottom",title:"修改成功"}),_this.updateSex(res_data.msg)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})).catch((function(e){uni.showToast({icon:"none",position:"bottom",title:e.msg?e.msg:"服务器异常!"})}))}})};exports.default=_default},f128:function(e,t,i){var a=i("71b4a");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("7d634172",a,!0,{sourceMap:!1,shadowMode:!1})}}]);