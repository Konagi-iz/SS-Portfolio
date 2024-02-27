<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import 'destyle.css';
import '@/scss/base.scss';
import '@/scss/nwclasses.scss';
import BGNoise from '@/components/parts/BGNoise.vue';
import Header from '@/components/parts/Header.vue';
import Footer from '@/components/parts/Footer.vue';
import Transition from '@/components/parts/Transition.vue';
import Stalker from '@/components/parts/Stalker.vue';
import { isRouterViewLoaded, media } from '@/store';

let w = window.innerWidth;

const route = useRoute();
const router = useRouter();

const wrapper = ref(null);

/* Change root font-size ------------ */
changeRootFontSize();
window.addEventListener('resize', () => {
	w = window.innerWidth;
	changeRootFontSize();
});

function changeRootFontSize() {
	if (media.value === 'SP') {
		document.documentElement.style.setProperty('--fz', (10 / 375) * w + 'px');
	} else {
		document.documentElement.style.setProperty('--fz', '10px');
	}
}

/* リサイズ時にリロード ------------ */
window.addEventListener('resize', handleResize);

let resizeAmount = 0;
let lastWidth = window.innerWidth;

function handleResize() {
	const currentWidth = window.innerWidth;

	resizeAmount += Math.abs(currentWidth - lastWidth);
	lastWidth = currentWidth;

	const resizeTimer = setTimeout(() => {
		if (resizeAmount >= 200) {
			console.log('reload!');
			router.go(0);
		}
		clearTimeout(resizeTimer);
		resizeAmount = 0;
	}, 500);
}
</script>

<template>
	<div ref="wrapper" class="wrapper">
		<div v-if="route.name === 'home'" class="background"></div>
		<BGNoise :opacity="60"></BGNoise>
		<Header></Header>
		<main id="main">
			<router-view></router-view>
		</main>
		<Footer :wrapper="wrapper"></Footer>
		<Transition></Transition>
		<Stalker></Stalker>
	</div>
</template>

<style scoped lang="scss">
.background {
	z-index: -1;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
}
.background--hide {
	background: transparent !important;
}
</style>
