<script setup>
import TextSplit from '@/components/parts/TextSplit.vue';
</script>

<template>
	<section class="lcl-awards">
		<div class="lcl-awards__bg scr-anin"></div>
		<!-- .lcl-awards__bg -->
		<h2 class="lcl-awards__ttl font-dp scr-anin">
			<TextSplit text="Awards"></TextSplit>
		</h2>
		<!-- .lcl-awards__ttl -->
		<ul class="lcl-awards-list scr-anin">
			<li
				v-for="(item, index) in [
					{
						ttl: 'HAL 3校合同学内コンテスト(リーフレット)　銅賞',
						year: '2022',
					},
					{
						ttl: 'HAL 3校合同学内コンテスト(WEBサイト)　金賞',
						year: '2022',
					},
					{
						ttl: 'HAL 3校合同学内コンテスト(リーフレット)　銀賞',
						year: '2023',
					},
				]"
				:key="index"
				class="lcl-awards-list__item fade-in-btm"
			>
				<p class="lcl-awards-list__ttl">{{ item.ttl }}</p>
				<p class="lcl-awards-list__year font-en">{{ item.year }}</p>
			</li>
		</ul>
		<!-- .lcl-awards-list -->
		<div class="lcl-awards-tips">
			<img class="lcl-awards-tips__icon" src="/assets/img/about/PC/ico-tips.svg" alt="tips" width="24" height="24" loading="lazy" />
			<p class="lcl-awards-tips__txt">
				HAL 3校合同学内コンテスト：東京、名古屋、大阪の3校の同じ専攻の学生が同じ課題に取り組む学内コンテスト
			</p>
		</div>
		<!-- .lcl-awards-tips -->
	</section>
</template>

<style scoped lang="scss">
.lcl-awards {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 120px;
	margin-top: 160px;
	margin-inline: auto;
	padding: 50px;
	width: min(1900px, 100% - 120px);
	color: $c-orange;
	@include media_narrow {
		gap: vw(90);
		margin-top: vw(120);
		padding: vw(15);
		width: calc(100% - vw(30));
	}

	/* background ------------ */
	.lcl-awards__bg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 0;
		width: 100vw;
		height: 100%;
		background: $c-offwhite;
		transition: border-radius 1s $e-out-circ, width 1s $e-out-circ;
		&.scr-anin--on {
			border-radius: 32px;
			width: 100%;
			@include media_narrow {
				border-radius: vw(12);
			}
		}
	}

	/* ttl ------------ */
	.lcl-awards__ttl {
		overflow: hidden;
		@include fz(72);
		line-height: 1.2;
		@include media_narrow {
			@include fz(46);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(6);
		}
	}

	/* list ------------ */
	.lcl-awards-list {
		display: flex;
		flex-direction: column;
		& > * + * {
			border-top: 1px solid $c-orange;
			padding-top: 32px;
			@include media_narrow {
				padding-top: vw(24);
			}
		}
		&.scr-anin--on .lcl-awards-list__item {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
	}
	.lcl-awards-list__item {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		@include delay(3, 0.1);
		&:not(&:last-of-type) {
			padding-bottom: 32px;
			@include media_narrow {
				padding-bottom: vw(24);
			}
		}
	}
	.lcl-awards-list__ttl {
		@include fz(20);
		font-weight: 500;
		line-height: 1.9;
		@include media_narrow {
			width: 60%;
			@include fz(14);
			line-height: 1.7;
		}
	}
	.lcl-awards-list__year {
		@include fz(20);
		font-weight: 400;
		line-height: 1.9;
		@include media_narrow {
			@include fz(12);
		}
	}

	/* tips ------------ */
	.lcl-awards-tips {
		display: flex;
		align-items: center;
		gap: 12px;
		@include media_narrow {
			gap: vw(8);
		}
	}
	.lcl-awards-tips__icon {
		flex-shrink: 0;
		width: 24px;
		@include media_narrow {
			width: vw(16);
		}
	}
	.lcl-awards-tips__txt {
		@include txt-basic;
		@include media_narrow {
			@include fz(11);
		}
	}
}
</style>
