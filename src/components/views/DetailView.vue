<script setup>
import { onMounted } from 'vue';
import { isRouterViewLoaded } from '@/store';
import Detail from '@/components/views/detailParts/Detail.vue';
import workslist from '@/assets/data/works.json';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<Detail></Detail>
</template>

<style scoped lang="scss"></style>
