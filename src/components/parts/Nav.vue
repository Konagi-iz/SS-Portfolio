<script setup>
import { ref } from 'vue';
import { isNavActive } from '@/store/index.js';
import Menu from '@/components/parts/Menu.vue';
import IconStar from '~icons/svg/ico-star';

const navlist = [
	{
		en: 'Home',
		jp: 'ホーム',
	},
	{
		en: 'About me',
		jp: '私について',
	},
	{
		en: 'Works',
		jp: '制作実績',
	},
	{
		en: 'Photography',
		jp: '写真',
	},
];
</script>

<template>
	<div class="nav-wrp" :class="{ 'nav-wrp--active': isNavActive }">
		<nav class="nav">
			<ul class="nav-list">
				<li v-for="(item, index) in navlist" :key="index" class="nav-list__item">
					<router-link to="" class="nav-list__link">
						<IconStar></IconStar>
						<span class="nav-list__en font-dp">{{ item.en }}</span>
						<span class="nav-list__ttl">{{ item.jp }}</span>
					</router-link>
				</li>
			</ul>
			<!-- .nav-list -->
		</nav>
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
				<a class="nav-info__mail font-en" href="mailto:shimakawashodai@gmail.com">shimakawashodai@gmail.com</a>
			</div>
			<!-- .nav-info__btm -->
			<div class="nav-menu">
				<Menu :isNavMenu="true"></Menu>
			</div>
			<!-- .nav-menu -->
		</div>
		<!-- .nav-info -->
	</div>
	<!-- .nav-wrp -->
</template>

<style scoped lang="scss">
.nav-wrp {
	z-index: 1000;
	position: fixed;
	top: 0;
	right: 0;
	opacity: 0;
	visibility: hidden;
	display: flex;
	width: fit-content;
	height: 100dvh;
	transition: opacity 0s, visibility 0s;
	transition-delay: 0.8s;
	// nav-wrp--active
	&.nav-wrp--active {
		opacity: 1;
		visibility: visible;
		transition-delay: 0s;
	}
	&.nav-wrp--active .nav {
		clip-path: inset(-1% -1% -1% -1%);
	}
	&.nav-wrp--active .nav-info {
		clip-path: inset(-1% -1% -1% -1%);
	}

	/* nav ------------ */
	.nav {
		clip-path: inset(100% 0 0 0);
		border-left: 1px solid $c-gray;
		background: $c-darkgray;
		transition: clip-path 0.8s $e-out2;
	}
	.nav-list {
		display: flex;
		flex-direction: column;
		width: 657px;
		height: 100%;
	}
	.nav-list__item {
		border-bottom: 1px solid $c-gray;
	}
	.nav-list__link {
		display: flex;
		align-items: center;
		padding-block: 30px;
		padding-left: 20px;
	}
	.ico-star {
		width: 20px;
		height: auto;
	}
	:deep(.ico-star__path) {
		fill: $c-white;
	}
	.nav-list__en {
		margin-left: 8px;
		color: $c-white;
		@include fz(64);
		line-height: 1;
		letter-spacing: 0.04em;
	}
	.nav-list__ttl {
		align-self: flex-end;
		margin-left: 16px;
		color: $c-white;
		@include fz(14);
		font-weight: 500;
		line-height: 2.9;
		letter-spacing: 0.02em;
	}

	/* nav-info ------------ */
	.nav-info {
		clip-path: inset(0 0 100% 0);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-left: 1px solid $c-gray;
		padding: 127px 24px 24px;
		background: $c-darkgray;
		transition: clip-path 0.8s $e-out2;
	}
	.nav-info__name {
		align-self: flex-end;
		@include fz(24);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.05em;
		text-align: right;
	}
	.nav-info__btm {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.nav-info__label {
		color: $c-gray;
		@include fz(10);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.07em;
	}
	.nav-info__mail {
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
	}
}
</style>
