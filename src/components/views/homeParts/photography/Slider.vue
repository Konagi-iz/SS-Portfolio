<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

const modules = [Autoplay, EffectFade, Pagination];
</script>

<template>
	<div class="lcl-slider">
		<Swiper
			class="lcl-slider__slider"
			:modules="modules"
			:loop="true"
			:loop-additional-slides="1"
			:pagination="{ clickable: true }"
			:speed="600"
			slidesPerView="auto"
		>
			<SwiperSlide v-for="(item, index) in 8" :key="index" class="lcl-slider__slide" :style="`--index: ${index};`">
				<img class="lcl-slider__img" :src="`/assets/img/home/photo/PC/img_0${index + 1}.png`" alt="" width="558" height="558" loading="lazy" />
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped lang="scss">
.lcl-slider {
	.lcl-slider__slider {
		position: relative;
		width: 100%;
		height: max(minpx(1854), pcvw(1854));
	}
	.lcl-slider__slide {
		--angle: calc(360deg / 8 * var(--index));
		--x: calc(cos(var(--angle)) * (max(#{minpx(558)}, #{pcvw(558)}) / 2));
		--y: calc(sin(var(--angle)) * (max(#{minpx(558)}, #{pcvw(558)}) / 2));
		position: absolute;
		top: 50%;
		left: 50%;
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		width: fit-content;
	}
	.lcl-slider__img {
	}
}
</style>
