(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-yaoqi"],{3322:function(t,e,i){"use strict";var a=i("4919"),n=i.n(a);n.a},4228:function(t,e,i){"use strict";i.r(e);var a=i("bc03"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},4919:function(t,e,i){var a=i("8d02");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("01dc6ddc",a,!0,{sourceMap:!1,shadowMode:!1})},"8d02":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'uni-checkbox[data-v-12b5462d]{float:right}.indexes[data-v-12b5462d]{position:relative}.indexBar[data-v-12b5462d]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-12b5462d]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-12b5462d]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-12b5462d]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-12b5462d]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-12b5462d]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-12b5462d]{color:#333}',""]),t.exports=e},bc03:function(module,exports,__webpack_require__){"use strict";(function(__f__){__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("14d9"),__webpack_require__("99af"),__webpack_require__("498a"),__webpack_require__("4de4"),__webpack_require__("c975"),__webpack_require__("e25e");var _default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:""}},onLoad:function(t){},mounted:function mounted(){var _this=this,user=uni.getStorageSync("USER");this.$store.state.friend_list.length<=0&&(__f__("log","进来了"," at pages/chat/group/yaoqi.vue:88"),_this.$http.post("/user/friend/list/v1",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.$store.commit("setFriend_list",res_data.body),res_data.body.forEach((function(t){var e={};e.name=t.h,_this.list.push(e)})))})))},computed:{friend_list:function(){var t=this,e=[];return e=this.$store.state.friend_list.concat(),e=""!=this.kw.trim()?e.filter((function(e){var i=!1;return e.list=e.list.filter((function(e){return"-1"!=e.member_uuid&&(!(t.$store.state.cur_chat_entity.member_ids.indexOf(e.member_uuid+"#")>=0)&&(e.name.indexOf(t.kw.trim())>=0&&(i=!0,!0)))})),i})):e.filter((function(e){var i=!1;return e.list=e.list.filter((function(e){return"-1"!=e.member_uuid&&(!(t.$store.state.cur_chat_entity.member_ids.indexOf(e.member_uuid+"#")>=0)&&(i=!0,!0))})),i})),this.list=[],e.forEach((function(e){var i={};i.name=e.h,t.list.push(i)})),e}},onReady:function(){},methods:{GenerateUUID:function(){for(var t=[],e=0;e<36;e++)t[e]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);t[14]="4",t[19]="0123456789abcdef".substr(3&t[19]|8,1),t[8]=t[13]=t[18]=t[23]="-";var i=t.join("");return i},tijiao:function tijiao(){var _this=this,user=uni.getStorageSync("USER");if(0!=this.ids.length){__f__("log",this.ids," at pages/chat/group/yaoqi.vue:221");var ss=_this.$store.state.temp.content.split("#"),v={roomid:_this.$store.state.cur_chat_entity.roomUUID,uids:_this.ids,fromUid:_this.$store.state.user.id};_this.$http.post("/room/json/yaoqiJoinRoom",v,{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",title:"操作成功",duration:800}),_this.$store.state.cur_chat_entity=res_data.body):uni.showToast({icon:"none",title:res_data.msg})})),setTimeout((function(){uni.navigateBack()}),800)}else uni.showToast({icon:"none",title:"请选择邀请对象"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop;if(e>i){var a=parseInt((e-i)/20);this.listCur=this.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this.barHeight,i=this.list,a=Math.ceil(i.length*t.detail.y/e),n=0;n<i.length;n++)if(a<n+1)return this.listCur=i[n].name,this.movableY=20*n,!1}}};exports.default=_default}).call(this,__webpack_require__("0de9")["log"])},c7ea:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("邀请加入群组")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px",background:"#58BB46",padding:"10upx 40upx","border-radius":"6upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("邀请")])],1)],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - "+t.CustomBar+"px)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[i("v-uni-checkbox-group",{staticStyle:{width:"100%"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},[t._l(t.friend_list,(function(e,a){return[i("v-uni-view",{key:a+"_0",class:"indexItem-"+e.h,attrs:{id:"indexes-"+e.h,"data-index":e.h}},[i("v-uni-view",{staticClass:"padding"},[t._v(t._s(e.h))]),i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(e.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.headpic+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(e.name))]),i("v-uni-checkbox",{staticClass:"round blue ",attrs:{checked:t.fid==e.member_uuid,value:e.member_uuid}})],1)],1)})),1)],1)]}))],2),t.friend_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无可转发的对象")]):t._e()],1)],1)},n=[]},e912:function(t,e,i){"use strict";i.r(e);var a=i("c7ea"),n=i("4228");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("3322");var r=i("f0c5"),o=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"12b5462d",null,!1,a["a"],void 0);e["default"]=o.exports}}]);