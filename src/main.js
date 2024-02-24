import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* 慣性スクロール ------------ */
export const lenis = new Lenis({ lerp: 0.13 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const app = createApp(App);

app.use(router).mount('#app');
