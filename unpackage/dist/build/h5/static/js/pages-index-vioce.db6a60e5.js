(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-vioce"],{"07a9":function(t,e,n){"use strict";n.r(e);var i=n("0e0e"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"0e0e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=uni.getRecorderManager(),i=uni.createInnerAudioContext();i.autoplay=!0;var a={data:function(){return{text:"uni-app",voicePath:"",isRecord:!1,intervalTime:0,timer:null}},onLoad:function(){var e=this;n.onStop((function(n){t("log","录音停止了"+JSON.stringify(n)," at pages/index/vioce.vue:34"),e.voicePath=n.tempFilePath}))},computed:{intIntervalTime:function(){return Math.round(this.intervalTime)}},methods:{startRecord:function(){var t=this;this.timer=setInterval((function(){t.intervalTime+=.5,t.intervalTime>=.5&&!t.isRecord&&(uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),t.isRecord=!0,t.intervalTime=0,n.start({duration:5e4,format:"amr"})),t.intervalTime>=60&&t.endRecord()}),500)},endRecord:function(){var e=this;this.intervalTime<=.5?uni.showToast({title:"录音太短",image:"../../static/luyin.png",duration:1500}):this.intervalTime>=60&&uni.showToast({title:"最长60s录音",image:"../../static/luyin.png",duration:1500}),clearInterval(this.timer),this.isRecord&&(uni.hideToast(),setTimeout((function(){n.stop(),e.isRecord=!1,t("log",e.isRecord," at pages/index/vioce.vue:96")}),500))},playVoice:function(){t("log","播放录音"," at pages/index/vioce.vue:102"),this.voicePath&&(i.src=this.voicePath,i.play())}}};e.default=a}).call(this,n("0de9")["log"])},"13d6":function(t,e,n){var i=n("d183");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("021a1e6a",i,!0,{sourceMap:!1,shadowMode:!1})},5584:function(t,e,n){"use strict";var i=n("13d6"),a=n.n(i);a.a},a15a:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"record-container"},[n("v-uni-button",{on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.startRecord.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.endRecord.apply(void 0,arguments)}}},[t._v("按住说话,松开结束")]),n("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.playVoice.apply(void 0,arguments)}}},[t._v("播放录音（"+t._s(t.intIntervalTime)+"s）")]),n("v-uni-view",{staticClass:"status"},[t._v("录音中"+t._s(t.intIntervalTime)+"s>>>")])],1)},o=[]},d183:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".record-container[data-v-5f778314]{padding-top:%?100?%}.status[data-v-5f778314]{text-align:center}",""]),t.exports=e},d1d2:function(t,e,n){"use strict";n.r(e);var i=n("a15a"),a=n("07a9");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5584");var r,u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"5f778314",null,!1,i["a"],r);e["default"]=c.exports}}]);