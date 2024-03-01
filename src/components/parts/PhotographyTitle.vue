<script setup>
import TextSplit from '@/components/parts/TextSplit.vue';
import IconPhoto from '~icons/svg/ico-photo';
</script>

<template>
	<div class="photo-ttl">
		<IconPhoto></IconPhoto>
		<h2 class="photo-ttl__txt">
			<span class="photo-ttl__en font-en">
				<TextSplit text="Photo"></TextSplit>
			</span>
			<span class="photo-ttl__dp font-dp">
				<TextSplit text="graphy"></TextSplit>
			</span>
		</h2>
		<!-- .photo-ttl__txt -->
	</div>
	<!-- .photo-ttl -->
</template>

<style scoped lang="scss">
/* ttl ------------ */
.photo-ttl {
	display: flex;
	align-items: flex-start;
	color: $c-orange;
}
:deep(.ico-photo) {
	opacity: 0;
	transform: rotate(-90deg);
	width: 142px;
	height: auto;
	transition: opacity 0.8s $e-out-circ, transform 0.8s $e-out-circ;
	@include media_narrow {
		width: vw(52);
	}
}
:deep(.ico-photo__fill) {
	fill: currentColor;
}
.photo-ttl__txt {
	color: currentColor;
	:deep(.split-span) {
		transform: translateY(142%);
		transition: transform 1s $e-out-expo;
		@include delay(6, 0.1);
	}
}
.photo-ttl__en {
	overflow: hidden;
	display: block;
	@include fz(195);
	line-height: 0.75;
	@include media_narrow {
		@include fz(70);
	}
}
.photo-ttl__dp {
	clip-path: inset(0 0 -30% 0);
	display: block;
	margin-left: 157px;
	@include fz(187);
	line-height: 0.75;
	@include media_narrow {
		margin-left: vw(50);
		@include fz(70);
	}
}
</style>
