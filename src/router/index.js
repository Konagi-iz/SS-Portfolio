import { nextTick } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/components/views/HomeView.vue';
import { isRouterViewLoaded, isNavActive, isOpeningReady } from '@/store';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/components/views/AboutView.vue'),
		},
		{
			path: '/works',
			name: 'works',
			component: () => import('@/components/views/WorksView.vue'),
		},
		{
			path: '/works/:id',
			name: 'detail',
			component: () => import('@/components/views/DetailView.vue'),
		},
		{
			path: '/photography',
			name: 'photo',
			component: () => import('@/components/views/PhotographyView.vue'),
			// redirect: { name: 'coming' },
		},

		{
			path: '/commingsoon',
			name: 'coming',
			component: () => import('@/components/views/CommingSoonView.vue'),
		},

		/* 存在しないパスを404にリダイレクト ------------ */
		// { path: '/:pathMatch(.*)*', redirect: { name: '404' } },

		/* 404 Not Found ------------ */
		// {
		// 	path: '/404',
		// 	name: '404',
		// 	component: () => import('@/components/views/404View.vue'),
		// }import { isOpeningReady } from './../store/index';
	],

	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0, behavior: 'smooth' };
		}
	},
});

/* ページ遷移 前 に行われる処理 ------------ */
router.beforeEach((to, from, next) => {
	isRouterViewLoaded.value = false;

	setTimeout(() => {
		isOpeningReady.value = false;
		isNavActive.value = false;
		next();
	}, 700);
});

/* ページ遷移 後 に行われる処理 ------------ */
router.afterEach((to, from, next) => {
	nextTick(() => {
		scrollAnimation();
	});

	/* Scroll animation ------------ */
	function scrollAnimation() {
		const targets = document.querySelectorAll('.scr-anin');

		targets.forEach((e) => {
			window.addEventListener('scroll', () => {
				const scroll = window.scrollY;
				const h = window.innerHeight;
				const pos = scroll + e.getBoundingClientRect().top;

				if (scroll + h * 0.8 > pos) {
					e.classList.add('scr-anin--on');
				}
			});
		});
	}
});

export default router;
