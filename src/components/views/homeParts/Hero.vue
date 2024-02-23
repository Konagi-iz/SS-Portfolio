<script setup>
import { ref, onMounted } from 'vue';
import Canvas from '@/components/views/homeParts/Canvas.vue';

const date = ref({});

// 時間を取得
updateDate();
function updateDate() {
	const now = new Date();

	date.value.year = now.getFullYear();
	date.value.month = (now.getMonth() + 1).toString().padStart(2, '0');
	date.value.date = now.getDate().toString().padStart(2, '0');
	date.value.hours = now.getHours().toString().padStart(2, '0');
	date.value.minutes = now.getMinutes().toString().padStart(2, '0');

	setTimeout(updateDate, 1000);
}
</script>

<template>
	<section class="lcl-hero" id="top">
		<Canvas></Canvas>
		<!-- Canvas -->
		<h2 class="lcl-hero-ttl">
			<span class="lcl-hero-ttl__txt font-dp">Design.</span>
			<span class="lcl-hero-ttl__txt font-dp">Cording.</span>
			<span class="lcl-hero-ttl__txt font-dp">Exciting.</span>
		</h2>
		<!-- .lcl-hero-ttl -->
		<div class="lcl-hero-frame">
			<p class="lcl-hero-frame__time">
				<span class="lcl-hero-frame__txt font-en">{{ `YEAR - ${date.year}` }}</span>
				<span class="lcl-hero-frame__txt font-en">{{ `DATE - ${date.month}.${date.date}` }}</span>
				<span class="lcl-hero-frame__txt font-en">{{ `TIME - ${date.hours}:${date.minutes}` }}</span>
			</p>
			<!-- .lcl-hero-frame__time -->
			<p class="lcl-hero-frame__labels">
				<span class="lcl-hero-frame__label">
					<span class="lcl-hero-frame__txt font-en">Web Design</span>
				</span>
				<span class="lcl-hero-frame__label">
					<span class="lcl-hero-frame__txt font-en">Front-end</span>
				</span>
			</p>
			<!-- .lcl-hero-frame__label -->
			<p class="lcl-hero-frame__ttl">
				<span class="lcl-hero-frame__txt font-en">
					SHIMAKAWA
					<br />
					SHODAI
					<br />
					PORTFOLIO
				</span>
			</p>
			<!-- .lcl-hero-frame__ttl -->
		</div>
		<!-- .lcl-hero-frame -->
	</section>
</template>

<style scoped lang="scss">
.lcl-hero {
	position: relative;
	border-bottom: 1px solid $c-gray;
	padding-top: 88px;
	width: 100%;
	height: max(minpx(730), pcvw(730));
	@include media_narrow {
		padding-top: vw(58);
		height: 100lvh;
	}

	/* hero-ttl ------------ */
	.lcl-hero-ttl {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.lcl-hero-ttl__txt {
		color: $c-orange;
		font-size: max(minpx(228), pcvw(228));
		line-height: 0.94;
		letter-spacing: 0.04em;
		@include media_narrow {
			@include fz(82);
			line-height: 1.2;
		}
	}

	/* hero-frame ------------ */
	.lcl-hero-frame {
		position: relative;
		border: 1px solid $c-gray;
		border-radius: 12px;
		margin-inline: auto;
		width: calc(100% - 40px);
		height: calc(100% - 20px);
		@include media_narrow {
			width: calc(100% - vw(16));
			height: calc(100% - vw(8));
		}
	}
	.lcl-hero-frame__time {
		position: absolute;
		top: 11px;
		left: 16px;
		@include media_narrow {
			top: vw(9);
			left: vw(11);
		}
	}
	.lcl-hero-frame__labels {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
		@include media_narrow {
			top: vw(8);
			right: vw(8);
			gap: vw(6);
		}
	}
	.lcl-hero-frame__label {
		border: 1px solid $c-gray;
		border-radius: 999px;
		padding: 5px 13px;
		@include media_narrow {
			padding: vw(3) vw(11);
		}
	}
	.lcl-hero-frame__ttl {
		position: absolute;
		bottom: 11px;
		left: 16px;
		@include media_narrow {
			bottom: vw(7);
			left: vw(11);
		}
	}
	.lcl-hero-frame__txt {
		display: block;
		color: $c-gray;
		@include fz(10);
		line-height: 1.5;
		letter-spacing: 0.04em;
	}
}
</style>
