(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-new_friend-new_friend_list"],{2395:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.content[data-v-26522b94]{clear:both}.indexes[data-v-26522b94]{position:relative}.indexBar[data-v-26522b94]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-26522b94]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-26522b94]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-26522b94]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-26522b94]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-26522b94]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-26522b94]{color:#333}',""]),t.exports=e},"3ba2":function(t,e,i){"use strict";i.r(e);var a=i("ab97"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},"3dc0":function(t,e,i){"use strict";i.r(e);var a=i("a15a"),s=i("3ba2");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);i("7fca");var o,r=i("f0c5"),u=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"26522b94",null,!1,a["a"],o);e["default"]=u.exports},"7fca":function(t,e,i){"use strict";var a=i("bcb3"),s=i.n(a);s.a},a15a:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("新的好友")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSearchFriend()}}},[t._v("添加朋友")])],1)],2),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx)"}],attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t.list.length>0?i("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{"margin-top":"10px",padding:"20upx 0",background:"#fff"}},t._l(t.list,(function(e){return i("v-uni-view",{staticClass:"cu-item"},[e.from_member_uuid==t.$store.state.user.id?i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.to_headpic+")"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(e.to_name))]),"wait"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("等待确认")]):t._e(),"success"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已添加")]):t._e(),"faile"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已拒绝")]):t._e(),"pass"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已过期")]):t._e()],1):t._e(),e.to_member_uuid==t.$store.state.user.id?i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.from_headpic+")"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(e.from_name))]),"wait"==e.status?i("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.verify(e.id,2)}}},[t._v("拒绝")]):t._e(),"wait"==e.status?i("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx","margin-right":"12upx","background-color":"#07C160",color:"#fff"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.verify(e.id,1)}}},[t._v("通过")]):t._e(),"success"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已添加")]):t._e(),"faile"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已拒绝")]):t._e(),"wait"==e.status?i("v-uni-view",{staticStyle:{clear:"both",padding:"16upx 20px",color:"#999","font-size":"26upx"}},[t._v("验证内容："+t._s(e.content))]):t._e(),"pass"==e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v("已过期")]):t._e()],1):t._e()],1)})),1):i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无好友")])],1)],1)},n=[]},ab97:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("4de4"),__webpack_require__("4160"),__webpack_require__("c975"),__webpack_require__("e25e"),__webpack_require__("498a"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,list:[],kw:"",kw1:""}},onShow:function(){this.initData()},computed:{friend_list:function(){var t=this,e=this.$store.state.friend_list;return""!=this.kw.trim()&&(e=e.filter((function(e){var i=!1;return e.list=e.list.filter((function(e){return e.name.indexOf(t.kw.trim())>=0&&(i=!0,!0)})),i}))),this.list=[],e.forEach((function(e){var i={};i.name=e.h,t.list.push(i)})),e}},onReady:function(){},methods:{initData:function initData(){var _this=this,user=uni.getStorageSync("USER");this.$http.post("/user/friend/add/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.list=res_data.body;var c=0;_this.list.forEach((function(t){"wait"==t.status&&c++})),_this.$store.commit("setUnDoFriendAddCount",c)}}))},verify:function verify(_id,_t){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:2==_t?"拒绝通过":"验证通过",success:function success(res){res.confirm?_this.$http.post("/user/friend/verify/v1",{id:_id,t:_t},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"none",position:"bottom",title:"操作成功"}),_this.$store.commit("setUnDoFriendAddCount",_this.$store.state.unDoFriendAddCount-1),_this.initData(),1==_t&&_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&_this.$store.commit("setFriend_list",res_data.body)}))):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})):res.cancel}})},goSearchFriend:function(){uni.navigateTo({url:"/pages/addressBook/new_friend/search"})},goMyGroup:function(){uni.navigateTo({url:"/pages/addressBook/group/index"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop,a=this;if(e>i){var s=parseInt((e-i)/20);this.listCur=a.list[s].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,i=this.barHeight,a=this.list,s=Math.ceil(a.length*t.detail.y/i),n=0;n<a.length;n++)if(s<n+1)return e.listCur=a[n].name,e.movableY=20*n,!1}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},bcb3:function(t,e,i){var a=i("2395");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("1ccac909",a,!0,{sourceMap:!1,shadowMode:!1})}}]);