<script setup>
import Slider from '@/components/views/homeParts/photography/Slider.vue';
</script>

<template>
	<section class="lcl-photo">
		<div class="lcl-photo-ttl">
			<img class="lcl-photo__icon" src="/assets/img/home/photo/PC/ico-photo.svg" alt="" width="142" height="142" loading="lazy" />
			<h2 class="lcl-photo-ttl__txt">
				<span class="lcl-photo-ttl__en font-en">Photo</span>
				<span class="lcl-photo-ttl__dp font-dp">graphy</span>
			</h2>
			<!-- .lcl-photo-ttl__txt -->
		</div>
		<!-- .lcl-photo-ttl -->
		<div class="lcl-photo-desc">
			<p class="lcl-photo-desc__jp">
				カメラが好きです。
				<br />
				写真を撮ります。
				<br />
				風景スナップや
				<br />
				ストリートスナップ、
				<br />
				ポートレートなど。
			</p>
			<!-- .lcl-photo-desc__jp -->
			<p class="lcl-photo-desc__en font-en">
				Camera : Fujifilm X-T5
				<br />
				Lens : Sigma 18-50mm F2.8
			</p>
			<!-- .lcl-photo-desc__en -->
		</div>
		<!-- .lcl-photo-desc -->
		<Slider></Slider>
	</section>
</template>

<style scoped lang="scss">
.lcl-photo {
	position: relative;
	padding-block: 439px 202px;
	width: 100%;
	background: $c-offwhite;
	.lcl-photo-ttl {
		z-index: 1;
		position: absolute;
		top: 176px;
		left: calc((100% - 1000px) / 2);
		display: flex;
	}
	.lcl-photo__icon {
		width: 142px;
		height: 142px;
	}
	.lcl-photo-ttl__txt {
		color: $c-orange;
	}
	.lcl-photo-ttl__en {
		display: block;
		@include fz(195);
		line-height: 0.75;
	}
	.lcl-photo-ttl__dp {
		display: block;
		margin-left: 157px;
		@include fz(187);
		line-height: 0.75;
	}
	.lcl-photo-desc {
		position: absolute;
		top: 429px;
		left: calc((100% - 1000px) / 2);
		color: $c-orange;
	}
	.lcl-photo-desc__jp {
		@include txt-basic--bold;
	}
	.lcl-photo-desc__en {
		margin-top: 48px;
		@include fz(12);
		font-weight: 700;
		line-height: 1.9;
	}
}
</style>
