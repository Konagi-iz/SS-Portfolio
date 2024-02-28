import { ref } from 'vue';

export const isNavActive = ref(false);

export const isRouterViewLoaded = ref(false);

export const isOpeningReady = ref(false);

export const media = ref('PC');
let w = window.innerWidth;

mediaDetect();
window.addEventListener('resize', () => {
	w = window.innerWidth;
	mediaDetect();
});

function mediaDetect() {
	if (w <= 667) {
		media.value = 'SP';
	} else {
		media.value = 'PC';
	}
}
