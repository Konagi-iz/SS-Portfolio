<script setup>
import { ref, watch } from 'vue';
import { isNavActive } from '@/store/index.js';
import { lenis } from '@/main';


const props = defineProps({ isNavMenu: Boolean });
const emits = defineEmits(['isNavActive']);

const isHover = ref(false);
const isAnimationEnd = ref(false);

/* アニメーションが終わってからホバー解除 ------------ */
watch(isAnimationEnd, () => {
	if (isAnimationEnd.value) {
		isAnimationEnd.value = false;
		isHover.value = false;
	}
});

/* メニュートグル ------------ */
// 親にisNavActiveのemitを渡す
const toggleNav = () => {
	if (isNavActive.value) {
		isNavActive.value = false;
		lenis.start();
	} else {
		isNavActive.value = true;
		lenis.stop();
	}
};
</script>

<template>
	<button @click="toggleNav" @mouseenter="isHover = true" class="menu" :class="{ 'menu--nav': isNavMenu, 'menu--hover': isHover }">
		<span class="menu__line"></span>
		<span class="menu__line"></span>
		<span @animationend="isAnimationEnd = true" class="menu__line"></span>
	</button>
</template>

<style scoped lang="scss">
.menu {
	position: relative;
	border: 1px solid $c-gray;
	border-radius: 50%;
	width: 66px;
	height: 66px;
	background: $c-darkgray;
	transition: background 0.25s ease, border-color 0.25s ease;
	@include media_narrow {
		width: vw(46);
		height: vw(46);
	}
	@include media_hover {
		&:hover {
			border-color: $c-black;
			background: $c-offwhite;
		}
		&:hover .menu__line {
			background: $c-black;
		}
	}
	.menu__line {
		position: absolute;
		left: 21px;
		width: 24px;
		height: 2px;
		background: $c-white;
		transition: background 0.25s ease;
		@include media_narrow {
			left: vw(12);
			width: vw(20);
			height: vw(2);
		}
		&:nth-of-type(1) {
			top: 25px;
			@include media_narrow {
				top: vw(16);
			}
		}
		&:nth-of-type(2) {
			top: 32px;
			animation-delay: 0.1s !important;
			@include media_narrow {
				top: vw(21);
			}
		}
		&:nth-of-type(3) {
			top: 39px;
			animation-delay: 0.2s !important;
			@include media_narrow {
				top: vw(26);
			}
		}
	}
	&.menu--hover:not(.menu--nav) .menu__line {
		animation: menu-line 0.6s $e-out forwards;
	}

	/* menu--nav ------------ */
	&.menu--nav .menu__line {
		&:nth-of-type(1) {
			top: 32px;
			transform: rotate(45deg);
			@include media_narrow {
				top: vw(21);
			}
		}
		&:nth-of-type(2) {
			opacity: 0;
		}
		&:nth-of-type(3) {
			top: 32px;
			transform: rotate(-45deg);
			@include media_narrow {
				top: vw(21);
			}
		}
	}
}
@keyframes menu-line {
	0% {
		transform-origin: left;
		transform: scaleX(1);
	}
	33% {
		transform-origin: left;
		transform: scaleX(0);
	}
	66% {
		transform-origin: right;
		transform: scaleX(0);
	}
	100% {
		transform: scaleX(1);
	}
}
</style>
