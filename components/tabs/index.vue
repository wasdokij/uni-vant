<template>
	<view>
		<view class="custom-class" :class="[utils.bem('tabs', [type])]">
			<view :style="[{ 'z-index': zIndex }, wrapStyle]" :class="[utils.bem('tabs__wrap', { scrollable: this.scrollable }), type === 'line' && this.border ? 'van-hairline--top-bottom' : '']">
				<slot name="nav-left" />

				<scroll-view
					:scroll-x="scrollable"
					scroll-with-animation
					:scroll-left="scrollLeft"
					:class="'van-tabs__scroll--' + type"
					:style="color ? 'border-color: ' + color : ''"
				>
					<view class="nav-class" :class="[utils.bem('tabs__nav', [type])]">
						<view v-if="type === 'line'" class="van-tabs__line" :style="lineStyle" />
						<view
							v-for="(item, index) in tabs"
							:key="index"
							:data-index="index"
							class="van-ellipsis tab-class"
							:class="[index === active ? 'tab-active-class' : '', utils.bem('tab', { active: index === active, disabled: item.disabled })]"
							:style="[
								color && index !== active && type === 'card' && !item.disabled ? 'color: ' + color : '',
								color && index === active && type === 'card' ? ';background-color:' + color : '',
								color ? ';border-color: ' + color : '',
								scrollable ? ';flex-basis:' + 88 / swipeThreshold + '%' : ''
							]"
							@tap="onTap"
						>
							<view class="van-ellipsis" :class="[utils.bem('tab__title', { dot: item.dot })]" :style="item.titleStyle">
								{{ item.title }}
								<van-info v-if="item.info !== null" :info="item.info" custom-class="van-tab__title__info" />
							</view>
						</view>
					</view>
				</scroll-view>

				<slot name="nav-right" />
			</view>
			<view class="van-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
				<view class="van-tabs__track" :style="trackStyle"><slot /></view>
			</view>
		</view>
	</view>
