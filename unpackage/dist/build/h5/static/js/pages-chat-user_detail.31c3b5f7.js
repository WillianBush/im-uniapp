(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-user_detail"],{"1a19":function(t,e,i){"use strict";i.r(e);var s=i("2c64"),a=i.n(s);for(var r in s)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(r);e["default"]=a.a},"2c64":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("c975");var _default={data:function(){return{id:"",user:{},isMyFri:!1,room_id:"",groupStopSpeak:!1}},computed:{showGroupStopSpeak:function(){return!(this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.owner_UUID&&(this.$store.state.cur_chat_entity.owner_UUID==this.id||this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(this.id)>=0))&&!!(this.room_id&&""!=this.room_id&&this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.owner_UUID&&(this.$store.state.cur_chat_entity.owner_UUID==this.$store.state.user.id||this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(this.$store.state.user.id)>=0))}},onLoad:function onLoad(e){var _this=this;this.id=e.id,e.room_id&&void 0!=e.room_id&&(this.room_id=e.room_id,_this.$http.post("/room/json/isStopSpeak4User",{roomid:_this.room_id,uid:_this.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?"0"==res_data.msg?_this.groupStopSpeak=!1:_this.groupStopSpeak=!0:uni.showToast({title:res_data.msg,duration:2e3})}))),_this.$http.post("/user/json/loadById/v1",{id:this.id},{header:{"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.user=res_data.body;var s=uni.getStorageSync(_this.user.id+"_NOTE");s&&""!=s&&(_this.user.nickName_real=_this.user.nickName,_this.user.nickName=s)}})),_this.$http.post("/user/friend/isMyFri/v1",{uid:this.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&"1"==res_data.msg&&(_this.isMyFri=!0)}))},methods:{GroupStopSpeak:function GroupStopSpeak(e){var _this=this;this.groupStopSpeak=e.detail.value,_this.$http.post("/room/json/uStopSpeakSingle",{roomid:_this.room_id,uid:_this.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code||uni.showToast({title:res_data.msg,duration:2e3})}))},goMgr:function(t){t?uni.navigateTo({url:"/pages/chat/user/mgr?id="+t}):uni.showToast({icon:"none",title:"操作太快啦，稍作休息。"})},addFriend:function(t){uni.navigateTo({url:"/pages/addressBook/new_friend/add_friend_verify?uuid="+t})},goChat:function(t){uni.navigateTo({url:"/pages/chat/user/index?toid="+t})}}};exports.default=_default},7973:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-white",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"}),t.isMyFri?i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-text",{staticClass:"lg text-gray cuIcon-more",staticStyle:{"font-size":"48upx",color:"#555","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goMgr(t.user.id)}}},[i("span")])],1):t._e()],2),i("v-uni-view",{staticStyle:{background:"#fff",display:"flex",height:"220upx"}},[i("v-uni-view",{staticStyle:{width:"150upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:120upx;width:120upx;background-image:url("+t.$store.state.img_url+t.user.headpic+");"})],1),"-1"!=t.user.id?i("v-uni-view",{staticStyle:{"margin-left":"20upx"}},[i("v-uni-view",{staticStyle:{margin:"auto auto","font-size":"34upx","margin-top":"20upx",height:"34upx","font-weight":"800","margin-left":"20upx"}},[t._v(t._s(t.user.nickName)),t.user.nickName_real&&""!=t.user.nickName_real?i("v-uni-text",{staticStyle:{"font-size":"20upx","font-weight":"400",color:"#999"}},[t._v("("+t._s(t.user.nickName_real)+")")]):t._e()],1),i("v-uni-view",{staticStyle:{margin:"auto auto","font-size":"28upx","margin-top":"26upx",height:"34upx","margin-left":"20upx",color:"#777"}},[t._v("ID号："+t._s(t.user.memberId))])],1):i("v-uni-view",{staticStyle:{"margin-left":"20upx","line-height":"190upx"}},[i("v-uni-view",{staticStyle:{margin:"auto auto","font-size":"34upx",height:"34upx","font-weight":"800","margin-left":"20upx"}},[t._v(t._s(t.user.nickName))])],1)],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showGroupStopSpeak,expression:"showGroupStopSpeak"}],staticClass:"cu-item cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[t._v("禁止在此群发言")]),i("v-uni-switch",{class:t.groupStopSpeak?"checked":"",attrs:{checked:!!t.groupStopSpeak},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.GroupStopSpeak.apply(void 0,arguments)}}})],1),t.user.id!=t.$store.state.user.id?[t.isMyFri?i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goChat(t.user.id)}}},[i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center",background:"#fff",height:"100upx","line-height":"100upx"}},[i("v-uni-text",{staticClass:"iconfont icon-icon--",staticStyle:{color:"#485D83","font-size":"50upx",position:"relative",top:"6upx"}}),i("v-uni-text",{staticStyle:{color:"#485D83","font-size":"30upx","font-weight":"800","margin-left":"10upx"}},[t._v("发消息")])],1)],1):i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addFriend(t.user.id)}}},[i("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center",background:"#fff",height:"100upx","line-height":"100upx"}},[i("v-uni-text",{staticStyle:{color:"#485D83","font-size":"30upx","font-weight":"800","margin-left":"10upx"}},[t._v("添加好友")])],1)],1)]:t._e()],2)},a=[]},ee86:function(t,e,i){"use strict";i.r(e);var s=i("7973"),a=i("1a19");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);var o=i("f0c5"),n=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"a1c0cae2",null,!1,s["a"],void 0);e["default"]=n.exports}}]);