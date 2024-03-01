<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ opacity: Number });

const opacityPercent = ref(props.opacity / 100);

watch(props, (val) => {
	opacityPercent.value = val.opacity / 100;
});
</script>

<template>
	<div class="bg-noise"></div>
</template>

<style scoped lang="scss">
.bg-noise {
	z-index: -1;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	opacity: v-bind(opacityPercent) !important;
	background: url(/assets/img/common/img_bg-noise.png) repeat 0 0 / 200px;
	animation: bg-noise 0.2s linear infinite;
	pointer-events: none;
}

@keyframes bg-noise {
	0% {
		background-position: 0 0;
	}
	10% {
		background-position: -5% -5%;
	}
	20% {
		background-position: -10% 5%;
	}
	30% {
		background-position: 5% -10%;
	}
	40% {
		background-position: -5% 15%;
	}
	50% {
		background-position: -10% 5%;
	}
	60% {
		background-position: 15% 0;
	}
	70% {
		background-position: 0 10%;
	}
	80% {
		background-position: -15% 0;
	}
	90% {
		background-position: 10% 5%;
	}
	100% {
		background-position: 5% 0;
	}
}
</style>
