<script setup>
import { RouterView, useRoute } from 'vue-router';
import 'destyle.css';
import '@/scss/base.scss';
import '@/scss/nwclasses.scss';
import Header from '@/components/parts/Header.vue';
import Footer from '@/components/parts/Footer.vue';
</script>

<template>
	<div class="wrapper">
		<Header></Header>
		<main id="main">
			<router-view></router-view>
		</main>
		<Footer></Footer>
	</div>
</template>

<style scoped lang="scss"></style>
