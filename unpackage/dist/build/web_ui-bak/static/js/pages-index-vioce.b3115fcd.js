(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-vioce"],{1346:function(t,n,e){"use strict";var i=e("def3"),a=e.n(i);a.a},"431e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=uni.getRecorderManager(),i=uni.createInnerAudioContext();i.autoplay=!0;var a={data:function(){return{text:"uni-app",voicePath:"",isRecord:!1,intervalTime:0,timer:null}},onLoad:function(){var t=this;e.onStop((function(n){JSON.stringify(n),t.voicePath=n.tempFilePath}))},computed:{intIntervalTime:function(){return Math.round(this.intervalTime)}},methods:{startRecord:function(){var t=this;this.timer=setInterval((function(){t.intervalTime+=.5,t.intervalTime>=.5&&!t.isRecord&&(uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),t.isRecord=!0,t.intervalTime=0,e.start({duration:5e4,format:"amr"})),t.intervalTime>=60&&t.endRecord()}),500)},endRecord:function(){var t=this;this.intervalTime<=.5?uni.showToast({title:"录音太短",image:"../../static/luyin.png",duration:1500}):this.intervalTime>=60&&uni.showToast({title:"最长60s录音",image:"../../static/luyin.png",duration:1500}),clearInterval(this.timer),this.isRecord&&(uni.hideToast(),setTimeout((function(){e.stop(),t.isRecord=!1,t.isRecord}),500))},playVoice:function(){this.voicePath&&(i.src=this.voicePath,i.play())}}};n.default=a}).call(this,e("5a52")["default"])},"4d43":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".record-container[data-v-5f778314]{padding-top:%?100?%}.status[data-v-5f778314]{text-align:center}",""]),t.exports=n},"7f46":function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"record-container"},[e("v-uni-button",{on:{touchstart:function(n){arguments[0]=n=t.$handleEvent(n),t.startRecord.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.endRecord.apply(void 0,arguments)}}},[t._v("按住说话,松开结束")]),e("v-uni-button",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.playVoice.apply(void 0,arguments)}}},[t._v("播放录音（"+t._s(t.intIntervalTime)+"s）")]),e("v-uni-view",{staticClass:"status"},[t._v("录音中"+t._s(t.intIntervalTime)+"s>>>")])],1)},o=[]},"9d9e":function(t,n,e){"use strict";e.r(n);var i=e("431e"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},c69d:function(t,n,e){"use strict";e.r(n);var i=e("7f46"),a=e("9d9e");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("1346");var r,u=e("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"5f778314",null,!1,i["a"],r);n["default"]=c.exports},def3:function(t,n,e){var i=e("4d43");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("565677b0",i,!0,{sourceMap:!1,shadowMode:!1})}}]);