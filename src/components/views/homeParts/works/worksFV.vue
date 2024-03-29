<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import BGNoise from '@/components/parts/BGNoise.vue';
import WorksFVList from '@/components/parts/WorksFVList.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';
import IconStar from '~icons/svg/ico-star';
import { w, h } from '@/store';

const ttlContainer = ref(null);
const ttl = ref(null);
const char = ref(null);
const first = ref(null);
const firstBG = ref(null);
const second = ref(null);
const angle = ref(null);
const fvList = ref(null);

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

			/* Selected Works Title Pin & Scale ------------ */
			gsap.to(ttl.value, {
				scale: isPC ? 0.3007209063 : 0.7965116279,
				x: () => (isPC ? Math.min(-486, Math.max(-486 + -((w - 1300) / 2), -486 - 300)) : (-35 / 375) * w),
				y: () => (isPC ? Math.max(228, (228 / 730) * h) : (270 / 667) * h),
				color: '#FF2E12',
				scrollTrigger: {
					trigger: first.value,
					start: 'top top',
					end: 'bottom top',
					pin: ttlContainer.value,
					pinSpacing: false,
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});
		}
	);

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: first.value,
			start: 'top center',
			end: '30% top',
			scrub: 1,
			ease: 'none',
		},
	});
	tl.from('.lcl-works-ttl__in .ico-star', {
		xPercent: 900,
		scale: 3,
	}).from(
		char.value,
		{
			yPercent: 105,
			stagger: { each: 0.1 },
		},
		'<'
	);

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

	/* first Background ------------ */
	gsap.from(firstBG.value, {
		scale: 0.8,
		scrollTrigger: {
			trigger: first.value,
			start: 'top bottom',
			end: 'top top',
			scrub: 1,
		},
	});

	/* WorksFVList ------------ */
	gsap.from(fvList.value.listitem, {
		yPercent: 50,
		opacity: 0,
		stagger: { each: 0.1 },
		scrollTrigger: {
			trigger: second.value,
			start: 'top 80%',
			end: 'top top',
			scrub: 1,
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
			<div ref="ttlContainer" class="lcl-works-ttl-container">
				<div class="lcl-works-ttl">
					<div ref="ttl" class="lcl-works-ttl__in">
						<IconStar></IconStar>
						<h2 class="lcl-works-ttl__txt">
							<span class="lcl-works-ttl__row">
								<span
									v-for="(_char, index) in ['S', 'e', 'l', 'e', 'c', 't', 'e', 'd']"
									:key="index"
									ref="char"
									class="lcl-works-ttl__char"
									:class="index === 6 || index === 7 ? 'font-dp' : 'font-en'"
								>
									{{ _char }}
								</span>
							</span>
							<br />
							<span class="lcl-works-ttl__row">
								<span
									v-for="(_char, index) in ['W', 'o', 'r', 'k', 's']"
									:key="index"
									ref="char"
									class="lcl-works-ttl__char"
									:class="index === 0 || index === 1 ? 'font-en' : 'font-dp'"
								>
									{{ _char }}
								</span>
							</span>
						</h2>
						<!-- .lcl-works-ttl__txt -->
					</div>
				</div>
				<!-- .lcl-works-ttl -->
			</div>
			<!-- .lcl-works-ttl-container -->
		</div>
		<!-- .lcl-works-fv__first -->
		<div ref="second" class="lcl-works-fv__second">
			<BGNoise :opacity="5"></BGNoise>
			<WorksFVList ref="fvList"></WorksFVList>
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
		display: flex;
		align-items: center;
		width: 100%;
		height: max(730px, 100lvh);
		@include media_narrow {
			height: 100lvh;
		}
	}
	.lcl-works-fv__first-bg {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: bottom;
		overflow: hidden;
		border-top-left-radius: 32px;
		border-top-right-radius: 32px;
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
	.lcl-works-ttl-container {
		z-index: 1;
		position: relative;
		width: 100%;
		height: 50%;
		pointer-events: none;
		@include media_narrow {
			height: 100%;
		}
	}
	.lcl-works-ttl {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: fit-content;
	}
	.lcl-works-ttl__in {
		position: relative;
		color: $c-black;
		pointer-events: all;
	}
	.lcl-works-ttl__row {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		&:nth-of-type(1) {
			margin-left: 121px;
			@include media_narrow {
				margin-left: vw(42);
			}
		}
	}
	.lcl-works-ttl__char {
		transform: translateY(0);
		display: inline-block;
		@include fz(208);
		line-height: 0.9;
		@include media_narrow {
			@include fz(74);
		}
	}
	.ico-star {
		position: absolute;
		top: 69px;
		left: 30px;
		width: 50px;
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
		height: max(730px, 100lvh);
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
			height: 70px;
			background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #101010 70%);
			@include media_narrow {
				height: vw(70);
			}
			/*---------------- before */
		}
	}
	.works-fv {
		margin-inline: auto max(0px, ((100% - 1900px) / 2));
	}
	.lcl-works__angle-wrp {
		position: absolute;
		bottom: 26px;
		overflow: hidden;
		@include media_wide {
			left: max(233px, 233px + ((100% - 1900px) / 2));
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
		width: 97px;
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
