(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-group-group_detail"],{"0ab3":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{id:"",room:{},isRoomMember:!1}},onLoad:function onLoad(e){var _this=this,user=uni.getStorageSync("USER");this.id=e.id,this.$http.post("/room/json/load/v1",{roomid:this.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.room=res_data.body)})),this.$http.post("/room/json/isRoomMember",{roomid:this.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&"1"==res_data.msg&&(_this.isRoomMember=!0)}))},methods:{goMgr:function(t){uni.navigateTo({url:"/pages/chat/user/mgr?id="+t})},joinRoom:function(){uni.navigateTo({url:"/pages/addressBook/group/add_verify?uuid="+this.id})},goChat:function(t){uni.navigateTo({url:"/pages/chat/user/index?toid="+t})}}};exports.default=_default},"47ce":function(t,e,i){"use strict";i.r(e);var a=i("82f9"),o=i("946e");for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);var s=i("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"f9425000",null,!1,a["a"],void 0);e["default"]=u.exports},"82f9":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-white",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"})],2),i("v-uni-view",{staticStyle:{background:"#fff",display:"flex",height:"220upx"}},[i("v-uni-view",{staticStyle:{width:"150upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:120upx;width:120upx;background-image:url("+t.$store.state.img_url+t.room.img+");"})],1),i("v-uni-view",{staticStyle:{"margin-left":"20upx"}},[i("v-uni-view",{staticStyle:{margin:"auto auto","font-size":"34upx","margin-top":"20upx",height:"34upx","font-weight":"800","margin-left":"20upx"}},[t._v(t._s(t.room.name))]),i("v-uni-view",{staticStyle:{margin:"auto auto","font-size":"28upx","margin-top":"26upx",height:"34upx","margin-left":"20upx",color:"#777"}},[t._v("创建者："+t._s(t.room.ownerName))])],1)],1),t.isRoomMember?i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goChat(t.room.id)}}},[i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center",background:"#fff",height:"100upx","line-height":"100upx"}},[i("v-uni-text",{staticClass:"iconfont icon-icon--",staticStyle:{color:"#485D83","font-size":"50upx",position:"relative",top:"6upx"}}),i("v-uni-text",{staticStyle:{color:"#485D83","font-size":"30upx","font-weight":"800","margin-left":"10upx"}},[t._v("发消息")])],1)],1):i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.joinRoom()}}},[i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center",background:"#fff",height:"100upx","line-height":"100upx"}},[i("v-uni-text",{staticStyle:{color:"#485D83","font-size":"30upx","font-weight":"800","margin-left":"10upx"}},[t._v("申请加入群聊")])],1)],1)],1)},o=[]},"946e":function(t,e,i){"use strict";i.r(e);var a=i("0ab3"),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a}}]);