<template>
	<image :mode="node.attr.mode" :lazy-load="node.attr.lazyLoad" :class="node.classStr"
		:style="newStyleStr || node.styleStr" :data-src="node.attr.src" :src="deal(imageUrl)"
		@click="imgPreview(node.attr.src)" @load="wxParseImgLoad" @error="imageError" />
</template>

<script>
	import DefaultImage from '../../../static/default.jpg'
	export default {
		name: 'wxParseImg',
		data() {
			return {
				newStyleStr: '',
				preview: true,
				imageUrl: this.node.attr.src
			};
		},
		props: {
			node: {
				type: Object,
				default () {
					return {};
				},
			},
		},
		methods: {
			imageError(e) {
				this.imageUrl = DefaultImage
			},
			deal(v) {
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
			imgPreview(src) {
				if (!this.node.previewImg) return;
				var newSrc = this.deal(src);
				wx.previewImage({
					urls: [newSrc],
					current: newSrc
				});
				this.$store.state.currentPicLookUrl = newSrc;
				uni.$emit("showPicDialog", "我是全局事件订阅的传值")
			},
			wxParseImgTap(e) {
				if (!this.node.previewImg) return;
				const {
					src
				} = e.currentTarget.dataset;
				if (!src) return;
				let parent = this.$parent;
				while (!parent.preview || typeof parent.preview !== 'function') { // TODO 遍历获取父节点执行方法
					parent = parent.$parent;
				}
				parent.preview(src, e);
			},
			// 图片视觉宽高计算函数区
			wxParseImgLoad(e) {
				const {
					src
				} = e.currentTarget.dataset;
				if (!src) return;
				const {
					width,
					height
				} = e.mp.detail;
				const recal = this.wxAutoImageCal(width, height);
				const {
					imageheight,
					imageWidth
				} = recal;
				const {
					padding,
					mode
				} = this.node.attr;
				const {
					styleStr
				} = this.node;
				const imageHeightStyle = mode === 'widthFix' ? '' : `height: ${imageheight}px;`;
				this.newStyleStr = `${styleStr}; ${imageHeightStyle}; width: ${imageWidth}px; padding: 0 ${+padding}px;`;
			},
			// 计算视觉优先的图片宽高
			wxAutoImageCal(originalWidth, originalHeight) {
				// 获取图片的原始长宽
				const {
					padding
				} = this.node.attr;
				const windowWidth = this.node.$screen.width - (2 * padding);
				const results = {};

				if (originalWidth < 60 || originalHeight < 60) {
					const {
						src
					} = this.node.attr;
					let parent = this.$parent;
					while (!parent.preview || typeof parent.preview !== 'function') {
						parent = parent.$parent;
					}
					parent.removeImageUrl(src);
					this.preview = false;
				}

				// 判断按照那种方式进行缩放
				if (originalWidth > windowWidth) {
					// 在图片width大于手机屏幕width时候
					results.imageWidth = windowWidth;
					results.imageheight = windowWidth * (originalHeight / originalWidth);
				} else {
					// 否则展示原来的数据
					results.imageWidth = originalWidth;
					results.imageheight = originalHeight;
				}

				return results;
			},
		},
	};
</script>