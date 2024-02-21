<script setup>
import { ref } from 'vue';
import IconAngleRight from '~icons/svg/ico-angle-right';

const currentIndex = ref(0);
const currentRotate = ref(0);
const isTransitionEnd = ref(true);
const isTransitionEnabled = ref(true);
const slideActiveClassFlag = ref(true);
const speed = 800;
const realSpeed = ref(speed);

const slideToPrev = () => {
	slideActiveClassFlag.value = false;

	if (isTransitionEnd.value) {
		isTransitionEnabled.value = true;
		currentRotate.value += 45;

		if (currentIndex.value === 0) {
			currentIndex.value = 7;
		} else {
			currentIndex.value--;
		}

		isTransitionEnd.value = false;
	}
};

const slideToNext = () => {
	slideActiveClassFlag.value = false;

	if (isTransitionEnd.value) {
		isTransitionEnabled.value = true;
		currentRotate.value -= 45;

		if (currentIndex.value === 7) {
			currentIndex.value = 0;
		} else {
			currentIndex.value++;
		}

		isTransitionEnd.value = false;
	}
};

const slideToIndex = (toIndex) => {
	slideActiveClassFlag.value = false;

	if (isTransitionEnd.value) {
		isTransitionEnabled.value = true;

		// 時計回り(clockwise)と反時計回り(counterclockwise)の時の目標までの移動距離を取得
		const clockwiseGap = toIndex - currentIndex.value;
		const counterclockwiseGap = clockwiseGap > 0 ? clockwiseGap - 8 : clockwiseGap + 8;

		// 時計回りと反時計回りを比較し、移動距離が小さい方を返す
		const rotate = Math.abs(clockwiseGap) < Math.abs(counterclockwiseGap) ? clockwiseGap : counterclockwiseGap;

		//　移動距離に応じて0.23秒ずつspeedを遅くする
		realSpeed.value = speed + 230 * (Math.abs(rotate) - 1);

		currentRotate.value -= 45 * rotate;
		currentIndex.value = toIndex;
		isTransitionEnd.value = false;
	}
};

const onTransitionEnd = () => {
	isTransitionEnd.value = true;
	realSpeed.value = speed;
	slideActiveClassFlag.value = true;

	if (currentIndex.value === 0 || currentIndex.value === 7) {
		isTransitionEnabled.value = false;
		currentRotate.value = -45 * currentIndex.value;
	}
};
</script>

<template>
	<div class="lcl-slider">
		<div class="lcl-slider__slider">
			<div
				@transitionend.self="onTransitionEnd"
				class="lcl-slider__wrapper"
				:style="`rotate: ${currentRotate}deg; transition-duration: ${isTransitionEnabled ? realSpeed / 1000 : 0}s; transition-property: ${
					isTransitionEnabled ? 'rotate' : 'none'
				}`"
			>
				<div
					v-for="(item, index) in 8"
					:key="index"
					class="lcl-slider__slide"
					:class="{ 'lcl-slider__slide--active': slideActiveClassFlag && currentIndex == index }"
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
			<button @click="slideToPrev" class="lcl-slider__btn lcl-slider__btn--prev">
				<IconAngleRight></IconAngleRight>
			</button>
			<!-- .lcl-slider__btn -->
			<button @click="slideToNext" class="lcl-slider__btn lcl-slider__btn--next">
				<IconAngleRight></IconAngleRight>
			</button>
			<!-- .lcl-slider__btn -->
			<div class="lcl-slider__pagination">
				<span
					@click="slideToIndex(index)"
					v-for="(item, index) in 8"
					:key="index"
					class="lcl-slider__bullet"
					:class="{ 'lcl-slider__bullet--active': currentIndex == index }"
				></span>
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
		transition-timing-function: cubic-bezier(0.22, 1, 0.48, 1);
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
		transition: scale 0.9s $e-out2;
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
		transition: background 0.4s $e-out2;
		@include media_hover {
			&:hover {
				background: $c-white;
			}
			&:hover :deep(.ico-angle-right__path) {
				stroke: $c-orange;
			}
		}
	}
	.lcl-slider__btn--prev {
		left: max(minpx(268), pcvw(268));
		.ico-angle-right {
			transform: scaleX(-1);
		}
	}
	.lcl-slider__btn--next {
		left: max(minpx(959), pcvw(959));
	}
	.ico-angle-right {
		width: max(minpx(44), pcvw(44));
		height: auto;
	}
	:deep(.ico-angle-right__path) {
		transition: stroke 0.4s $e-out2;
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
		transition: transform 0.4s ease-out, width 1.2s $e-out2;
		cursor: pointer;
		@include media_hover {
			&:hover:not(.lcl-slider__bullet--active) {
				transform: scale(1.3);
			}
			&:hover::after {
				background: $c-orange;
				transition: background 0.4s ease-out;
				/*---------------- after */
			}
		}
		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 999px;
			background: $c-lightgray;
			transition: background 1.2s $e-out2;
			/*---------------- after */
		}
	}
	.lcl-slider__bullet--active {
		width: max(minpx(38), pcvw(38));
		&::after {
			background: $c-orange;
			/*---------------- after */
		}
	}
}
</style>
