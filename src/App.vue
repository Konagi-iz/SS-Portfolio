<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import 'destyle.css';
import '@/scss/base.scss';
import '@/scss/nwclasses.scss';
import BGNoise from '@/components/parts/BGNoise.vue';
import Header from '@/components/parts/Header.vue';
import Footer from '@/components/parts/Footer.vue';
import TransitionOverlay from '@/components/parts/TransitionOverlay.vue';
import Stalker from '@/components/parts/Stalker.vue';
import { isNavActive, media } from '@/store';

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
			router.go(0);
		}
		clearTimeout(resizeTimer);
		resizeAmount = 0;
	}, 500);
}

/* 慣性スクロール ------------ */
if (!ScrollTrigger.isTouch) {
	const lenis = new Lenis({ lerp: 0.13 });
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);
	/* メニューを開いた時にスクロール無効化 ------------ */
	watch(isNavActive, (val) => {
		if (val) {
			lenis.stop();
		} else {
			lenis.start();
		}
	});
}
</script>

<template>
	<div ref="wrapper" class="wrapper">
		<BGNoise :opacity="60"></BGNoise>
		<Header></Header>
		<main id="main">
			<router-view></router-view>
		</main>
		<Footer :wrapper="wrapper"></Footer>
		<TransitionOverlay></TransitionOverlay>
		<Stalker></Stalker>
	</div>
</template>

<style scoped lang="scss"></style>
