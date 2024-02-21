<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import WorksFVList from '@/components/parts/WorksFVList.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';
import IconStar from '~icons/svg/ico-star';

const ttl = ref(null);
const first = ref(null);
const second = ref(null);
const angle = ref(null);

onMounted(() => {
	gsap.to(ttl.value, {
		scale: 0.3007209063,
		xPercent: -100,
		yPercent: 10,
		color: '#ff4b12',
		scrollTrigger: {
			trigger: first.value,
			start: 'top top',
			end: 'bottom top',
			pin: ttl.value,
			pinSpacing: false,
			scrub: true,
		},
	});
	gsap.from(angle.value, {
		opacity: 0,
		yPercent: -10,
		scrollTrigger: {
			trigger: second.value,
			start: 'bottom bottom',
			toggleActions: 'play none none reverse',
		},
	});
});
</script>

<template>
	<div class="lcl-works__fv">
		<div ref="first" class="lcl-works-fv__first">
			<BGNoise :opacity="5"></BGNoise>
			<div ref="ttl" class="lcl-works-ttl">
				<IconStar></IconStar>
				<h2 class="lcl-works-ttl__txt">
					<span class="lcl-works-ttl__dp font-dp">Select</span>
					<span class="lcl-works-ttl__en font-en">ed</span>
					<br />
					<span class="lcl-works-ttl__en font-en">Wo</span>
					<span class="lcl-works-ttl__dp font-dp">rks</span>
				</h2>
				<!-- .lcl-works-ttl__txt -->
			</div>
			<!-- .lcl-works-ttl -->
		</div>
		<!-- .lcl-works-fv__first -->
		<div ref="second" class="lcl-works-fv__second">
			<BGNoise :opacity="5"></BGNoise>
			<WorksFVList></WorksFVList>
			<div ref="angle" class="lcl-works__angle">
				<IconAngleRight></IconAngleRight>
			</div>
		</div>
		<!-- .lcl-works-fv__second -->
	</div>
	<!-- .lcl-works-fv -->
</template>

<style scoped lang="scss">
.lcl-works__fv {
	/* fv-first ------------ */
	.lcl-works-fv__first {
		position: relative;
		border-top-left-radius: max(minpx(32), pcvw(32));
		border-top-right-radius: max(minpx(32), pcvw(32));
		width: 100%;
		height: max(minpx(730), pcvw(730));
		background: $c-orange;
	}
	.BG-noise {
		z-index: 1;
	}
	.lcl-works-ttl {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: $c-black;
	}
	.lcl-works-ttl__txt {
		font-size: max(minpx(208), pcvw(208));
		line-height: 0.9;
	}
	.lcl-works-ttl__dp {
		&:nth-of-type(1) {
			margin-left: max(minpx(121), pcvw(121));
		}
	}
	.lcl-works-ttl__en {
	}
	.ico-star {
		position: absolute;
		top: max(minpx(69), pcvw(69));
		left: max(minpx(30), pcvw(30));
		width: max(minpx(50), pcvw(50));
		height: auto;
	}
	:deep(.ico-star__path) {
		fill: currentColor;
	}

	/* fv-second ------------ */
	.lcl-works-fv__second {
		position: relative;
		width: 100%;
		height: max(minpx(730), pcvw(730));
		background: linear-gradient(180deg, #ff4b12 0%, #101010 100%);
	}
	.works-fv {
		margin-inline: auto 0;
	}
	.lcl-works__angle {
		position: absolute;
		bottom: max(minpx(26), pcvw(26));
		left: max(minpx(232), pcvw(232));
	}
	.ico-angle-right {
		transform: rotate(90deg);
		width: max(minpx(97), pcvw(97));
		height: auto;
	}
	:deep(.ico-angle-right__path) {
		stroke: $c-orange;
	}
}
</style>
