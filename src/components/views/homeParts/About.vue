<script setup>
import { onMounted } from 'vue';
import Button01 from '@/components/parts/Button01.vue';
import { media } from '@/store';
import gsap from 'gsap';

onMounted(() => {
	/* パララックス ------------ */
	gsap.to('.lcl-about-top-ttl', {
		yPercent: -50,
		scrollTrigger: {
			trigger: '.lcl-about-top-ttl',
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1,
		},
	});
	gsap.from('.lcl-about-top__bg', {
		yPercent: 20,
		scrollTrigger: {
			trigger: '.lcl-about-top__bg',
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1,
		},
	});
});
</script>

<template>
	<section class="lcl-about">
		<div class="lcl-about-top">
			<img class="lcl-about-top__bg" src="/assets/img/home/about/PC/img_bg.png" alt="" width="1166" height="1858" loading="lazy" />
			<div class="lcl-about-top__img-wrp">
				<img
					class="lcl-about-top__img"
					src="/assets/img/home/about/PC/img_prof.jpg"
					alt="カメラを構えている私の写真"
					width="424"
					height="555"
					loading="lazy"
				/>
			</div>
			<!-- .lcl-about-top__img-wrp -->
			<h2 class="lcl-about-top-ttl scr-anin">
				<span v-for="(word, index) in ['H', 'e', 'l', 'l', 'o', '!', '!']" :key="index" class="lcl-about-top-ttl__word font-dp">
					{{ word }}
				</span>
			</h2>
			<!-- .lcl-about-top-ttl -->
			<div class="lcl-about-top__prof">
				<p class="lcl-about-top__big js-txt-span scr-anin">初めまして！</p>
				<p class="lcl-about-top__txt scr-anin">
					<span class="lcl-about-top__row">初めまして、島川昌大と申します。</span>
					<br />
					<span class="lcl-about-top__row">学校でグラフィックデザインを学ぶ中でコーディングと出会い、</span>
					<br />
					<span class="lcl-about-top__row">文字を打ってデザインを組み上げていく面白さを知りました。</span>
					<br />
					<span class="lcl-about-top__row">今までデザインを学んできた経験を活かして、</span>
					<br />
					<span class="lcl-about-top__row">デザインとコーディングの融合を目指しています！</span>
				</p>
			</div>
			<!-- .lcl-about-top__prof -->
		</div>
		<!-- .lcl-about-top -->

		<div class="lcl-about-btm">
			<img class="lcl-about-btm__bg" src="/assets/img/home/about/PC/img_bg.png" alt="" width="1166" height="1858" loading="lazy" />
			<div class="lcl-about-btm__primary">
				<div class="lcl-about-btm-big">
					<p class="lcl-about-btm-big__en font-dp">Design</p>
					<img
						class="lcl-about-btm-big__icon"
						src="/assets/img/home/about/PC/ico_design.svg"
						alt="デザインを模ったアイコン"
						width="280"
						height="240"
						loading="lazy"
					/>
				</div>
				<!-- .lcl-about-btm-big -->
				<img class="lcl-about-btm__cross" src="/assets/img/home/about/PC/ico_cross.svg" alt="" />
				<div class="lcl-about-btm-big lcl-about-btm-big--reverse">
					<p class="lcl-about-btm-big__en font-dp">Coding</p>
					<img
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
			<p v-if="media === 'PC'" class="lcl-about-btm__jp-big">
				<span class="lcl-about-btm__row js-txt-span">デザインとコーディングを</span><br />
				<span class="lcl-about-btm__row js-txt-span">通じて見る人の心を動かし、</span><br />
				<span class="lcl-about-btm__row js-txt-span">ワクワクさせたい。</span>
			</p>
			<!-- prettier-ignore -->
			<p v-else-if="media === 'SP'" class="lcl-about-btm__jp-big">
				<span class="lcl-about-btm__row js-txt-span">デザインと</span><br />
				<span class="lcl-about-btm__row js-txt-span">コーディングを</span><br />
				<span class="lcl-about-btm__row js-txt-span">通じて見る人の</span><br />
				<span class="lcl-about-btm__row js-txt-span">心を動かし、</span><br />
				<span class="lcl-about-btm__row js-txt-span">ワクワクさせたい。</span>
			</p>
			<!-- .lcl-about-btm__jp-big -->
			<!-- prettier-ignore -->
			<p v-if="media === 'PC'" class="lcl-about-btm__txt">
				<span class="lcl-about-btm__row js-txt-span">デザインだけ、コーディングだけではなく、</span><br />
				<span class="lcl-about-btm__row js-txt-span">そのどちらもできる人になりたいと考えています。</span><br />
				<span class="lcl-about-btm__row js-txt-span">デザインが分かるからこそできるコーディング、その逆も然り、</span><br />
				<span class="lcl-about-btm__row js-txt-span">デザイナーとエンジニアの橋渡し役のような存在こそ私の目指す所です。</span>
			</p>
			<!-- prettier-ignore -->
			<p v-if="media === 'SP'" class="lcl-about-btm__txt">
				<span class="lcl-about-btm__row js-txt-span">デザインだけ、コーディングだけではなく、</span><br />
				<span class="lcl-about-btm__row js-txt-span">そのどちらもできる人になりたいと考えています。</span><br />
				<span class="lcl-about-btm__row js-txt-span">デザインが分かるからこそできるコーディング、その逆も然り、</span><br />
				<span class="lcl-about-btm__row js-txt-span">デザイナーとエンジニアの橋渡し役のような存在こそ</span><br />
				<span class="lcl-about-btm__row js-txt-span">私の目指す所です。</span>
			</p>
			<!-- .lcl-about-btm__txt -->
			<router-link :to="{ name: 'about' }" class="lcl-about-btm__link">
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
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		white-space: nowrap;
		@include media_narrow {
			top: vw(78);
		}
		&.scr-anin--on .lcl-about-top-ttl__word {
			transform: translateY(0);
		}
	}
	.lcl-about-top-ttl__word {
		transform: translateY(100%);
		display: inline-block;
		color: $c-orange;
		@include fz(418);
		font-style: italic;
		line-height: 1.2;
		transition: transform 1.5s $e-out-expo;
		@include delay(7);
		@include media_narrow {
			@include fz(118);
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
		:deep(.split-span) {
			@include delay(6);
		}
	}
	.lcl-about-top__txt {
		opacity: 0;
		transform: translateY(100%) rotate(-2deg);
		@include txt-basic;
		transition: transform 1.2s $e-out-circ, opacity 1.2s $e-out-circ;
		&.scr-anin--on {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
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
		color: $c-orange;
		@include fz(212);
		font-size: vwclamp(212, 1024, 1206);
		line-height: 0.9;
		@include media_narrow {
			@include fz(68);
		}
	}
	.lcl-about-btm-big__icon {
		width: vwclamp(280, 1024, 1206);
		@include media_narrow {
			width: vw(108);
		}
	}
	.lcl-about-btm-big--reverse {
		flex-direction: row-reverse;
		margin-top: vwclamp(125, 1024, 1206);
		@include media_narrow {
			margin-top: vw(30);
		}
	}
	.lcl-about-btm__cross {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@include media_narrow {
			width: vw(54);
		}
	}
	.lcl-about-btm__jp-big {
		margin-top: 150px;
		margin-inline: auto;
		width: min(1206px, 100%);
		@include ttl-basic;
		@include media_narrow {
			margin-top: vw(100);
			padding-left: vw(15);
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
