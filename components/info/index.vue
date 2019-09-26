<template>
	<view v-if="info !== null" class="custom-class van-info" :style="customStyle">{{ info }}</view>
</template>

<script>
	export default {
		props: {
			info: null,
			customStyle: String
		}
	};
</script>

<style scoped>
	@import url('index.css');
</style>
