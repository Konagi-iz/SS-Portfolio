<script setup>
import { ref, nextTick, onMounted } from 'vue';
import Button01 from '@/components/parts/Button01.vue';
import { media } from '@/store';
import gsap from 'gsap';
import TextSplit from '@/components/parts/TextSplit.vue';

const topTtl = ref(null);
const topBG = ref(null);
const primary = ref(null);
const design = ref(null);
const coding = ref(null);
const designIcon = ref(null);
const codingIcon = ref(null);
const crossIcon = ref(null);

onMounted(() => {
	nextTick(() => {
		/* パララックス ------------ */
		gsap.to(topTtl.value, {
			yPercent: -50,
			scrollTrigger: {
				trigger: topTtl.value,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1,
			},
		});
		gsap.from(topBG.value, {
			yPercent: 20,
			scrollTrigger: {
				trigger: topBG.value,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1,
			},
		});

		/* Design x Coding ------------ */
		gsap.fromTo(
			design.value,
			{ xPercent: -10 },
			{
				xPercent: 10,
				scrollTrigger: {
					trigger: primary.value,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
				},
			}
		);
		gsap.fromTo(
			coding.value,
			{ xPercent: 10 },
			{
				xPercent: -10,
				scrollTrigger: {
					trigger: primary.value,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
				},
			}
		);
		gsap.to(`.${design.value.classList[0]} .split-span`, {
			y: 0,
			stagger: { each: 0.05 },
			scrollTrigger: {
				trigger: primary.value,
				start: 'top 80%',
				end: 'center center',
				scrub: 1,
			},
		});
		[designIcon.value, codingIcon.value].forEach((icon, i) => {
			gsap.from(icon, {
				xPercent: i < 1 ? -50 : 50,
				opacity: 0,
				scrollTrigger: {
					trigger: icon,
					start: 'top 80%',
					end: 'center center',
					scrub: 1,
				},
			});
		});
		gsap.from(crossIcon.value, {
			rotate: 90,
			opacity: 0,
			scrollTrigger: {
				trigger: primary.value,
				start: 'top 80%',
				end: 'center center',
				scrub: 1,
			},
		});
	});
});
</script>

