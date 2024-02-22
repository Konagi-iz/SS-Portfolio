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

		/* 存在しないパスを404にリダイレクト ------------ */
		// { path: '/:pathMatch(.*)*', redirect: { name: '404' } },

		/* 404 Not Found ------------ */
		// {
		// 	path: '/404',
		// 	name: '404',
		// 	component: () => import('@/components/views/404View.vue'),
		// },
	],
	// scrollBehavior(to, from, savedPosition) {
	// 	return {
	// 		top: 0,
	// 	};
	// },
});

/* ページ遷移 前 に行われる処理 ------------ */
router.beforeEach((to, from, next) => {
	isRouterViewLoaded.value = false;
	next();
});

/* ページ遷移 後 に行われる処理 ------------ */
router.afterEach((to, from, next) => {
	nextTick(() => {
		scrollAnimation();
		txtSpan();
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

	/* テキストを分割してspanで囲む ------------ */
	function txtSpan() {
		const targets = document.querySelectorAll('.js-txt-span');

		targets.forEach((target) => {
			const txtContent = target.textContent.trim().replace(/\s/g, '○');
			let newTxt = '';

			[...txtContent].forEach((char) => {
				if (char === '○') {
					newTxt += '<br>';
				} else {
					newTxt += `<span>${char}</span>`;
				}
			});

			target.innerHTML = newTxt;
		});
	}
});

export default router;
