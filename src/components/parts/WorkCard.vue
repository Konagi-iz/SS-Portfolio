<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button01 from '@/components/parts/Button01.vue';

const props = defineProps({
	id: Number,
	ttl: String,
	year: String,
	role: String,
	tag: String,
	cat: String,
});

const route = useRoute();
const isSmall = ref(route.name === 'works' ? true : false);
const isDetailPage = ref(route.name === 'detail' ? true : false);
</script>

<template>
	<div class="workcard" :class="{ 'workcard--small': isSmall, 'workcard--tonext': isDetailPage }">
		<div class="workcard-txt">
			<div class="workcard-txt__main">
				<p v-if="isDetailPage" class="workcard-txt__next">TO NEXT</p>
				<h3 class="workcard-txt__ttl font-en">{{ ttl.toUpperCase() }}</h3>
				<!-- .workcard-txt__ttl -->
				<div class="workcard-info">
					<p class="workcard-info__label font-en">YEAR</p>
					<p class="workcard-info__txt font-en">{{ year }}</p>
				</div>
				<!-- .workcard-info -->
				<div class="workcard-info">
					<p class="workcard-info__label font-en">ROLE</p>
					<p class="workcard-info__txt font-en">{{ role }}</p>
				</div>
				<!-- .workcard-info -->
			</div>
			<!-- .workcard-txt__main -->
			<router-link v-if="!isSmall" :to="id ? `/works/${id}` : ''" class="workcard-link">
				<Button01
					v-bind="{
						isBig: false,
						color: 'orange',
						txt: 'VIEW DETAIL',
					}"
				></Button01>
			</router-link>
			<!-- .workcard-link -->
		</div>
		<!-- .workcard-txt -->
		<div v-if="cat === 'web' && !isDetailPage" class="workcard-video">
			<video class="workcard-video__item" loop preload="auto" playsinlline muted disablepictureinpicture>
				<source :src="`/assets/img/common/works/PC/video_${tag}.mp4`" />
			</video>
			<!-- .workcard-video__item -->
		</div>
		<!-- .workcard-video -->
		<div v-if="isSmall || isDetailPage || cat === 'design'" class="workcard-thumbnail">
			<img
				class="workcard-thumbnail__img"
				:src="`/assets/img/common/works/PC/img_thumbnail_${tag}.jpg`"
				:alt="`${ttl}のサムネイル`"
				width="932"
				height="474"
				loading="lazy"
			/>
		</div>
		<!-- .workcard-thumbnail -->
	</div>
</template>

<style scoped lang="scss">
/* big ------------ */
.workcard {
	display: flex;
	gap: 95px;
	border-radius: 16px;
	padding: 30px;
	width: min(1900px, 100% - 100px);
	height: calc(100% - 100px);
	background: $c-offwhite;
	@include media_narrow {
		flex-direction: column-reverse;
		gap: vw(30);
		border-radius: vw(12);
		padding: vw(16);
		width: vw(360);
		height: vw(590);
	}

	/* txt ------------ */
	.workcard-txt {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		@include media_wide {
			padding-top: 32px;
		}
		@include media_narrow {
			flex: 1;
		}
	}
	.workcard-txt__main {
	}
	.workcard-txt__next {
		color: $c-black;
		margin-bottom: 45px;
		@include fz(20);
		line-height: 1.2;
		letter-spacing: 0.03em;
		@include media_narrow {
			margin-bottom: 16px;
		}
	}
	.workcard-txt__ttl {
		margin-bottom: 45px;
		color: $c-black;
		@include fz(50);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: 0.03em;
		@include media_wide {
			max-width: 300px;
		}
		@include media_narrow {
			margin-bottom: vw(16);
			@include fz(36);
			line-height: 1.15;
		}
	}
	.workcard-info {
	}
	.workcard-info + .workcard-info {
		margin-top: 15px;
		@include media_narrow {
			margin-top: vw(7);
		}
	}
	.workcard-info__label {
		color: $c-black;
		@include fz(12);
		font-weight: 400;
		line-height: 1.2;
		@include media_narrow {
			@include fz(10);
		}
	}
	.workcard-info__txt {
		color: $c-black;
		@include fz(16);
		font-weight: 400;
		line-height: 1.2;
		@include media_narrow {
			@include fz(14);
		}
	}
	.workcard-link {
		width: fit-content;
	}

	/* video ------------ */
	.workcard-video {
		height: 100%;
		object-fit: cover;
		@include media_wide {
			flex: 1;
		}
		@include media_narrow {
			width: 100%;
			height: vw(285);
		}
	}
	.workcard-video__item {
		border-radius: 8px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		@include media_narrow {
			border-radius: vw(8);
		}
	}

	/* thumbnail ------------ */
	.workcard-thumbnail {
	}
	.workcard-thumbnail__img {
		border-radius: 8px;
		width: 100%;
		object-fit: cover;
		@include media_narrow {
			border-radius: vw(8);
			height: vw(200);
		}
	}
}

/* small ------------ */
.workcard--small {
	position: relative;
	flex-direction: column-reverse;
	gap: 30px;
	border-radius: 12px;
	padding: 12px;
	width: 490px;
	height: auto;
	@include media_narrow {
		gap: vw(30);
		border-radius: vw(8);
		padding: vw(12);
		width: 100%;
	}
	@include media_hover {
		&:hover .workcard-video {
			opacity: 1;
		}
	}
	.workcard-txt {
		padding-top: 0;
	}
	.workcard-txt__ttl {
		margin-bottom: 30px;
		max-width: initial;
		@include fz(36);
		@include media_narrow {
			margin-bottom: vw(20);
			@include fz(30);
		}
	}
	.workcard-info + .workcard-info {
		@include media_narrow {
			margin-top: vw(15);
		}
	}
	.workcard-info__label {
		@include fz(10);
	}
	.workcard-info__txt {
		@include fz(14);
	}

	/* video ------------ */
	.workcard-video {
		position: absolute;
		top: 12px;
		left: 12px;
		opacity: 0;
		width: calc(100% - 24px);
		height: 237px;
		pointer-events: none;
		transition: opacity 0.8s $e-out-expo;
	}
}

/* detail ------------ */
.workcard--tonext {
	@include media_wide {
		gap: 95px;
		width: 100%;
		height: 100%;
	}
	.workcard-txt {
		flex-shrink: 0;
	}
	.workcard-txt__ttl {
		@include media_wide {
			max-width: 270px;
		}
	}
	.workcard-thumbnail__img {
		@include media_wide {
			height: 100%;
		}
	}
}
</style>