<template>
	<section class="lcl-about">
		<div class="lcl-about-top">
			<img
				ref="topBG"
				class="lcl-about-top__bg"
				src="/assets/img/home/about/PC/img_bg.png"
				alt=""
				width="1166"
				height="1858"
				loading="lazy"
			/>
			<div class="lcl-about-top__img-wrp">
				<img
					class="lcl-about-top__img"
					src="/assets/img/home/about/PC/img_prof.jpg"
					alt="私のプロフィール写真"
					width="424"
					height="555"
					loading="lazy"
				/>
			</div>
			<!-- .lcl-about-top__img-wrp -->
			<h2 ref="topTtl" class="lcl-about-top-ttl font-dp scr-anin">
				<TextSplit text="Hello!!"></TextSplit>
			</h2>
			<!-- .lcl-about-top-ttl -->
			<div class="lcl-about-top__prof">
				<p class="lcl-about-top__big scr-anin">
					<TextSplit text="初めまして！"></TextSplit>
				</p>
				<!-- prettier-ignore -->
				<p class="lcl-about-top__txt fade-in-btm scr-anin">
					初めまして、島川昌大と申します。<br />
					学校でグラフィックデザインを学ぶ中でコーディングと出会い、<br />
					文字を打ってデザインを組み上げていく面白さを知りました。<br />
					今までデザインを学んできた経験を活かして、<br />
					デザインとコーディングの融合を目指しています！
				</p>
			</div>
			<!-- .lcl-about-top__prof -->
		</div>
		<!-- .lcl-about-top -->

		<div class="lcl-about-btm">
			<img class="lcl-about-btm__bg" src="/assets/img/home/about/PC/img_bg.png" alt="" width="1166" height="1858" loading="lazy" />
			<div ref="primary" class="lcl-about-btm__primary">
				<div ref="design" class="lcl-about-btm-big lcl-about-btm-big--design">
					<p class="lcl-about-btm-big__en font-dp">
						<TextSplit text="Design"></TextSplit>
					</p>
					<img
						ref="designIcon"
						class="lcl-about-btm-big__icon"
						src="/assets/img/home/about/PC/ico_design.svg"
						alt="デザインを模ったアイコン"
						width="280"
						height="240"
						loading="lazy"
					/>
				</div>
				<!-- .lcl-about-btm-big -->
				<div class="lcl-about-btm__cross-wrp">
					<img ref="crossIcon" class="lcl-about-btm__cross" src="/assets/img/home/about/PC/ico_cross.svg" alt="" />
				</div>
				<div ref="coding" class="lcl-about-btm-big lcl-about-btm-big--coding">
					<p class="lcl-about-btm-big__en font-dp">
						<TextSplit text="Coding"></TextSplit>
					</p>
					<img
						ref="codingIcon"
						class="lcl-about-btm-big__icon"
						src="/assets/img/home/about/PC/ico_coding.svg"
						alt="コーディングを模ったアイコン"
						width="280"
						height="240"
						loading="lazy"
					/>
				</div>
				<!-- .lcl-about-btm-big -->
			</div>
			<!-- .lcl-about-btm__primary -->
			<!-- prettier-ignore -->
			<p v-if="media === 'PC'" class="lcl-about-btm__jp-big scr-anin">
				<span class="lcl-about-btm__row">
					<TextSplit text="デザインとコーディングを"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="通じて見る人の心を動かし、"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="ワクワクさせたい。"></TextSplit>
				</span>
			</p>
			<!-- prettier-ignore -->
			<p v-else-if="media === 'SP'" class="lcl-about-btm__jp-big scr-anin">
				<span class="lcl-about-btm__row">
					<TextSplit text="デザインと"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="コーディングを"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="通じて見る人の"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="心を動かし、"></TextSplit>
				</span><br />
				<span class="lcl-about-btm__row">
					<TextSplit text="ワクワクさせたい。"></TextSplit>
				</span>
			</p>
			<!-- .lcl-about-btm__jp-big -->
			<!-- prettier-ignore -->
			<p v-if="media === 'PC'" class="lcl-about-btm__txt fade-in-btm scr-anin">
				デザインだけ、コーディングだけではなく、<br />
				そのどちらもできる人になりたいと考えています。<br />
				デザインが分かるからこそできるコーディング、その逆も然り、<br />
				デザイナーとエンジニアの橋渡し役のような存在こそ私の目指す所です。
			</p>
			<!-- prettier-ignore -->
			<p v-if="media === 'SP'" class="lcl-about-btm__txt fade-in-btm scr-anin">
				デザインだけ、コーディングだけではなく、<br />
				そのどちらもできる人になりたいと考えています。<br />
				デザインが分かるからこそできるコーディング、その逆も然り、<br />
				デザイナーとエンジニアの橋渡し役のような存在こそ<br />
				私の目指す所です。
			</p>
			<!-- .lcl-about-btm__txt -->
			<router-link :to="{ name: 'about' }" class="lcl-about-btm__link fade-in-btm scr-anin">
				<Button01 v-bind="{ isBig: true, color: 'white', txt: 'ABOUT ME' }"></Button01>
			</router-link>
		</div>
		<!-- .lcl-about-btm -->
	</section>
</template>

