<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import workslist from '@/assets/data/works.json';
import { isOpeningReady } from '@/store';

const route = useRoute();
const isWorksPage = ref(route.name === 'works' ? true : false);

const listitem = ref(null);

const webdesignWorks = workslist.filter((item) => item.cat === 'web');

defineExpose({ listitem });
</script>

<template>
	<ul class="works-fv" :class="{ 'works-fv--works': isWorksPage, 'opening--on': isOpeningReady }">
		<li
			ref="listitem"
			v-for="(item, index) in webdesignWorks"
			:key="index"
			class="works-fv__item"
			:class="{ 'works-fv__item--reverse': index % 2 === 0 }"
		>
			<picture class="works-fv__pic">
				<source :srcset="`/assets/img/common/works/SP/img_selected_${item.tag}.webp`" media="(max-width: 677px)" />
				<img class="works-fv__img" :src="`/assets/img/common/works/PC/img_selected_${item.tag}.webp`" alt="作品画像" width="177" height="610" />
			</picture>
			<p class="works-fv__ttl font-en" :class="`works-fv__ttl--0${index + 1}`">{{ item.title }}</p>
		</li>
		<!-- .works-fv__item -->
	</ul>
</template>

<style scoped lang="scss">
/* home page ------------ */
.works-fv {
	display: flex;
	gap: 12px;
	padding-right: 12px;
	width: clamp(933px, 933px + ((100% - 1300px) / 2), 933px + 300px);
	@include media_wide {
		padding-block: 12px;
		height: 100%;
	}
	@include media_narrow {
		flex-direction: column;
		gap: vw(8);
		padding-inline: vw(8);
		width: 100%;
	}
	.works-fv__item {
		display: flex;
		flex-direction: column;
		gap: 12px;
		@include media_narrow {
			flex-direction: row-reverse;
			gap: vw(8);
			height: vw(94);
		}
	}
	.works-fv__item--reverse {
		flex-direction: column-reverse;
		@include media_narrow {
			flex-direction: row;
		}
	}
	.works-fv__pic {
		flex: 1;
		@include media_wide {
			min-height: 0;
		}
	}
	.works-fv__img {
		border-radius: 16px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		@include media_narrow {
			border-radius: vw(8);
		}
	}
	.works-fv__ttl {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16px;
		background: $c-orange;
		color: $c-black;
		@include fz(20);
		font-weight: 400;
		line-height: 0.9;
		@include media_narrow {
			border-radius: vw(8);
			@include fz(12);
		}
	}
	.works-fv__ttl--01 {
		@include media_wide {
			height: 84px;
		}
		@include media_narrow {
			width: vw(98);
		}
	}
	.works-fv__ttl--02 {
		@include media_wide {
			height: 140px;
		}
		@include media_narrow {
			width: vw(58);
		}
	}
	.works-fv__ttl--03 {
		@include media_wide {
			height: 215px;
		}
		@include media_narrow {
			width: vw(120);
		}
	}
	.works-fv__ttl--04 {
		@include media_wide {
			height: 84px;
		}
		@include media_narrow {
			width: vw(81);
		}
	}
	.works-fv__ttl--05 {
		@include media_wide {
			height: 136px;
		}
		@include media_narrow {
			width: vw(85);
		}
	}
}

/* works page ------------ */
.works-fv--works {
	gap: 12px;
	padding-right: 0;
	width: fit-content;
	@include media_wide {
		padding-block: 12px;
		height: 100%;
	}
	@include media_narrow {
		flex-direction: column-reverse;
		padding-inline: vw(8);
		width: 100%;
	}
	&.opening--on .works-fv__item {
		opacity: 1;
		transform: translate(0);
	}
	.works-fv__item {
		opacity: 0;
		flex-direction: column-reverse;
		gap: 12px;
		transition: transform 1s 0.5s $e-out-expo, opacity 1s 0.5s $e-out-expo;
		@include delay(5, 0.1, 0.3);
		@include media_wide {
			transform: translateY(-10%);
			width: 210px;
		}
		@include media_narrow {
			transform: translateX(-10%);
			flex-direction: row-reverse;
			gap: vw(8);
		}
	}
	.works-fv__item--reverse {
		flex-direction: column;
		@include media_wide {
			transform: translateY(10%);
		}
		@include media_narrow {
			transform: translateX(10%);
			flex-direction: row;
		}
	}
	.works-fv__pic {
		@include media_wide {
			min-height: 0;
			width: 100%;
		}
	}
	.works-fv__img {
		border-radius: 16px;
		@include media_narrow {
			border-radius: vw(8);
		}
	}
	.works-fv__ttl {
		flex: none;
		border-radius: 16px;
		@include fz(20);
		@include media_narrow {
			border-radius: vw(8);
			@include fz(12);
		}
	}
	.works-fv__ttl--01 {
		@include media_wide {
			height: 84px;
		}
	}
	.works-fv__ttl--02 {
		@include media_wide {
			height: 148px;
		}
	}
	.works-fv__ttl--03 {
		@include media_wide {
			height: 215px;
		}
	}
	.works-fv__ttl--04 {
		@include media_wide {
			height: 84px;
		}
	}
	.works-fv__ttl--05 {
		@include media_wide {
			height: 136px;
		}
	}
}
</style>
