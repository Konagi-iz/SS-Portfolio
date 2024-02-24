<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';

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
		<BGNoise :opacity="20"></BGNoise>
		<div class="lcl-fv__cnt">
			<p class="lcl-fv__head">PROFILE</p>
			<h2 class="lcl-fv-ttl">
				<span class="lcl-fv-ttl__word font-dp">About</span>
				<span class="lcl-fv-ttl__word font-en">me</span>
			</h2>
			<!-- .lcl-fv-ttl -->
			<div class="lcl-fv-data">
				<p class="lcl-fv-data__txt font-en">DATA - NAME</p>
				<p class="lcl-fv-data__txt font-en">DATA - AGE</p>
				<p class="lcl-fv-data__txt font-en">DATA - WHERE</p>
				<p class="lcl-fv-data__txt font-en">DATA - SKILLS</p>
				<p class="lcl-fv-data__txt font-en">DATA - HOBBIES</p>
			</div>
			<!-- .lcl-fv-data -->
		</div>
		<!-- lcl-fv__cnt -->
		<div class="lcl-fv-scroll">
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
		background: linear-gradient(to bottom, $c-orange, $c-darkgray);
	}

	/* contents ------------ */
	.lcl-fv__cnt {
		padding-top: 238px;
		margin-left: calc(15px + (100% - 1300px) / 2);
	}
	.lcl-fv__head {
		color: $c-white;
		@include fz(22);
		line-height: 1.5;
		letter-spacing: 0.04em;
	}
	.lcl-fv-ttl {
		display: flex;
		align-items: center;
		gap: 68px;
	}
	.lcl-fv-ttl__word {
		color: $c-orange;
		@include fz(188);
		line-height: 1.1;
	}
	.lcl-fv-data {
		margin-top: 24px;
		margin-left: calc((100% - 1000px) / 2 - 15px);
	}
	.lcl-fv-data__txt {
		color: $c-gray;
		@include fz(12);
		line-height: 1.5;
	}

	/* scroll ------------ */
	.lcl-fv-scroll {
		position: absolute;
		bottom: 10px;
		left: calc(15px + (100% - 1300px) / 2);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 20px;
	}
	.lcl-fv-scroll__circle {
		width: 100px;
	}
	.ico-angle-right {
		width: 107px;
		height: auto;
		transform: rotate(90deg);
		animation: hovering 2s ease-in-out infinite alternate;
	}
	:deep(.ico-angle-right__path) {
		stroke-width: 2px;
	}
}

@keyframes hovering {
	to {
		translate: 0 30%;
	}
}
</style>
