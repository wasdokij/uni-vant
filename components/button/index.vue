<template>
	<button class="custom-class" :class="[hairline ? 'van-hairline--surround' : '', setClass]" hover-class="van-button--active hover-class"
	 @tap="onClick">
		<block v-if="loading">
			<van-loading :size="loadingSize" :color="type === 'default' ? '#c9c9c9' : ''" />
			<view v-if="loadingText" class="van-button__loading-text">{{ loadingText }}</view>
		</block>
		<block v-else>
			<van-icon v-if="icon" size="1.2em" button-icon="van-button-class" :name="icon" class="van-button__icon" custom-style="line-height: inherit;" />
			<text class="van-button__text">
				<slot />
			</text>
		</block>
	</button>
</template>

<script>
	import VanLoading from '../loading/index.vue'
	import VanIcon from '../icon/index.vue';
	import utils from '../wxs/utils.js'
	export default {
		components: {
			VanIcon,
			VanLoading
		},
		props: {
			icon: String,
			plain: Boolean,
			block: Boolean,
			round: Boolean,
			square: Boolean,
			loading: Boolean,
			hairline: Boolean,
			disabled: Boolean,
			loadingText: String,
			type: {
				type: String,
				default: 'default'
			},
			size: {
				type: String,
				default: 'normal'
			},
			loadingSize: {
				type: String,
				default: '40rpx'
			}
		},
		data() {
			return {
				setClass: ''
			};
		},
		created() {
			this.setClass = utils.bem('button', [this.type, this.size, { block: this.block, round: this.round, plain: this.plain,
				square: this.square, loading: this.loading, disabled: this.disabled, hairline: this.hairline, unclickable: this.disabled ||
					this.loading }])
		},
		methods: {
			onClick() {
				if (!this.disabled && !this.loading) {
					this.$emit('click');
				}
			}
		}
	};
</script>

<style scoped>
	@import url("index.css");
</style>
