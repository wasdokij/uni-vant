<template>
	<view>
		<view
			v-if="animated || inited"
			class="custom-class"
			:class="[utils.bem('tab__pane', { active, inactive: !active })]"
			:style="[animated || active ? '' : 'display: none;', width ? 'width:' + width + 'px;' : '' ]">
		<slot />
	</view>
	</view>
</template>

<script>
import utils from '../wxs/utils.js';
export default {
	props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String
    },
	data() {
		return {
			utils: utils,
			width: null,
			inited: false,
			active: false,
			animated: false
		};
	},
    watch: {
		title (value) {
			this.update()
		},
		disabled (value) {
			this.update()
		},
		dot (value) {
			this.update()
		},
		info (value) {
			this.update()
		},
		titleStyle (value) {
			this.update()
		},
    },
	created() {
	},
    methods: {
        update() {
            const parent = this.$parent;
            if (parent) {
                parent.updateTabs();
            }
        }
    }
};
</script>

<style scoped>
@import url('index.css');
</style>
