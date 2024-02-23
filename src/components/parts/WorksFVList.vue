<script setup>
import workslist from '@/assets/data/works.json';
</script>

<template>
	<ul class="works-fv">
		<li v-for="(item, index) in workslist" :key="index" class="works-fv__item" :class="{ 'works-fv__item--reverse': index % 2 === 0 }">
			<picture class="works-fv__pic">
				<source :srcset="`/assets/img/common/works/SP/img_selected_${item.tag}.jpg`" media="(max-width: 677px)" />
				<img class="works-fv__img" :src="`/assets/img/common/works/PC/img_selected_${item.tag}.jpg`" alt="" width="177" height="610" />
			</picture>
			<p class="works-fv__ttl font-en" :class="`works-fv__ttl--0${index + 1}`">{{ item.title }}</p>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.works-fv {
	display: flex;
	gap: max(minpx(12), pcvw(12));
	padding-right: max(minpx(12), pcvw(12));
	width: max(minpx(933), pcvw(933));
	@include media_wide {
		padding-block: max(minpx(12), pcvw(12));
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
		gap: max(minpx(12), pcvw(12));
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
			width: max(minpx(177), pcvw(177));
		}
	}
	.works-fv__img {
		border-radius: max(minpx(16), pcvw(16));
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
		border-radius: max(minpx(16), pcvw(16));
		background: $c-orange;
		color: $c-black;
		font-size: max(minpx(20), pcvw(20));
		font-weight: 400;
		line-height: 0.9;
		@include media_narrow {
			border-radius: vw(8);
			@include fz(12);
		}
	}
	.works-fv__ttl--01 {
		@include media_wide {
			height: max(minpx(84), pcvw(84));
		}
		@include media_narrow {
			width: vw(98);
		}
	}
	.works-fv__ttl--02 {
		@include media_wide {
			height: max(minpx(148), pcvw(148));
		}
		@include media_narrow {
			width: vw(58);
		}
	}
	.works-fv__ttl--03 {
		@include media_wide {
			height: max(minpx(215), pcvw(215));
		}
		@include media_narrow {
			width: vw(120);
		}
	}
	.works-fv__ttl--04 {
		@include media_wide {
			height: max(minpx(84), pcvw(84));
		}
		@include media_narrow {
			width: vw(81);
		}
	}
	.works-fv__ttl--05 {
		@include media_wide {
			height: max(minpx(136), pcvw(136));
		}
		@include media_narrow {
			width: vw(85);
		}
	}
}
</style>
