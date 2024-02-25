<script setup>

const props = defineProps({
	id: Number,
	ttl: String,
	year: String,
	role: String,
	tag: String,
	cat: String,
});
</script>

<template>
	<section class="lcl-detail">
		<div class="lcl-detail__main">
			<div class="lcl-detail__info">
				<div class="lcl-detail-ttl">
					<h2 class="lcl-detail-ttl__txt"></h2>
					<div v-for="(item, index) in workslist" :key="index" class="lcl-detail-ttl__tags">
						<p class="lcl-detail-ttl__tag"></p>
					</div>
				</div>
				<!-- .lcl-detail-ttl -->
			</div>
			<!-- .lcl-detail__info -->
		</div>
		<!-- .lcl-detail__main -->
	</section>
</template>

<style scoped lang="scss"></style>
