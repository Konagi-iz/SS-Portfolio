<script setup></script>

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
			<div class="lcl-about-btm__primary">
				<div class="lcl-about-btm-big">
					<p class="lcl-about-btm-big__en">Design</p>
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
				<div class="lcl-about-btm-big lcl-about-btm-big--reverse">
					<p class="lcl-about-btm-big__en">Cording</p>
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
		</div>
	</section>
</template>

<style scoped lang="scss">
.lcl-about {
	position: relative;
	width: 100%;

	/* about-top ------------ */
	.lcl-about-top {
		position: relative;
		border-bottom: 1px solid $c-gray;
		padding-block: 74px 128px;
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
}
</style>
