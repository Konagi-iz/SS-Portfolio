<script setup>
import { onMounted } from 'vue';
import { isRouterViewLoaded } from '../../store';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template></template>

<style scoped lang="scss"></style>
