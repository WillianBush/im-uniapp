(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-transpond"],{"2e93":function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[e("template",{attrs:{slot:"content"},slot:"content"},[t._v("转发")]),e("template",{attrs:{slot:"right"},slot:"right"},[e("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px",background:"#58BB46",padding:"10upx 40upx","border-radius":"6upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tijiao()}}},[t._v("发送")])],1)],2),e("v-uni-view",{staticClass:"cu-bar bg-white search"},[e("v-uni-view",{staticClass:"search-form round"},[e("v-uni-text",{staticClass:"cuIcon-search"}),e("v-uni-input",{attrs:{type:"text",placeholder:"输入搜索的关键词","confirm-type":"search"},model:{value:t.kw1,callback:function(i){t.kw1=i},expression:"kw1"}})],1),e("v-uni-view",{staticClass:"action"},[e("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",staticStyle:{background:"#FFAA01"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.search()}}},[t._v("搜索")])],1)],1),e("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx - "+t.CustomBar+"px)"}],attrs:{"scroll-y":!0,"scroll-into-view":"indexes-"+t.listCurID,"scroll-with-animation":!0,"enable-back-to-top":!0}},[e("v-uni-checkbox-group",{staticStyle:{width:"100%"},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.radioChange.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"cu-list menu-avatar no-padding"},t._l(t.friend_list,(function(i,n){return e("v-uni-view",{key:n,staticClass:"cu-item"},[e("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.imgUrl+i.img+")"}}),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"text-grey",staticStyle:{float:"left"}},[t._v(t._s(i.title))]),e("v-uni-checkbox",{staticClass:"round blue ",attrs:{value:i.id}})],1)],1)})),1)],1),t.friend_list.length<=0?e("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("暂无可转发的对象")]):t._e()],1)],1)},a=[]},3446:function(t,i,e){"use strict";var n=e("f277"),a=e.n(n);a.a},"382e":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'uni-checkbox[data-v-6f17168b]{float:right}.indexes[data-v-6f17168b]{position:relative}.indexBar[data-v-6f17168b]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-6f17168b]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-6f17168b]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-6f17168b]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-6f17168b]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-6f17168b]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-6f17168b]{color:#333}',""]),t.exports=i},6801:function(t,i,e){"use strict";e.r(i);var n=e("d43c"),a=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"793e":function(t,i,e){"use strict";e.r(i);var n=e("2e93"),a=e("6801");for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("3446");var o=e("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"6f17168b",null,!1,n["a"],void 0);i["default"]=r.exports},d43c:function(t,i,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("4de4"),e("d3b7"),e("498a"),e("c975"),e("e25e");var a=n(e("5530")),s=e("26cb"),o={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],listCur:"",kw:"",kw1:"",ids:[],fid:""}},onLoad:function(t){},mounted:function(){uni.getStorageSync("USER")},computed:(0,a.default)((0,a.default)((0,a.default)((0,a.default)({i18n:function(){return this.$t("index")}},(0,s.mapState)("app",["imgUrl","reqUrl"])),(0,s.mapState)("chat",["arListShow"])),(0,s.mapState)("user",["user"])),{},{friend_list:function(){var t=this,i=this,e=this.arListShow;return e=e.filter((function(e){if(""!=t.kw.trim()){if("-1"==e.id)return!1;if(e.title.indexOf(i.kw.trim())<0)return!1}else if("-1"==e.id)return!1;return!0})),e}}),onReady:function(){},methods:(0,a.default)((0,a.default)({},(0,s.mapActions)("chat",["transMessageAction"])),{},{tijiao:function(){uni.getStorageSync("USER");0!=this.ids.length?(this.transMessageAction(this.ids),uni.showToast({icon:"success",title:"转发成功",duration:800}),setTimeout((function(){uni.navigateBack()}),800)):uni.showToast({icon:"none",title:"请选择转发对象"})},radioChange:function(t){this.ids=t.target.value},showMsg:function(){uni.showToast({icon:"none",position:"bottom",title:"功能未开启"})},search:function(){this.kw=this.kw1},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var i=t.touches[0].clientY,e=this.boxTop;if(i>e){var n=parseInt((i-e)/20);this.listCur=this.list[n].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var i=this.barHeight,e=this.list,n=Math.ceil(e.length*t.detail.y/i),a=0;a<e.length;a++)if(n<a+1)return this.listCur=e[a].name,this.movableY=20*a,!1}})};i.default=o},f277:function(t,i,e){var n=e("382e");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("1fed0ea7",n,!0,{sourceMap:!1,shadowMode:!1})}}]);