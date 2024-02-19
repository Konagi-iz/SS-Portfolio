<script setup>
import Button01 from '@/components/parts/Button01.vue';
</script>

<template>
	<section class="lcl-about">
		<div class="lcl-about-top">
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
			<h2 class="lcl-about-top-ttl">
				<span v-for="(word, index) in ['H', 'e', 'l', 'l', 'o', '!', '!']" :key="index" class="lcl-about-top-ttl__word font-dp">
					{{ word }}
				</span>
			</h2>
			<!-- .lcl-about-top-ttl -->
			<div class="lcl-about-top__prof">
				<p class="lcl-about-top__txt">
					<span class="lcl-about-top__jp js-txt-span">初めまして</span>
				</p>
				<p class="lcl-about-top__txt">
					<span class="lcl-about-top__en font-dp js-txt-span">Shimakawa</span>
				</p>
				<p class="lcl-about-top__txt">
					<span class="lcl-about-top__en font-dp js-txt-span">Shodai</span>
					<span class="lcl-about-top__jp js-txt-span">と申します。</span>
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
			<div class="lcl-about-btm__jp">
				<p class="lcl-about-btm__txt js-txt-span dn-n">を通じて見る人の心を動かし、 ワクワクさせることが 私の指針です。</p>
				<p class="lcl-about-btm__txt js-txt-span dn-w">を通じて見る人の 心を動かし、 ワクワクさせることが 私の指針です。</p>
			</div>
			<!-- .lcl-about-btm__jp -->
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
	padding-top: 240px;
	width: 100%;

	/* about-top ------------ */
	.lcl-about-top {
		position: relative;
		border-bottom: 1px solid $c-gray;
		padding-bottom: 128px;
	}
	.lcl-about-top__img-wrp {
		overflow: hidden;
		border-radius: 16px;
		margin-inline: auto;
		width: fit-content;
	}
	.lcl-about-top__img {
		width: 424px;
	}
	.lcl-about-top-ttl {
		position: absolute;
		top: 68px;
		left: 50%;
		transform: translateX(-50%);
	}
	.lcl-about-top-ttl__word {
		color: $c-orange;
		@include fz(418);
		font-style: italic;
		line-height: 1.2;
	}
	// about-top-prof
	.lcl-about-top__prof {
		margin-top: 115px;
		margin-inline: auto;
		width: fit-content;
	}
	.lcl-about-top__txt {
		width: fit-content;
	}
	.lcl-about-top__jp {
		color: $c-white;
		@include ttl-basic;
	}
	.lcl-about-top__en {
		color: $c-orange;
		@include ttl-display;
	}

	/* about-btm ------------ */
	.lcl-about-btm {
		position: relative;
		margin-inline: auto;
		padding-block: 116px 172px;
		width: min(1206px, 100%);
	}
	.lcl-about-btm__bg {
		z-index: -1;
		position: absolute;
		bottom: 100px;
		left: -343px;
		width: 923px;
	}
	.lcl-about-btm__primary {
		position: relative;
	}
	.lcl-about-btm-big {
		display: flex;
		align-items: center;
		gap: vwclamp(63, 1024, 1206);
	}
	.lcl-about-btm-big__en {
		color: $c-orange;
		@include fz(212);
		font-size: vwclamp(212, 1024, 1206);
		line-height: 0.9;
	}
	.lcl-about-btm-big__icon {
		width: vwclamp(280, 1024, 1206);
	}
	.lcl-about-btm-big--reverse {
		flex-direction: row-reverse;
		margin-top: vwclamp(125, 1024, 1206);
	}
	.lcl-about-btm__cross {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.lcl-about-btm__jp {
		margin-top: 150px;
	}
	.lcl-about-btm__txt {
		@include ttl-basic;
		font-size: vwclamp(72, 1024, 1206);
	}
	.lcl-about-btm__link {
		display: inline-block;
		margin-top: 64px;
	}
}
</style>
