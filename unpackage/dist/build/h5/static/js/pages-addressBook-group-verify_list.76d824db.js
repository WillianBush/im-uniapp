(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-group-verify_list"],{"226a":function(t,i,e){"use strict";e.r(i);var a=e("6489"),n=e("3cf8");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("7d86");var s=e("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"2c394c67",null,!1,a["a"],void 0);i["default"]=r.exports},"3cf8":function(t,i,e){"use strict";e.r(i);var a=e("c6cb"),n=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},"4da5":function(t,i,e){var a=e("bd6a");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("3354ddfd",a,!0,{sourceMap:!1,shadowMode:!1})},6489:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[e("template",{attrs:{slot:"backText"},slot:"backText"}),e("template",{attrs:{slot:"content"},slot:"content"},[t._v("他人申请入群")])],2),e("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx)"}],attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t.list.length>0?e("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{padding:"20upx 0"}},[t._l(t.list,(function(i){return[e("v-uni-view",{staticClass:"cu-item",staticStyle:{display:"block",background:"#fff",height:"120upx","padding-top":"20upx"}},[e("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+i.user_img+")"}}),e("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(i.user_name))]),e("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.verify(i.id,2)}}},[t._v("拒绝")]),e("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx","margin-right":"12upx","background-color":"#07C160",color:"#fff"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.verify(i.id,1)}}},[t._v("通过")])],1),e("v-uni-view",{staticStyle:{clear:"both",padding:"16upx 20px",color:"#999","font-size":"26upx",background:"#fff"}},[t._v("申请加入群组："+t._s(i.room_name)),e("v-uni-text",{staticStyle:{float:"right"}},[t._v(t._s(i.date))])],1),e("v-uni-view",{staticClass:"margin-bottom",staticStyle:{clear:"both",padding:"16upx 20px",color:"#999","font-size":"26upx",background:"#fff","padding-bottom":"30upx"}},[t._v("验证内容："+t._s(i.txt))])]}))],2):e("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无申请信息")])],1)],1)},n=[]},"7d86":function(t,i,e){"use strict";var a=e("4da5"),n=e.n(a);n.a},bd6a:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'.content[data-v-2c394c67]{clear:both}.indexes[data-v-2c394c67]{position:relative}.indexBar[data-v-2c394c67]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-2c394c67]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-2c394c67]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-2c394c67]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-2c394c67]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-2c394c67]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-2c394c67]{color:#333}',""]),t.exports=i},c6cb:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("e25e");var _default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,list:[],kw:"",kw1:""}},onShow:function(){this.initData()},onReady:function(){},computed:{i18n:function(){return this.$t("index")}},methods:{initData:function initData(){var _this=this,user=uni.getStorageSync("USER");this.$http.post("/room/json/verify_list",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)}))},verify:function verify(_id,_t){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:2==_t?"拒绝通过":"验证通过",success:function success(r){r.confirm?_this.$http.post("/room/json/verifyDo",{raid:_id,t:_t},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"none",position:"bottom",title:"操作成功"}),_this.$store.commit("setUnDoRoomAddCount",_this.$store.state.unDoRoomAddCount-1),_this.initData(),1==_t&&(_this.$store.state.ar_list.forEach((function(t){t.id!=res_data.body.id||(t.img=res_data.body.img)})),_this.$store.state.ar_list_show.forEach((function(t){t.id!=res_data.body.id||(t.img=res_data.body.img)})))):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})})):res.cancel}})},goSearchFriend:function(){uni.navigateTo({url:"/pages/addressBook/new_friend/search"})},goMyGroup:function(){uni.navigateTo({url:"/pages/addressBook/group/index"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var i=t.touches[0].clientY,e=this.boxTop;if(i>e){var a=parseInt((i-e)/20);this.listCur=this.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var i=this.barHeight,e=this.list,a=Math.ceil(e.length*t.detail.y/i),n=0;n<e.length;n++)if(a<n+1)return this.listCur=e[n].name,this.movableY=20*n,!1}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])}}]);