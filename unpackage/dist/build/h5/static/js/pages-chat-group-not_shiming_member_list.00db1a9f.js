(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-not_shiming_member_list"],{"0e98":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("498a"),__webpack_require__("4de4"),__webpack_require__("c975");var _default={data:function(){return{id:"",list:[],list1:[],kw:""}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/room/json/getNotShimingMemberList",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body,_this.list.forEach((function(t){var e=uni.getStorageSync(t.id+"_NOTE");e&&""!=e&&(t.nickName=e)})),_this.list1=_this.list)}))},methods:{search_list:function(){var t=this;this.list1=this.list,""!=this.kw.trim()&&(this.list1=this.list1.filter((function(e){return e.nickName.indexOf(t.kw.trim())>=0})))},goUserDetail:function goUserDetail(_id){var _this=this;_this.$http.post("/sysConfig/json/getRoomCfg",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){var flag=!1;0==res_data.body.lookGroupMemberDetailForRole?flag=!0:1==res_data.body.lookGroupMemberDetailForRole?_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID&&(flag=!0):2==res_data.body.lookGroupMemberDetailForRole&&(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user.id)>=0)&&(flag=!0),flag&&uni.navigateTo({url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id})}}))}}};exports.default=_default},"2fb6":function(t,e,i){"use strict";i.r(e);var a=i("884e"),s=i("7cc5");for(var r in s)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(r);var n=i("f0c5"),o=Object(n["a"])(s["default"],a["b"],a["c"],!1,null,"12f8254e",null,!1,a["a"],void 0);e["default"]=o.exports},"7cc5":function(t,e,i){"use strict";i.r(e);var a=i("0e98"),s=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=s.a},"884e":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("未实名群组成员("+t._s(t.list.length)+"人)")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索","confirm-type":"search"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.search_list()}},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}})],1)],1),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},t._l(t.list1,(function(e,a){return i("v-uni-view",{staticStyle:{display:"inline-block",width:"20%","margin-bottom":"20upx","text-align":"center"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.id)}}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e.headpic+");"}),i("v-uni-view",{staticStyle:{height:"34upx",margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",width:"100upx"}},[t._v(t._s(e.nickName))])],1)})),1)],1)],1)],1)},s=[]}}]);