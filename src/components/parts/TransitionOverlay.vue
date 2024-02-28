<script setup>
import { ref, watch } from 'vue';
import { gsap } from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import { isRouterViewLoaded, isOpeningReady } from '@/store';

const transition = ref(null);

watch(isRouterViewLoaded, (val) => {
	if (!val) {
		// before
		gsap.fromTo(
			transition.value,
			{
				xPercent: 0,
				yPercent: 100,
			},
			{
				xPercent: 0,
				yPercent: 0,
				duration: 0.7,
				ease: 'expo.out',
			}
		);
	} else {
		// after
		gsap.fromTo(
			transition.value,
			{
				xPercent: 0,
				yPercent: 0,
			},
			{
				xPercent: 100,
				yPercent: 0,
				duration: 1,
				delay: 0.5,
				ease: 'expo.out',
				onComplete: () => {
					isOpeningReady.value = true;
				},
			}
		);
	}
});
</script>

<template>
	<div ref="transition" class="transition">
		<BGNoise :opacity="10"></BGNoise>
	</div>
</template>

<style scoped lang="scss">
.transition {
	z-index: calc(infinity);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: $c-orange;
}
</style>
