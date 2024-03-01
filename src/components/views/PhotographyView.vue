<script setup>
import { onMounted } from 'vue';
import { isRouterViewLoaded } from '@/store';
import FirstView from '@/components/views/photographyParts/FirstView.vue';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<FirstView></FirstView>
</template>

<style scoped lang="scss"></style>
