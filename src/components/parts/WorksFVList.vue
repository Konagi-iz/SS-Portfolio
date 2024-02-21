<script setup>
import workslist from '@/assets/data/works.json';
</script>

<template>
	<ul class="works-fv">
		<li v-for="(item, index) in workslist" :key="index" class="works-fv__item" :class="{ 'works-fv__item--reverse': index % 2 === 0 }">
			<img class="works-fv__img" :src="`/assets/img/common/works/PC/img_selected_${item.tag}.png`" alt="" width="177" height="610" />
			<p class="works-fv__ttl font-en" :class="`works-fv__ttl--0${index + 1}`">{{ item.title }}</p>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.works-fv {
	display: flex;
	gap: max(minpx(12), pcvw(12));
	padding-block: max(minpx(12), pcvw(12));
	padding-right: max(minpx(12), pcvw(12));
	width: max(minpx(933), pcvw(933));
	height: 100%;
	.works-fv__item {
		display: flex;
		flex-direction: column;
		gap: max(minpx(12), pcvw(12));
	}
	.works-fv__item--reverse {
		flex-direction: column-reverse;
	}
	.works-fv__img {
		flex: 1;
		width: max(minpx(177), pcvw(177));
	}
	.works-fv__ttl {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: max(minpx(16), pcvw(16));
		background: $c-orange;
		color: $c-black;
		font-size: max(minpx(20), pcvw(20));
		font-weight: 400;
		line-height: 0.9;
	}
	.works-fv__ttl--01 {
		height: max(minpx(84), pcvw(84));
	}
	.works-fv__ttl--02 {
		height: max(minpx(148), pcvw(148));
	}
	.works-fv__ttl--03 {
		height: max(minpx(215), pcvw(215));
	}
	.works-fv__ttl--04 {
		height: max(minpx(84), pcvw(84));
	}
	.works-fv__ttl--05 {
		height: max(minpx(136), pcvw(136));
	}
}
</style>
