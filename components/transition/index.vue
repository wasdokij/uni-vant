<template>
	<view v-if="inited" class="van-transition van-overlay" :class="classes" :style="setStyle" @tap="onTransitionEnd"><slot /></view>
</template>

<script>
import { transition } from '../mixins/transition'
export default {
	name: 'transition',
	mixins: [transition(true)],
	props: {
		name: {
			type: String,
			default: 'fade'
		}
	},
	data() {
		return {
			setStyle: ''
		}
	},
	watch: {
		display(val) {
			this.onSetStyle(val)
		},
		show(val) {
			this.onSetStyle(val)
		}
	},
	created() {},
	methods: {
		onSetStyle(value) {
			this.setStyle =
				'-webkit-transition-duration:' + this.currentDuration + 'ms; transition-duration:' + this.currentDuration + 'ms;' + (value ? '' : 'display: none;') + this.customStyle
		}
	}
}
</script>
<style scoped>
@import url('index.css');
</style>
