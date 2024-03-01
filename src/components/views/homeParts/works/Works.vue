<script setup>
import WorksFV from '@/components/views/homeParts/works/worksFV.vue';
import WorksList from '@/components/views/homeParts/works/WorksList.vue';
</script>

<template>
	<section ref="section" class="lcl-works">
		<WorksFV></WorksFV>
		<WorksList></WorksList>
	</section>
</template>

<style scoped lang="scss">
.lcl-works {
	position: relative;
	width: 100%;
}
</style>
