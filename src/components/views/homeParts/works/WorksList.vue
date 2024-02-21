<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import WorksCard from '@/components/parts/WorkCard.vue';
import workslist from '@/assets/data/works.json';

const card = ref(null);

onMounted(() => {
	card.value.forEach((item) => {
		gsap.to(item, {
			opacity: 0,
			scale: 0.95,
			scrollTrigger: {
				trigger: item,
				start: 'top top',
				scrub: 0.5,
			},
		});
	});
});
</script>

<template>
	<div class="lcl-works-list">
		<ul class="lcl-works-list__in">
			<li v-for="(item, index) in workslist" :key="index" ref="card" class="lcl-works-list__item">
				<WorksCard
					v-bind="{
						ttl: item.title,
						year: item.year,
						role: item.role,
						tag: item.tag,
					}"
				></WorksCard>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.lcl-works-list {
	margin-inline: auto;
	width: fit-content;
	.lcl-works-list__in {
		position: relative;
	}
	.lcl-works-list__item {
		position: sticky;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		height: max(730px, 100vh);
	}
}
</style>