</template>
<script>
import utils from '../wxs/utils.js';
import VanInfo from '../info/index.vue';
import { basic } from '../mixins/basic';
import { touch } from '../mixins/touch';
export default {
	name: 'tabs',
	components: {
		VanInfo
	},
	mixins: [basic, touch],
	props: {
		color: String,
		sticky: Boolean,
		animated: Boolean,
		swipeable: Boolean,
		lineWidth: {
			type: Number,
			default: -1
		},
		lineHeight: {
			type: Number,
			default: -1
		},
		active: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: 'line'
		},
		border: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 0.3
		},
		zIndex: {
			type: Number,
			default: 1
		},
		swipeThreshold: {
			type: Number,
			default: 4
		},
		offsetTop: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			utils: utils,
			tabs: [],
			lineStyle: '',
			scrollLeft: 0,
			scrollable: false,
			trackStyle: '',
			wrapStyle: '',
			position: '',
			child: []
		};
	},
	computed: {
	},
	watch: {
		swipeThreshold() {
			this.scrollable = this.child.length > this.swipeThreshold;
		},
		color: 'setLine',
		lineWidth: 'setLine',
		lineHeight: 'setLine',
		active: 'setActiveTab',
		animated: 'setTrack',
		offsetTop: 'setWrapStyle'
	},
	beforeCreate() {
		this.child = [];
	},
	mounted() {
		this.setLine(true);
		this.setTrack();
		this.scrollIntoView();
		this.getRect('.van-tabs__wrap').then(rect => {
			this.navHeight = rect.height;
			this.observerContentScroll();
		});
	},
	destroyed() {
		this.createIntersectionObserver().disconnect();
	},
	methods: {
		updateTabs(tabs) {
			tabs = tabs || this.tabs;
			this.tabs = tabs;
			this.scrollable = tabs.length > this.swipeThreshold;
			this.setActiveTab();
		},
		trigger(eventName, index) {
			this.$emit(eventName, {
				index,
				title: this.tabs[index].title
			});
		},
		onTap(event) {
			const { index } = event.currentTarget.dataset;
			if (this.tabs[index].disabled) {
				this.trigger('disabled', index);
			} else {
				this.trigger('click', index);
				this.setActive(index);
			}
		},
		setActive(active) {
			if (active !== this.active) {
				this.trigger('change', active);
				this.active = active;
				this.setActiveTab();
			}
		},
		setLine(skipTransition) {
			if (this.type !== 'line') {
				return;
			}
			this.getRect('.van-tab', true).then(rects => {
				const rect = rects[this.active];
				const width = this.lineWidth !== -1 ? this.lineWidth : rect.width / 2;
				const height = this.lineHeight !== -1 ? `height: ${this.lineHeight}px;` : '';
				let left = rects.slice(0, this.active).reduce((prev, curr) => prev + curr.width, 0);
				left += (rect.width - width) / 2;
				const transition = skipTransition ? '' : `transition-duration: ${this.duration}s; -webkit-transition-duration: ${this.duration}s;`;
				this.lineStyle = `${height} width: ${width}px; background-color: ${
					this.color
				}; -webkit-transform: translateX(${left}px); transform: translateX(${left}px);${transition}`;
			});
		},
		setTrack() {
			if (!this.animated) return '';
			this.getRect('.van-tabs__content').then(rect => {
				const { width } = rect;
				this.trackStyle = `width: ${width * this.child.length}px;left: ${-1 * this.active * width}px;transition: left ${
					this.duration
				}s;display: -webkit-box;display: flex;`;
				const props = { width, animated: this.animated };
				this.child.forEach(item => {
					item.set(props);
				});
			});
		},
		setActiveTab() {
			console.log('-----')
			console.log(this.active)
			return
			this.child.forEach((item, index) => {
				const data = {
					active: index === this.active
				};
				if (data.active) {
					data.inited = true;
				}
				if (data.active !== item.data.active) {
					item.set(data);
				}
			});
			this.$set({}, () => {
				this.setLine();
				this.setTrack();
				this.scrollIntoView();
			});
		},
		// scroll active tab into view
		scrollIntoView() {
			if (!this.scrollable) {
				return;
			}
			Promise.all([this.getRect('.van-tab', true), this.getRect('.van-tabs__nav')]).then(([tabRects, navRect]) => {
				const tabRect = tabRects[this.active];
				const offsetLeft = tabRects.slice(0, this.active).reduce((prev, curr) => prev + curr.width, 0);
				this.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2;
			});
		},
		onTouchStart(event) {
			if (!this.swipeable) return;
			this.touchStart(event);
		},
		onTouchMove(event) {
			if (!this.swipeable) return;
			this.touchMove(event);
		},
		// watch swipe touch end
		onTouchEnd() {
			if (!this.swipeable) return;
			const { direction, deltaX, offsetX } = this;
			const minSwipeDistance = 50;
			if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
				if (deltaX > 0 && this.active !== 0) {
					this.setActive(this.active - 1);
				} else if (deltaX < 0 && this.active !== this.tabs.length - 1) {
					this.setActive(this.active + 1);
				}
			}
		},
		setWrapStyle() {
			let wrapStyle;
			switch (this.position) {
				case 'top':
					wrapStyle = `top: ${this.offsetTop}px;position: fixed;`;
					break;
				case 'bottom':
					wrapStyle = `top: auto;bottom: 0;`;
					break;
				default:
					wrapStyle = '';
			}
			// cut down `set`
			if (wrapStyle === this.wrapStyle) return;
			this.wrapStyle = wrapStyle;
		},
		observerContentScroll() {
			if (!this.sticky) {
				return;
			}
			const { windowHeight } = uni.getSystemInfoSync();
			this.createIntersectionObserver().disconnect();
			this.createIntersectionObserver()
				.relativeToViewport({ top: -(this.navHeight + this.offsetTop) })
				.observe('.van-tabs', res => {
					const { top } = res.boundingClientRect;
					if (top > this.offsetTop) {
						return;
					}
					const position = res.intersectionRatio > 0 ? 'top' : 'bottom';
					this.$emit('scroll', {
						scrollTop: top + this.offsetTop,
						isFixed: position === 'top'
					});
					this.setPosition(position);
				});
			this.createIntersectionObserver()
				.relativeToViewport({ bottom: -(windowHeight - 1 - this.offsetTop) })
				.observe('.van-tabs', res => {
					const { top, bottom } = res.boundingClientRect;
					if (bottom < this.navHeight) {
						return;
					}
					const position = res.intersectionRatio > 0 ? 'top' : '';
					this.$emit('scroll', {
						scrollTop: top + this.offsetTop,
						isFixed: position === 'top'
					});
					this.setPosition(position);
				});
		},
		setPosition(position) {
			if (position !== this.position) {
				this.set({ position }).then(() => {
					this.setWrapStyle();
				});
			}
		}
	}
};
</script>
<style scoped>
@import url('index.css');
</style>
