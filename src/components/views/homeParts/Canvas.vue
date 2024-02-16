<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/*---------------------------------------------
fv 3D
---------------------------------------------*/
let w = window.innerWidth;
let h = window.innerHeight;

onMounted(() => {
	createRenderer();
});

// renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
});
const createRenderer = () => {
	const container = document.getElementById('canvas-container');
	container.appendChild(renderer.domElement);
};

// scene
const scene = new THREE.Scene();

// px base camera
const fov = 15;
const fovRad = (fov / 2) * (Math.PI / 180);
const dist = h / 2 / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 2);
camera.position.z = dist;

// Box Geometry
const boxGeometry = new RoundedBoxGeometry(1, 1, 1, 16, 0.2);
const hdr = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr';
const hdrEquirect = new RGBELoader().load(hdr, () => {
	hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
});
const boxMaterial = new THREE.MeshPhysicalMaterial({
	roughness: 0.07,
	transmission: 1,
	thickness: 0.5,
	envMap: hdrEquirect,
	envMapIntensity: 0.3,
	ior: 1.9,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.scale.set(380, 380, 380);
const boxGroup = new THREE.Group();
boxGroup.add(box);
scene.add(boxGroup);

// // TextMesh
// const Beatrice = '../assets/json/Beatrice_Headline_Italic.json';
// const Arial = '../assets/json/Arial_Regular.json';
// const orange = new THREE.Color(0xff4b12);
// const white = new THREE.Color(0xffffff);
// const textPosZ = -1500;
// const fontLoader = new FontLoader();
// const txtData = [
// 	{
// 		font: Beatrice,
// 		text: 'S',
// 		size: '192',
// 		color: orange,
// 		pos: {
// 			x: -563,
// 			y: 248,
// 			z: textPosZ,
// 		},
// 	},
// ];

// // create all text
// txtData.forEach((e, i) => {
// 	createText(e.font, e.text, e.size, e.color, e.pos.x, e.pos.y, e.pos.z);
// });

// // create text function
// const txtGroup = new THREE.Group();
// function createText(font, text, size, color, posX, posY, posZ) {
// 	fontLoader.load(font, (font) => {
// 		const txtGeometry = new TextGeometry(text, {
// 			font: font,
// 			size: size,
// 			height: 0,
// 			curveSegments: 12,
// 		});
// 		txtGeometry.center();
// 		const txtMaterial = new THREE.MeshBasicMaterial({
// 			color: color,
// 		});
// 		const txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
// 		txtMesh.position.set(posX, posY, posZ);
// 		txtGroup.add(txtMesh);
// 		scene.add(txtGroup);
// 	});
// }

// set Lights
let pointLight;
setLights();
function setLights() {
	// Directional Light
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(1, 1, 1);
	// Poin Light
	pointLight = new THREE.PointLight(0xffffff, 10000, 0, 0.01);
	pointLight.position.set(0, 0, -1000);
	scene.add(directionalLight, pointLight);
}

// light follow mouse
const mouse = {
	x: 0,
	y: 0,
	currentX: 0,
	currentY: 0,
};
function onMove(x, y) {
	mouse.currentX = (x - w / 2) * 2;
	mouse.currentY = (-y + w / 3) * 2;
}
function lerp(start, end, multiplier) {
	return start * (1 - multiplier) + end * multiplier;
}
function onRaf() {
	mouse.x = lerp(mouse.x, mouse.currentX, 0.04);
	mouse.y = lerp(mouse.y, mouse.currentY, 0.04);
	gsap.set(pointLight.position, {
		x: mouse.x,
		y: mouse.y,
	});
}
window.addEventListener('mousemove', (e) => {
	onMove(e.clientX, e.clientY);
});

// Loop
tick();
function tick() {
	const sec = performance.now() / 1000;
	boxGroup.rotation.x = sec * (Math.PI / 10);
	boxGroup.rotation.y = sec * (Math.PI / 10);
	// txtGroup.position.y = scrollY;
	onRaf();
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
}

// Resize
onResize();
window.addEventListener('resize', onResize);
function onResize() {
	w = window.innerWidth;
	h = window.innerHeight;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(w, h);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}
</script>

<template>
	<div class="lcl-canvas" id="canvas-container"></div>
</template>

<style scoped lang="scss"></style>
