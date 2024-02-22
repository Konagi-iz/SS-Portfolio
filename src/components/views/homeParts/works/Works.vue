<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import WorksFV from '@/components/views/homeParts/works/worksFV.vue';
import WorksList from '@/components/views/homeParts/works/WorksList.vue';

const section = ref(null);

onMounted(() => {
	/* 背景色の切り替えアニメーション ------------ */
	const bg = document.querySelector('.background');
	gsap.to(bg, {
		autoAlpha: 0,
		duration: 0.01,
		scrollTrigger: {
			trigger: section.value,
			start: '+=100 top',
			toggleActions: 'play none none reverse',
		},
	});
});
</script>

<template>
	<section ref="section" class="lcl-works">
		<WorksFV></WorksFV>
		<WorksList></WorksList>
	</section>
</template>

<style scoped lang="scss">
.lcl-works {
	position: relative;
	width: 100%;
}
</style>
