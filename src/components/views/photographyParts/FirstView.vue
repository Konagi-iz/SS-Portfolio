<script setup>
import { ref, onMounted } from 'vue';
import PhotographyTitle from '@/components/parts/PhotographyTitle.vue';
import { isOpeningReady } from '@/store';

const delay = 5000;
const _delay = `${delay / 1000 - 0.3}s`;
const currentIndex = ref(null);
const isClickable = ref(true);
let autoplayTimer;

const slideTo = (index) => {
	if (index !== currentIndex && isClickable.value) {
		currentIndex.value = index;
		clearInterval(autoplayTimer);
		autoplay();
		isClickable.value = false;
	}
};

onMounted(() => {
	currentIndex.value = 0;
	autoplay();
});

function autoplay() {
	autoplayTimer = setInterval(() => {
		if (currentIndex.value === 4) {
			currentIndex.value = 0;
		} else {
			currentIndex.value++;
		}
	}, delay);
}
</script>

<template>
	<section class="lcl-fv">
		<div class="lcl-fv-slider" :class="{ 'opening--on': isOpeningReady }">
			<div
				@click="slideTo(index)"
				@transitionend.self="isClickable = true"
				v-for="(item, index) in 5"
				:key="index"
				class="lcl-fv-slider__slide"
				:class="{ 'lcl-fv-slider__slide--active': currentIndex === index }"
			>
				<img
					class="lcl-fv-slider__img"
					:src="`/assets/img/photography/PC/img_fv_0${index + 1}.jpg`"
					:alt="`マジックアワーの写真${index + 1}`"
					width="1560"
					height="1404"
				/>
				<div class="lcl-fv-slider__hover"></div>
			</div>
			<!-- .lcl-fv-slider__slide -->
			<div class="lcl-fv-pagination">
				<span
					@click="slideTo(index)"
					v-for="(item, index) in 5"
					:key="index"
					class="lcl-fv-pagination__bullet"
					:class="{ 'lcl-fv-pagination__bullet--active': currentIndex === index }"
				></span>
				<!-- .lcl-fv-pagination__bullet -->
			</div>
			<!-- .lcl-fv-pagination -->
		</div>
		<!-- .lcl-fv-slider -->
		<PhotographyTitle class="lcl-fv-ttl" :class="{ 'opening--on': isOpeningReady }"></PhotographyTitle>
	</section>
</template>

<style scoped lang="scss">
.lcl-fv {
	position: relative;
	width: 100%;
	height: 730px;

	/* slider ------------ */
	.lcl-fv-slider {
		display: flex;
		width: 100%;
		height: 100%;
		&.opening--on .lcl-fv-slider__slide {
			opacity: 1;
		}
	}

	/* slide ------------ */
	.lcl-fv-slider__slide {
		position: relative;
		opacity: 0;
		width: 10%;
		height: 100%;
		transition: opacity 0.8s $e-out-circ, width 1.5s $e-out-expo;
		user-select: none;
		@include media_hover {
			&:not(&.lcl-fv-slider__slide--active):hover .lcl-fv-slider__hover {
				opacity: 0.2;
			}
		}
		&:not(&.lcl-fv-slider__slide--active) {
			cursor: pointer;
		}
		@for $i from 1 through 5 {
			&:nth-of-type(#{$i}) {
				transition-delay: #{0.05 * ($i - 1)}s, 0s;
			}
		}
	}
	.lcl-fv-slider__slide--active {
		width: 60%;
	}
	.lcl-fv-slider__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}
	.lcl-fv-slider__hover {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transform: translateZ(0);
		width: 100%;
		height: 100%;
		background: $c-white;
		pointer-events: none;
		transition: opacity 1s ease-out;
	}

	/* pagination ------------ */
	.lcl-fv-pagination {
		z-index: 1;
		position: absolute;
		bottom: 62px;
		left: 39px;
		display: flex;
		gap: 8px;
	}
	.lcl-fv-pagination__bullet {
		position: relative;
		overflow: hidden;
		border-radius: 99px;
		width: 8px;
		height: 8px;
		background: $c-white;
		transition: width 0.6s $e-out-circ, background-color 0.6s $e-out-circ;
		cursor: pointer;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			transform: scaleX(0);
			transform-origin: left;
			border-radius: 99px;
			width: 100%;
			height: 100%;
			background: $c-orange;
			transition: transform 0s linear;
			/*---------------- after */
		}
		@include media_hover {
			&:not(&.lcl-fv-pagination__bullet--active):hover {
				background: $c-orange;
			}
		}
	}
	.lcl-fv-pagination__bullet--active {
		width: 50px;
		&::after {
			transform: scaleX(1);
			transition-duration: v-bind(_delay);
			/*---------------- after */
		}
	}

	/* ttl ------------ */
	.lcl-fv-ttl {
		position: absolute;
		left: 31px;
		bottom: 91px;
		color: $c-white;
		&.opening--on :deep(.ico-photo) {
			opacity: 1;
			transform: rotate(0deg);
		}
		&.opening--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(6, 0.1, 0.5);
		}
	}
}
</style>
