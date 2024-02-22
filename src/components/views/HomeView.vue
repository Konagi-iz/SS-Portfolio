<script setup>
import { onMounted } from 'vue';
import Hero from '@/components/views/homeParts/Hero.vue';
import About from '@/components/views/homeParts/About.vue';
import Photography from '@/components/views/homeParts/photography/Photography.vue';
import Works from '@/components/views/homeParts/works/Works.vue';
import { isRouterViewLoaded } from '../../store';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<Hero></Hero>
	<About></About>
	<Photography></Photography>
	<Works></Works>
</template>

<style scoped lang="scss"></style>
