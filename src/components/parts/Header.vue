<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '@/components/parts/Menu.vue';
import Nav from '@/components/parts/Nav.vue';

const route = useRoute();

const isHeaderScrolled = ref(false);
const isBr = ref(false);
const isMenuScrolled = ref(false);

const menu = ref(null);

/* .header__ttlのbrを遅延して表示させる ------------ */
watch(isHeaderScrolled, (v) => {
	if (v) {
		setTimeout(() => {
			isBr.value = isHeaderScrolled.value;
		}, 700);
	} else {
		isBr.value = isHeaderScrolled.value;
	}
});

/* ページのトップからスクロールしたかどうか ------------ */
onHeaderScrolled();
function onHeaderScrolled() {
	window.addEventListener('scroll', () => {
		const scroll = window.scrollY;
		const h = window.innerHeight;

		if (scroll > h) {
			isHeaderScrolled.value = true;
		} else {
			isHeaderScrolled.value = false;
		}
	});
}

onMounted(() => {
	setMenuSticky();
});
function setMenuSticky() {
	const pos = menu.value.getBoundingClientRect().top;
	window.addEventListener('scroll', () => {
		const scroll = window.scrollY;

		if (scroll > pos) {
			isMenuScrolled.value = true;
		} else {
			isMenuScrolled.value = false;
		}
	});
}
</script>

<template>
	<header id="header" :class="{ 'header--scrolled': isHeaderScrolled, 'header--subpage': route.name !== 'home' }">
		<div class="header__in">
			<p class="header__txt header__txt--l font-en">S.S</p>
			<router-link :to="{ name: 'about' }" class="header__link">
				<h1 class="header__ttl font-en">
					SHIMAKAWA
					<br class="br" :class="{ 'br--active': isBr }" />
					SHODAI
					<br class="br" :class="{ 'br--active': isBr }" />
					PORTFOLIO
				</h1>
			</router-link>
			<!-- .header__ttl -->
			<p class="header__txt header__txt--r font-en">2024</p>
		</div>
		<!-- .header__in -->
		<div ref="menu" class="header__menu" :class="{ 'header__menu--fixed': isMenuScrolled }">
			<Menu></Menu>
		</div>
		<!-- .header__menu -->
		<Nav></Nav>
	</header>
</template>

<style scoped lang="scss">
#header {
	z-index: 999;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 68px;
	color: $c-gray;
	@include media_narrow {
		height: vw(50);
	}
	.header__in {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid currentColor;
		height: 100%;
	}
	.header__txt {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 73px;
		height: 100%;
		color: currentColor;
		@include fz(14);
		font-weight: 400;
		line-height: 1.5;
		@include media_narrow {
			width: vw(50);
			@include fz(12);
		}
	}
	.header__txt--l {
		border-right: 1px solid currentColor;
	}
	.header__txt--r {
		border-left: 1px solid currentColor;
	}
	.header__link {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 235px;
		transition-property: top, left, transform, width;
		transition-duration: 0.7s;
		transition-timing-function: $e-inOut;
		@include media_wide {
			height: 68px;
		}
		@include media_narrow {
			top: vw(17.5);
			width: vw(196);
		}
	}
	.header__ttl {
		width: 100%;
		color: $c-white;
		@include fz(12);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.13em;
		word-break: break-all;
		@include media_wide {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		@include media_narrow {
			@include fz(10);
		}
		.br {
			display: none;
		}
		.br--active {
			display: block;
		}
	}

	/* menu ------------ */
	.header__menu {
		z-index: 999;
		position: absolute;
		top: calc(100vh - 66px - 20px);
		right: 10px;
		padding-top: 10px;
		@include media_narrow {
			top: calc(100vh - vw(46) - vw(30));
			right: vw(15);
			padding-top: vw(15);
		}
	}
	.header__menu--fixed {
		position: fixed;
		top: 0;
	}

	/* .header--scrolled ------------ */
	&.header--scrolled .header__link {
		left: 15px;
		transform: translateX(0);
		width: 87px;
		@include media_narrow {
			top: vw(15);
			left: vw(15);
			width: vw(74);
		}
	}

	/* header--subpage ------------ */
	&.header--subpage {
		color: $c-offwhite;
	}
}
</style>
