<template>
	<view>
		<van-overlay v-if="overlay" mask :show="show" :z-index="zIndex" :custom-style="overlayStyle" :duration="duration"
		 @click="onClickOverlay"></van-overlay>
		<view v-if="inited" class="custom-class" :class="[classes, setClass]" :style="setStyle" @transitionend="onTransitionEnd">
			<view v-if="safeAreaInsetTop" class="van-popup__safe-top" :style="{ 'padding-top': statusBarHeight + 'px' }"></view>
			<slot />
		</view>
	</view>
</template>
<script>
	import utils from '../wxs/utils.js';
	import VanOverlay from '../overlay/index.vue';
	import { transition } from '../mixins/transition';
	import { safeArea } from '../mixins/safe-area';

	export default {
		name: 'popup',
		mixins: [transition(false), safeArea()],
		components: {
			VanOverlay
		},
		props: {
			transition: {
				type: String
			},
			customStyle: String,
			overlayStyle: String,
			zIndex: {
				type: Number,
				default: 100
			},
			overlay: {
				type: Boolean,
				default: true
			},
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},
			position: {
				type: String,
				default: 'center'
			}
		},
		data() {
			return {
				setClass: '',
				setStyle: ''
			};
		},
		watch: {
			transition(value) {
				this.observeClass(value);
			},
			position(value) {
				this.observeClass(value);
			},
			currentDuration(value) {
				this.onSetStyle()
			}
		},
		created() {
			this.observeClass();
		},
		methods: {
			onSetStyle() {
				this.setStyle =
					`z-index:${this.zIndex};-webkit-transition-duration:${this.currentDuration}ms;transition-duration:${this.currentDuration}ms;${this.display ? '' : 'display: none'};${this.customStyle}`
			},
			onClickOverlay() {
				this.$emit('click-overlay');
				if (this.closeOnClickOverlay) {
					this.$emit('close');
				}
			},
			observeClass() {
				this.setClass = utils.bem('popup', [this.position, { safe: this.isIPhoneX && this.safeAreaInsetBottom }]);
				this.updateClasses(this.transition || this.position);
				if (this.transition === 'none') {
					this.duration = 0
				}
			}
		}
	};
</script>
<style scoped>
	@import url('index.css');
</style>
