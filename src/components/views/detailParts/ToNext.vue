<script setup>
import WorkCard from '@/components/parts/WorkCard.vue';

const props = defineProps({
	id: Number,
	ttl: String,
	year: String,
	role: String,
	tag: String,
	cat: String,
	data: Object,
});
</script>

<template>
	<div class="lcl-tonext">
		<div class="lcl-tonext__in">
			<WorkCard
				v-bind="{
					ttl: ttl,
					year: year,
					role: role,
					tag: tag,
					cat: cat,
				}"
			></WorkCard>
		</div>
	</div>
</template>

<style scoped lang="scss">
.lcl-tonext {
	margin-top: 100px;
	@include media_narrow {
		margin-top: vw(100);
	}
	.lcl-tonext__in {
		margin-inline: auto;
		padding: 60px;
		width: min(1900px, 100%);
		height: max(730px, 100vh);
		@include media_narrow {
			display: flex;
			align-items: center;
			padding: vw(8);
			width: 100%;
			height: 100lvh;
		}
	}
}
</style>
