<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Slider from '@/components/views/homeParts/photography/Slider.vue';
import Button01 from '@/components/parts/Button01.vue';
import PhotographyTitle from '@/components/parts/PhotographyTitle.vue';
import TextSplit from '@/components/parts/TextSplit.vue';

const section = ref(null);
const bg = ref(null);

onMounted(() => {
	/* 背景色の切り替えアニメーション ------------ */
	gsap.to(bg.value, {
		background: '#e2e2e2',
		scrollTrigger: {
			trigger: section.value,
			start: 'top 80%',
			end: 'top 50%',
			scrub: 1,
		},
	});
	gsap.to(bg.value, {
		autoAlpha: 0,
		duration: 0.01,
		scrollTrigger: {
			trigger: section.value,
			start: '110% top',
			toggleActions: 'play none none reverse',
		},
	});
});
</script>

<template>
	<Teleport to=".wrapper">
		<div v-if="$route.name === 'home'" ref="bg" class="background"></div>
	</Teleport>
	<section ref="section" class="lcl-photo">
		<PhotographyTitle class="lcl-photo-ttl scr-anin"></PhotographyTitle>
		<!-- .lcl-photo-ttl -->
		<div class="lcl-photo-desc">
			<!-- prettier-ignore -->
			<p class="lcl-photo-desc__jp fade-in-btm scr-anin">
				カメラが好きです。<br />
				写真を撮ります。<br />
				風景スナップや<br />
				ストリートスナップ、<br />
				ポートレートなど。
			</p>
			<!-- .lcl-photo-desc__jp -->
			<!-- prettier-ignore -->
			<p class="lcl-photo-desc__en font-en fade-in-btm scr-anin">
				Camera : Fujifilm X-T5<br />
				Lens : Sigma 18-50mm F2.8,<br>
				　　　 XF 56mm F1.2 R WR
			</p>
			<!-- .lcl-photo-desc__en -->
		</div>
		<!-- .lcl-photo-desc -->
		<Slider></Slider>
		<router-link :to="{ name: 'photo' }" class="lcl-photo__link">
			<Button01
				v-bind="{
					isBig: true,
					color: 'orange',
					txt: 'VIEW MORE<br>PHOTO',
				}"
			></Button01>
		</router-link>
	</section>
</template>

<style scoped lang="scss">
/* background ------------ */
.background {
	z-index: -1;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100lvh;
}
.background--hide {
	background: transparent !important;
}

/* photo ------------ */
.lcl-photo {
	position: relative;
	padding-block: 439px 202px;
	width: 100%;
	@include media_narrow {
		padding-block: vw(439) vw(118);
	}

	/* ttl ------------ */
	.lcl-photo-ttl {
		z-index: 1;
		position: absolute;
		top: 176px;
		left: calc((100% - 1000px) / 2);
		@include media_narrow {
			top: vw(76);
			left: vw(17);
		}
		&.scr-anin--on :deep(.ico-photo) {
			opacity: 1;
			transform: rotate(0deg);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
	}

	/* desc ------------ */
	.lcl-photo-desc {
		position: absolute;
		top: 429px;
		left: calc((100% - 1000px) / 2);
		color: $c-orange;
		@include media_narrow {
			top: vw(242);
			left: vw(44);
		}
	}
	.lcl-photo-desc__jp {
		@include txt-basic--bold;
	}
	.lcl-photo-desc__en {
		margin-top: 48px;
		@include fz(12);
		font-weight: 700;
		line-height: 1.9;
		@include media_narrow {
			margin-top: vw(28);
		}
	}

	/* link ------------ */
	.lcl-photo__link {
		position: absolute;
		bottom: 183px;
		left: 50%;
		transform: translateX(-50%);
		@include media_narrow {
			bottom: vw(63);
		}
	}
}
</style>
