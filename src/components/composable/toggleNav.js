import { isNavActive } from '@/store/index';

/* メニュートグル ------------ */
export const useToggleNav = () => {
	if (isNavActive.value) {
		isNavActive.value = false;
	} else {
		isNavActive.value = true;
	}
};
