(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-sss_list"],{"04c8":function(t,e,i){"use strict";i.r(e);var s=i("be99"),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},"55c9":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("成员禁言管理")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px",padding:"10upx 40upx","border-radius":"6upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addSss()}}},[t._v("添加禁言")])],1)],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索","confirm-type":"search"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.search_list()}},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}})],1)],1),i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.list1,(function(e,s){return e.id!=t.$store.state.user.id?i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e.headpic+");",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.id)}}}),i("v-uni-view",{staticStyle:{margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",height:"68upx",width:"100upx","word-wrap":"break-word","word-break":"normal"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.id)}}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"0upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.removeMember(e.id)}}},[t._v("移除")])],1):t._e()})),t.list.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无禁言成员")])],1):t._e()],2)],1)],1)],1)},n=[]},be99:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("4de4"),__webpack_require__("d3b7"),__webpack_require__("c975"),__webpack_require__("498a"),__webpack_require__("159b"),__webpack_require__("14d9");var _default={data:function(){return{id:"",list:[],list1:[],kw:""}},onShow:function onShow(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/room/json/stopSpeakSingleList",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.list=res_data.body;var temp=_this.list.filter((function(t){if(_this.$store.state.cur_chat_entity.owner_UUID==t.id||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.id)>=0)return!1;var e=uni.getStorageSync(t.id+"_NOTE");return e&&""!=e&&(t.nickName=e),!0}));_this.list1=temp}}))},methods:{addSss:function(){uni.navigateTo({url:"/pages/chat/group/addSss_member_list?room_id="+this.$store.state.cur_chat_entity.id})},search_list:function(){var t=this;this.list1=this.list,""!=this.kw.trim()&&(this.list1=this.list1.filter((function(e){return e.nickName.indexOf(t.kw.trim())>=0})))},goUserDetail:function(t){uni.navigateTo({url:"/pages/chat/user_detail?id="+t+"&room_id="+this.$store.state.cur_chat_entity.id})},removeMember:function removeMember(_id){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"确认此用户恢复发言?",success:function success(res){res.confirm&&_this.$http.post("/room/json/uStopSpeakSingle",{roomid:_this.$store.state.cur_chat_entity.id,uid:_id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){uni.showToast({title:"操作成功",duration:2e3});var nlist=[];_this.list.forEach((function(t){t.id!=_id&&nlist.push(t)}));var nlist1=[];_this.list1.forEach((function(t){t.id!=_id&&nlist1.push(t)})),_this.list=nlist,_this.list1=nlist1}}))}})}}};exports.default=_default},dcad:function(t,e,i){"use strict";i.r(e);var s=i("55c9"),n=i("04c8");for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);var r=i("f0c5"),o=Object(r["a"])(n["default"],s["b"],s["c"],!1,null,"d27de00e",null,!1,s["a"],void 0);e["default"]=o.exports}}]);