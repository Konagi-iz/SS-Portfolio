<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isOpen = ref(false);
const currentIndex = ref(0);

const toggleModal = (index) => {
	if (isOpen.value) {
		isOpen.value = false;
	} else {
		isOpen.value = true;
		if (index >= 0) {
			currentIndex.value = index;
		}
	}
};

onMounted(() => {
	window.addEventListener('keydown', onEsc);
});

onUnmounted(() => {
	window.removeEventListener('keydown', onEsc);
});

function onEsc(event) {
	if (event.keyCode === 27 && isOpen) {
		isOpen.value = false;
	}
}
</script>

<template>
	<div class="lcl-lead">
		<p class="lcl-lead__txt">
			瞬きをするように、
			<br />
			何気ない一瞬を切り撮るのが好きです。
		</p>
		<!-- .lcl-lead__txt -->
		<p class="lcl-lead__txt">
			良ければ私の好きな
			<br />
			「何気ない一瞬」をご覧ください。
		</p>
		<!-- .lcl-lead__txt -->
	</div>
	<!-- .lcl-lead -->

	<ul class="lcl-list">
		<li v-for="(item, index) in 64" :key="index" class="lcl-list__item scr-anin fade-in-btm">
			<img
				@click="toggleModal(index)"
				ref="img"
				class="lcl-list__img"
				:src="`/assets/img/photography/PC/img_${(index + 1).toString().padStart(2, '0')}.webp`"
				alt="写真"
				width="480"
				height="480"
				loading="lazy"
			/>
		</li>
		<!-- .lcl-list__item -->
	</ul>
	<!-- .lcl-list -->

	<Transition name="modal">
		<div v-if="isOpen" class="lcl-modal" :class="{ 'lcl-modal--active': isOpen }">
			<div @click="toggleModal" class="lcl-modal__overlay"></div>
			<img
				class="lcl-modal__img"
				:src="`/assets/img/photography/PC/img_${(currentIndex + 1).toString().padStart(2, '0')}.webp`"
				alt="拡大表示"
				width="480"
				height="480"
			/>
		</div>
		<!-- .lcl-modal -->
	</Transition>
</template>

<style scoped lang="scss">
/* lead ------------ */
.lcl-lead {
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 51px;
	margin-block: 165px;
	@include media_narrow {
		gap: vw(40);
		margin-block: vw(140);
	}
	.lcl-lead__txt {
		color: $c-orange;
		@include fz(14);
		font-weight: 400;
		line-height: 2.2;
		letter-spacing: 0.08em;
		text-align: center;
	}
}

/* list ------------ */
.lcl-list {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin-inline: auto;
	width: min(1900px, 100% - 20px);
	@include media_narrow {
		gap: vw(8);
		padding-inline: vw(8);
		width: 100%;
	}

	.lcl-list__item {
		width: calc((100% - 30px) / 4);
		@include media_wide {
			&:nth-of-type(2),
			&:nth-of-type(2n + 4) {
				transition-delay: 0.05s;
			}
			&:nth-of-type(4n - 1) {
				transition-delay: 0.1s;
			}
			&:nth-of-type(4n) {
				transition-delay: 0.15s;
			}
		}
		@include media_narrow {
			width: calc((100% - vw(16)) / 3);
			&:nth-of-type(3n + 2) {
				transition-delay: 0.05s;
			}
			&:nth-of-type(3n) {
				transition-delay: 0.1s;
			}
		}
	}
	.lcl-list__img {
		border-radius: 8px;
		width: 100%;
		cursor: pointer;
		@include media_narrow {
			border-radius: vw(4);
		}
	}
}

/* modal ------------ */
.lcl-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100lvh;
	transition: opacity 0.2s ease-out;

	.lcl-modal__overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		opacity: 0.6;
		background: $c-black;
		transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
		cursor: zoom-out;
	}

	.lcl-modal__img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 8px;
		transition: translate 0.6s $e-out-expo, scale 0.6s $e-out-expo;
		@include media_wide {
			height: 90%;
		}
		@include media_narrow {
			width: 95%;
		}
	}

	// transition
	&.modal-enter-from,
	&.modal-leave-to {
		opacity: 0;
	}
	&.modal-enter-from .lcl-modal__img,
	&.modal-leave-to .lcl-modal__img {
		translate: 0 10%;
		scale: 0.9;
	}
}
</style>
