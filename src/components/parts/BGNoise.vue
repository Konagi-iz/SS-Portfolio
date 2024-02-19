<script setup>
const props = defineProps({ opacity: Number });
</script>

<template>
	<div class="BG-noise" :style="`opacity: ${opacity / 100};`"></div>
</template>

<style scoped lang="scss">
.BG-noise {
	z-index: -1;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: url(/assets/img/common/img_bg-noise.png) repeat 0 0 / 200px;
	animation: bg-noise 0.2s linear infinite;
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
