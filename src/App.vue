<script setup>
import { RouterView, useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import 'destyle.css';
import '@/scss/base.scss';
import '@/scss/nwclasses.scss';
import BGNoise from '@/components/parts/BGNoise.vue';
import Header from '@/components/parts/Header.vue';
import Footer from '@/components/parts/Footer.vue';
import { isRouterViewLoaded } from '@/store';

gsap.registerPlugin(ScrollTrigger);

let w = window.innerWidth;

/* Change root font-size ------------ */
function changeRootFontSize() {
	if (w <= 677) {
		document.documentElement.style.setProperty('--fz', (10 / 375) * w + 'px');
	} else {
		document.documentElement.style.setProperty('--fz', '10px');
	}
}
changeRootFontSize();
window.addEventListener('resize', () => {
	w = window.innerWidth;
	changeRootFontSize();
});

/* 慣性スクロール ------------ */
const lenis = new Lenis();

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/*  router-view以下がマウントされたら ------------ */
const onChildMounted = () => {
	isRouterViewLoaded.value = true;
};
</script>

<template>
	<div class="wrapper">
		<BGNoise :opacity="60"></BGNoise>
		<div class="background"></div>
		<Header></Header>
		<main id="main">
			<router-view ></router-view>
		</main>
		<Footer></Footer>
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
