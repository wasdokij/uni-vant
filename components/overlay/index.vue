<template>
	<van-transition :show="show" custom-class="van-overlay" :custom-style="setStyle" :duration="duration" @tap="onClick" @touchmove="noop" />
</template>
<script>
import VanTransition from '../transition/index.vue';
export default {
	name: 'overlay',
	components: { VanTransition },
	props: {
		show: Boolean,
		mask: Boolean,
		customStyle: String,
		duration: {
			type: [Number, Object],
			default: 300
		},
		zIndex: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			setStyle: ''
		};
	},
	created() {
		this.setStyle = 'z-index:' + this.zIndex + ';' + (this.mask ? 'background-color: rgba(0, 0, 0, .7)' : '') + ';' + this.customStyle;
	},
	methods: {
		onClick() {
			this.$emit('click');
		},
		// for prevent touchmove
		noop() {}
	}
};
</script>
<style scoped>
@import url('index.css');
</style>
