(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-qrCode"],{"0405b":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".canvas-hide[data-v-69f24e46]{\n\t/* 1 */position:fixed;right:100vw;bottom:100vh;\n\t/* 2 */z-index:-9999;\n\t/* 3 */opacity:0}",""]),t.exports=e},"191a":function(t,e,a){"use strict";a.r(e);var i=a("e3e5"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"25a6":function(t,e,a){var i=a("0405b");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("6c1412fa",i,!0,{sourceMap:!1,shadowMode:!1})},"2bd5":function(t,e,a){"use strict";var i=a("25a6"),n=a.n(i);n.a},9651:function(t,e,a){"use strict";a.r(e);var i=a("de06"),n=a("191a");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("2bd5");var s=a("f0c5"),r=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"69f24e46",null,!1,i["a"],void 0);e["default"]=r.exports},de06:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("群二维码名片")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("uni-text",{staticClass:"lg text-gray cuIcon-more",staticStyle:{"font-size":"22px",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.share.apply(void 0,arguments)}}},[a("span")])],1)],2),a("v-uni-view",{staticStyle:{margin:"auto auto","margin-top":"15px",width:"90%",height:"920upx","border-radius":"12px","background-color":"#fff","padding-top":"40upx"}},[a("v-uni-view",{staticStyle:{width:"90%",height:"120upx",margin:"auto auto"}},[a("v-uni-text",{staticClass:"cu-avatar round lg",style:"width:110upx;height:110upx;float: left;background-image: url("+t.$store.state.img_url+t.$store.state.cur_chat_entity.img+");"}),a("v-uni-text",{staticStyle:{float:"left","font-size":"36upx","line-height":"120upx","margin-left":"28upx","font-weight":"600"}},[t._v(t._s(t.$store.state.cur_chat_entity.name))])],1),a("v-uni-view",{staticClass:"qrcode_view",staticStyle:{width:"84%",margin:"auto auto","margin-top":"40upx"},style:"height:"+t.code_height+"px"},[a("v-uni-canvas",{staticClass:"canvas-hide",staticStyle:{width:"100%",height:"100%"},attrs:{"canvas-id":"qrcode"}}),a("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.qrcodeBase64}})],1),a("v-uni-view",{staticStyle:{"text-align":"center","margin-top":"50upx",color:"#777","font-size":"26upx"}},[t._v("可点击右上角进行二维码分享或保存")])],1)],1)},n=[]},e3e5:function(module,exports,__webpack_require__){"use strict";(function(__f__){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("ac1f");var _uqrcode=_interopRequireDefault(__webpack_require__("0f13")),_default={data:function(){return{code_height:0,txt:this.$store.state.cur_chat_entity.name,qrcodeBase64:""}},onLoad:function(t){var e=this;this.$store.state.user;this.$nextTick((function(){var t=0;uni.getSystemInfo({success:function(a){var i=uni.createSelectorQuery().select(".qrcode_view");i.boundingClientRect((function(a){t=a.width,e.code_height=t,_uqrcode.default.make({canvasId:"qrcode",componentInstance:e,text:"#group#"+e.$store.state.cur_chat_entity.id+"#",size:t,margin:0,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"jpg",correctLevel:_uqrcode.default.errorCorrectLevel.H}).then((function(t){e.qrcodeBase64=t}))})).exec()}})}))},methods:{share:function(){var t=this;uni.getStorageSync("USER");uni.showActionSheet({itemList:["发送给朋友","保存二维图"],success:function(e){0==e.tapIndex?(t.$store.state.temp.base64=t.qrcodeBase64,uni.navigateTo({url:"/pages/chat/group/qrcodeSendToFriend"})):1==e.tapIndex&&t.saveEwm()},fail:function(t){__f__("log","按取消"," at pages/chat/group/qrCode.vue:98")}})},saveEwm:function saveEwm(e){var _this=this;_this.$http.post("/user/file/uploadB64Img",{base64:_this.qrcodeBase64},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){var json=eval(res.data);200==json.code&&uni.downloadFile({url:_this.$store.state.img_url+json.msg,success:function(t){200===t.statusCode&&uni.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){_this.$http.post("/user/file/delB64Img",{path:json.msg},{header:{"x-access-uid":_this.$store.state.user.id}}).then((function(t){})),uni.showToast({title:"保存成功",icon:"none"})},fail:function(){uni.showToast({title:"保存失败， 请稍后重试",icon:"none"})}})}})}}))}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])}}]);