<script setup>
import WorksFVList from '@/components/parts/WorksFVList.vue';
import BGNoise from '@/components/parts/BGNoise.vue';
import TextSplit from '@/components/parts/TextSplit.vue';
import workslist from '@/assets/data/works.json';
import { isOpeningReady } from '@/store';
</script>

<template>
	<section class="lcl-fv">
		<div class="lcl-fv__bg"></div>
		<!-- .lcl-fv__bg -->
		<BGNoise :opacity="20"></BGNoise>
		<!-- .bg-noise -->
		<div class="lcl-fv-worksfvlist-wrp">
			<WorksFVList></WorksFVList>
		</div>
		<!-- .works-fv -->
		<div class="lcl-fv__cnt">
			<h2 class="lcl-fv__ttl font-dp" :class="{ 'opening--on': isOpeningReady }">
				<TextSplit text="Works"></TextSplit>
			</h2>
			<ul class="lcl-fv-list" :class="{ 'opening--on': isOpeningReady }">
				<li v-for="(item, index) in workslist" :key="index" class="lcl-fv-list__item font-en">
					{{ `0${index + 1} - ${item.title}` }}
				</li>
				<!-- .lcl-fv-list__item -->
			</ul>
			<!-- .lcl-fv-list -->
		</div>
		<!-- .lcl-fv__cnt -->
	</section>
</template>

<style scoped lang="scss">
.lcl-fv {
	position: relative;
	width: 100%;
	height: 730px;
	@include media_narrow {
		height: max(667px, 100lvh);
	}

	/* background ------------ */
	.lcl-fv__bg {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.4;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, $c-orange, $c-darkgray 60%);
	}

	/* worksFVList ------------ */
	.lcl-fv-worksfvlist-wrp {
		position: absolute;
		top: 68px;
		left: calc(50% - 163px);
		width: min(1098px, (100% - 487px - 15px) - (100% - 1300px) / 2);
		height: 662px;
		mask: linear-gradient(to left, transparent 15px, #000000 387px);
		@include media_narrow {
			left: 0;
			top: vw(-61);
			width: 100%;
			height: auto;
			mask: linear-gradient(to bottom, transparent vw(111), #000000 vw(305));
		}
	}

	/* contents ------------ */
	.lcl-fv__cnt {
		z-index: 1;
		position: relative;
		padding-top: 395px;
		margin-left: max(15px, (100% - 1300px) / 2 + 15px);
		width: fit-content;
		@include media_narrow {
			padding-top: vw(461);
			margin-left: vw(15);
		}
	}
	.lcl-fv__ttl {
		overflow: hidden;
		color: $c-orange;
		@include fz(188);
		line-height: 1.1;
		@include media_narrow {
			@include fz(102);
		}
		&.opening--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(5);
			transition: transform 1s $e-out-expo;
		}
	}

	/* list ------------ */
	.lcl-fv-list {
		margin-top: 23px;
		margin-left: 22px;
		width: fit-content;
		@include media_narrow {
			margin-top: vw(4);
			margin-left: vw(10);
		}
		&.opening--on .lcl-fv-list__item {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.lcl-fv-list__item {
		opacity: 0;
		transform: translateY(100%);
		color: $c-gray;
		@include fz(12);
		line-height: 1.5;
		transition: transform 0.8s $e-out-expo, opacity 0.8s $e-out-expo;
		@include delay(10);
		@include media_narrow {
			@include fz(10);
		}
	}
}
</style>
