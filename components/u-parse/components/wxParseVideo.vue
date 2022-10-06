<template>
  <!--增加video标签支持，并循环添加-->
  <view :class="node.classStr" :style="node.styleStr">
    <video :class="node.classStr" class="video-video" :src="deal(node.attr.src)" style="float: right; width: 230px"></video>
  </view>
</template>

<script>
export default {
  name: 'wxParseVideo',
  props: {
    node: {},
  },
  methods: {
  	deal(v) {
  		console.log('VIDEO-----------', v)
  		if (typeof v === 'string') {
  			return v;
  		} else {
  			var src;
  			v.map(o => {
  				if (o.indexOf('href') > -1) {
  					src = o.match(/>(\S*)</)[1];
  					return;
  				}
  			})	
  			console.log('src', src)
  			return src;
  		}
  	},
  }
};
</script>
