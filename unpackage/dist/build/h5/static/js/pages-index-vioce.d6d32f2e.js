(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-vioce"],{"0792":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"record-container"},[n("v-uni-button",{on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.startRecord.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.endRecord.apply(void 0,arguments)}}},[t._v("按住说话,松开结束")]),n("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.playVoice.apply(void 0,arguments)}}},[t._v("播放录音（"+t._s(t.intIntervalTime)+"s）")]),n("v-uni-view",{staticClass:"status"},[t._v("录音中"+t._s(t.intIntervalTime)+"s>>>")])],1)},a=[]},"27cd":function(t,e,n){"use strict";var i=n("d40e"),a=n.n(i);a.a},"3e1f":function(t,e,n){"use strict";n.r(e);var i=n("0792"),a=n("7fe1");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("27cd");var r=n("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"5f778314",null,!1,i["a"],void 0);e["default"]=u.exports},"661e":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".record-container[data-v-5f778314]{padding-top:%?100?%}.status[data-v-5f778314]{text-align:center}",""]),t.exports=e},"78b9":function(t,e,n){"use strict";(function(t){n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("e9c4");var i=uni.getRecorderManager(),a=uni.createInnerAudioContext();a.autoplay=!0;var o={data:function(){return{text:"uni-app",voicePath:"",isRecord:!1,intervalTime:0,timer:null}},onLoad:function(){var e=this;i.onStop((function(n){t("log","录音停止了"+JSON.stringify(n)," at pages/index/vioce.vue:34"),e.voicePath=n.tempFilePath}))},computed:{intIntervalTime:function(){return Math.round(this.intervalTime)}},methods:{startRecord:function(){var t=this;this.timer=setInterval((function(){t.intervalTime+=.5,t.intervalTime>=.5&&!t.isRecord&&(uni.showToast({title:"正在录音",image:"../../static/luyin.png",duration:6e4}),t.isRecord=!0,t.intervalTime=0,i.start({duration:5e4,format:"amr"})),t.intervalTime>=60&&t.endRecord()}),500)},endRecord:function(){var e=this;this.intervalTime<=.5?uni.showToast({title:"录音太短",image:"../../static/luyin.png",duration:1500}):this.intervalTime>=60&&uni.showToast({title:"最长60s录音",image:"../../static/luyin.png",duration:1500}),clearInterval(this.timer),this.isRecord&&(uni.hideToast(),setTimeout((function(){i.stop(),e.isRecord=!1,t("log",e.isRecord," at pages/index/vioce.vue:96")}),500))},playVoice:function(){t("log","播放录音"," at pages/index/vioce.vue:102"),this.voicePath&&(a.src=this.voicePath,a.play())}}};e.default=o}).call(this,n("0de9")["log"])},"7fe1":function(t,e,n){"use strict";n.r(e);var i=n("78b9"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},d40e:function(t,e,n){var i=n("661e");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("15d5539a",i,!0,{sourceMap:!1,shadowMode:!1})}}]);