<script setup>
import { watch } from 'vue';
import Menu from '@/components/parts/Menu.vue';
import IconStar from '~icons/svg/ico-star';
import { lenis } from '@/main';
import { isNavActive, media } from '@/store';
import { useToggleNav } from '@/components/composable/toggleNav';

/* スクロール無効化 ------------ */
watch(isNavActive, (val) => {
	if (val) {
		lenis.stop();
	} else {
		lenis.start();
	}
});
</script>

<template>
	<div @click="useToggleNav" class="nav-overlay" :class="{ 'nav-overlay--active': isNavActive }"></div>

	<div class="nav-container" :class="{ 'nav-container--active': isNavActive }">
		<div class="nav-wrp">
			<div v-if="media === 'SP'" class="nav-menu">
				<Menu :isNavMenu="true"></Menu>
			</div>
			<nav class="nav">
				<ul class="nav-list">
					<li
						v-for="(item, index) in [
							{
								en: 'Home',
								jp: 'ホーム',
								route: 'home',
							},
							{
								en: 'About me',
								jp: '私について',
								route: 'about',
							},
							{
								en: 'Works',
								jp: '制作実績',
								route: 'works',
							},
							{
								en: 'Photography',
								jp: '写真',
								route: 'photo',
							},
						]"
						:key="index"
						class="nav-list__item"
					>
						<router-link :to="{ name: item.route }" class="nav-list__link hv-txt">
							<IconStar></IconStar>
							<span class="nav-list__en font-dp">{{ item.en }}</span>
							<span class="nav-list__ttl">{{ item.jp }}</span>
						</router-link>
					</li>
				</ul>
				<!-- .nav-list -->
			</nav>
		</div>
		<!-- .nav -->
		<div class="nav-info">
			<p class="nav-info__name font-en">
				SHIMAKAWA
				<br />
				SHODAI
				<br />
				PORTFOLIO
			</p>
			<!-- .nav-info__name -->
			<div class="nav-info__btm font-en">
				<p class="nav-info__label font-en">CONTACT</p>
				<a class="nav-info__mail font-en hv-txt" href="mailto:shimakawashodai@gmail.com">shimakawashodai@gmail.com</a>
			</div>
			<!-- .nav-info__btm -->
			<div v-if="media === 'PC'" class="nav-menu">
				<Menu :isNavMenu="true"></Menu>
			</div>
			<!-- .nav-menu -->
		</div>
		<!-- .nav-info -->
	</div>
	<!-- .nav-wrp -->
</template>

<style scoped lang="scss">
/* overlay ------------ */
.nav-overlay {
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	visibility: hidden;
	width: 100%;
	height: 100lvh;
	background: $c-black;
	transition: opacity 0.6s $e-out-circ, visibility 0.6s $e-out-circ;
}
.nav-overlay--active {
	opacity: 0.8;
	visibility: visible;
}

/* nav ------------ */
.nav-container {
	z-index: 1000;
	position: fixed;
	top: 0;
	right: 0;
	display: flex;
	width: fit-content;
	height: 100dvh;
	@include media_wide {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0s, visibility 0s;
		transition-delay: 0.8s;
	}
	@include media_narrow {
		clip-path: inset(-1% -1% 100% -1%);
		flex-direction: column;
		width: 100%;
		transition: clip-path 0.8s $e-out-expo;
	}
	// nav-wrp--active
	&.nav-container--active {
		@include media_wide {
			opacity: 1;
			visibility: visible;
			transition-delay: 0s;
		}
		@include media_narrow {
			clip-path: inset(-1% -1% -1% -1%);
		}
	}
	@include media_wide {
		&.nav-container--active .nav-wrp {
			clip-path: inset(-1% -1% -1% -1%);
		}
		&.nav-container--active .nav-info {
			clip-path: inset(-1% -1% -1% -1%);
		}
	}

	/* nav ------------ */
	.nav-wrp {
		position: relative;
		border-left: 1px solid $c-gray;
		background: $c-darkgray;
		transition: clip-path 1.2s $e-out-expo;
		@include media_wide {
			clip-path: inset(100% 0 0 0);
		}
		@include media_narrow {
			padding-top: vw(66);
		}
	}
	.nav {
	}
	.nav-list {
		display: flex;
		flex-direction: column;
		width: 657px;
		@include media_wide {
			height: 100%;
		}
		@include media_narrow {
			width: 100%;
		}
	}
	.nav-list__item {
		border-bottom: 1px solid $c-gray;
		padding-block: 30px;
		padding-left: 20px;
		@include media_narrow {
			padding-block: vw(36);
			padding-left: vw(20);
		}
		&:nth-of-type(1) {
			@include media_narrow {
				border-top: 1px solid $c-gray;
			}
		}
	}
	.nav-list__link {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		color: $c-white;
	}
	.ico-star {
		width: 20px;
		height: auto;
		@include media_narrow {
			width: vw(15);
		}
	}
	:deep(.ico-star__path) {
		fill: currentColor;
		transition: fill 0.6s $e-out-expo;
	}
	.nav-list__en {
		margin-left: 8px;
		color: currentColor;
		@include fz(64);
		line-height: 1;
		letter-spacing: 0.04em;
		transition: color 0.6s $e-out-expo;
		@include media_narrow {
			margin-left: vw(8);
			@include fz(32);
		}
	}
	.nav-list__ttl {
		align-self: flex-end;
		margin-left: 16px;
		color: currentColor;
		@include fz(14);
		font-weight: 500;
		line-height: 2.9;
		letter-spacing: 0.02em;
		@include media_narrow {
			margin-left: vw(16);
			@include fz(12);
			line-height: 2.1;
		}
	}

	/* nav-info ------------ */
	.nav-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-left: 1px solid $c-gray;
		padding: 127px 24px 24px;
		background: $c-darkgray;
		transition: clip-path 1.2s $e-out-expo;
		@include media_wide {
			clip-path: inset(0 0 100% 0);
		}
		@include media_narrow {
			flex: 1;
			padding: vw(17) vw(20);
		}
	}
	.nav-info__name {
		align-self: flex-end;
		@include fz(24);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.05em;
		text-align: right;
		@include media_narrow {
			@include fz(16);
		}
	}
	.nav-info__btm {
		display: flex;
		flex-direction: column;
		gap: 6px;
		@include media_narrow {
			gap: vw(3);
		}
	}
	.nav-info__label {
		color: $c-gray;
		@include fz(10);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.07em;
		@include media_narrow {
			font-weight: 700;
		}
	}
	.nav-info__mail {
		position: relative;
		color: $c-white;
		@include fz(14);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.03em;
	}

	/* nav-menu ------------ */
	.nav-menu {
		position: absolute;
		top: 10px;
		right: 10px;
		@include media_narrow {
			top: vw(15);
			right: vw(15);
		}
	}
}
</style>