<style scoped lang="scss">
.lcl-about {
	position: relative;
	padding-top: 320px;
	width: 100%;
	@include media_narrow {
		padding-top: vw(200);
	}

	/* about-top ------------ */
	.lcl-about-top {
		position: relative;
		border-bottom: 1px solid $c-gray;
		padding-bottom: 130px;
		@include media_narrow {
			padding-bottom: vw(100);
		}
	}
	.lcl-about-top__bg {
		z-index: -1;
		position: absolute;
		top: 122px;
		right: -372px;
		transform: rotate(-90deg);
		width: 954px;
		height: 954px;
		@include media_narrow {
			top: vw(290);
			right: vw(-119);
			width: vw(387);
			height: vw(387);
		}
	}
	.lcl-about-top__img-wrp {
		overflow: hidden;
		border-radius: 16px;
		margin-inline: auto;
		width: fit-content;
		@include media_narrow {
			border-radius: vw(8);
		}
	}
	.lcl-about-top__img {
		width: 424px;
		@include media_narrow {
			width: vw(247);
		}
	}
	.lcl-about-top-ttl {
		position: absolute;
		top: 68px;
		left: 0;
		overflow: hidden;
		width: 100%;
		color: $c-orange;
		@include fz(418);
		font-style: italic;
		line-height: 1.2;
		white-space: nowrap;
		@include delay(7);
		@include media_narrow {
			top: vw(78);
			@include fz(118);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			transition: transform 1.5s $e-out-expo;
			@include delay(7, 0.1);
		}
	}
	// about-top-prof
	.lcl-about-top__prof {
		display: flex;
		flex-direction: column;
		gap: 50px;
		margin-top: 115px;
		color: $c-white;
		@include media_wide {
			margin-inline: auto calc((100% - 1000px) / 2);
			width: fit-content;
		}
		@include media_narrow {
			gap: vw(40);
			margin-top: vw(98);
			padding-left: vw(15);
		}
	}
	.lcl-about-top__big {
		overflow: hidden;
		@include ttl-basic;
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(6);
		}
	}
	.lcl-about-top__txt {
		@include txt-basic;
	}

	/* about-btm ------------ */
	.lcl-about-btm {
		position: relative;
		padding-block: 126px 172px;
		@include media_narrow {
			padding-bottom: vw(100) vw(150);
		}
	}
	.lcl-about-btm__bg {
		z-index: -1;
		position: absolute;
		bottom: 238px;
		left: -343px;
		width: 923px;
		@include media_narrow {
			top: vw(454);
			left: vw(-158);
			width: vw(379);
		}
	}
	.lcl-about-btm__primary {
		position: relative;
		margin-inline: auto;
		width: min(1206px, 100%);
		@include media_narrow {
			width: 100%;
		}
	}
	.lcl-about-btm-big {
		display: flex;
		align-items: center;
		gap: vwclamp(63, 1024, 1206);
		@include media_narrow {
			gap: vw(17);
		}
	}
	.lcl-about-btm-big__en {
		clip-path: inset(0 0 -15% 0);
		color: $c-orange;
		@include fz(212);
		font-size: vwclamp(212, 1024, 1206);
		line-height: 0.9;
		@include media_narrow {
			@include fz(68);
		}
		:deep(.split-span) {
			transition: none;
		}
	}
	.lcl-about-btm-big__icon {
		width: vwclamp(280, 1024, 1206);
		@include media_narrow {
			width: vw(108);
		}
	}
	.lcl-about-btm-big--coding {
		flex-direction: row-reverse;
		margin-top: vwclamp(125, 1024, 1206);
		@include media_narrow {
			margin-top: vw(30);
		}
	}
	.lcl-about-btm__cross-wrp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.lcl-about-btm__cross {
		@include media_narrow {
			width: vw(54);
		}
	}
	.lcl-about-btm__row {
		display: inline-block;
		overflow: hidden;
	}
	.lcl-about-btm__jp-big {
		margin-top: 150px;
		margin-inline: auto;
		width: min(1206px, 100%);
		@include media_narrow {
			margin-top: vw(100);
			padding-left: vw(15);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include ttl-basic;
			@include delay(13);
		}
	}
	.lcl-about-btm__txt {
		margin-top: 92px;
		@include txt-basic;
		@include media_wide {
			margin-left: calc((100% - 1000px) / 2);
		}
		@include media_narrow {
			margin-top: vw(70);
			padding-left: vw(15);
		}
	}
	.lcl-about-btm__link {
		display: inline-block;
		margin-top: 35px;
		@include media_wide {
			margin-left: calc((100% - 1000px) / 2);
		}
		@include media_narrow {
			margin-top: vw(30);
			padding-left: vw(15);
		}
	}
}
</style>
