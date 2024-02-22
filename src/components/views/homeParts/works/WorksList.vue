<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorksCard from '@/components/parts/WorkCard.vue';
import workslist from '@/assets/data/works.json';
import Button01 from '@/components/parts/Button01.vue';

const card = ref(null);

onMounted(() => {
	card.value.forEach((item, index) => {
		const video = item.querySelector('video');
		let playFlag = true;

		/* 後ろに隠れたら動画をリセットする ------------ */
		if (index < card.value.length - 1) {
			ScrollTrigger.create({
				trigger: item,
				start: '100% top',
				onEnter: () => {
					playFlag = false;
					video.load();
					video.pause();
				},
				onLeaveBack: () => {
					playFlag = true;
					video.play();
				},
			});
		}

		/* 画面に入ったら動画を再生する ------------ */
		ScrollTrigger.create({
			trigger: item,
			start: 'top bottom',
			onEnter: () => {
				if (playFlag) {
					video.play();
				}
			},
			onLeaveBack: () => {
				video.load();
				video.pause();
			},
		});

		/* 後ろのカードを小さくする ------------ */
		if (index < card.value.length - 1) {
			gsap.to(item, {
				scale: 0.85,
				scrollTrigger: {
					trigger: item,
					start: 'top top',
					scrub: 1,
				},
			});
		}
	});

	/* VIEW ALL WORKS アニメーション ------------ */
	ScrollTrigger.create({
		trigger: card.value[card.value.length - 1],
		start: 'top top',
		end: '100% top',
		pin: '.lcl-works-list',
		anticipatePin: true,
	});
	gsap.to('.lcl-works-list__in', {
		opacity: 0.2,
		ease: 'none',
		scrollTrigger: {
			trigger: card.value[card.value.length - 1],
			start: '0% 1%',
			end: '30% 1%',
			scrub: 0.5,
			pinnedContainer: '.lcl-works-list',
			toggleActions: 'play none none reverse',
		},
	});
	gsap.from('.lcl-works-list-more__link', {
		yPercent: 100,
		ease: 'none',
		scrollTrigger: {
			trigger: card.value[card.value.length - 1],
			start: '0% 1%',
			end: '30% 1%',
			scrub: 0.5,
			pinnedContainer: '.lcl-works-list',
			toggleActions: 'play none none reverse',
		},
	});
});
</script>

<template>
	<div class="lcl-works-list">
		<ul class="lcl-works-list__in">
			<li v-for="(item, index) in workslist" :key="index" ref="card" class="lcl-works-list__item">
				<WorksCard
					ref="video"
					v-bind="{
						ttl: item.title,
						year: item.year,
						role: item.role,
						tag: item.tag,
					}"
				></WorksCard>
			</li>
			<!-- .lcl-works-list__item -->
		</ul>
		<!-- .lcl-works-list__in -->
		<div class="lcl-works-list-more">
			<div class="lcl-works-list-more__in">
				<router-link to="" class="lcl-works-list-more__link">
					<Button01
						v-bind="{
							isBig: true,
							color: 'orange',
							txt: 'VIEW ALL WORKS',
						}"
					></Button01>
				</router-link>
			</div>
			<!-- .lcl-works-list__link -->
		</div>
		<!-- .lcl-works-list__more -->
	</div>
</template>

<style scoped lang="scss">
.lcl-works-list {
	position: relative;
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
	.workcard {
		box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.15);
	}

	.lcl-works-list-more {
		z-index: 1;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: max(730px, 100vh);
	}
	.lcl-works-list-more__in {
		clip-path: inset(-5% -5% -5% -5%);
	}
	.lcl-works-list-more__link {
		display: inline-block;
	}
}
</style>
