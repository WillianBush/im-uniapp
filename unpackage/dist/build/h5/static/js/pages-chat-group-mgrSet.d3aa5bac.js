(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-mgrSet"],{1739:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("498a");var _default={data:function(){return{switchA:!1,switchB:!1,switchC:!1,id:"",showTransferGroupModal:!1,to_member_id:""}},onLoad:function(t){this.id=t.id,this.switchC=1==this.$store.state.cur_chat_entity.stopSpeak,this.switchA=1==this.$store.state.cur_chat_entity.yaoqingAble,this.switchB=1==this.$store.state.cur_chat_entity.yaoqingAuditAble},methods:{goAddRoomMgr:function(){uni.navigateTo({url:"/pages/chat/group/add_room_mgr"})},goRoomMgr:function(){uni.navigateTo({url:"/pages/chat/group/room_mgr"})},yaoqi:function(){uni.navigateTo({url:"/pages/chat/group/yaoqi"})},hideModal:function(){this.showTransferGroupModal=!1},showModal:function(){this.showTransferGroupModal=!0},tousu:function(){},goQrcode:function(){uni.navigateTo({url:"./qrCode"})},transferGroup:function transferGroup(){var _this=this,user=uni.getStorageSync("USER");""!=this.to_member_id.trim()?_this.$http.post("/room/json/transferGroup",{roomid:_this.$store.state.cur_chat_entity.id,toUid:_this.to_member_id.trim()},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",title:"转让成功"}),setTimeout((function(){uni.navigateTo({url:"/pages/index/index"})}),1500)):uni.showToast({icon:"none",title:res_data.msg,duration:2e3})})):uni.showToast({icon:"none",position:"bottom",title:"请填写用户ID"})},dissolveGroup:function dissolveGroup(){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否解散此群组?",success:function success(res){res.confirm&&_this.$http.post("/room/json/dissolve",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?uni.navigateTo({url:"/pages/index/index"}):uni.showToast({title:res_data.msg,duration:2e3})}))}})},outGroup:function outGroup(){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否退出此群组?",success:function success(res){res.confirm&&_this.$http.post("/room/json/out",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?uni.navigateTo({url:"/pages/index/index"}):uni.showToast({title:res_data.msg,duration:2e3})}))}})},edit_pic:function(){uni.navigateTo({url:"/pages/chat/group/upd_pic"})},editGroupNotice:function(){uni.navigateTo({url:"/pages/chat/group/upd_notice"})},editGroupName:function(){uni.navigateTo({url:"/pages/chat/group/upd_name"})},goAddMember:function(){uni.navigateTo({url:"/pages/chat/group/add_member"})},goRemoveMember:function(){uni.navigateTo({url:"/pages/chat/group/member_list_remove"})},lookNotShimingMemberList:function(){uni.navigateTo({url:"/pages/chat/group/not_shiming_member_list"})},lookMemberList:function(){uni.navigateTo({url:"/pages/chat/group/member_list"})},goMsgRecord:function(){uni.navigateTo({url:"/pages/chat/group/message_record"})},clearChatMsg:function(){var t=this,e=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否清空聊天记录?",success:function(i){i.confirm&&(t.$store.state.chatMessageMap.delete(e.id+"#"+t.$store.state.cur_chat_entity.id),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE"),t.$store.commit("setCur_chat_msg_list",[]),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE_LASTCONTENT"),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE_UNREAD"),uni.showToast({title:"清除成功",duration:2e3}))}})},SwitchC:function SwitchC(e){var _this=this;this.switchC=e.detail.value;var stopSpeak=0;e.detail.value&&(stopSpeak=1),_this.$http.post("/room/json/uStopSpeak/v1",{roomid:_this.$store.state.cur_chat_entity.id,stopSpeak:stopSpeak},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.state.cur_chat_entity.stopSpeak=stopSpeak:uni.showToast({title:res_data.msg,duration:2e3})}))},SwitchA:function SwitchA(e){var _this=this;this.switchA=e.detail.value;var v=0;this.switchA&&(v=1),_this.$http.post("/room/json/uCnfSet",{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAble:v},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.state.cur_chat_entity.yaoqingAble=1:uni.showToast({title:res_data.msg,duration:2e3})}))},SwitchB:function SwitchB(e){var _this=this;this.switchB=e.detail.value;var v=0;this.switchB&&(v=1),_this.$http.post("/room/json/uCnfSet",{roomid:_this.$store.state.cur_chat_entity.id,yaoqingAuditAble:v},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.state.cur_chat_entity.yaoqingAuditAble=1:uni.showToast({title:res_data.msg,duration:2e3})}))}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},"228e":function(t,e,i){"use strict";i.r(e);var s=i("1739"),a=i.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(o);e["default"]=a.a},"48f7":function(t,e,i){"use strict";i.r(e);var s=i("f007"),a=i("228e");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);var n=i("f0c5"),c=Object(n["a"])(a["default"],s["b"],s["c"],!1,null,"32405694",null,!1,s["a"],void 0);e["default"]=c.exports},f007:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.$store.state.cur_chat_entity?i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("群设置")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both",width:"96%",margin:"auto auto","margin-top":"10px!important"}},[i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("群禁言")]),i("v-uni-switch",{class:t.switchC?"checked":"",attrs:{checked:!!t.switchC},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.SwitchC.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[t._v("允许群成员邀请好友入群")]),i("v-uni-switch",{class:t.switchA?"checked":"",attrs:{checked:!!t.switchA},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.SwitchA.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"cu-item cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("群聊邀请进群审核验证")]),i("v-uni-switch",{class:t.switchB?"checked":"",attrs:{checked:!!t.switchB},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.SwitchB.apply(void 0,arguments)}}})],1),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item cu-form-group  arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goAddRoomMgr()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("添加群管理")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item cu-form-group arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goRoomMgr()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群管理列表")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item margin-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dissolveGroup()}}},[i("v-uni-view",{staticClass:"content",staticStyle:{"text-align":"center"}},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#FF2442"}},[t._v("解散群组")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item margin-top",staticStyle:{"margin-bottom":"80upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showModal()}}},[i("v-uni-view",{staticClass:"content",staticStyle:{"text-align":"center"}},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#FF2442"}},[t._v("转让群组")])],1)],1):t._e()],1),i("v-uni-view",{staticClass:"cu-modal ",class:t.showTransferGroupModal?"show":""},[i("v-uni-view",{staticClass:"cu-dialog"},[i("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[i("v-uni-view",{staticClass:"content"},[t._v("转让群组")]),i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hideModal.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-close text-red"})],1)],1),i("v-uni-view",{staticClass:"padding-xl"},[i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-input",{attrs:{placeholder:"请填写转入用户ID",name:"input"},model:{value:t.to_member_id,callback:function(e){t.to_member_id=e},expression:"to_member_id"}})],1)],1),i("v-uni-view",{staticClass:"cu-bar bg-white"},[i("v-uni-view",{staticClass:"action margin-0 flex-sub text-green solid-left",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hideModal.apply(void 0,arguments)}}},[t._v("取消")]),i("v-uni-view",{staticClass:"action margin-0 flex-sub  solid-left",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.transferGroup.apply(void 0,arguments)}}},[t._v("转让")])],1)],1)],1)],1):t._e()},a=[]}}]);