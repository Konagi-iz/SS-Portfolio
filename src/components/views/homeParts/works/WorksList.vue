<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorksCard from '@/components/parts/WorkCard.vue';
import workslist from '@/assets/data/works.json';
import Button01 from '@/components/parts/Button01.vue';

const card = ref(null);

const webdesignWorks = workslist.filter((item) => item.cat === 'web');

let isComponentUnmounted = false;

onMounted(() => {
	card.value.forEach((item, index) => {
		const video = item.querySelector('video');

		/* 後ろに隠れたら動画をリセットする ------------ */
		if (index < card.value.length - 1) {
			ScrollTrigger.create({
				trigger: item,
				start: '100% top',
				onEnter: () => {
					video.currentTime = 0;
					video.pause();
				},
				onLeaveBack: () => {
					if (!isComponentUnmounted) {
						video
							.play()
							.then(() => {
								return;
							})
							.catch((error) => {
								console.error('動画の再生に失敗しました。', error);
							});
					}
				},
			});
		}

		/* 画面に入ったら動画を再生する ------------ */
		ScrollTrigger.create({
			trigger: item,
			start: 'top bottom',
			onEnter: () => {
				if (!isComponentUnmounted) {
					video
						.play()
						.then(() => {
							return;
						})
						.catch((error) => {
							console.error('動画の再生に失敗しました。', error);
						});
				}
			},
			onLeaveBack: () => {
				video.currentTime = 0;
				video.pause();
			},
		});

		/* 後ろのカードを小さくする ------------ */
		// if (index < card.value.length - 1) {
		// 	gsap.to(item, {
		// 		opacity: 0,
		// 		scrollTrigger: {
		// 			trigger: item,
		// 			start: 'top top',
		// 			scrub: 1,
		// 		},
		// 	});
		// }
	});

	/* VIEW ALL WORKS アニメーション ------------ */
	ScrollTrigger.create({
		trigger: card.value[card.value.length - 1],
		start: 'top top',
		end: '90% top',
		pin: '.lcl-works-list',
		anticipatePin: true,
	});
	gsap.to('.lcl-works-list__in', {
		opacity: 0.1,
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
		yPercent: 120,
		ease: 'none',
		scrollTrigger: {
			trigger: card.value[card.value.length - 1],
			start: '0% 1%',
			end: '50% 1%',
			scrub: 0.5,
			pinnedContainer: '.lcl-works-list',
			toggleActions: 'play none none reverse',
		},
	});
});

onUnmounted(() => {
	isComponentUnmounted = true;
});
</script>

<template>
	<div class="lcl-works-list">
		<ul class="lcl-works-list__in">
			<li v-for="(item, index) in webdesignWorks" :key="index" ref="card" class="lcl-works-list__item">
				<WorksCard
					v-bind="{
						id: item.id,
						ttl: item.title,
						year: item.year,
						role: item.role,
						tag: item.tag,
						cat: item.cat,
					}"
				></WorksCard>
			</li>
			<!-- .lcl-works-list__item -->
		</ul>
		<!-- .lcl-works-list__in -->
		<div class="lcl-works-list-more">
			<div class="lcl-works-list-more__in">
				<router-link :to="{ name: 'works' }" class="lcl-works-list-more__link">
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
	.lcl-works-list__in {
		position: relative;
	}
	.lcl-works-list__item {
		position: sticky;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: max(730px, 100vh);
		will-change: transform;
		@include media_narrow {
			height: 100lvh;
		}
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
		pointer-events: none;
		@include media_narrow {
			transform: scale(1.5);
			height: 100lvh;
		}
	}
	.lcl-works-list-more__in {
		clip-path: inset(-5% -5% -5% -5%);
	}
	.lcl-works-list-more__link {
		display: inline-block;
		pointer-events: all;
	}
}
</style>
