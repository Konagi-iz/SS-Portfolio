<script setup>
import TextSplit from '@/components/parts/TextSplit.vue';
</script>

<template>
	<section class="lcl-motto">
		<h2 class="lcl-motto__main">
			<span class="lcl-motto__word font-dp scr-anin">
				<TextSplit text="Change"></TextSplit>
			</span>
			<span class="lcl-motto__word font-dp scr-anin">
				<TextSplit text="Tomorrow"></TextSplit>
			</span>
			<span class="lcl-motto__word font-dp scr-anin">
				<TextSplit text="From"></TextSplit>
			</span>
			<span class="lcl-motto__word font-dp scr-anin">
				<TextSplit text="Today"></TextSplit>
			</span>
		</h2>
		<!-- .lcl-motto__main -->
		<!-- prettier-ignore -->
		<p class="lcl-motto-txt scr-anin">
			<span class="lcl-motto-txt__row"><span class="lcl-motto-txt__txt">”今日から明日の世界を変える”</span></span><br>
			<span class="lcl-motto-txt__row"><span class="lcl-motto-txt__txt">良いものを作る為なら</span></span><br>
			<span class="lcl-motto-txt__row"><span class="lcl-motto-txt__txt">今日できる事を全力でやりたい。</span></span>
		</p>
		<!-- .lcl-motto-txt -->
	</section>
</template>

<style scoped lang="scss">
.lcl-motto {
	margin-top: 127px;
	.lcl-motto__main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-inline: auto;
		width: fit-content;
	}
	.lcl-motto__word {
		clip-path: inset(0 0 -10% 0);
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		&:nth-of-type(1) {
			transform: translateX(-130px);
		}
		&:nth-of-type(2) {
			transform: translateX(86px);
		}
		&:nth-of-type(3) {
			transform: translateX(-265px);
		}
		&:nth-of-type(4) {
			transform: translateX(14px);
		}
		:deep(.split-span) {
			color: $c-orange;
			@include fz(148);
			line-height: 1;
			@include delay(8);
		}
	}
	.lcl-motto-txt {
		margin-top: 63px;
		margin-inline: auto;
		width: fit-content;
		text-align: center;
		&.scr-anin--on .lcl-motto-txt__txt {
			transform: translateY(0);
		}
	}
	.lcl-motto-txt__row {
		display: inline-block;
		overflow: hidden;
		&:nth-of-type(2) .lcl-motto-txt__txt {
			transition-delay: 0.1s;
		}
		&:nth-of-type(3) .lcl-motto-txt__txt {
			transition-delay: 0.2s;
		}
	}
	.lcl-motto-txt__txt {
		transform: translateY(100%);
		display: inline-block;
		color: $c-orange;
		@include fz(16);
		line-height: 2.2;
		transition: transform 1s $e-out-circ;
	}
}
</style>
