<script setup>
import { ref } from 'vue';
import { register } from 'swiper/element';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';

register();
</script>

<template>
	<section class="lcl-fv">
		<swiper-container
			:modules="[Autoplay, EffectCreative, Pagination]"
			:autoplay="{
				delay: 10000,
				disableOnInteraction: false,
			}"
			:loop="true"
			:loop-additional-slides="1"
			:slides-per-view="'auto'"
			:speed="0"
			:pagination="{
				el: '.lcl-fv-pagination',
				clickable: true,
				type: 'bullets',
			}"
			class="lcl-fv-slider"
		>
			<swiper-slide v-for="(item, index) in 5" :key="index" class="lcl-fv-slider__slide">
				<img
					class="lcl-fv-slider__img"
					:src="`/assets/img/photography/PC/img_fv_0${index + 1}.jpg`"
					:alt="`マジックアワーの写真${index + 1}`"
					width="1560"
					height="1404"
				/>
			</swiper-slide>
			<div slot="container-end" class="lcl-fv-pagination"></div>
		</swiper-container>
	</section>
</template>

<style scoped lang="scss">
.lcl-fv {
	position: relative;
	width: 100%;
	height: 730px;
	.lcl-fv-slider {
		width: 100%;
		height: 100%;
	}
	.lcl-fv-slider__slide {
		// transform: none !important;
		width: 10% !important;
		height: 100%;
		transition: width 0.8s $e-out-expo;
	}
	.lcl-fv-slider__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* swiper ------------ */
	.swiper-wrapper {
		// display: flex !important;
	}
	.swiper-slide-active {
		width: 60% !important;
	}
}
</style>
