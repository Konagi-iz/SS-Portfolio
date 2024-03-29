<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import TextSplit from '@/components/parts/TextSplit.vue';
import { isRouterViewLoaded } from '@/store';
import IconAngleRight from '~icons/svg/ico-angle-right';

const props = defineProps({ wrapper: Object });

const route = useRoute();
const main = ref(null);
const mail1 = ref(null);
const mail2 = ref(null);
const mail3 = ref(null);
const spacer = ref(null);

let backgroundColor;
let noiseOpacity;

// Footerより前にあるPinでズレるのを防ぐ為、router-view以下がマウントされてから実行
watch(isRouterViewLoaded, (flag) => {
	if (flag) {
		if (backgroundColor && noiseOpacity) {
			backgroundColor.kill();
			noiseOpacity.kill();
		}

		gsap.set(props.wrapper, {
			background: route.name === 'photo' ? '#e2e2e2' : '#101010',
		});

		/* 背景色を切り替えるアニメーション ------------ */
		backgroundColor = gsap.to(props.wrapper, {
			background: '#FF2E12',
			scrollTrigger: {
				trigger: spacer.value,
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				toggleActions: 'play none no0ne reverse',
				invalidateOnRefresh: true,
			},
		});
		const noise = document.querySelector('.wrapper .bg-noise');
		noiseOpacity = gsap.to(noise, {
			opacity: 0.05,
			scrollTrigger: {
				trigger: spacer.value,
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				toggleActions: 'play none no0ne reverse',
				invalidateOnRefresh: true,
			},
		});

		/* メールアドレス ------------ */
		gsap.to([...mail1.value.char, ...mail2.value.char, ...mail3.value.char], {
			y: 0,
			stagger: { each: 0.1 },
			scrollTrigger: {
				trigger: main.value,
				start: 'top 30%',
				end: 'bottom bottom',
				scrub: 1,
			},
		});
	}
});
</script>

<template>
	<footer id="footer">
		<div ref="spacer" class="footer__spacer"></div>
		<div ref="main" class="footer__main">
			<div class="footer-mail">
				<p class="footer-mail__txt font-en">contact me</p>
				<IconAngleRight></IconAngleRight>
				<!-- prettier-ignore -->
				<a class="footer-mail__adress" href="mail:shimakawashodai@gmail.com">
					<span class="footer-mail__in font-dp"><TextSplit ref="mail1" text="shimakawa"></TextSplit></span><br class="dn-w"><span class="footer-mail__in font-dp"><TextSplit ref="mail2" text="shodai"></TextSplit></span><br class="dn-w"><span class="footer-mail__in font-en"><TextSplit ref="mail3" text="@gmail.com"></TextSplit></span>
				</a>
				<!-- .footer-mail__adress -->
			</div>
			<!-- .footer-mail -->
			<div class="footer-btm">
				<small class="footer-btm__copyright font-en">&copy;SS PORTFOLIO 2024</small>
				<ul class="footer-nav">
					<li
						v-for="(item, index) in [
							{
								ttl: 'HOME',
								route: 'home',
							},
							{
								ttl: 'ABOUT ME',
								route: 'about',
							},
							{
								ttl: 'WORKS',
								route: 'works',
							},
							{
								ttl: 'PHOTOGRAPHY',
								route: 'photo',
							},
						]"
						:key="index"
						class="footer-nav__item"
					>
						<router-link :to="{ name: item.route }" class="footer-nav__link font-en hv-txt">{{ item.ttl }}</router-link>
					</li>
				</ul>
				<!-- .footer-nav -->
				<router-link to="" class="footer-pagetop font-en">BACK TO TOP</router-link>
			</div>
		</div>
		<!-- .footer__main -->
	</footer>
</template>

<style scoped lang="scss">
#footer {
	width: 100%;
	color: $c-black;

	/* spacer ------------ */
	.footer__spacer {
		width: 100%;
		height: 600px;
		@include media_narrow {
			height: vw(600);
		}
	}

	/* main ------------ */
	.footer__main {
		position: relative;
		width: 100%;
		height: max(730px, 100vh);
		@include media_narrow {
			height: 100dvh;
		}
	}
	.footer-mail {
		position: absolute;
		bottom: 200px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		flex-direction: column;
		@include media_narrow {
			bottom: vw(177);
		}
	}
	.footer-mail__txt {
		@include fz(16);
		font-weight: 400;
		line-height: 1.5;
	}
	.ico-angle-right {
		transform: rotate(90deg);
		margin-top: 5px;
		width: 18px;
		height: auto;
		@include media_narrow {
			margin-top: vw(3);
			width: vw(18);
		}
	}
	:deep(.ico-angle-right__path) {
		stroke: $c-black;
	}
	.footer-mail__adress {
		margin-top: 3px;
		text-align: center;
		white-space: nowrap;
		@include media_narrow {
			margin-top: vw(7);
		}
		:deep(.split-span) {
			@include fz(64);
			line-height: 0.9;
			transition: transform 1s $e-out-circ, translate 0.8s $e-out-expo;
			@include media_narrow {
				@include fz(48);
			}
			@include media_hover {
				&:hover {
					translate: 0 -60% !important;
				}
				&:hover + *,
				&:has(+ *:hover) {
					translate: 0 -30% !important;
				}
			}
		}
	}
	.footer-mail__in {
		clip-path: inset(-100% 0 -14% 0);
		display: inline-block;
	}

	/* bottom ------------ */
	.footer-btm {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding-inline: 35px;
		padding-bottom: 35px;
		width: 100%;
		@include media_narrow {
			padding-inline: vw(15);
			padding-bottom: vw(15);
		}
	}
	.footer-btm__copyright {
		@include fz(10);
		font-weight: 400;
		line-height: 1.5;
	}
	.footer-nav {
		display: flex;
		gap: 16px;
		@include media_narrow {
			position: absolute;
			bottom: vw(43);
			left: 50%;
			transform: translateX(-50%);
			align-items: center;
			flex-direction: column;
			gap: 0;
		}
	}
	.footer-nav__item {
	}
	.footer-nav__link {
		position: relative;
		padding: 3px;
		@include fz(14);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.05em;
		@include media_narrow {
			padding: vw(3);
		}
		&::before {
			background: $c-black;
			/*---------------- before */
		}
		@include media_hover {
			&:hover {
				color: $c-orange !important;
			}
		}
	}
	.footer-pagetop {
		@include fz(10);
		font-weight: 400;
		line-height: 1.5;
	}
}
</style>
