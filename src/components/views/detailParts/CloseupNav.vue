<script setup>
import { ref, watch, capitalize } from 'vue';

const props = defineProps({
	tag: String,
	cat: String,
	closeup: Object,
});

const modalContent = ref('');
const description = ref('');

watch(modalContent, (content) => {
	if (content === 'design') {
		description.value = props.closeup.design;
	} else if (content === 'coding') {
		description.value = props.closeup.coding;
	} else {
		description.value = '';
	}
});
</script>

<template>
	<div class="lcl-overlay" :class="{ 'lcl-overlay--active': modalContent }"></div>

	<div class="lcl-closeupnav">
		<p class="lcl-closeupnav__txt">See detail</p>
		<div class="lcl-closeupnav__in">
			<button @click="modalContent = 'design'" class="lcl-closeupnav-btn font-dp">Design ?</button>
			<button @click="modalContent = 'coding'" class="lcl-closeupnav-btn font-dp">Coding ?</button>
		</div>
	</div>
	<!-- .lcl-closeupnav -->

	<Transition name="modal">
		<div v-if="modalContent" class="lcl-modal">
			<div class="lcl-modal__txt">
				<p class="lcl-modal__ttl font-dp">{{ `${capitalize(modalContent)} ?` }}</p>
				<p class="lcl-modal__desc" v-text="description"></p>
			</div>
			<!-- .lcl-modal__txt -->
			<img
				class="lcl-modal__img"
				src="/assets/img/common/works/PC/img_closeup_design_luna.webp"
				alt=""
				width="760"
				height="720"
				loading="lazy"
			/>
			<!-- .lcl-modal__img -->
			<button @click="modalContent = ''" class="lcl-modal-btn">
				<span class="lcl-modal-btn__line"></span>
				<span class="lcl-modal-btn__line"></span>
			</button>
		</div>
		<!-- .lcl-modal -->
	</Transition>
</template>

<style scoped lang="scss">
.lcl-overlay {
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	visibility: hidden;
	width: 100%;
	height: 100%;
	background: $c-black;
	transition: opacity 0.2s $e-out-circ, visibility 0.2s $e-out-circ;
}
.lcl-overlay--active {
	opacity: 0.8;
	visibility: visible;
}

/* nav ------------ */
.lcl-closeupnav {
	position: fixed;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	gap: 48px;
	border-radius: 99px;
	padding: 12px;
	width: fit-content;
	background: linear-gradient(to right, #232323, #191919);
	.lcl-closeupnav__txt {
		padding-left: 12px;
		@include fz(16);
		line-height: 1.2;
		letter-spacing: 0.03em;
	}
	.lcl-closeupnav__in {
		display: flex;
		gap: 6px;
	}
	.lcl-closeupnav-btn {
		border-radius: 99px;
		padding-block: 12px;
		width: 123px;
		background: $c-gray;
		text-align: center;
	}
}

/* modal ------------ */
.lcl-modal {
	z-index: 20;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid $c-gray;
	border-radius: 16px;
	padding: 50px;
	width: 900px;
	height: 530px;
	background: $c-darkgray;
	.lcl-modal__txt {
		display: flex;
		flex-direction: column;
		gap: 50px;
		max-width: 335px;
	}
	.lcl-modal__ttl {
		@include fz(24);
		line-height: 1.2;
		letter-spacing: 0.07em;
	}
	.lcl-modal__desc {
		@include fz(12);
		line-height: 1.9;
		white-space: pre-line;
	}
	.lcl-modal__img {
		width: 380px;
	}

	/* btn ------------ */
	.lcl-modal-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 40px;
		height: 40px;
		border: 1px solid $c-gray;
		border-radius: 50%;
		background: $c-darkgray;
	}
	.lcl-modal-btn__line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 18px;
		height: 2px;
		background: $c-white;
		&:nth-of-type(1) {
			transform: translate(-50%, -50%) rotate(45deg);
		}
		&:nth-of-type(2) {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
	}
	.modal-enter-active,
	.modal-leave-active {
		transition: opacity 0.6s $e-out-circ;
	}
	.modal-enter-from,
	.modal-leave-to {
		opacity: 0;
	}
	.modal-enter-to,
	.modal-leave-from {
		opacity: 1;
		transform: translateY(100%);
	}
}
</style>
