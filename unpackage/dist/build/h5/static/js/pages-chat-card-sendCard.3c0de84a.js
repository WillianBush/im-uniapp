(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-card-sendCard"],{"080f":function(t,e,i){"use strict";i.r(e);var n=i("61d8"),a=i("8a02");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("9d0a");var o,r=i("f0c5"),u=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"4e94841e",null,!1,n["a"],o);e["default"]=u.exports},"2edb":function(module,exports,__webpack_require__){"use strict";(function(console){var _interopRequireDefault=__webpack_require__("4ea4");__webpack_require__("99af"),__webpack_require__("4de4"),__webpack_require__("4160"),__webpack_require__("c975"),__webpack_require__("d3b7"),__webpack_require__("e25e"),__webpack_require__("ac1f"),__webpack_require__("25f0"),__webpack_require__("498a"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _neilModal=_interopRequireDefault(__webpack_require__("89c9")),_default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:"",show:!1,selFriendBean:{}}},onLoad:function(t){t.fid&&""!=t.fid&&(this.fid=t.fid,this.ids.push(t.fid))},mounted:function mounted(){var _this=this,user=uni.getStorageSync("USER");this.$store.state.friend_list.length<=0&&_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setFriend_list",res_data.body),res_data.body.forEach((function(t){var e={};e.name=t.h,_this.list.push(e)})))}))},computed:{friend_list:function(){var t=this,e=[];return e=this.$store.state.friend_list.concat(),e=""!=this.kw.trim()?e.filter((function(e){var i=!1;return e.list.filter((function(e){return"-1"!=e.member_uuid&&(e.name.indexOf(t.kw.trim())>=0&&(i=!0,!0))})),i})):e.filter((function(t){var e=!1;return t.list.filter((function(t){return"-1"!=t.member_uuid&&(e=!0,!0)})),e})),this.list=[],e.forEach((function(e){var i={};i.name=e.h,t.list.push(i)})),e}},onReady:function(){var t=this;uni.createSelectorQuery().select(".indexBar-box").boundingClientRect((function(e){t.boxTop=e.top})).exec(),uni.createSelectorQuery().select(".indexes").boundingClientRect((function(e){t.barTop=e.top})).exec()},methods:{sendConfirm:function(){if(this.$store.state.temp.bean.roomUUID&&""!=this.$store.state.temp.bean.roomUUID){var t={muuid:this.selFriendBean.member_uuid,toGroupid:this.$store.state.temp.bean.id,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(t)+"',CMD:'CHAT_SEND_CARD'}")}else{var e={muuid:this.selFriendBean.member_uuid,toUid:this.$store.state.temp.bean.id,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'CHAT_SEND_CARD'}")}setTimeout((function(){uni.navigateBack(),setTimeout((function(){uni.$emit("scrollTopFn")}),200)}),100)},closeModal:function(){this.show=!1},selFriend:function(t){this.selFriendBean=t,this.show=!0},tijiao:function tijiao(){var _this=this,user=uni.getStorageSync("USER");0!=this.ids.length?_this.$http.post("/room/json/createRoom",{mids:this.ids.toString()},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(_this.$store.state.ar_list.push(res_data.body),uni.showModal({title:"提示",content:"创建成功",showCancel:!1,success:function(t){t.confirm&&uni.navigateTo({url:"/pages/chat/group/index?toid="+res_data.body.id})}})):uni.showToast({icon:"none",title:res_data.msg})})):uni.showToast({icon:"none",title:"请选择好友"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop,n=this;if(e>i){var a=parseInt((e-i)/20);this.listCur=n.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,i=this.barHeight,n=this.list,a=Math.ceil(n.length*t.detail.y/i),s=0;s<n.length;s++)if(a<s+1)return e.listCur=n[s].name,e.movableY=20*s,!1}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},"61d8":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={neilModal:i("89c9").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("选择朋友")])],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - 100upx - 100upx)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t._l(t.friend_list,(function(e,n){return[i("v-uni-view",{key:n+"_0",class:"indexItem-"+e.h,attrs:{id:"indexes-"+e.h,"data-index":e.h}},[i("v-uni-view",{staticClass:"padding"},[t._v(t._s(e.h))]),i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(e.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"cu-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selFriend(e)}}},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.headpic+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(e.name))])],1)],1)})),1)],1)]})),t.friend_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无好友")]):t._e()],2),i("v-uni-view",{staticClass:"indexBar",staticStyle:{bottom:"50upx"},style:[{height:"calc(100vh - "+t.CustomBar+"px - 50px)"}]},[i("v-uni-view",{staticClass:"indexBar-box",on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.tStart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.tEnd.apply(void 0,arguments)},touchmove:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.tMove.apply(void 0,arguments)}}},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"indexBar-item",attrs:{id:n},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.getCur.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.setCur.apply(void 0,arguments)}}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!t.hidden,expression:"!hidden"}],staticClass:"indexToast"},[t._v(t._s(t.listCur))]),i("neil-modal",{attrs:{show:t.show,"confirm-text":"发送","cancel-text":"取消"},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.closeModal.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.sendConfirm.apply(void 0,arguments)}}},[i("v-uni-view",{staticStyle:{"min-height":"90upx",padding:"32upx 24upx"}},[i("v-uni-view",{staticStyle:{"font-weight":"800"}},[t._v("发送给：")]),i("v-uni-view",{staticStyle:{"margin-top":"16upx",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+t.$store.state.temp.bean.img+");"}),i("v-uni-view",{staticStyle:{"margin-left":"20upx","margin-top":"10upx"}},[t._v(t._s(t.$store.state.temp.bean.name))])],1),i("v-uni-view",{staticStyle:{"margin-top":"14upx",clear:"both","font-size":"24upx",color:"#999"}},[t._v("[个人名片] "+t._s(t.selFriendBean.name))])],1)],1)],1)},s=[]},"8a02":function(t,e,i){"use strict";i.r(e);var n=i("2edb"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"9d0a":function(t,e,i){"use strict";var n=i("e6b01"),a=i.n(n);a.a},de39:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'uni-checkbox[data-v-4e94841e]{float:right}.indexes[data-v-4e94841e]{position:relative}.indexBar[data-v-4e94841e]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-4e94841e]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-4e94841e]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-4e94841e]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-4e94841e]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-4e94841e]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-4e94841e]{color:#333}',""]),t.exports=e},e6b01:function(t,e,i){var n=i("de39");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("d9ee18e8",n,!0,{sourceMap:!1,shadowMode:!1})}}]);