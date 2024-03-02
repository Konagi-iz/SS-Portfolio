<script setup>
import { onMounted } from 'vue';
import { isRouterViewLoaded } from '@/store';
import FirstView from '@/components/views/photographyParts/FirstView.vue';
import PhotoList from '@/components/views/photographyParts/PhotoList.vue';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<FirstView></FirstView>
	<PhotoList></PhotoList>
</template>

<style scoped lang="scss"></style>
