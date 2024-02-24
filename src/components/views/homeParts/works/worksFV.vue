<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import WorksFVList from '@/components/parts/WorksFVList.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';
import IconStar from '~icons/svg/ico-star';

const ttl = ref(null);
const first = ref(null);
const firstBG = ref(null);
const second = ref(null);
const angle = ref(null);

onMounted(() => {
	const mm = gsap.matchMedia();
	const breakPoint = 678;

	mm.add(
		{
			isPC: `(min-width: ${breakPoint}px)`,
			isSP: `(max-width: ${breakPoint - 1}px)`,
		},
		(context) => {
			let { isPC, isSP } = context.conditions;

			/* Selected Works ------------ */
			gsap.to(ttl.value, {
				scale: isPC ? 0.3007209063 : 0.7965116279,
				xPercent: isPC ? -100 : -60,
				yPercent: isPC ? 10 : 127,
				color: '#FF2E12',
				scrollTrigger: {
					trigger: first.value,
					start: 'top top',
					end: 'bottom top',
					pin: ttl.value,
					pinSpacing: false,
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});
			gsap.from(angle.value, {
				yPercent: -200,
				duration: 1.2,
				ease: 'expo',
				scrollTrigger: {
					trigger: second.value,
					start: 'bottom bottom',
					toggleActions: 'play none none reverse',
				},
			});
		}
	);

	gsap.from(firstBG.value, {
		scale: 0.8,
		scrollTrigger: {
			trigger: first.value,
			start: 'top bottom',
			end: 'top top',
			scrub: 1,
			markers: true,
		},
	});
});
</script>

<template>
	<div class="lcl-works__fv">
		<div ref="first" class="lcl-works-fv__first">
			<div ref="firstBG" class="lcl-works-fv__first-bg">
				<BGNoise :opacity="5"></BGNoise>
			</div>
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
			<div class="lcl-works__angle-wrp">
				<div ref="angle" class="lcl-works__angle">
					<IconAngleRight></IconAngleRight>
				</div>
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
		width: 100%;
		height: max(minpx(730), pcvw(730));
		@include media_narrow {
			height: 100lvh;
		}
	}
	.lcl-works-fv__first-bg {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: bottom;
		overflow: hidden;
		border-top-left-radius: max(minpx(32), pcvw(32));
		border-top-right-radius: max(minpx(32), pcvw(32));
		width: 100%;
		height: 100%;
		background: $c-orange;
		@include media_narrow {
			border-top-left-radius: vw(16);
			border-top-right-radius: vw(16);
		}
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
		width: fit-content;
		color: $c-black;
	}
	.lcl-works-ttl__txt {
		font-size: max(minpx(208), pcvw(208));
		line-height: 0.9;
		@include media_narrow {
			@include fz(74);
		}
	}
	.lcl-works-ttl__dp {
		&:nth-of-type(1) {
			margin-left: max(minpx(121), pcvw(121));
			@include media_narrow {
				margin-left: vw(42);
			}
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
		@include media_narrow {
			top: vw(25);
			left: vw(11);
			width: vw(18);
		}
	}
	:deep(.ico-star__path) {
		fill: currentColor;
	}

	/* fv-second ------------ */
	.lcl-works-fv__second {
		z-index: 0;
		position: relative;
		width: 100%;
		height: max(minpx(730), pcvw(730));
		background: linear-gradient(180deg, #ff2e12 0%, #101010 100%);
		@include media_narrow {
			height: 100lvh;
		}
		&::before {
			content: '';
			z-index: 1;
			position: absolute;
			bottom: 0;
			left: 0;
			transform: translateY(100%);
			width: 100%;
			height: max(minpx(70), pcvw(70));
			background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #101010 70%);
			@include media_narrow {
				height: vw(70);
			}
			/*---------------- before */
		}
	}
	.works-fv {
		margin-inline: auto 0;
	}
	.lcl-works__angle-wrp {
		position: absolute;
		bottom: max(minpx(26), pcvw(26));
		overflow: hidden;
		@include media_wide {
			left: max(minpx(232), pcvw(232));
		}
		@include media_narrow {
			bottom: vw(15);
			right: vw(3);
		}
	}
	.lcl-works__angle {
	}
	.ico-angle-right {
		transform: rotate(90deg);
		width: max(minpx(97), pcvw(97));
		height: auto;
		@include media_narrow {
			width: vw(97);
		}
	}
	:deep(.ico-angle-right__path) {
		stroke: $c-orange;
	}
}
</style>
