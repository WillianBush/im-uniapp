(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-vioce"],{"029d":function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,".record-container[data-v-175a1137]{padding-top:%?100?%}.status[data-v-175a1137]{text-align:center}",""]),t.exports=n},"38a4":function(t,n,i){"use strict";var e=i("8f36"),a=i.n(e);a.a},"731a":function(t,n,i){"use strict";i.r(n);var e=i("e86f3"),a=i("780c");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("38a4");var r,u=i("f0c5"),c=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,"175a1137",null,!1,e["a"],r);n["default"]=c.exports},"780c":function(t,n,i){"use strict";i.r(n);var e=i("d5a1"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a},"8f36":function(t,n,i){var e=i("029d");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("6207bbae",e,!0,{sourceMap:!1,shadowMode:!1})},d5a1:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=uni.getRecorderManager(),e=uni.createInnerAudioContext();e.autoplay=!0;var a={data:function(){return{text:"uni-app",voicePath:"",isRecord:!1,intervalTime:0,timer:null}},onLoad:function(){var t=this;i.onStop((function(n){JSON.stringify(n),t.voicePath=n.tempFilePath}))},computed:{intIntervalTime:function(){return Math.round(this.intervalTime)}},methods:{startRecord:function(){var t=this;this.timer=setInterval((function(){t.intervalTime+=.5,t.intervalTime>=.5&&!t.isRecord&&(uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),t.isRecord=!0,t.intervalTime=0,i.start({duration:5e4,format:"amr"})),t.intervalTime>=60&&t.endRecord()}),500)},endRecord:function(){var t=this;this.intervalTime<=.5?uni.showToast({title:"录音太短",image:"../../static/luyin.png",duration:1500}):this.intervalTime>=60&&uni.showToast({title:"最长60s录音",image:"../../static/luyin.png",duration:1500}),clearInterval(this.timer),this.isRecord&&(uni.hideToast(),setTimeout((function(){i.stop(),t.isRecord=!1,t.isRecord}),500))},playVoice:function(){this.voicePath&&(e.src=this.voicePath,e.play())}}};n.default=a}).call(this,i("5a52")["default"])},e86f3:function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"record-container"},[i("v-uni-button",{on:{touchstart:function(n){arguments[0]=n=t.$handleEvent(n),t.startRecord.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.endRecord.apply(void 0,arguments)}}},[t._v("按住说话,松开结束")]),i("v-uni-button",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.playVoice.apply(void 0,arguments)}}},[t._v("播放录音（"+t._s(t.intIntervalTime)+"s）")]),i("v-uni-view",{staticClass:"status"},[t._v("录音中"+t._s(t.intIntervalTime)+"s>>>")])],1)},o=[]}}]);