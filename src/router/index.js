import { createRouter, createWebHashHistory } from 'vue-router';
import { nextTick } from 'vue';
import HomeView from '@/components/views/HomeView.vue';
import { isRouterViewLoaded } from '@/store';

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
		},

		/* 存在しないパスを404にリダイレクト ------------ */
		// { path: '/:pathMatch(.*)*', redirect: { name: '404' } },

		/* 404 Not Found ------------ */
		// {
		// 	path: '/404',
		// 	name: '404',
		// 	component: () => import('@/components/views/404View.vue'),
		// },
	],
	scrollBehavior: async (to, from, savedPosition) => {
		const findEl = async (hash) => {
			const el = document.querySelector(hash);
			if (el) {
				return el;
			} else {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(findEl(hash));
					}, 100);
				});
			}
		};

		if (to.hash) {
			const el = await findEl(to.hash);
			console.log(el);
			if (el) {
				return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
			}
		}
		return { top: 0 };
	},
});

/* ページ遷移 前 に行われる処理 ------------ */
router.beforeEach((to, from, next) => {
	isRouterViewLoaded.value = false;

	setTimeout(() => {
		next();
	}, 1000);
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
