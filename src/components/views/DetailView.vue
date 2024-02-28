<script setup>
import { ref, watch, onMounted, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Detail from '@/components/views/detailParts/Detail.vue';
import ToNext from '@/components/views/detailParts/ToNext.vue';
import CloseupNav from '@/components/views/detailParts/CloseupNav.vue';
import workslist from '@/assets/data/works.json';
import { isRouterViewLoaded } from '@/store';

const route = useRoute();
const router = useRouter();

const currentWorkListItem = ref();
const nextWorkListItem = ref();

getWorkData();
watch(route, () => {
	getWorkData();
});

function getWorkData() {
	currentWorkListItem.value = workslist[route.params.id - 1];
	nextWorkListItem.value = Number(route.params.id) === workslist.length ? workslist[0] : workslist[route.params.id];
}

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
onUpdated(() => {
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
	<!-- <CloseupNav
		v-bind="{
			tag: currentWorkListItem.tag,
			cat: currentWorkListItem.cat,
			closeup: currentWorkListItem.closeup,
		}"
	></CloseupNav> -->
	<ToNext
		v-bind="{
			id: nextWorkListItem.id,
			ttl: nextWorkListItem.title,
			year: nextWorkListItem.year,
			role: nextWorkListItem.role,
			tag: nextWorkListItem.tag,
			cat: nextWorkListItem.cat,
		}"
	></ToNext>
</template>

<style scoped lang="scss"></style>
