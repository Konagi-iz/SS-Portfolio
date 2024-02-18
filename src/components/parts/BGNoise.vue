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
	background: url(/assets/img/common/img_bg-noise.png) repeat top left;
}
</style>
