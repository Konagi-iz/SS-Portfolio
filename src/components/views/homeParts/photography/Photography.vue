<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Slider from '@/components/views/homeParts/photography/Slider.vue';
import Button01 from '@/components/parts/Button01.vue';
import TextSplit from '@/components/parts/TextSplit.vue';

const section = ref(null);

onMounted(() => {
	/* 背景色の切り替えアニメーション ------------ */
	const bg = document.querySelector('.background');
	gsap.to(bg, {
		background: '#e2e2e2',
		scrollTrigger: {
			trigger: section.value,
			start: 'top center',
			end: 'top top',
			scrub: 1,
		},
	});
});
</script>

<template>
	<section ref="section" class="lcl-photo">
		<div class="lcl-photo-ttl">
			<img class="lcl-photo__icon scr-anin" src="/assets/img/home/photo/PC/ico-photo.svg" alt="" width="142" height="142" loading="lazy" />
			<h2 class="lcl-photo-ttl__txt scr-anin">
				<span class="lcl-photo-ttl__en font-en">
					<TextSplit text="Photo"</TextSplit>
				</span>
				<span class="lcl-photo-ttl__dp font-dp">
					<TextSplit text="graphy"></TextSplit>
				</span>
			</h2>
			<!-- .lcl-photo-ttl__txt -->
		</div>
		<!-- .lcl-photo-ttl -->
		<div class="lcl-photo-desc">
			<!-- prettier-ignore -->
			<p class="lcl-photo-desc__jp fade-in-txt scr-anin">
				カメラが好きです。<br />
				写真を撮ります。<br />
				風景スナップや<br />
				ストリートスナップ、<br />
				ポートレートなど。
			</p>
			<!-- .lcl-photo-desc__jp -->
			<!-- prettier-ignore -->
			<p class="lcl-photo-desc__en font-en fade-in-txt scr-anin">
				Camera : Fujifilm X-T5<br />
				Lens : Sigma 18-50mm F2.8
			</p>
			<!-- .lcl-photo-desc__en -->
		</div>
		<!-- .lcl-photo-desc -->
		<Slider></Slider>
		<router-link to="/" class="lcl-photo__link">
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
		display: flex;
		align-items: flex-start;
		@include media_narrow {
			top: vw(76);
			left: vw(17);
		}
	}
	.lcl-photo__icon {
		opacity: 0;
		transform: rotate(-90deg);
		width: 142px;
		height: auto;
		transition: opacity .8s $e-out-circ, transform .8s $e-out-circ;
		@include media_narrow {
			width: vw(52);
		}
		&.scr-anin--on {
			opacity: 1;
			transform: rotate(0deg);
		}
	}
	.lcl-photo-ttl__txt {
		color: $c-orange;
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			transform: translateY(142%);
			transition: transform 1s $e-out-expo;
			@include delay(6, 0.1)
		}
	}
	.lcl-photo-ttl__en {
		overflow: hidden;
		display: block;
		@include fz(195);
		line-height: 0.75;
		@include media_narrow {
			@include fz(70);
		}
	}
	.lcl-photo-ttl__dp {
		clip-path: inset(0 0 -30% 0);
		display: block;
		margin-left: 157px;
		@include fz(187);
		line-height: 0.75;
		@include media_narrow {
			margin-left: vw(50);
			@include fz(70);
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
