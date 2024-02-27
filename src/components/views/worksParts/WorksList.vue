<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import TextSplit from '@/components/parts/TextSplit.vue';
import WorksCard from '@/components/parts/WorkCard.vue';
import workslist from '@/assets/data/works.json';

const card = ref(null);

let isComponentUnmounted = false;

const webdesignWorks = workslist.filter((item) => item.cat === 'web');
const graphicWorks = workslist.filter((item) => item.cat === 'design');
const categorizedWorks = [webdesignWorks, graphicWorks];

onMounted(() => {
	/* ホバーで動画再生 ------------ */
	card.value.forEach((item) => {
		const video = item.querySelector('video');
		let videoResetTimer = null;

		const mouseEnterHandler = () => {
			if (videoResetTimer) {
				clearTimeout(videoResetTimer);
			}
			controlVideo(video, 'play');
		};

		const mouseLeaveHandler = () => {
			videoResetTimer = setTimeout(() => {
				controlVideo(video, 'reset');
			}, 800);
		};

		item.addEventListener('mouseenter', mouseEnterHandler);
		item.addEventListener('mouseleave', mouseLeaveHandler);

		item._mouseEnterHandler = mouseEnterHandler;
		item._mouseLeaveHandler = mouseLeaveHandler;
	});
});

onUnmounted(() => {
	isComponentUnmounted = true;

	card.value.forEach((item) => {
		if (item._mouseEnterHandler && item._mouseLeaveHandler) {
			item.removeEventListener('mouseenter', item._mouseEnterHandler);
			item.removeEventListener('mouseleave', item._mouseLeaveHandler);
		}
	});
});

function controlVideo(el, control) {
	if (!isComponentUnmounted && el) {
		if (control === 'play') {
			el.play()
				.then(() => {
					return;
				})
				.catch((error) => {
					console.error('動画の再生に失敗しました。', error);
				});
		} else if (control === 'reset') {
			el.load();
			el.pause();
		}
	}
}
</script>

<template>
	<section class="lcl-workslist">
		<div class="lcl-workslist__in">
			<div v-for="(category, index) in categorizedWorks" :key="index" class="lcl-worklist__cat">
				<div class="lcl-workslist-ttl">
					<p class="lcl-workslist-ttl__index">{{ `0${index + 1}` }}</p>
					<h2 class="lcl-workslist-ttl__txt font-dp scr-anin">
						<TextSplit :text="index === 0 ? 'Web sites' : 'Graphics'"></TextSplit>
					</h2>
					<!-- .lcl-workslist-ttl__txt -->
				</div>
				<!-- .lcl-workslist-ttl -->
				<ul class="lcl-workslist-list">
					<li v-for="(item, index) in category" :key="item.id" ref="card" class="lcl-workslist-list__item scr-anin fade-in-btm">
						<router-link :to="`/works/${item.id}`" class="lcl-wroklist-list__link">
							<WorksCard
								v-bind="{
									ttl: item.title,
									year: item.year,
									role: item.role,
									tag: item.tag,
									cat: item.cat,
								}"
							></WorksCard>
						</router-link>
					</li>
					<!-- .lcl-workslist-list__item -->
				</ul>
				<!-- .lcl-workslist-list -->
			</div>
			<!-- .lcl-workslist__cat -->
		</div>
		<!-- .lcl-workslist__in -->
	</section>
</template>

<style scoped lang="scss">
.lcl-workslist {
	margin-block: 225px 100px;
	width: 100%;
	.lcl-workslist__in {
		margin-inline: auto;
		width: 1000px;
		@include media_narrow {
			padding-inline: vw(15);
			width: 100%;
		}
	}
	.lcl-worklist__cat {
		margin-top: 225px;
		@include media_narrow {
			margin-top: vw(100);
		}
	}

	/* ttl ------------ */
	.lcl-workslist-ttl {
	}
	.lcl-workslist-ttl__index {
		position: relative;
		margin-left: 4px;
		width: fit-content;
		color: $c-gray;
		@include fz(12);
		line-height: 1.1;
		@include media_narrow {
			margin-left: vw(4);
		}
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -15px;
			transform: translate(100%, -50%);
			width: 133px;
			height: 1px;
			background: $c-gray;
			@include media_narrow {
				right: vw(-14);
				width: vw(100);
			}
			/*---------------- after */
		}
	}
	.lcl-workslist-ttl__txt {
		overflow: hidden;
		color: $c-orange;
		@include fz(72);
		line-height: 1.1;
		@include media_narrow {
			margin-top: vw(4);
			@include fz(48);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(9);
			transition: transform 1s $e-out-expo;
		}
	}

	/* list ------------ */
	.lcl-workslist-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 80px;
		@include media_narrow {
			margin-top: vw(37);
		}
		@include media_hover {
			&:has(.lcl-workslist-list__item:hover) .lcl-workslist-list__link {
				opacity: 0.5;
			}
		}
	}
	.lcl-workslist-list__item {
		@include media_wide {
			&:nth-of-type(even) {
				transition-delay: 0.1s;
			}
		}
	}
	.lcl-wroklist-list__link {
		transition: opacity 0.6s $e-out-expo, transform 0.6s $e-out-expo;
		@include media_hover {
			&:hover {
				opacity: 1 !important;
				transform: scale(1.05);
			}
		}
	}
}
</style>
