<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const isStalkerActive = ref(false);

const mouse = {
	x: 0,
	y: 0,
	currentX: 0,
	currentY: 0,
};

function onMove(e) {
	mouse.currentX = e.clientX;
	mouse.currentY = e.clientY;
}

// multiplierを小さくするほど補間が強くなる
function lerp(start, end, multiplier) {
	return start * (1 - multiplier) + end * multiplier;
}

function onRaf() {
	mouse.x = lerp(mouse.x, mouse.currentX, 0.08);
	mouse.y = lerp(mouse.y, mouse.currentY, 0.08);

	gsap.set('.stalker', {
		x: mouse.x,
		y: mouse.y,
	});

	requestAnimationFrame(onRaf);
}

onMounted(() => {
	window.addEventListener('mousemove', (e) => {
		onMove(e);
	});

	document.body.addEventListener('mouseenter', () => {
		isStalkerActive.value = true;
	});
	document.body.addEventListener('mouseleave', () => {
		isStalkerActive.value = false;
	});

	onRaf();
});
</script>

<template>
	<div class="stalker dn-n" :class="{ 'stalker--active': isStalkerActive }">
		<div class="stalker__circle"></div>
	</div>
</template>

<style scoped lang="scss">
.stalker {
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	translate: -50% -50%;
	mix-blend-mode: difference;
	opacity: 0;
	pointer-events: none;
	transition: opacity 1s $e-out;
	.stalker__circle {
		border-radius: 50%;
		width: 15px;
		height: 15px;
		background: $c-orange;
		transition: scale 0.8s $e-out-expo;
	}
}
.stalker--active {
	opacity: 1;
}

body:has(a:hover, button:hover) {
	.stalker__circle {
		scale: 3;
	}
}
</style>
