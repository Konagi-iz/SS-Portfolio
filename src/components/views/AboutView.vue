<script setup>
import { onMounted } from 'vue';
import FirstView from '@/components/views/aboutParts/FirstView.vue';
import Motto from '@/components/views/aboutParts/Motto.vue';
import Profile from '@/components/views/aboutParts/Profile.vue';
import Awards from '@/components/views/aboutParts/Awards.vue';
import Hobbies from '@/components/views/aboutParts/Hobbies.vue';
import { isRouterViewLoaded } from '@/store';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<FirstView></FirstView>
	<Motto></Motto>
	<Profile></Profile>
	<Awards></Awards>
	<Hobbies></Hobbies>
</template>

<style scoped lang="scss"></style>
