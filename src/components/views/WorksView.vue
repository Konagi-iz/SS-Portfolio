<script setup>
import { onMounted } from 'vue';
import { isRouterViewLoaded } from '@/store';
import FirstView from '@/components/views/worksParts/FirstView.vue';
import WorksList from '@/components/views/worksParts/WorksList.vue';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<FirstView></FirstView>
	<WorksList></WorksList>
</template>

<style scoped lang="scss"></style>
