(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-user_info-qrCode"],{"070c":function(e,t,i){"use strict";var a=i("d97e"),n=i.n(a);n.a},"1c90":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticStyle:{margin:"auto auto","margin-top":"15px",width:"90%",height:"920upx","border-radius":"12px","background-color":"#fff","padding-top":"40upx"}},[i("v-uni-view",{staticStyle:{width:"90%",height:"120upx",margin:"auto auto"}},[i("v-uni-text",{staticClass:"cu-avatar round lg",style:"width:110upx;height:110upx;float: left;background-image: url("+e.$store.state.img_url+e.$store.state.user.headpic+");"}),i("v-uni-text",{staticStyle:{float:"left","font-size":"36upx","line-height":"120upx","margin-left":"28upx","font-weight":"600"}},[e._v(e._s(e.$store.state.user.nickName))])],1),i("v-uni-view",{staticClass:"qrcode_view",staticStyle:{width:"84%",margin:"auto auto","margin-top":"40upx"},style:"height:"+e.code_height+"px"},[i("v-uni-canvas",{staticClass:"canvas-hide",staticStyle:{width:"100%",height:"100%"},attrs:{"canvas-id":"qrcode1"}}),i("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.qrcodeBase64}})],1),i("v-uni-view",{staticStyle:{"text-align":"center","margin-top":"50upx",color:"#777","font-size":"26upx"}},[e._v("可点击右上角进行二维码分享或保存")])],1)],1)},n=[]},"1f53":function(e,t,i){"use strict";i.r(t);var a=i("7609"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},7609:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("ac1f");var _uqrcode=_interopRequireDefault(__webpack_require__("8bf5")),_default={data:function(){return{code_height:0,qrcodeBase64:""}},onLoad:function(e){var t=this;this.$store.state.user;this.$nextTick((function(){var e=0;uni.getSystemInfo({success:function(i){var a=uni.createSelectorQuery().select(".qrcode_view");a.boundingClientRect((function(i){e=i.width,t.code_height=e,_uqrcode.default.make({canvasId:"qrcode1",componentInstance:t,text:"#member#"+t.$store.state.user.id+"#",size:e,margin:0,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"jpg",correctLevel:_uqrcode.default.errorCorrectLevel.H}).then((function(e){t.qrcodeBase64=e}))})).exec()}})}))},methods:{share:function(){var e=this;uni.getStorageSync("USER");uni.showActionSheet({itemList:["发送给朋友","保存二维图"],success:function(t){0==t.tapIndex?(e.$store.state.temp.base64=e.qrcodeBase64,uni.navigateTo({url:"/pages/mine/user_info/qrcodeSendToFriend"})):1==t.tapIndex&&e.saveEwm()},fail:function(e){}})},saveEwm:function saveEwm(e){var _this=this;_this.$http.post("/user/file/uploadB64Img",{base64:_this.qrcodeBase64},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){var json=eval(res.data);200==json.code&&uni.downloadFile({url:_this.$store.state.img_url+json.msg,success:function(e){200===e.statusCode&&uni.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){_this.$http.post("/user/file/delB64Img",{path:json.msg},{header:{"x-access-uid":_this.$store.state.user.id}}).then((function(e){})),uni.showToast({title:"保存成功",icon:"none"})},fail:function(){uni.showToast({title:"保存失败， 请稍后重试",icon:"none"})}})}})}}))}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},d97e:function(e,t,i){var a=i("e89b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("065c0f68",a,!0,{sourceMap:!1,shadowMode:!1})},dbf0:function(e,t,i){"use strict";i.r(t);var a=i("1c90"),n=i("1f53");for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("070c");var o=i("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"5ecccaed",null,!1,a["a"],void 0);t["default"]=r.exports},e89b:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".canvas-hide[data-v-5ecccaed]{\n\t/* 1 */position:fixed;right:100vw;bottom:100vh;\n\t/* 2 */z-index:-9999;\n\t/* 3 */opacity:0}",""]),e.exports=t}}]);