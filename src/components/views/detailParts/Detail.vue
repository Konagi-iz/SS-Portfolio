<script setup>
import Button01 from '@/components/parts/Button01.vue';

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
				<div class="lcl-detail__info">
					<div class="lcl-detail-ttl">
						<h2 class="lcl-detail-ttl__txt font-en">{{ ttl.toUpperCase() }}</h2>
						<div class="lcl-detail-ttl__tags">
							<p v-for="(item, index) in data.tags" :key="index" class="lcl-detail-ttl__tag font-en">{{ item }}</p>
						</div>
					</div>
					<!-- .lcl-detail-ttl -->
					<p class="lcl-detail__desc" v-text="data.desc"></p>
					<!-- .lcl-detail__desc -->
					<router-link to="">
						<Button01
							v-bind="{
								isBig: false,
								color: 'white',
								txt: 'VISIT LIVE SITE',
							}"
						></Button01>
					</router-link>
				</div>
				<!-- .lcl-detail__info -->
				<div class="lcl-detail-preview">
					<video
						class="lcl-detail-preview__video"
						:src="`assets/img/common/works/PC/video_preview_${tag}.mp4`"
						muted
						autoplay
						loop
						disablepictureinpicture
					></video>
					<!-- .lcl-detail-preview__video -->
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
	/* main ------------ */
	.lcl-detail__main {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-inline: auto;
		width: min(1900px, 100% - (5.384% * 2));
		height: max(730px, 100vh);
	}
	.lcl-detail__in {
		display: flex;
		align-items: flex-start;
		gap: 50px;
	}

	/* info ------------ */
	.lcl-detail__info {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: 70px;
	}
	// ttl
	.lcl-detail-ttl {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.lcl-detail-ttl__txt {
		@include fz(30);
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: 0.07em;
		white-space: nowrap;
	}
	.lcl-detail-ttl__tags {
		display: flex;
		gap: 12px;
	}
	.lcl-detail-ttl__tag {
		color: $c-gray;
		@include fz(12);
		line-height: 1.2;
		letter-spacing: 0.04em;
	}
	// desc
	.lcl-detail__desc {
		max-width: 330px;
		@include fz(12);
		line-height: 1.9;
		white-space: pre-line;
	}

	/* preview ------------ */
	.lcl-detail-preview {
		max-width: 1000px;
	}
	.lcl-detail-preview__video {
		border-radius: 8px;
		width: 100%;
		object-fit: cover;
	}

	/* foot ------------ */
	.lcl-detail-foot {
		margin-top: 100px;
		margin-left: 50%;
	}
	.lcl-detail-foot__list {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.lcl-detail-foot__item {
	}
	.lcl-detail-foot__label {
		color: $c-gray;
		@include fz(12);
		font-weight: 400;
		line-height: 1.2;
	}
	.lcl-detail-foot__txt {
		@include fz(14);
		line-height: 1.5;
		letter-spacing: 0.04em;
	}
}
</style>
