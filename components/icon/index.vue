<template>
	<view :class="[iconImage, classPrefix, buttonIcon]" :style="color ? 'color: ' + color + ';' : ''+ ';'+ size ? 'font-size: ' + size + ';' : ''+ ';'+ customStyle "
	 @tap="onClick">
		<van-info v-if="info !== null" :info="info" custom-class="van-icon__info" />
		<image v-if="isSrc" :src="name" mode="aspectFit" class="van-icon__image" />
	</view>
</template>

<script>
	import VanInfo from '../info/index.vue';
	import utils from '../wxs/utils.js';
	export default {
		components: {
			VanInfo
		},
		props: {
			info: null,
			name: String,
			size: String,
			color: String,
			customStyle: String,
			classPrefix: {
				type: String,
				default: 'van-icon'
			},
			buttonIcon: {
				type: String,
				default: 'van-button-class'
			}
		},
		data() {
			return {
				utils: utils,
				iconImage: '',
				isSrc: false
			};
		},
		created() {
			this.iconImage = utils.isSrc(this.name) ? 'van-icon--image' : this.classPrefix + '-' + this.name
			this.isSrc = utils.isSrc(this.name)
		},
		methods: {
			onClick(event) {
				this.$emit('click')
			}
		}
	};
</script>

<style scoped>
	@import url('index.css');
	.van-icon {
		display: block;
	}
	.van-button-class {
		display: inline-block;
		min-width: 1em;
		font-size: 1.2em;
		line-height: inherit;
		vertical-align: top;
	}
</style>
