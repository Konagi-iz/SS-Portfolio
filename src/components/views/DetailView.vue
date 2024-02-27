<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Detail from '@/components/views/detailParts/Detail.vue';
import ToNext from '@/components/views/detailParts/ToNext.vue';
import workslist from '@/assets/data/works.json';
import { isRouterViewLoaded } from '@/store';

const route = useRoute();

const currentWorkListItem = workslist[route.params.id - 1];
const nextWorkListItem = workslist[route.params.id];

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<Detail
		v-bind="{
			id: currentWorkListItem.id,
			ttl: currentWorkListItem.title,
			year: currentWorkListItem.year,
			role: currentWorkListItem.role,
			tag: currentWorkListItem.tag,
			cat: currentWorkListItem.cat,
			data: currentWorkListItem.data,
		}"
	></Detail>
	<ToNext
		v-bind="{
			ttl: nextWorkListItem.title,
			year: nextWorkListItem.year,
			role: nextWorkListItem.role,
			tag: nextWorkListItem.tag,
			cat: nextWorkListItem.cat,
		}"
	></ToNext>
</template>

<style scoped lang="scss"></style>
