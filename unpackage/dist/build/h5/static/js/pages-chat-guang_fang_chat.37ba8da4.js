(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-guang_fang_chat"],{"0cda":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/**\n * author: Di (微信小程序开发工程师)\n * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)\n *         垂直微信小程序开发交流社区\n *\n * github地址: https://github.com/icindy/wxParse\n *\n * for: 微信小程序富文本解析\n * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184\n */.wxParse[data-v-55ac82fb]{width:100%;font-family:Helvetica,sans-serif;font-size:%?30?%;color:#666;line-height:1.8}.wxParse uni-view[data-v-55ac82fb]{word-break:hyphenate}.wxParse .inline[data-v-55ac82fb]{display:inline;margin:0;padding:0}.wxParse .div[data-v-55ac82fb]{margin:0;padding:0}.wxParse .h1 .text[data-v-55ac82fb]{font-size:2em;margin:.67em 0}.wxParse .h2 .text[data-v-55ac82fb]{font-size:1.5em;margin:.83em 0}.wxParse .h3 .text[data-v-55ac82fb]{font-size:1.17em;margin:1em 0}.wxParse .h4 .text[data-v-55ac82fb]{margin:1.33em 0}.wxParse .h5 .text[data-v-55ac82fb]{font-size:.83em;margin:1.67em 0}.wxParse .h6 .text[data-v-55ac82fb]{font-size:.67em;margin:2.33em 0}.wxParse .h1 .text[data-v-55ac82fb],\n.wxParse .h2 .text[data-v-55ac82fb],\n.wxParse .h3 .text[data-v-55ac82fb],\n.wxParse .h4 .text[data-v-55ac82fb],\n.wxParse .h5 .text[data-v-55ac82fb],\n.wxParse .h6 .text[data-v-55ac82fb],\n.wxParse .b[data-v-55ac82fb],\n.wxParse .strong[data-v-55ac82fb]{font-weight:bolder}.wxParse .p[data-v-55ac82fb]{margin:1em 0}.wxParse .i[data-v-55ac82fb],\n.wxParse .cite[data-v-55ac82fb],\n.wxParse .em[data-v-55ac82fb],\n.wxParse .var[data-v-55ac82fb],\n.wxParse .address[data-v-55ac82fb]{font-style:italic}.wxParse .pre[data-v-55ac82fb],\n.wxParse .tt[data-v-55ac82fb],\n.wxParse .code[data-v-55ac82fb],\n.wxParse .kbd[data-v-55ac82fb],\n.wxParse .samp[data-v-55ac82fb]{font-family:monospace}.wxParse .pre[data-v-55ac82fb]{overflow:auto;background:#f5f5f5;padding:%?16?%;white-space:pre;margin:1em %?0?%}.wxParse .code[data-v-55ac82fb]{display:inline;background:#f5f5f5}.wxParse .big[data-v-55ac82fb]{font-size:1.17em}.wxParse .small[data-v-55ac82fb],\n.wxParse .sub[data-v-55ac82fb],\n.wxParse .sup[data-v-55ac82fb]{font-size:.83em}.wxParse .sub[data-v-55ac82fb]{vertical-align:sub}.wxParse .sup[data-v-55ac82fb]{vertical-align:super}.wxParse .s[data-v-55ac82fb],\n.wxParse .strike[data-v-55ac82fb],\n.wxParse .del[data-v-55ac82fb]{text-decoration:line-through}.wxParse .strong[data-v-55ac82fb],\n.wxParse .s[data-v-55ac82fb]{display:inline}.wxParse .a[data-v-55ac82fb]{color:#00bfff}.wxParse .video[data-v-55ac82fb]{text-align:center;margin:%?22?% 0}.wxParse .video-video[data-v-55ac82fb]{width:100%}.wxParse .img[data-v-55ac82fb]{display:inline-block;width:0;height:0;max-width:100%;overflow:hidden}.wxParse .blockquote[data-v-55ac82fb]{margin:%?10?% 0;padding:%?22?% 0 %?22?% %?22?%;font-family:Courier,Calibri,宋体;background:#f5f5f5;border-left:%?6?% solid #dbdbdb}.wxParse .blockquote .p[data-v-55ac82fb]{margin:0}.wxParse .ul[data-v-55ac82fb], .wxParse .ol[data-v-55ac82fb]{display:block;margin:1em 0;padding-left:%?33?%}.wxParse .ol[data-v-55ac82fb]{list-style-type:disc}.wxParse .ol[data-v-55ac82fb]{list-style-type:decimal}.wxParse .ol>weixin-parse-template[data-v-55ac82fb],.wxParse .ul>weixin-parse-template[data-v-55ac82fb]{display:list-item;align-items:baseline;text-align:match-parent}.wxParse .ol>.li[data-v-55ac82fb],.wxParse .ul>.li[data-v-55ac82fb]{display:list-item;align-items:baseline;text-align:match-parent}.wxParse .ul .ul[data-v-55ac82fb], .wxParse .ol .ul[data-v-55ac82fb]{list-style-type:circle}.wxParse .ol .ol .ul[data-v-55ac82fb], .wxParse .ol .ul .ul[data-v-55ac82fb], .wxParse .ul .ol .ul[data-v-55ac82fb], .wxParse .ul .ul .ul[data-v-55ac82fb]{list-style-type:square}.wxParse .u[data-v-55ac82fb]{text-decoration:underline}.wxParse .hide[data-v-55ac82fb]{display:none}.wxParse .del[data-v-55ac82fb]{display:inline}.wxParse .figure[data-v-55ac82fb]{overflow:hidden}.wxParse .table[data-v-55ac82fb]{width:100%}.wxParse .thead[data-v-55ac82fb], .wxParse .tfoot[data-v-55ac82fb], .wxParse .tr[data-v-55ac82fb]{display:flex;flex-direction:row}.wxParse .tr[data-v-55ac82fb]{width:100%;display:flex;border-right:%?2?% solid #e0e0e0;border-bottom:%?2?% solid #e0e0e0}.wxParse .th[data-v-55ac82fb],\n.wxParse .td[data-v-55ac82fb]{display:flex;width:%?1276?%;overflow:auto;flex:1;padding:%?11?%;border-left:%?2?% solid #e0e0e0}.wxParse .td[data-v-55ac82fb]:last{border-top:%?2?% solid #e0e0e0}.wxParse .th[data-v-55ac82fb]{background:#f0f0f0;border-top:%?2?% solid #e0e0e0}.cu-bar.input[data-v-55ac82fb]{background-color:#f5f5f5}.solid-bottom[data-v-55ac82fb]{background-color:#fff!important;padding-left:%?16?%}.cu-bar.input uni-input[data-v-55ac82fb]{line-height:%?72?%;height:%?72?%;min-height:%?72?%}\n/* 列式弹性盒子 */.flex_col[data-v-55ac82fb]{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;align-items:center;align-content:center}\n/* 弹性盒子弹性容器 */.flex_col .flex_grow[data-v-55ac82fb]{width:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.flex_row .flex_grow[data-v-55ac82fb]{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}\n/* 弹性盒子允许换行 */.flex_col.flex_wrap[data-v-55ac82fb]{-ms-flex-wrap:wrap;flex-wrap:wrap}\n/* 列表 */.list[data-v-55ac82fb]{background-color:#fff;font-size:%?28?%;color:#333;-webkit-user-select:none;user-select:none;touch-callout:none}.list > uni-view[data-v-55ac82fb]{padding:%?24?% %?30?%;position:relative}.list > uni-view[data-v-55ac82fb]:active, .list > uni-view.active[data-v-55ac82fb]{background-color:#f3f3f3}.list > uni-view uni-image[data-v-55ac82fb]{height:%?80?%;width:%?80?%;border-radius:4px;margin-right:%?20?%}.list > uni-view > uni-view[data-v-55ac82fb]{line-height:%?40?%}.list > uni-view > uni-view .time[data-v-55ac82fb],\n.list > uni-view > uni-view .info[data-v-55ac82fb]{color:#999;font-size:%?24?%}.list > uni-view > uni-view .time[data-v-55ac82fb]{width:%?150?%;text-align:right}.list > uni-view > uni-view .info[data-v-55ac82fb]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list > uni-view[data-v-55ac82fb]:not(:first-child){margin-top:1px}.list > uni-view[data-v-55ac82fb]:not(:first-child)::after{content:"";display:block;height:0;border-top:#ccc solid 1px;width:%?620?%;position:absolute;top:-1px;right:0;-webkit-transform:scaleY(.5);transform:scaleY(.5)\n  /* 1px像素 */}\n/* 遮罩 */.shade[data-v-55ac82fb]{position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;-webkit-touch-callout:none}.shade .pop[data-v-55ac82fb]{position:fixed;z-index:101;width:%?180?%;box-sizing:border-box;font-size:%?28?%;text-align:left;color:#333;background-color:#4c4c4c;color:#fff;box-shadow:0 0 5px rgba(0,0,0,.5);line-height:%?80?%;transition:-webkit-transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s;transition:transform .15s ease-in-out 0s,-webkit-transform .15s ease-in-out 0s;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-transform:scale(0);transform:scale(0);border-radius:8px}.shade .pop.show[data-v-55ac82fb]{-webkit-transform:scale(1);transform:scale(1)}.shade .pop > uni-view[data-v-55ac82fb]{padding:0 %?20?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}.shade .pop > uni-view[data-v-55ac82fb]:active{background-color:#f3f3f3}',""]),t.exports=e},2318:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={uParse:a("81b6").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.entity.nickName))]),a("template",{attrs:{slot:"right"},slot:"right"})],2),a("v-uni-view",{staticClass:"cu-chat",style:"padding-bottom: "+(100+t.InputBottom)+"upx;",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickChat()}}},[t._l(t.curChatMsgList,(function(e,i){return[e.bean.fromUid==t.user.id?a("v-uni-view",{staticClass:"cu-item self",attrs:{"data-txt":e.bean.txt},on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.onLongPress.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"main"},[a("v-uni-view",{staticClass:"content bg-green shadow",staticStyle:{"background-color":"#fff",color:"#222",height:"80upx"}},["uparse"==e.bean.psr?a("u-parse",{attrs:{content:e.bean.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.bean.psr?a("v-uni-view",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.clickVoice(e.bean.txt,i)}}},[a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=i,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=i,expression:"selVoiceIndex != index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.bean.sub_txt)+'"')]),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==i,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{float:"left",width:"100upx","font-size":"52upx",position:"relative","text-align":"left",top:"0","line-height":"38upx"}}),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==i,expression:"selVoiceIndex == index"}],staticStyle:{float:"left","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.bean.sub_txt)+'"')])],1):"video"==e.bean.psr?a("v-uni-video",{attrs:{direction:"0",src:t.imgUrl+e.bean.txt}}):a("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1)],1),a("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.imgUrl+e.bean.fromHeadpic+");"}),a("v-uni-view",{staticClass:"date"},[t._v(t._s(e.bean.date))])],1):a("v-uni-view",{staticClass:"cu-item"},[a("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.imgUrl+e.bean.fromHeadpic+");",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.goUserDetail(e.bean.fromUid)}}}),a("v-uni-view",{staticClass:"main"},[a("v-uni-view",{staticClass:"content shadow",staticStyle:{color:"#222"}},["uparse"==e.bean.psr?a("u-parse",{attrs:{content:e.bean.txt},on:{preview:function(e){arguments[0]=e=t.$handleEvent(e),t.preview.apply(void 0,arguments)},navigate:function(e){arguments[0]=e=t.$handleEvent(e),t.navigate.apply(void 0,arguments)}}}):"voice"==e.bean.psr?a("v-uni-view",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.clickVoice(e.bean.txt,i)}}},[a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=i,expression:"selVoiceIndex != index"}],staticClass:"iconfont icon-yuyin1 text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"4upx"}}),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex!=i,expression:"selVoiceIndex != index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"4upx"}},[t._v(t._s(e.bean.sub_txt)+'"')]),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==i,expression:"selVoiceIndex == index"}],staticClass:"iconfont cu-load load-cuIcon loading text-xxl ",staticStyle:{"text-align":"right",float:"right",width:"100upx","font-size":"52upx",position:"relative",top:"0","line-height":"38upx"}}),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.selVoiceIndex==i,expression:"selVoiceIndex == index"}],staticStyle:{float:"right","font-size":"26upx",position:"relative",top:"6upx"}},[t._v(t._s(e.bean.sub_txt)+'"')])],1):"video"==e.bean.psr?a("v-uni-video",{attrs:{direction:"0",src:t.imgUrl+e.bean.txt}}):a("v-uni-rich-text",{attrs:{nodes:e.bean.txt}})],1)],1),a("v-uni-view",{staticClass:"date "},[t._v(t._s(e.bean.date))])],1)]})),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.chatMyLoadding,expression:"chatMyLoadding"}],staticClass:"cu-item self"},[a("v-uni-view",{staticClass:"main"},[a("v-uni-view",{staticClass:"cu-load load-cuIcon loading",staticStyle:{"background-color":"#F1F1F1"}})],1),a("v-uni-view",{staticClass:"cu-avatar radius",style:"background-image:url("+t.imgUrl+t.user.headpic+");"})],1)],2),a("v-uni-view",{staticClass:"cu-bar foot input",style:[{bottom:t.InputBottom+"upx"}]},[a("v-uni-input",{directives:[{name:"show",rawName:"v-show",value:1==t.c_type,expression:"c_type==1"}],staticClass:"solid-bottom",attrs:{"adjust-position":!0,focus:!1,maxlength:"300","cursor-spacing":"10"},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.InputFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.InputBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputTxt()}},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}}),a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:2==t.c_type,expression:"c_type==2"}],staticClass:"cu-btn block line-orange lg",staticStyle:{color:"#aaa","margin-left":"20upx",width:"100%"},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.voiceBegin.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.voiceEnd.apply(void 0,arguments)},touchcancel:function(e){arguments[0]=e=t.$handleEvent(e),t.voiceCancel.apply(void 0,arguments)}}},[t._v("按住 说话")]),a("v-uni-view",{staticClass:"action",staticStyle:{"margin-right":"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showItemIndex(1)}}},[a("v-uni-text",{staticClass:"cuIcon-emojifill text-grey"})],1),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.showjia,expression:"showjia"}],staticClass:"iconfont icon-jia",staticStyle:{"font-size":"52upx",color:"#777","margin-top":"6upx","margin-left":"6upx","margin-right":"6upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showItemIndex(2)}}}),a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!t.showjia,expression:"!showjia"}],staticClass:"cu-btn bg-green shadow",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.send()}}},[t._v("发送")])],1),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1==t.showItem,expression:"showItem==1"}],staticClass:"cu-bar foot ",staticStyle:{"box-shadow":"none","-webkit-box-shadow":"none",display:"block",background:"#fff",height:"330upx","margin-bottom":"80upx"}},[a("v-uni-scroll-view",{staticClass:"indexes",staticStyle:{height:"330upx","padding-bottom":"20upx","padding-top":"10upx"},attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t.emotion<=1?a("v-uni-view",t._l(14,(function(e,i){return a("v-uni-view",{key:i,staticStyle:{display:"flex"}},t._l(8,(function(e,n){return a("v-uni-view",{key:n,staticStyle:{flex:"1","text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendEmotion(0,8*i+n)}}},[8*i+n<=104?a("v-uni-image",{staticStyle:{width:"50upx",height:"50upx","margin-top":"10upx"},attrs:{"lazy-load":!0,src:"../../static/emotion/face0"+t.emotion+"/"+(8*i+n)+(0==t.emotion?".gif":".png")}}):t._e()],1)})),1)})),1):a("v-uni-view",t._l(4,(function(e,i){return a("v-uni-view",{key:i,staticStyle:{display:"flex"}},t._l(6,(function(e,n){return a("v-uni-view",{key:n,staticStyle:{flex:"1","text-align":"center"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendEmotion(t.emotion,5*i+n)}}},[a("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:5*i+n<=15,expression:"(i*5 +item)<=15"}],staticStyle:{width:"50upx",height:"50upx","margin-top":"10upx"},attrs:{"lazy-load":!0,src:"../../static/emotion/face0"+t.emotion+"/"+(5*i+n)+".gif"}})],1)})),1)})),1)],1),a("v-uni-view",{staticStyle:{width:"100%",height:"80upx",background:"#f6f6f6","border-top":"1px solid #eee",bottom:"0",position:"fixed",display:"flex"}},t._l(7,(function(e,i){return a("v-uni-view",{key:e,staticStyle:{flex:"1",height:"100%","text-align":"center"},style:t.emotion==i?"background: #fff;":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showEmotion(i)}}},[a("v-uni-image",{staticStyle:{width:"50upx",height:"50upx","margin-top":"10upx"},attrs:{"lazy-load":!0,src:t.getMotionImg(i)}})],1)})),1)],1),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2==t.showItem,expression:"showItem==2"}],staticClass:"cu-bar foot ",staticStyle:{"box-shadow":"none","-webkit-box-shadow":"none",display:"block",background:"#fff",height:"410upx"}},[a("v-uni-scroll-view",{staticClass:"indexes",staticStyle:{height:"410upx","padding-bottom":"20upx","padding-top":"10upx"},attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[a("v-uni-view",[a("v-uni-view",{staticStyle:{display:"flex"}},[a("v-uni-view",{staticStyle:{flex:"1","text-align":"center","margin-top":"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage()}}},[a("v-uni-text",{staticClass:"iconfont icon-zhaopian-cuxiantiao-fill",staticStyle:{"font-size":"60upx",color:"#3F92F8"}}),a("v-uni-view",{staticStyle:{"font-size":"24upx",color:"#8799a3"}},[t._v("照片")])],1),a("v-uni-view",{staticStyle:{flex:"1","text-align":"center","margin-top":"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseVideo()}}},[a("v-uni-text",{staticClass:"iconfont icon-paishe",staticStyle:{"font-size":"60upx",color:"#F39F90"}}),a("v-uni-view",{staticStyle:{"font-size":"24upx",color:"#8799a3"}},[t._v("拍摄")])],1),a("v-uni-view",{staticStyle:{flex:"1","text-align":"center","margin-top":"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showMsg()}}},[a("v-uni-text",{staticClass:"iconfont icon-mingpian2",staticStyle:{"font-size":"60upx",color:"#FA9B4E"}}),a("v-uni-view",{staticStyle:{"font-size":"24upx",color:"#8799a3"}},[t._v("名片")])],1),a("v-uni-view",{staticStyle:{flex:"1","text-align":"center","margin-top":"20upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showMsg()}}})],1),a("v-uni-view",{staticStyle:{display:"flex","margin-top":"40upx"}})],1)],1)],1)],1)},o=[]},4765:function(t,e,a){"use strict";(function(t){a("7a82");var i=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a434"),a("498a"),a("e25e"),a("ac1f"),a("5319");var n=i(a("5530")),o=i(a("81b6")),s=a("26cb"),c=a("7f8e"),l=(uni.createInnerAudioContext(),{components:{uParse:o.default},data:function(){return{player:null,selVoiceIndex:-1,domHeight:0,c_type:1,InputBottom:0,toid:"-1",entity:{},txt:"",showjia:!0,emotion:0,showItem:0,scrollTop:0,style:{pageHeight:0,contentViewHeight:0,footViewHeight:90,mitemHeight:0},sendCount:0,RECORDER:uni.getRecorderManager(),AUDIO:uni.createInnerAudioContext(),recordTimer:null,recordLength:0,voicePath:"",isRecord:!1,intervalTime:0,timer:null,v_base64:""}},computed:(0,n.default)((0,n.default)((0,n.default)({i18n:function(){return this.$t("index")}},(0,s.mapState)("chat",["curChatMsgList","chatMyLoadding","chatMessageMap"])),(0,s.mapState)("user",["user","userToken","unReadMsgSum"])),(0,s.mapState)("app",["imgUrl","reqUrl"])),mounted:function(){},onBackPress:function(){this.setCurChatEntity(null),this.setCurChatMsgList([])},onLoad:function(){var t=this,e=uni.getStorageSync("USER");if(this.setChatMyLoadding(!1),this.chatMessageMap.has(e.id+"#"+this.toid)){var a=this.chatMessageMap.get(e.id+"#"+this.toid);a&&a.length>0&&this.setCurChatMsgList(a)}else{var i=uni.getStorageSync(e.id+"#"+this.toid+"_CHAT_MESSAGE");if(i&&""!=i){var n=JSON.parse(i);n.length>50&&n.splice(0,n.length-50),this.updateChatMessageMap({key:e.id+"#"+this.toid,value:n}),this.setCurChatMsgList(n)}}t.loadTalkUserAction({toid:t.toid}).then((function(e){t.entity=e})),t.saveOrUpdateAction(t.toid),this.scrollToBottom()},methods:(0,n.default)((0,n.default)((0,n.default)((0,n.default)((0,n.default)({},(0,s.mapMutations)("chat",["setCurChatMsgList","setCurChatEntity","setChatMyLoadding","updateChatMessageMap"])),(0,s.mapMutations)("user",["setUnReadMsgSum"])),(0,s.mapActions)("socket",["WEBSOCKET_SEND"])),(0,s.mapActions)("chat",["loadTalkUserAction","saveOrUpdateAction","uploadVideoAction","uploadImageAction","uploadVoiceAction"])),{},{getMotionImg:function(t){var e=1==t?"png":"gif";return"../../static/emotion/face0"+t+"/face-lbl."+e},goFavourite:function(){uni.navigateTo({url:"/pages/mine/favourite_list"})},selType:function(t){this.c_type=t},preview:function(t,e){},navigate:function(e,a){t.log(e)},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},clickChat:function(){this.showItem=0,this.InputBottom=0},showItemIndex:function(t){this.showItem==t&&(t=0),this.showItem=t,this.InputBottom=0!=t?400:0,this.scrollToBottom()},showEmotion:function(t){this.emotion=t},inputTxt:function(){""==this.txt.trim()?this.showjia=!0:this.showjia=!1},goUserDetail:function(t){uni.navigateTo({url:"/pages/chat/user_detail?id="+t})},goMgr:function(t){t?uni.navigateTo({url:"/pages/chat/user/mgr?id="+t}):uni.showToast({icon:"none",title:"操作太快啦，稍作休息。"})},send:function(){""!=this.txt.trim()&&(this.WEBSOCKET_SEND({body:{txt:this.txt,toUid:this.toid,fromUid:this.user.id},CMD:c.MessageType.USER_CHAT_SEND_TXT}),this.txt="",this.showjia=!0,this.sendCount=this.sendCount+1,this.scrollToBottom())},sendEmotion:function(t,e){this.WEBSOCKET_SEND({body:{txt:"[f"+t+"#"+e+"]",toUid:this.toid,fromUid:this.user.id},CMD:c.MessageType.USER_CHAT_SEND_TXT}),this.txt="",this.showjia=!0,this.sendCount=this.sendCount+1,this.scrollToBottom()},InputFocus:function(t){setTimeout((function(){document.body.scrollTop=document.body.scrollHeight}),500)},InputBlur:function(t){setTimeout((function(){document.body.scrollTop=document.body.scrollHeight}),500)},ChooseVideo:function(){this.uploadVideoAction(this.toid)},ChooseImage:function(){this.uploadImageAction(this.toid)},checkAuthorize:function(){this.startRecord()},voiceBegin:function(t){this.RECORDER.start({format:"amr"})},recordBegin:function(t){var e=this;uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),this.recordLength=0,this.recordTimer=setInterval((function(){e.recordLength++}),1e3)},voiceEnd:function(t){this.RECORDER.stop()},voiceCancel:function(){this.RECORDER.stop()},recordEnd:function(e){t.log("----------------------1");uni.getStorageSync("USER");clearInterval(this.recordTimer),uni.hideToast();var a,i=parseInt(this.recordLength/60),n=this.recordLength%60;i=i<10?"0"+i:i,n=n<10?"0"+n:n,a=i+":"+n,this.voicePath=e.tempFilePath,this.Audio2dataURL(this.voicePath,a),setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),100)},startRecord:function(){uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),this.RECORDER.start({format:"mp3"})},endRecord:function(){uni.hideToast(),this.RECORDER.stop()},clickVoice:function(e,a){var i=this;if(this.selVoiceIndex==a)return this.selVoiceIndex=-1,void(this.player&&(this.player.stop(),t.log("停止了")));this.selVoiceIndex=a,this.player=plus.audio.createPlayer(e),this.player.play((function(){i.selVoiceIndex=-1,t.log("播放完了")}),(function(e){t.log("播放失败")}))},scrollToBottom:function(){setTimeout((function(){uni.pageScrollTo({scrollTop:9999999999,duration:0})}),100)},Audio2dataURL:function(t,e){var a=this;uni.getStorageSync("USER");plus.io.resolveLocalFileSystemURL(t,(function(t){t.file((function(t){var e=new plus.io.FileReader;e.onloadend=function(t){a.uploadVoiceAction({img:t.target.result,toid:a.toid})},e.readAsDataURL(t)}),(function(t){mui.toast("读写出现异常: "+t.message)}))}))},dataURL2Audio:function(e,a){e=e.replace("data:audio/amr;base64,","");var i=(new Date).valueOf()+".amr";plus.io.requestFileSystem(plus.io.PRIVATE_DOC,(function(n){n.root.getFile(i,{create:!0},(function(i){var n=i.fullPath;if(mui.os.android){var o=plus.android.importClass("android.util.Base64"),s=plus.android.importClass("java.io.FileOutputStream");try{var c=new s(n),l=o.decode(e,o.DEFAULT);c.write(l),c.close(),a&&a(i)}catch(u){t.log(u.message)}}else if(mui.os.ios){var r=plus.ios.importClass("NSData"),d=new r;d=d.initWithBase64EncodedStringoptions(e,0),d&&(d.plusCallMethod({writeToFile:n,atomically:!0}),plus.ios.deleteObject(d)),a&&a(i)}}))}))}})});e.default=l}).call(this,a("5a52")["default"])},"659e":function(t,e,a){"use strict";a.r(e);var i=a("2318"),n=a("b899");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("856a");var s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"55ac82fb",null,!1,i["a"],void 0);e["default"]=c.exports},7643:function(t,e,a){var i=a("0cda");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("1cd50a52",i,!0,{sourceMap:!1,shadowMode:!1})},"856a":function(t,e,a){"use strict";var i=a("7643"),n=a.n(i);n.a},b899:function(t,e,a){"use strict";a.r(e);var i=a("4765"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a}}]);