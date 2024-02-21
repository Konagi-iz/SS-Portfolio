<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorksFV from '@/components/views/homeParts/works/worksFV.vue';
import WorksList from '@/components/views/homeParts/works/WorksList.vue';

const section = ref(null);

/* 背景色の切り替えアニメーション ------------ */
onMounted(() => {
	const bg = document.querySelector('.background');
	ScrollTrigger.create({
		trigger: section.value,
		start: '+=100 top',
		toggleClass: { targets: bg, className: 'background--hide' },
		toggleActions: 'play none none reverse',
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
