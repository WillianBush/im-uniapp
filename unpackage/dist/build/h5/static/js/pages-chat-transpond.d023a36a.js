(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-transpond"],{"0ccb":function(t,e,i){var s=i("50c4"),a=i("1148"),n=i("1d80"),r=Math.ceil,o=function(t){return function(e,i,o){var c,u,d=String(n(e)),l=d.length,h=void 0===o?" ":String(o),f=s(i);return f<=l||""==h?d:(c=f-l,u=a.call(h,r(c/h.length)),u.length>c&&(u=u.slice(0,c)),t?d+u:u+d)}};t.exports={start:o(!1),end:o(!0)}},1148:function(t,e,i){"use strict";var s=i("a691"),a=i("1d80");t.exports="".repeat||function(t){var e=String(a(this)),i="",n=s(t);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(e+=e))1&n&&(i+=e);return i}},"3def":function(t,e,i){"use strict";i.r(e);var s=i("e06a"),a=i("769f");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("8560");var r,o=i("f0c5"),c=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"89af3896",null,!1,s["a"],r);e["default"]=c.exports},"4d90":function(t,e,i){"use strict";var s=i("23e7"),a=i("0ccb").start,n=i("9a0c");s({target:"String",proto:!0,forced:n},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},6516:function(t,e,i){"use strict";(function(t){i("99af"),i("4de4"),i("4160"),i("c975"),i("a434"),i("d3b7"),i("e25e"),i("4d63"),i("ac1f"),i("25f0"),i("4d90"),i("5319"),i("1276"),i("498a"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:""}},onLoad:function(t){},mounted:function(){uni.getStorageSync("USER")},computed:{friend_list:function(){var e=this,i=this,s=this.$store.state.ar_list_show;return t("log",s.length," at pages/chat/transpond.vue:78"),s=s.filter((function(t){if(""!=e.kw.trim()){if("-1"==t.id)return!1;if(t.title.indexOf(i.kw.trim())<0)return!1}else if("-1"==t.id)return!1;return!0})),t("log",s.length," at pages/chat/transpond.vue:94"),s}},onReady:function(){},methods:{sendBaseDo:function(t){t.fromHeadpic=this.$store.state.user.headpic;var e=new Date;t.date=this.dateFormat("Y/m/d H:M",e),t.fromName=this.$store.state.user.nickName,t.dateTime=e.getTime(),t.read=0,t.oldTxt=t.txt,t.simple_content=t.txt;var i={chatType:"2",chatid:this.toid,type:"USER_TXT",bean:t},s=[i],a=uni.getStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE");if(a&&""!=a){var n=JSON.parse(a);if(n=n.concat(s),uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE",JSON.stringify(n)),n.length>50&&n.splice(0,n.length-50),this.$store.commit("updateChatMessageMap",{key:this.$store.state.user.id+"#"+i.chatid,value:n}),this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==t.toUid){this.$store.commit("setCur_chat_msg_list",n);var r={toUid:i.chatid,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'CHAT_MSG_READED'}")}uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE_LASTCONTENT",n[n.length-1].bean.simple_content)}else uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE",JSON.stringify(s)),this.$store.commit("updateChatMessageMap",{key:this.$store.state.user.id+"#"+i.chatid,value:s}),this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==t.toUid&&this.$store.commit("setCur_chat_msg_list",s),uni.setStorageSync(this.$store.state.user.id+"#"+i.chatid+"_CHAT_MESSAGE_LASTCONTENT","");this.$store.commit("setChat_my_loadding",!1)},dateFormat:function(t,e){var i,s={"Y+":e.getFullYear().toString().substring(1,3),"m+":(e.getMonth()+1).toString(),"d+":e.getDate().toString(),"H+":e.getHours().toString(),"M+":e.getMinutes().toString(),"S+":e.getSeconds().toString()};for(var a in s)i=new RegExp("("+a+")").exec(t),i&&(t=t.replace(i[1],1==i[1].length?s[a]:s[a].padStart(i[1].length,"0")));return t},GenerateUUID:function(){for(var t=[],e="0123456789abcdef",i=0;i<36;i++)t[i]=e.substr(Math.floor(16*Math.random()),1);t[14]="4",t[19]=e.substr(3&t[19]|8,1),t[8]=t[13]=t[18]=t[23]="-";var s=t.join("");return s},tijiao:function(){var t=this,e=this;uni.getStorageSync("USER");0!=this.ids.length?(e.ids.forEach((function(i){e.$store.state.ar_list.forEach((function(s){if(i==s.id)if("1"==s.typeid){var a={};if(0==e.$store.state.temp.content.indexOf("[名片USERCARD]#")){var n=e.$store.state.temp.content.split("#");a={muuid:n[4],toGroupid:i,fromUid:t.$store.state.user.id},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(a)+"',CMD:'CHAT_SEND_CARD'}")}else a={txt:e.$store.state.temp.content,toGroupid:i,fromUid:e.$store.state.user.id,uuid:e.GenerateUUID()},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(a)+"',CMD:'GROUP_CHAT_SEND_TXT'}"),e.sendBaseDo(a);e.$http.post("/user/accessRecord/json/saveOrUpdate",{type:1,eid:i},{header:{"x-access-uid":e.$store.state.user.id,"x-access-client":e.$clientType}}).then((function(t){}))}else{var r={};if(0==e.$store.state.temp.content.indexOf("[名片USERCARD]#")){var o=e.$store.state.temp.content.split("#");r={muuid:o[4],toUid:i,fromUid:t.$store.state.user.id},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'CHAT_SEND_CARD'}")}else r={txt:e.$store.state.temp.content,toUid:i,fromUid:e.$store.state.user.id,uuid:e.GenerateUUID()},e.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(r)+"',CMD:'USER_CHAT_SEND_TXT'}"),e.sendBaseDo(r);e.$http.post("/user/accessRecord/json/saveOrUpdate",{type:2,eid:i},{header:{"x-access-uid":e.$store.state.user.id,"x-access-client":e.$clientType}}).then((function(t){}))}}))})),uni.showToast({icon:"success",title:"转发成功",duration:800}),setTimeout((function(){uni.navigateBack()}),800)):uni.showToast({icon:"none",title:"请选择转发对象"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop,s=this;if(e>i){var a=parseInt((e-i)/20);this.listCur=s.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,i=this.barHeight,s=this.list,a=Math.ceil(s.length*t.detail.y/i),n=0;n<s.length;n++)if(a<n+1)return e.listCur=s[n].name,e.movableY=20*n,!1}}};e.default=s}).call(this,i("0de9")["log"])},"769f":function(t,e,i){"use strict";i.r(e);var s=i("6516"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e["default"]=a.a},8560:function(t,e,i){"use strict";var s=i("929b"),a=i.n(s);a.a},"929b":function(t,e,i){var s=i("a5e7");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=i("4f06").default;a("3492588c",s,!0,{sourceMap:!1,shadowMode:!1})},"9a0c":function(t,e,i){var s=i("342f");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(s)},a5e7:function(t,e,i){var s=i("24fb");e=s(!1),e.push([t.i,'uni-checkbox[data-v-89af3896]{float:right}.indexes[data-v-89af3896]{position:relative}.indexBar[data-v-89af3896]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-89af3896]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-89af3896]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-89af3896]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-89af3896]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-89af3896]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-89af3896]{color:#333}',""]),t.exports=e},e06a:function(t,e,i){"use strict";var s;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return s}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("转发")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px",background:"#58BB46",padding:"10upx 40upx","border-radius":"6upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("发送")])],1)],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("搜索")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - "+t.CustomBar+"px)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[i("v-uni-checkbox-group",{staticStyle:{width:"100%"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(t.friend_list,(function(e,s){return i("v-uni-view",{key:s,staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.$store.state.img_url+e.img+")"}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(e.title))]),i("v-uni-checkbox",{staticClass:"round blue ",attrs:{value:e.id}})],1)],1)})),1)],1),t.friend_list.length<=0?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无可转发的对象")]):t._e()],1)],1)},n=[]}}]);