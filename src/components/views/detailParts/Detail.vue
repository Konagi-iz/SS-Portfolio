<script setup>
import Button01 from '@/components/parts/Button01.vue';
import IconAngleRight from '~icons/svg/ico-angle-right';
import { media } from '@/store';

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
	<section class="lcl-detail">
		<div class="lcl-detail__main">
			<div class="lcl-detail__in">
				<router-link v-if="media === 'SP'" :to="{ name: 'works' }" class="lcl-detail-back">
					<IconAngleRight></IconAngleRight>
					<p class="lcl-detail-back__txt">BACK</p>
				</router-link>
				<!-- .lcl-detail-back -->
				<div class="lcl-detail__info">
					<router-link v-if="media === 'PC'" :to="{ name: 'works' }" class="lcl-detail-back">
						<IconAngleRight></IconAngleRight>
						<p class="lcl-detail-back__txt">BACK</p>
					</router-link>
					<!-- .lcl-detail-back -->
					<div class="lcl-detail-ttl">
						<h2 class="lcl-detail-ttl__txt font-en">{{ ttl.toUpperCase() }}</h2>
						<div class="lcl-detail-ttl__tags">
							<p v-for="(item, index) in data.tags" :key="index" class="lcl-detail-ttl__tag font-en">{{ item }}</p>
						</div>
					</div>
					<!-- .lcl-detail-ttl -->
					<p class="lcl-detail__desc" v-text="data.desc"></p>
					<!-- .lcl-detail__desc -->
					<!-- <router-link v-if="cat === 'web'" to="" class="lcl-detail__link">
						<Button01
							v-bind="{
								isBig: false,
								color: 'white',
								txt: 'VISIT LIVE SITE',
							}"
						></Button01>
					</router-link> -->
				</div>
				<!-- .lcl-detail__info -->
				<div class="lcl-detail-preview">
					<div class="lcl-detail-loading"></div>
					<video
						v-if="cat === 'web'"
						class="lcl-detail-preview__video"
						:src="`assets/img/common/works/PC/video_preview_${tag}.mp4`"
						muted
						autoplay
						playsinlline
						loop
						disablepictureinpicture
					></video>
					<!-- .lcl-detail-preview__video -->
					<img
						v-if="cat === 'design'"
						class="lcl-detail-preview__img"
						:src="`/assets/img/common/works/PC/img_preview_${tag}.webp`"
						alt="作品画像"
						width="1598"
						height="918"
					/>
					<!-- .lcl-detail-preview__img -->
				</div>
				<!-- .lcl-detail-preview -->
			</div>
			<!-- .lcl-detail__in -->
		</div>
		<!-- .lcl-detail__main -->
		<div class="lcl-detail-foot">
			<ul class="lcl-detail-foot__list">
				<li class="lcl-detail-foot__item">
					<p class="lcl-detail-foot__label font-en">YEAR</p>
					<p class="lcl-detail-foot__txt font-en">{{ year }}</p>
				</li>
				<!-- .lcl-detail-foot__item -->
				<li class="lcl-detail-foot__item">
					<p class="lcl-detail-foot__label font-en">ROLE</p>
					<p class="lcl-detail-foot__txt font-en">{{ role }}</p>
				</li>
				<!-- .lcl-detail-foot__item -->
			</ul>
			<!-- .lcl-detail-foot__list -->
		</div>
		<!-- .lcl-detail-foot -->
	</section>
</template>

<style scoped lang="scss">
.lcl-detail {
	@include media_narrow {
		padding-top: vw(100);
	}

	/* main ------------ */
	.lcl-detail__main {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-inline: auto;
		width: min(1900px, 100% - (5.384% * 2));
		@include media_wide {
			height: max(730px, 100vh);
		}
		@include media_narrow {
			width: 100%;
		}
	}
	.lcl-detail__in {
		display: flex;
		align-items: flex-start;
		gap: 50px;
		width: 100%;
		@include media_narrow {
			flex-direction: column-reverse;
			gap: vw(40);
		}
	}

	/* info ------------ */
	.lcl-detail__info {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: 60px;
		@include media_narrow {
			gap: vw(40);
			padding-inline: vw(15);
			width: 100%;
		}
	}
	//back
	.lcl-detail-back {
		display: flex;
		align-items: center;
		gap: 8px;
		@include media_narrow {
			order: 1;
			gap: vw(8);
			padding-left: vw(15);
		}
	}
	.ico-angle-right {
		transform: scaleX(-1);
		width: 17px;
		height: auto;
		@include media_narrow {
			width: vw(17);
		}
	}
	.lcl-detail-back__txt {
		color: $c-white;
		@include fz(12);
		line-height: 1.5;
		letter-spacing: 0.04em;
	}
	// ttl
	.lcl-detail-ttl {
		display: flex;
		flex-direction: column;
		gap: 8px;
		@include media_narrow {
			gap: vw(8);
		}
	}
	.lcl-detail-ttl__txt {
		@include fz(30);
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: 0.07em;
		white-space: nowrap;
		@include media_narrow {
			@include fz(24);
		}
	}
	.lcl-detail-ttl__tags {
		display: flex;
		gap: 12px;
		@include media_narrow {
			gap: vw(12);
		}
	}
	.lcl-detail-ttl__tag {
		color: $c-gray;
		@include fz(12);
		line-height: 1.2;
		letter-spacing: 0.04em;
		@include media_narrow {
			@include fz(10);
		}
	}
	// desc
	.lcl-detail__desc {
		@include fz(12);
		line-height: 1.9;
		white-space: pre-line;
		@include media_wide {
			max-width: 330px;
		}
		@include media_narrow {
			@include fz(11);
		}
	}

	/* preview ------------ */
	.lcl-detail-preview {
		position: relative;
		overflow: hidden;
		flex: 1;
		border-radius: 8px;
		@include media_wide {
			max-width: 1000px;
			min-height: 400px;
		}
		@include media_narrow {
			border-radius: vw(6);
		}
	}
	.lcl-detail-loading {
		z-index: -1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		border-radius: 8px;
		width: 99%;
		height: 97%;
		background: #dcdcdc;
		@include media_narrow {
			border-radius: vw(6);
		}
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to right, transparent 45%, #ffffff 50%, transparent 55%);
			background-size: 250%;
			background-position: 100% 0;
			animation: skelton 1.3s infinite;

			@keyframes skelton {
				to {
					background-position: -10%;
				}
			}
			/*---------------- before */
		}
	}
	.lcl-detail-preview__video {
		width: 100%;
		object-fit: cover;
	}
	.lcl-detail-preview__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* foot ------------ */
	.lcl-detail-foot {
		margin-top: 100px;
		@include media_wide {
			margin-left: 50%;
		}
		@include media_narrow {
			margin-top: vw(100);
			padding-inline: vw(15);
		}
	}
	.lcl-detail-foot__list {
		display: flex;
		flex-direction: column;
		gap: 32px;
		@include media_narrow {
			gap: vw(24);
		}
	}
	.lcl-detail-foot__item {
	}
	.lcl-detail-foot__label {
		color: $c-gray;
		@include fz(12);
		font-weight: 400;
		line-height: 1.2;
		@include media_narrow {
			@include fz(10);
		}
	}
	.lcl-detail-foot__txt {
		@include fz(14);
		line-height: 1.5;
		letter-spacing: 0.04em;
		@include media_narrow {
			@include fz(12);
		}
	}
}
</style>
