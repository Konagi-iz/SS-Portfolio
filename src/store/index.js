import { ref } from 'vue';

export const isNavActive = ref(false);

export const isRouterViewLoaded = ref(false);

export const isOpeningReady = ref(false);

export const media = ref('PC');
export let w = window.innerWidth;
export let h = window.innerHeight;

mediaDetect();
window.addEventListener('resize', () => {
	w = window.innerWidth;
	h = window.innerHeight;
	mediaDetect();
});

function mediaDetect() {
	if (w <= 667) {
		media.value = 'SP';
	} else {
		media.value = 'PC';
	}
}
