<script setup>
import { gasp } from 'gsap';
import { isRouterViewLoaded, isTransition } from '@/store';

watch(isTransition, () => {
  
})
</script>

<template>
	<div class="transition" :class="{ 'transition--active': isTransition }"></div>
</template>

<style scoped lang="scss">
.transition {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: $c-darkgray;
}
</style>
