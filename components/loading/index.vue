<template>
	<view class="van-loading custom-class" :style="{ width: size, height: size }">
		<view class="van-loading__spinner" :style="{ color: color }" :class="'van-loading__spinner--'+type">
			<view v-if="type === 'spinner'"  v-for="(item, index) in 12" :key="index" class="van-loading__dot" />
		</view>
	</view>
</template>
<script>
export default {
	props: {
        size: {
            type: String,
            default: '60rpx'
        },
        type: {
            type: String,
            default: 'circular'
        },
        color: {
            type: String,
            default: '#c9c9c9'
        }
    }
};
</script>
<style scoped>
	@import url("index.css");
</style>
