<script setup>
import { onMounted } from 'vue';
import BGNoise from '@/components/parts/BGNoise.vue';
import { isRouterViewLoaded } from '@/store';

/* マウントされたらフラグを有効 ------------ */
onMounted(() => {
	isRouterViewLoaded.value = true;
});
</script>

<template>
	<section class="lcl-fv">
		<div class="lcl-fv__bg"></div>
		<!-- .lcl-fv__bg -->
		<BGNoise :opacity="20"></BGNoise>
		<div class="lcl-fv__cnt">
			<h2 class="lcl-fv__ttl font-dp">Comming Soon</h2>
			<p class="lcl-fv__txt">準備中です</p>
		</div>
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
	.lcl-fv__cnt {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.lcl-fv__ttl {
		color: $c-orange;
		@include fz(128);
		line-height: 1.5;
		letter-spacing: 0.03em;
    white-space: nowrap;
	}
	.lcl-fv__txt {
		@include txt-basic;
		text-align: center;
	}
}
</style>
