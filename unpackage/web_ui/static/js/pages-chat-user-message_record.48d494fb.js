(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-user-message_record"],{"7d5d":function(t,e,i){"use strict";i.r(e);var a=i("8008"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},8008:function(t,e,i){"use strict";(function(t){i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("e9c4");var n=a(i("a6b6")),s=a(i("061a")),o=(uni.createInnerAudioContext(),{components:{uParse:n.default,openRed:s.default},data:function(){return{list:[],player:null,selVoiceIndex:-1,domHeight:0,c_type:1,InputBottom:0,toid:"",entity:{},txt:"",temp_txt:"",showjia:!0,emotion:1,showItem:0,scrollTop:0,style:{pageHeight:0,contentViewHeight:0,footViewHeight:90,mitemHeight:0},sendCount:0,RECORDER:"",AUDIO:uni.createInnerAudioContext(),recordTimer:null,recordLength:0,voicePath:"",isRecord:!1,intervalTime:0,timer:null,v_base64:"",winSize:{},showShade:!1,showPop:!1,popButton:["复制","转发","收藏","删除","撤消"],popButtonStore:["复制","转发","收藏","删除","撤消"],popStyle:"",pickerUserIndex:-1,temp_content:"",temp_uuid:"",chatCfg:{},temp_bean:null,showOpenRed:!1,showname:""}},onLoad:function(t){var e=uni.getStorageSync("USER"),i=uni.getStorageSync(e.id+"#"+this.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE");if(i&&""!=i){var a=JSON.parse(i);this.list=a}setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),50)},methods:{getPopButton:function(t){return"复制"==t?"icon-fuzhi":"转发"==t?"icon-zhuanfa":"收藏"==t?"icon-collection-b":"删除"==t?"icon-shanchu":"撤消"==t?"icon-shangjiachexiaoshenqingrenzhengliebiao":""},clickCard:function(t){this.goUserDetail(t.muuid)},sendCard:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/card/sendCard"}),this.$store.state.temp.bean=this.entity,this.$store.state.temp.bean.name=this.entity.nickName,this.$store.state.temp.bean.img=this.entity.headpic},goTransfer:function(){this.$store.state.temp.bean=this.entity,uni.navigateTo({url:"/pages/chat/transfer/transfer"}),this.showPop=!1,this.showItem=0,this.InputBottom=0},openRedDetail:function(){this.showOpenRed=!1,uni.navigateTo({url:"/pages/chat/red/red_detail"})},hideOpenRed:function(){this.showOpenRed=!1},clickHongbao:function(t){var e=uni.getStorageSync("USER"),i=uni.getStorageSync(e.id+"_RED_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[t.redUUID],a[t.redUUID]&&(t=a[t.redUUID])}this.temp_bean=t,this.showOpenRed=!0,this.$store.state.temp.bean=this.temp_bean},clickTransfer:function(t){var e=uni.getStorageSync("USER"),i=uni.getStorageSync(e.id+"_TRANSFER_MUST_UPDATE_MAP");if(i&&""!=i){var a=JSON.parse(i);this.temp_bean=a[t.utid],a[t.utid]&&(t=a[t.utid])}this.temp_bean=t,this.$store.state.temp.bean=this.temp_bean,uni.navigateTo({url:"../transfer/transfer_receive"})},sendRed:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0,uni.navigateTo({url:"/pages/chat/red/sendRed?chatType=user&toid="+this.entity.id})},goFavourite:function(){uni.navigateTo({url:"/pages/mine/favourite_list"})},clickChat:function(){this.showPop=!1,this.showItem=0,this.InputBottom=0},scrollToBottom:function(){setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),100)},clickVoice:function(t,e){var i=this;if(this.selVoiceIndex==e)return this.selVoiceIndex=-1,void(this.player&&this.player.stop());this.selVoiceIndex=e,this.player=plus.audio.createPlayer(t),this.player.play((function(){i.selVoiceIndex=-1}),(function(t){}))},getWindowSize:function(){var t=this;uni.getSystemInfo({success:function(e){t.winSize={witdh:e.windowWidth,height:e.windowHeight}}})},goUserDetail:function(t){uni.navigateTo({url:"/pages/chat/user_detail?id="+t})},goMgr:function(t){uni.navigateTo({url:"/pages/chat/user/mgr?id="+t})},send:function(){var t={txt:this.txt,toUid:this.toid,fromUid:this.$store.state.user.id};this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(t)+"',CMD:'USER_CHAT_SEND_TXT'}")},InputFocus:function(t){this.InputBottom=t.detail.height},InputBlur:function(t){this.InputBottom=0}}});e.default=o}).call(this,i("5a52")["default"])},ecb9:function(t,e,i){"use strict";i.r(e);var a=i("ed7b"),n=i("7d5d");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);var o=i("f0c5"),u=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"0c234ae0",null,!1,a["a"],void 0);e["default"]=u.exports},ed7b:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={uParse:i("a6b6").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("历史聊天记录")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-chat"},[t.list.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa","margin-top":"60upx","font-size":"28upx"}},[t._v("暂无聊天记录")]):t._e(),t._l(t.$store.state.cur_chat_msg_list,(function(e,a){return[e.opt&&"undo"==e.opt?[i("v-uni-view",{staticStyle:{display:"none"}})]:"SYS_TXT"==e.type?[i("v-uni-view",{staticClass:"cu-info round"},[i("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1)]:"USER_CARD"==e.type?[e.bean.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickCard(e.bean)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+t.$store.state.img_url+e.bean.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.bean.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[t._v("ID："+t._s(e.bean.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[t._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.bean.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.bean.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{border:"1px solid #eee","background-color":"#fff",width:"400upx",height:"180upx","border-radius":"6px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickCard(e.bean)}}},[i("v-uni-view",{staticStyle:{height:"130upx","border-bottom":"1px solid #eee",width:"90%",margin:"auto auto",display:"flex"}},[i("v-uni-view",{staticClass:"cu-avatar radius",staticStyle:{width:"80upx","margin-top":"26upx",height:"80upx"},style:"background-image:url("+t.$store.state.img_url+e.bean.mheadpic+");"}),i("v-uni-view",{staticStyle:{width:"240upx","margin-top":"30upx","margin-left":"12upx","text-align":"left"}},[i("v-uni-view",{staticStyle:{overflow:"hidden","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.bean.mname))]),i("v-uni-view",{staticStyle:{color:"#bbb","font-size":"24upx","margin-top":"8upx"}},[t._v("ID："+t._s(e.bean.mid))])],1)],1),i("v-uni-view",{staticStyle:{height:"50upx","line-height":"50upx","text-align":"left","font-size":"23upx","padding-left":"20upx",color:"#777"}},[t._v("个人名片")])],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.bean.date))])],1)]:"USER_TRANSFER"==e.type?[e.bean.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:e.bean.status&&1==e.bean.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickTransfer(e.bean)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:e.bean.status&&1==e.bean.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[e.bean.status&&1==e.bean.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("已收款")]):e.bean.status&&2==e.bean.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.bean.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[t._v("¥"+t._s(e.bean.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.bean.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.bean.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FC9105",width:"380upx",height:"150upx","border-radius":"6px"},style:e.bean.status&&1==e.bean.status?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickTransfer(e.bean)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont ",class:e.bean.status&&1==e.bean.status?"icon-chenggong1":"icon-zhuanzhang",staticStyle:{"font-size":"68upx",color:"#f6f6f6"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[e.bean.status&&1==e.bean.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("已收钱")]):e.bean.status&&2==e.bean.status?i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v("转账已过期")]):i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"30upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx","word-break":"keep-all","text-overflow":"ellipsis"}},[t._v(t._s(e.bean.descri))]),i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"4upx","margin-left":"20upx","font-size":"32upx"}},[t._v("¥"+t._s(e.bean.money))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.bean.date))])],1)]:"USER_RED"==e.type?[e.bean.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:e.bean.opened&&1==e.bean.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickHongbao(e.bean)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v(t._s(e.bean.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.bean.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.bean.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticStyle:{"background-color":"#FF3A36",width:"380upx",height:"150upx","border-radius":"6px"},style:e.bean.opened&&1==e.bean.opened?"opacity: .6;":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickHongbao(e.bean)}}},[i("v-uni-view",{staticStyle:{float:"left",height:"150upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-top":"40upx","margin-left":"20upx"}},[i("v-uni-text",{staticClass:"iconfont icon-lingquhongbao",staticStyle:{"font-size":"64upx",color:"#FCBF00"}},[i("span")])],1),i("v-uni-view",{staticStyle:{float:"left"}},[i("v-uni-view",{staticStyle:{"text-align":"left",color:"#f6f6f6","margin-top":"52upx","margin-left":"20upx","font-size":"28upx",overflow:"hidden",width:"250upx",height:"44upx"}},[t._v(t._s(e.bean.descri))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.bean.date))])],1)]:[e.bean.fromUid==t.$store.state.user.id?i("v-uni-view",{staticClass:"cu-item self"},[i("v-uni-view",{staticClass:"main"},[0==e.bean.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[t._v("未读")]):t._e(),1==e.bean.read?i("v-uni-view",{staticStyle:{"margin-right":"30upx",color:"#999","font-size":"24upx"}},[t._v("已读")]):t._e(),i("v-uni-view",{staticClass:"content bg-green shadow",staticStyle:{"background-color":"#98E165",color:"#222"}},["uparse"==e.bean.psr?i("u-parse",{attrs:{content:e.bean.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.bean.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickVoice(e.bean.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.bean.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative","text-align":"left",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.bean.sub_txt)+'"')])],1):"video"==e.bean.psr?i("v-uni-video",{attrs:{direction:"0",src:t.$store.state.img_url+e.bean.txt}}):i("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1)],1),i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");"}),i("v-uni-view",{staticClass:"date"},[t._v(t._s(e.bean.date))])],1):i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.$store.state.img_url+e.bean.fromHeadpic+");",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.bean.fromUid)}}}),i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"content shadow",staticStyle:{color:"#222"}},["uparse"==e.bean.psr?i("u-parse",{attrs:{content:e.bean.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.bean.psr?i("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickVoice(e.bean.txt,a)}}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=a,expression:"selVoiceIndex != index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.bean.sub_txt)+'"')]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"0","line-height":"38upx"}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==a,expression:"selVoiceIndex == index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.bean.sub_txt)+'"')])],1):"video"==e.bean.psr?i("v-uni-video",{attrs:{direction:"0",src:t.$store.state.img_url+e.bean.txt}}):i("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1)],1),i("v-uni-view",{staticClass:"date "},[t._v(t._s(e.bean.date))])],1)]]}))],2),i("openRed",{directives:[{name:"show",rawName:"v-show",value:t.showOpenRed,expression:"showOpenRed"}],on:{hide:function(e){arguments[0]=e=t.$handleEvent(e),t.hideOpenRed.apply(void 0,arguments)},openRedDetail:function(e){arguments[0]=e=t.$handleEvent(e),t.openRedDetail.apply(void 0,arguments)}}})],1)},s=[]}}]);
