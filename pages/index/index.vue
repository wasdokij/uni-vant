<template>
	<view class="content">
		<vu-field
		 v-model="sdsd"
		  required
		 clearable
		 label="用户名"
		 icon="question-o"
		 placeholder="请输入用户名"
		 ></vu-field>
		<vu-cell-group >
			<vu-cell title="单元格">
			  <van-icon slot="right-icon" name="search" class="custom-icon" />
			</vu-cell>
			<vu-cell title="单元格" is-link />
			<vu-cell title="单元格" is-link value="内容" />
			<vu-cell title="单元格" is-link value="内容" arrow-direction="down" />
		</vu-cell-group>
	</view>
</template>
<script>
import VuCellGroup from '@/components/cell-group/index.vue'
import VuCell from '@/components/cell/index.vue'
import VuField from '@/components/field/index.vue'
import VuPopup from '@/components/popup/index.vue'
import VuButton from '@/components/button/index.vue'
export default {
	components: {
		VuField,
		VuCellGroup,
		VuCell,
		VuButton,
		VuPopup
	},
	data() {
		return {
			active: 0,
			sdsd: 'sasa',
			show: false
		}
	},
	onShow() {
		setTimeout(() => {
			this.sdsd = 100
		}, 1000)
	},
	methods: {
		onChange(e) {
			const obj = this.radnumlist[index]
			obj.selection = false
			this.$set(this.radnumlist, index, obj)
		},
		onPopup () {
			this.show = !this.show
		},
		onClose () {
			this.show = false
		}
	}
}
</script>
<style lang="scss">
	.custom-icon{
		display: flex;
		height: 48upx;
		font-size: 32upx;
		align-items: center;
	 }
</style>
