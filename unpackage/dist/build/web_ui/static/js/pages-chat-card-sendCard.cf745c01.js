(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-card-sendCard"],{"0ef8":function(t,e,i){"use strict";i.r(e);var n=i("312d0"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"1dcf":function(t,e,i){"use strict";var n=i("3ce5"),a=i.n(n);a.a},"262e":function(module,exports,__webpack_require__){"use strict";(function(__f__){var _interopRequireDefault=__webpack_require__("4ea4");__webpack_require__("99af"),__webpack_require__("4de4"),__webpack_require__("4160"),__webpack_require__("c975"),__webpack_require__("d3b7"),__webpack_require__("e25e"),__webpack_require__("ac1f"),__webpack_require__("25f0"),__webpack_require__("498a"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _neilModal=_interopRequireDefault(__webpack_require__("dc45")),_default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:"",show:!1,selFriendBean:{}}},onLoad:function(t){t.fid&&""!=t.fid&&(this.fid=t.fid,this.ids.push(t.fid))},mounted:function mounted(){var _this=this,user=uni.getStorageSync("USER");this.$store.state.friend_list.length<=0&&(__f__("log","进来了"," at pages/chat/card/sendCard.vue:110"),_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setFriend_list",res_data.body),res_data.body.forEach((function(t){var e={};e.name=t.h,_this.list.push(e)})))})))},computed:{friend_list:function(){var t=this,e=[];return e=this.$store.state.friend_list.concat(),e=""!=this.kw.trim()?e.filter((function(e){var i=!1;return e.list.filter((function(e){return"-1"!=e.member_uuid&&(e.name.indexOf(t.kw.trim())>=0&&(i=!0,!0))})),i})):e.filter((function(t){var e=!1;return t.list.filter((function(t){return"-1"!=t.member_uuid&&(e=!0,!0)})),e})),this.list=[],e.forEach((function(e){var i={};i.name=e.h,t.list.push(i)})),e}},onReady:function(){var t=this;uni.createSelectorQuery().select(".indexBar-box").boundingClientRect((function(e){t.boxTop=e.top})).exec(),uni.createSelectorQuery().select(".indexes").boundingClientRect((function(e){t.barTop=e.top})).exec()},methods:{sendConfirm:function(){if(this.$store.state.temp.bean.roomUUID&&""!=this.$store.state.temp.bean.roomUUID){var t={muuid:this.selFriendBean.member_uuid,toGroupid:this.$store.state.temp.bean.id,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(t)+"',CMD:'CHAT_SEND_CARD'}")}else{var e={muuid:this.selFriendBean.member_uuid,toUid:this.$store.state.temp.bean.id,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'CHAT_SEND_CARD'}")}setTimeout((function(){uni.navigateBack(),setTimeout((function(){uni.$emit("scrollTopFn")}),200)}),100)},closeModal:function(){this.show=!1},selFriend:function(t){__f__("log",t," at pages/chat/card/sendCard.vue:256"),this.selFriendBean=t,this.show=!0},tijiao:function tijiao(){var _this=this,user=uni.getStorageSync("USER");0!=this.ids.length?_this.$http.post("/room/json/createRoom",{mids:this.ids.toString()},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(_this.$store.state.ar_list.push(res_data.body),uni.showModal({title:"提示",content:"创建成功",showCancel:!1,success:function(t){t.confirm&&uni.navigateTo({url:"/pages/chat/group/index?toid="+res_data.body.id})}})):uni.showToast({icon:"none",title:res_data.msg})})):uni.showToast({icon:"none",title:"请选择好友"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop,n=this;if(e>i){var a=parseInt((e-i)/20);this.listCur=n.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,i=this.barHeight,n=this.list,a=Math.ceil(n.length*t.detail.y/i),o=0;o<n.length;o++)if(a<o+1)return e.listCur=n[o].name,e.movableY=20*o,!1}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])},"2c22":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.neil-modal[data-v-4237bf8c]{position:fixed;visibility:hidden;width:100%;height:100%;top:0;left:0;z-index:1000;transition:visibility .2s ease-in}.neil-modal.neil-modal--show[data-v-4237bf8c]{visibility:visible}.neil-modal__header[data-v-4237bf8c]{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:%?18?% %?24?%;line-height:1.5;color:#333;font-size:%?32?%;text-align:center}.neil-modal__header[data-v-4237bf8c]::after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.neil-modal__container[data-v-4237bf8c]{position:absolute;z-index:999;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;width:%?540?%;border-radius:%?20?%;background-color:#fff;overflow:hidden;opacity:0;transition:opacity .2s ease-in}.neil-modal__content[data-v-4237bf8c]{position:relative;color:#333;font-size:%?28?%;box-sizing:border-box;line-height:1.5}.neil-modal__content[data-v-4237bf8c]::after{content:" ";position:absolute;left:0;bottom:-1px;right:0;height:1px;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.neil-modal__footer[data-v-4237bf8c]{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:%?32?%;display:flex;flex-direction:row}.neil-modal__footer-left[data-v-4237bf8c], .neil-modal__footer-right[data-v-4237bf8c]{position:relative;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:%?88?%;font-size:%?28?%;line-height:%?88?%;text-align:center;background-color:#fff;color:#333}.neil-modal__footer-right[data-v-4237bf8c]{color:#007aff}.neil-modal__footer-left[data-v-4237bf8c]::after{content:" ";position:absolute;right:-1px;top:0;width:1px;bottom:0;border-right:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.neil-modal__footer-hover[data-v-4237bf8c]{background-color:#f1f1f1}.neil-modal__mask[data-v-4237bf8c]{display:block;position:absolute;z-index:998;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);opacity:0;transition:opacity .2s ease-in}.neil-modal__mask.neil-modal--show[data-v-4237bf8c]{opacity:1}.neil-modal--padding[data-v-4237bf8c]{padding:%?32?% %?24?%;min-height:%?90?%}.neil-modal--show .neil-modal__container[data-v-4237bf8c], .neil-modal--show .neil-modal__mask[data-v-4237bf8c]{opacity:1}',""]),t.exports=e},"2e0d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"neil-modal",class:{"neil-modal--show":t.isOpen},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.bindTouchmove.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"neil-modal__mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickMask.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"neil-modal__container"},[t.title.length>0?i("v-uni-view",{staticClass:"neil-modal__header"},[t._v(t._s(t.title))]):t._e(),i("v-uni-view",{staticClass:"neil-modal__content",class:t.content?"neil-modal--padding":"",style:{textAlign:t.align}},[t.content?[i("v-uni-text",{staticClass:"modal-content"},[t._v(t._s(t.content))])]:[t._t("default")]],2),i("v-uni-view",{staticClass:"neil-modal__footer"},[t.showCancel?i("v-uni-view",{staticClass:"neil-modal__footer-left",style:{color:t.cancelColor},attrs:{"hover-class":"neil-modal__footer-hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickLeft.apply(void 0,arguments)}}},[t._v(t._s(t.cancelText))]):t._e(),i("v-uni-view",{staticClass:"neil-modal__footer-right",style:{color:t.confirmColor},attrs:{"hover-class":"neil-modal__footer-hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickRight.apply(void 0,arguments)}}},[t._v(t._s(t.confirmText))])],1)],1)],1)},o=[]},"312d0":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"neil-modal",props:{title:{type:String,default:""},content:String,align:{type:String,default:"left"},cancelText:{type:String,default:"取消"},cancelColor:{type:String,default:"#333333"},confirmText:{type:String,default:"确定"},confirmColor:{type:String,default:"#007aff"},showCancel:{type:[Boolean,String],default:!0},show:{type:[Boolean,String],default:!1},autoClose:{type:[Boolean,String],default:!0}},data:function(){return{isOpen:!1}},watch:{show:function(t){this.isOpen=t}},created:function(){this.isOpen=this.show},methods:{bindTouchmove:function(){},clickLeft:function(){var t=this;setTimeout((function(){t.$emit("cancel")}),200),this.closeModal()},clickRight:function(){var t=this;setTimeout((function(){t.$emit("confirm")}),200),this.closeModal()},clickMask:function(){this.autoClose&&this.closeModal()},closeModal:function(){this.showAnimation=!1,this.isOpen=!1,this.$emit("close")}}};e.default=n},"3ce5":function(t,e,i){var n=i("2c22");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("02e2f62a",n,!0,{sourceMap:!1,shadowMode:!1})},"764e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'uni-checkbox[data-v-64bee25f]{float:right}.indexes[data-v-64bee25f]{position:relative}.indexBar[data-v-64bee25f]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-64bee25f]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-64bee25f]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-64bee25f]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-64bee25f]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-64bee25f]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-64bee25f]{color:#333}',""]),t.exports=e},a942:function(t,e,i){var n=i("764e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("339b513e",n,!0,{sourceMap:!1,shadowMode:!1})},ba05:function(t,e,i){"use strict";i.r(e);var n=i("262e"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},caba:function(t,e,i){"use strict";i.r(e);var n=i("fbe4"),a=i("ba05");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("f5f0");var s,r=i("f0c5"),l=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"64bee25f",null,!1,n["a"],s);e["default"]=l.exports},dc45:function(t,e,i){"use strict";i.r(e);var n=i("2e0d"),a=i("0ef8");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1dcf");var s,r=i("f0c5"),l=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"4237bf8c",null,!1,n["a"],s);e["default"]=l.exports},f5f0:function(t,e,i){"use strict";var n=i("a942"),a=i.n(n);a.a},fbe4:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={neilModal:i("dc45").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("选择朋友")])],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - 100upx - 100upx)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t._l(t.friend_list,(function(e,n){return[i("v-uni-view",{key:n+"_0",class:"indexItem-"+e.h,attrs:{id:"indexes-"+e.h,"data-index":e.h}},[i("v-uni-view",{staticClass:"padding"},[t._v(t._s(e.h))]),i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(e.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"cu-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selFriend(e)}}},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.headpic+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(e.name))])],1)],1)})),1)],1)]})),t.friend_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无好友")]):t._e()],2),i("v-uni-view",{staticClass:"indexBar",staticStyle:{bottom:"50upx"},style:[{height:"calc(100vh - "+t.CustomBar+"px - 50px)"}]},[i("v-uni-view",{staticClass:"indexBar-box",on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.tStart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.tEnd.apply(void 0,arguments)},touchmove:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.tMove.apply(void 0,arguments)}}},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"indexBar-item",attrs:{id:n},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.getCur.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.setCur.apply(void 0,arguments)}}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!t.hidden,expression:"!hidden"}],staticClass:"indexToast"},[t._v(t._s(t.listCur))]),i("neil-modal",{attrs:{show:t.show,"confirm-text":"发送","cancel-text":"取消"},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.closeModal.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.sendConfirm.apply(void 0,arguments)}}},[i("v-uni-view",{staticStyle:{"min-height":"90upx",padding:"32upx 24upx"}},[i("v-uni-view",{staticStyle:{"font-weight":"800"}},[t._v("发送给：")]),i("v-uni-view",{staticStyle:{"margin-top":"16upx",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+t.$store.state.temp.bean.img+");"}),i("v-uni-view",{staticStyle:{"margin-left":"20upx","margin-top":"10upx"}},[t._v(t._s(t.$store.state.temp.bean.name))])],1),i("v-uni-view",{staticStyle:{"margin-top":"14upx",clear:"both","font-size":"24upx",color:"#999"}},[t._v("[个人名片] "+t._s(t.selFriendBean.name))])],1)],1)],1)},o=[]}}]);