<script setup>
import { RouterView, useRoute } from 'vue-router';
import 'destyle.css';
import '@/scss/base.scss';
import '@/scss/nwclasses.scss';
import BGNoise from '@/components/parts/BGNoise.vue';
import Header from '@/components/parts/Header.vue';
import Footer from '@/components/parts/Footer.vue';

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
</script>

<template>
	<div class="wrapper">
		<BGNoise :opacity="40"></BGNoise>
		<Header></Header>
		<main id="main">
			<router-view></router-view>
		</main>
		<Footer></Footer>
	</div>
</template>

<style scoped lang="scss"></style>
