(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-transpond"],{"0ccb":function(t,e,i){var s=i("e330"),n=i("50c4"),a=i("577e"),r=i("1148"),o=i("1d80"),c=s(r),d=s("".slice),u=Math.ceil,l=function(t){return function(e,i,s){var r,l,h=a(o(e)),f=n(i),g=h.length,v=void 0===s?" ":a(s);return f<=g||""==v?h:(r=f-g,l=c(v,u(r/v.length)),l.length>r&&(l=d(l,0,r)),t?h+l:l+h)}};t.exports={start:l(!1),end:l(!0)}},1148:function(t,e,i){"use strict";var s=i("5926"),n=i("577e"),a=i("1d80"),r=RangeError;t.exports=function(t){var e=n(a(this)),i="",o=s(t);if(o<0||o==1/0)throw r("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(i+=e);return i}},"19d4":function(t,e,i){var s=i("54b0");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("4f06").default;n("29c09e59",s,!0,{sourceMap:!1,shadowMode:!1})},2239:function(t,e,i){"use strict";var s=i("19d4"),n=i.n(s);n.a},"40ae":function(t,e,i){"use strict";i.r(e);var s=i("62ae"),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},"4d90":function(t,e,i){"use strict";var s=i("23e7"),n=i("0ccb").start,a=i("9a0c");s({target:"String",proto:!0,forced:a},{padStart:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},"54b0":function(t,e,i){var s=i("24fb");e=s(!1),e.push([t.i,'uni-checkbox[data-v-70dbcbd0]{float:right}.indexes[data-v-70dbcbd0]{position:relative}.indexBar[data-v-70dbcbd0]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-70dbcbd0]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-70dbcbd0]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-70dbcbd0]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-70dbcbd0]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-70dbcbd0]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-70dbcbd0]{color:#333}',""]),t.exports=e},"62ae":function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("4de4"),i("d3b7"),i("498a"),i("c975"),i("99af"),i("e9c4"),i("a434"),i("d401"),i("25f0"),i("ac1f"),i("4d63"),i("c607"),i("2c3e"),i("5319"),i("4d90"),i("159b"),i("e25e");var s={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:""}},onLoad:function(t){},mounted:function(){uni.getStorageSync("USER")},computed:{i18n:function(){return this.$t("index")},friend_list:function(){var t=this,e=this,i=this.$store.state.ar_list_show;return i.length,i=i.filter((function(i){if(""!=t.kw.trim()){if("-1"==i.id)return!1;if(i.title.indexOf(e.kw.trim())<0)return!1}else if("-1"==i.id)return!1;return!0})),i.length,i}},onReady:function(){},methods:{sendBaseDo:function(t){t.fromHeadpic=this.$store.state.user.headpic;var e=new Date;t.date=this.dateFormat("Y/m/d H:M",e),t.fromName=this.$store.state.user.nickName,t.dateTime=e.getTime(),t.read=0,t.oldTxt=t.txt,t.simple_content=t.txt;var i={chatType:"2",chatid:this.toid,type:"USER_TXT",bean:t},s=[i],n=uni.getStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE");if(n&&""!=n){var a=JSON.parse(n);if(a=a.concat(s),uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE",JSON.stringify(a)),a.length>50&&a.splice(0,a.length-50),this.$store.commit("updateChatMessageMap",{key:this.$store.state.user.id+"#"+i.chatid,value:a}),this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==t.toUid){this.$store.commit("setCur_chat_msg_list",a);var r={toUid:i.chatid,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'CHAT_MSG_READED'}")}uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE_LASTCONTENT",a[a.length-1].bean.simple_content)}else uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE",JSON.stringify(s)),this.$store.commit("updateChatMessageMap",{key:this.$store.state.user.id+"#"+i.chatid,value:s}),this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==t.toUid&&this.$store.commit("setCur_chat_msg_list",s),uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE_LASTCONTENT","");this.$store.commit("setChat_my_loadding",!1)},dateFormat:function(t,e){var i,s={"Y+":e.getFullYear().toString().substring(1,3),"m+":(e.getMonth()+1).toString(),"d+":e.getDate().toString(),"H+":e.getHours().toString(),"M+":e.getMinutes().toString(),"S+":e.getSeconds().toString()};for(var n in s)i=new RegExp("("+n+")").exec(t),i&&(t=t.replace(i[1],1==i[1].length?s[n]:s[n].padStart(i[1].length,"0")));return t},GenerateUUID:function(){for(var t=[],e=0;e<36;e++)t[e]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);t[14]="4",t[19]="0123456789abcdef".substr(3&t[19]|8,1),t[8]=t[13]=t[18]=t[23]="-";var i=t.join("");return i},tijiao:function(){var t=this,e=this;uni.getStorageSync("USER");0!=this.ids.length?(e.ids.forEach((function(i){e.$store.state.ar_list.forEach((function(s){if(i==s.id)if("1"==s.typeid){var n={};if(0==e.$store.state.temp.content.indexOf("[名片USERCARD]#")){var a=e.$store.state.temp.content.split("#");n={muuid:a[4],toGroupid:i,fromUid:t.$store.state.user.id},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(n)+"',CMD:'CHAT_SEND_CARD'}")}else n={txt:e.$store.state.temp.content,toGroupid:i,fromUid:e.$store.state.user.id,uuid:e.GenerateUUID()},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(n)+"',CMD:'GROUP_CHAT_SEND_TXT'}"),e.sendBaseDo(n);e.$http.post("/user/accessRecord/json/saveOrUpdate",{type:1,eid:i},{header:{"x-access-uid":e.$store.state.user.id,"x-access-client":e.$clientType}}).then((function(t){}))}else{var r={};if(0==e.$store.state.temp.content.indexOf("[名片USERCARD]#")){var o=e.$store.state.temp.content.split("#");r={muuid:o[4],toUid:i,fromUid:t.$store.state.user.id},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'CHAT_SEND_CARD'}")}else r={txt:e.$store.state.temp.content,toUid:i,fromUid:e.$store.state.user.id,uuid:e.GenerateUUID()},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'USER_CHAT_SEND_TXT'}"),e.sendBaseDo(r);e.$http.post("/user/accessRecord/json/saveOrUpdate",{type:2,eid:i},{header:{"x-access-uid":e.$store.state.user.id,"x-access-client":e.$clientType}}).then((function(t){}))}}))})),uni.showToast({icon:"success",title:"转发成功",duration:800}),setTimeout((function(){uni.navigateBack()}),800)):uni.showToast({icon:"none",title:"请选择转发对象"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop;if(e>i){var s=parseInt((e-i)/20);this.listCur=this.list[s].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this.barHeight,i=this.list,s=Math.ceil(i.length*t.detail.y/e),n=0;n<i.length;n++)if(s<n+1)return this.listCur=i[n].name,this.movableY=20*n,!1}}};e.default=s}).call(this,i("5a52")["default"])},"903b":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("转发")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px",background:"#58BB46",padding:"10upx 40upx","border-radius":"6upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("发送")])],1)],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - "+t.CustomBar+"px)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[i("v-uni-checkbox-group",{staticStyle:{width:"100%"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(t.friend_list,(function(e,s){return i("v-uni-view",{key:s,staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.img+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(e.title))]),i("v-uni-checkbox",{staticClass:"round blue ",attrs:{value:e.id}})],1)],1)})),1)],1),t.friend_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无可转发的对象")]):t._e()],1)],1)},n=[]},"9a0c":function(t,e,i){var s=i("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(s)},a92d:function(t,e,i){"use strict";i.r(e);var s=i("903b"),n=i("40ae");for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("2239");var r=i("f0c5"),o=Object(r["a"])(n["default"],s["b"],s["c"],!1,null,"70dbcbd0",null,!1,s["a"],void 0);e["default"]=o.exports}}]);