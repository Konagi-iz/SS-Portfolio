<script setup>
import Button01 from '@/components/parts/Button01.vue';

const props = defineProps({
	ttl: String,
	year: String,
	role: String,
	tag: String,
});
</script>

<template>
	<div class="workcard">
		<div class="workcard-txt">
			<div class="workcard-txt__main">
				<h3 class="workcard-txt__ttl font-en">{{ ttl.toUpperCase() }}</h3>
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
			<router-link to="" class="workcard-link">
				<Button01
					v-bind="{
						isBig: false,
						color: 'orange',
						txt: 'VIEW DETAIL',
					}"
				></Button01>
			</router-link>
		</div>
		<!-- .workcard-txt -->
		<div class="workcard-video">
			<video class="workcard-video__item" loop preload="auto" muted disablepictureinpicture>
				<source :src="`/assets/img/common/works/PC/video_${tag}.mp4`" />
			</video>
		</div>
	</div>
</template>

<style scoped lang="scss">
.workcard {
	display: flex;
	border-radius: 16px;
	padding: 30px;
	width: 1000px;
	height: 600px;
	background: $c-offwhite;

	/* txt ------------ */
	.workcard-txt {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 32px;
		padding-right: 20px;
		height: 100%;
	}
	.workcard-txt__main {
	}
	.workcard-txt__ttl {
		margin-bottom: 45px;
		color: $c-black;
		@include fz(50);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: 0.03em;
	}
	.workcard-info {
	}
	.workcard-info + .workcard-info {
		margin-top: 15px;
	}
	.workcard-info__label {
		color: $c-black;
		@include fz(12);
		font-weight: 400;
		line-height: 1.2;
	}
	.workcard-info__txt {
		color: $c-black;
		@include fz(16);
		font-weight: 400;
		line-height: 1.2;
	}
  .workcard-link {
    width: fit-content;
  }

	/* video ------------ */
	.workcard-video {
		width: 540px;
		height: 100%;
		object-fit: cover;
	}
	.workcard-video__item {
		border-radius: 8px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
