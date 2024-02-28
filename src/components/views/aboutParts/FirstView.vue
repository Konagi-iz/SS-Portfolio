<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import TextSplit from '@/components/parts/TextSplit.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';
import { isOpeningReady } from '@/store';

const fv = ref(null);
const circleText = ref(null);

onMounted(() => {
	gsap.to(circleText.value, {
		rotate: 360,
		scrollTrigger: {
			trigger: fv.value,
			start: 'top top',
			end: 'bottom top',
			scrub: 1,
		},
	});
});
</script>

<template>
	<section ref="fv" class="lcl-fv">
		<div class="lcl-fv__bg"></div>
		<!-- .lcl-fv__bg -->
		<BGNoise :opacity="20"></BGNoise>
		<!-- .bg-noise -->
		<div class="lcl-fv__cnt" :class="{ 'opening--on': isOpeningReady }">
			<p class="lcl-fv__head">PROFILE</p>
			<h2 class="lcl-fv-ttl">
				<span class="lcl-fv-ttl__word font-dp">
					<TextSplit text="About"></TextSplit>
				</span>
				<span class="lcl-fv-ttl__word font-en">
					<TextSplit text="me"></TextSplit>
				</span>
			</h2>
			<!-- .lcl-fv-ttl -->
			<div class="lcl-fv-data" :class="{ 'opening--on': isOpeningReady }">
				<p class="lcl-fv-data__txt font-en">DATA - NAME</p>
				<p class="lcl-fv-data__txt font-en">DATA - AGE</p>
				<p class="lcl-fv-data__txt font-en">DATA - WHERE</p>
				<p class="lcl-fv-data__txt font-en">DATA - SKILLS</p>
				<p class="lcl-fv-data__txt font-en">DATA - HOBBIES</p>
			</div>
			<!-- .lcl-fv-data -->
		</div>
		<!-- lcl-fv__cnt -->
		<div class="lcl-fv-scroll" :class="{ 'opening--on': isOpeningReady }">
			<img ref="circleText" class="lcl-fv-scroll__circle" src="/assets/img/about/PC/text_circle.svg" alt="SCROLL DOWN" />
			<IconAngleRight></IconAngleRight>
		</div>
		<!-- .lcl-fv-scroll -->
	</section>
</template>

<style scoped lang="scss">
.lcl-fv {
	position: relative;
	width: 100%;
	height: 730px;
	@include media_narrow {
		height: max(667px, 100lvh);
	}
	.lcl-fv__bg {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.4;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, $c-orange, $c-darkgray 60%);
	}

	/* contents ------------ */
	.lcl-fv__cnt {
		padding-top: 238px;
		margin-left: max(15px, 15px + (100% - 1300px) / 2);
		@include media_narrow {
			padding-top: vw(267);
			margin-left: vw(26);
		}
		&.opening--on .lcl-fv__head {
			transform: translateY(0);
			opacity: 1;
		}
		&.opening--on .lcl-fv-ttl__word :deep(.split-span) {
			transform: translateY(0);
		}
	}
	.lcl-fv__head {
		transform: translateY(100%);
		opacity: 0;
		color: $c-white;
		@include fz(22);
		line-height: 1.5;
		letter-spacing: 0.04em;
		transition: transform 0.8s $e-out-expo, opacity 0.8s $e-out-expo;
		@include media_narrow {
			@include fz(16);
		}
	}
	.lcl-fv-ttl {
		position: relative;
		display: flex;
		align-items: center;
		gap: 68px;
	}
	.lcl-fv-ttl__word {
		display: inline-block;
		clip-path: inset(0 0 0 -10%);
		color: $c-orange;
		@include fz(188);
		line-height: 1.1;
		@include media_narrow {
			@include fz(86);
			&:nth-of-type(2) {
				position: absolute;
				top: vw(76);
				right: vw(26);
				line-height: 0.9;
			}
		}
		:deep(.split-span) {
			@include delay(5);
			transition: transform 1s $e-out-expo;
		}
	}
	.lcl-fv-data {
		margin-top: 24px;
		@include media_wide {
			margin-left: 135px;
		}
		@include media_narrow {
			margin-top: vw(4);
		}
		&.opening--on .lcl-fv-data__txt {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.lcl-fv-data__txt {
		transform: translateY(100%);
		opacity: 0;
		color: $c-gray;
		@include fz(12);
		line-height: 1.5;
		@include delay(5, 0.1, 0.2);
		transition: transform 0.8s $e-out-expo, opacity 0.8s $e-out-expo;
		@include media_narrow {
			@include fz(10);
		}
	}

	/* scroll ------------ */
	.lcl-fv-scroll {
		position: absolute;
		bottom: 10px;
		left: max(15px, 15px + (100% - 1300px) / 2);
		opacity: 0;
		transform: translateY(-10%);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 20px;
		transition: transform 1.2s 0.6s $e-out-circ, opacity 1.2s 0.6s $e-out-circ;
		@include media_narrow {
			bottom: vw(15);
			left: vw(15);
			gap: vw(12);
		}
		&.opening--on {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.lcl-fv-scroll__circle {
		width: 100px;
		@include media_narrow {
			width: vw(54);
		}
	}
	.ico-angle-right {
		width: 107px;
		height: auto;
		transform: rotate(90deg);
		animation: hovering 1s ease-in-out infinite alternate;
		@include media_narrow {
			width: vw(51);
		}
	}
	:deep(.ico-angle-right__path) {
		stroke-width: 2px;
	}
}

@keyframes hovering {
	to {
		translate: 0 20%;
	}
}
</style>
