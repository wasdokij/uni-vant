import {
	isObj
} from '../common/utils';
const getClassNames = (name) => ({
	enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
	'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
	leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
	'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));
export const transition = function (showDefaultValue) {
	return {
		props: {
			customStyle: String,
			show: {
				type: Boolean,
				default: showDefaultValue
			},
			duration: {
				type: [Number, Object],
				default: 300
			},
			name: {
				type: String,
				default: 'fade'
			}
		},
		data() {
			return {
				type: '',
				inited: false,
				display: false,
				classNames: '',
				classes: '',
				currentDuration: ''
			};
		},
		watch: {
			show: 'observeShow',
			duration: 'observeDuration'
		},
		mounted() {
			if (this.show) {
				this.enter();
			}
		},
		methods: {
			observeShow(value) {
				if (value) {
					this.enter();
				} else {
					this.leave();
				}
			},
			enter() {
				const currentDuration = isObj(this.duration) ? this.duration.leave : this.duration;
				this.status = 'enter';
				Promise.resolve()
					.then(nextTick)
					.then(() => {
						this.checkStatus('enter');
						this.inited = true
						this.display = true
						this.classes = this.classNames.enter
						this.currentDuration = currentDuration
					})
					.then(nextTick)
					.then(() => {
						this.checkStatus('enter');
						this.classes = this.classNames['enter-to']
					})
					.catch(() => {});
			},
			leave() {
				const currentDuration = isObj(this.duration) ? this.duration.leave : this.duration;
				this.status = 'leave';
				Promise.resolve()
					.then(nextTick)
					.then(() => {
						this.checkStatus('leave');
						this.classes = this.classNames.leave
						this.currentDuration = currentDuration
					})
					.then(() => setTimeout(() => this.onTransitionEnd(), currentDuration))
					.then(nextTick)
					.then(() => {
						this.checkStatus('leave');
						this.classes = this.classNames['leave-to']
					})
					.catch(() => {});
			},
			updateClasses(name) {
				this.classNames = getClassNames(name)
			},
			checkStatus(status) {
				if (status !== this.status) {
					throw new Error(`incongruent status: ${status}`);
				}
			},
			onTransitionEnd() {
				if (!this.show) {
					this.display = false
					this.$emit('transitionEnd');
				}
			}
		}
	};
};
