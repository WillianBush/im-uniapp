(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-new_friend-new_friend_list"],{"0c35":function(t,e,i){"use strict";i.r(e);var a=i("ce87"),n=i("76d2");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("30ef");var s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"0a55c2a2",null,!1,a["a"],void 0);e["default"]=r.exports},"0e46":function(t,e,i){var a=i("6877");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("df8de8b6",a,!0,{sourceMap:!1,shadowMode:!1})},"30ef":function(t,e,i){"use strict";var a=i("0e46"),n=i.n(a);n.a},6877:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.content[data-v-0a55c2a2]{clear:both}.indexes[data-v-0a55c2a2]{position:relative}.indexBar[data-v-0a55c2a2]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-0a55c2a2]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-0a55c2a2]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-0a55c2a2]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-0a55c2a2]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-0a55c2a2]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-0a55c2a2]{color:#333}',""]),t.exports=e},"76d2":function(t,e,i){"use strict";i.r(e);var a=i("f584"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},ce87:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("新的好友")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSearchFriend()}}},[t._v("添加朋友")])],1)],2),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx)"}],attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t.list.length>0?i("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{"margin-top":"10px",padding:"20upx 0",background:"#fff"}},t._l(t.list,(function(e){return i("v-uni-view",{staticClass:"cu-item"},[e.from_member_uuid==t.user.id?i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.imgUrl+e.to_headpic+")"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(e.to_name))]),"0"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("等待确认")]):t._e(),"1"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已添加")]):t._e(),"2"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已拒绝")]):t._e(),"3"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已过期")]):t._e()],1):t._e(),e.to_member_uuid==t.user.id?i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.imgUrl+e.from_headpic+")"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(e.from_name))]),"0"==e.status?i("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.verify(e.id,2)}}},[t._v("拒绝")]):t._e(),"0"==e.status?i("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx","margin-right":"12upx","background-color":"#07C160",color:"#fff"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.verify(e.id,1)}}},[t._v("通过")]):t._e(),"success"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已添加")]):t._e(),"faile"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已拒绝")]):t._e(),"0"==e.status?i("v-uni-view",{staticStyle:{clear:"both",padding:"16upx 20px",color:"#999","font-size":"26upx"}},[t._v("验证内容："+t._s(e.content))]):t._e(),"3"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已过期")]):t._e()],1):t._e()],1)})),1):i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无好友")])],1)],1)},n=[]},f584:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("498a"),__webpack_require__("4de4"),__webpack_require__("d3b7"),__webpack_require__("c975"),__webpack_require__("159b"),__webpack_require__("14d9"),__webpack_require__("e25e");var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,list:[],kw:"",kw1:""}},onShow:function(){this.initData()},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)((0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("user",["user","friendList","unDoFriendAddCount"])),(0,_vuex.mapState)("app",["imgUrl","reqUrl"])),{},{friend_list:function(){var t=this,e=this.friendList;return""!=this.kw.trim()&&(e=e.filter((function(e){var i=!1;return e.list=e.list.filter((function(e){return e.name.indexOf(t.kw.trim())>=0&&(i=!0,!0)})),i}))),this.list=[],e.forEach((function(e){var i={};i.name=e.h,t.list.push(i)})),e}}),onReady:function(){},methods:(0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapMutations)("user",["setUnDoFriendAddCount","setFriendList"])),{},{initData:function initData(){var _this=this;(0,_api.newFriendList)().then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.list=res_data.body;var c=0;_this.list.forEach((function(t){"0"==t.status&&c++})),_this.setUnDoFriendAddCount(c)}})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))},verify:function verify(_id,_t){var _this=this;uni.showModal({title:"请确认",content:2==_t?"拒绝通过":"验证通过",success:function success(res){res.confirm?(0,_api.verifyFriend)({id:_id,t:_t}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"none",position:"bottom",title:"操作成功"}),_this.setUnDoFriendAddCount(_this.unDoFriendAddCount-1),_this.initData(),1==_t&&(0,_api.friendList)().then((function(res){var res_data=eval(res.data);200==res_data.code&&_this.setFriendList(res_data.body)}))):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})})):res.cancel&&console.log("用户点击取消")}})},goSearchFriend:function(){uni.navigateTo({url:"/pages/addressBook/new_friend/search"})},goMyGroup:function(){uni.navigateTo({url:"/pages/addressBook/group/index"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop;if(e>i){var a=parseInt((e-i)/20);this.listCur=this.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this.barHeight,i=this.list,a=Math.ceil(i.length*t.detail.y/e),n=0;n<i.length;n++)if(a<n+1)return this.listCur=i[n].name,this.movableY=20*n,!1}})};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])}}]);