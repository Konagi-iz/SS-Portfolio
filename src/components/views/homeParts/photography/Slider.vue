<script setup>
import { ref } from 'vue';
import IconAngleRight from '~icons/svg/ico-angle-right';

const currentIndex = ref(0);
const currentRotate = ref(0);
const isTransitionEnd = ref(true);
const isRotateReset = ref(false);
const speed = 1200;

const slidePrev = () => {
	if (isTransitionEnd.value) {
		currentRotate.value += 45;
		if (currentIndex.value === 0) {
			currentIndex.value = 7;
			setTimeout(() => {
				isRotateReset.value = true;
				currentRotate.value = -45 * currentIndex.value;
				setTimeout(() => {
					isRotateReset.value = false;
				}, 1);
			}, speed);
		} else {
			currentIndex.value--;
		}
		isTransitionEnd.value = false;
	}
};

const slideNext = () => {
	if (isTransitionEnd.value) {
		currentRotate.value -= 45;
		if (currentIndex.value === 7) {
			currentIndex.value = 0;
			// setTimeout(() => {
			// 	isRotateReset.value = true;
			// 	currentRotate.value = -45 * currentIndex.value;
			// 	// isRotateReset.value = false;
			// }, speed);
		} else {
			currentIndex.value++;
		}
		isTransitionEnd.value = false;
	}
};

const slideIndex = (index) => {
	currentRotate.value -= 45 * (index - currentIndex.value);
	currentIndex.value = index;
};
</script>

<template>
	<div class="lcl-slider">
		<div class="lcl-slider__slider">
			<div
				@transitionend="isTransitionEnd = true"
				class="lcl-slider__wrapper"
				:style="`rotate: ${currentRotate}deg; transition-duration: ${isRotateReset ? 0 : speed / 1000}s; transition-property: ${
					isRotateReset ? 'none' : 'rotate'
				}`"
			>
				<!-- :style="`rotate: ${currentRotate}deg`" -->
				<div
					v-for="(item, index) in 8"
					:key="index"
					class="lcl-slider__slide"
					:class="{ 'lcl-slider__slide--active': currentIndex == index }"
					:style="`--index: ${index};`"
				>
					<img
						class="lcl-slider__img"
						:src="`/assets/img/home/photo/PC/img_0${index + 1}.png`"
						alt=""
						width="558"
						height="558"
						loading="lazy"
					/>
				</div>
				<!-- .lcl-slider__slide -->
			</div>
			<!-- .lcl-slider__wrapper -->
			<button @click="slidePrev" class="lcl-slider__btn lcl-slider__btn--prev">
				<IconAngleRight></IconAngleRight>
			</button>
			<!-- .lcl-slider__btn -->
			<button @click="slideNext" class="lcl-slider__btn lcl-slider__btn--next">
				<IconAngleRight></IconAngleRight>
			</button>
			<!-- .lcl-slider__btn -->
			<div class="lcl-slider__pagination">
				<span @click="slideIndex(index)" v-for="(item, index) in 8" :key="index" class="lcl-slider__bullet"></span>
			</div>
			<!-- .lcl-slider__pagination -->
		</div>
		<!-- .lcl-slider__slider -->
	</div>
</template>

<style scoped lang="scss">
.lcl-slider {
	overflow: hidden;
	.lcl-slider__slider {
		position: relative;
		margin-top: max(minpx(90), pcvw(90));
		width: 100%;
		height: max(minpx(809), pcvw(809));
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: max(minpx(269), pcvw(269));
			background: linear-gradient(180deg, rgba(226, 226, 226, 0) 0%, #e2e2e2 69.27%);
			/*---------------- after */
		}
	}
	.lcl-slider__wrapper {
		position: absolute;
		top: 0;
		left: 50%;
		translate: -50% 0;
		width: max(minpx(2278), pcvw(2278));
		height: max(minpx(2278), pcvw(2278));
		transition-timing-function: $e-out2;
	}
	.lcl-slider__slide {
		--angle: calc(360deg / 8 * var(--index) - 90deg);
		--x: calc(cos(var(--angle)) * (max(#{minpx(926.5)}, #{pcvw(926.5)})));
		--y: calc(sin(var(--angle)) * (max(#{minpx(926.5)}, #{pcvw(926.5)})));
		position: absolute;
		top: 50%;
		left: 50%;
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		rotate: calc(45deg * var(--index));
		width: max(minpx(425), pcvw(425));
		height: max(minpx(425), pcvw(425));
		transition: scale 0.7s $e-out2;
	}
	.lcl-slider__slide--active {
		scale: 1.3;
	}
	.lcl-slider__img {
		width: 100%;
		height: 100%;
	}

	/* button ------------ */
	.lcl-slider__btn {
		position: absolute;
		top: max(minpx(175.5), pcvw(175.5));
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: max(minpx(73), pcvw(73));
		height: max(minpx(73), pcvw(73));
		background: $c-orange;
	}
	.lcl-slider__btn--prev {
		left: #{max(minpx(268), pcvw(268))};
		.ico-angle-right {
			transform: scaleX(-1);
		}
	}
	.lcl-slider__btn--next {
		left: #{max(minpx(959), pcvw(959))};
	}
	.ico-angle-right {
		width: 44px;
		height: auto;
	}

	/* pagination ------------ */
	.lcl-slider__pagination {
		position: absolute;
		top: max(minpx(511), pcvw(511));
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		width: fit-content;
	}
	.lcl-slider__bullet {
		position: relative;
		box-sizing: content-box;
		padding: max(minpx(3), pcvw(3));
		width: max(minpx(8), pcvw(8));
		height: max(minpx(8), pcvw(8));
		cursor: pointer;
		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 999px;
			background: $c-lightgray;
			/*---------------- after */
		}
	}
}
</style>
