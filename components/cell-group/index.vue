<template>
	<block>
		<view v-if="title" class="van-cell-group__title">{{ title }}</view>
		<view class="custom-class van-cell-group" :class="border ? 'van-hairline--top-bottom' : ''">
			<slot />
		</view>
	</block>
</template>

<script>
export default {
	props: {
		title: String,
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style scoped>
@import url('index.css');
</style>