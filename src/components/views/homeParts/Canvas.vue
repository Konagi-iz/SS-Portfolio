<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { MeshTransmissionMaterial } from '@/MeshTransmissionMaterial.js';

/*---------------------------------------------
fv 3D
---------------------------------------------*/
let w = window.innerWidth;
let h = window.innerHeight;

const container = ref(null);

/* マウントされた時 ------------ */
onMounted(() => {
	initThreeJS();
});

const initThreeJS = async () => {
	// renderer
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 0.8;
	container.value.appendChild(renderer.domElement);

	// scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#101010');

	const envLoader = new RGBELoader();
	const gltfLoader = new GLTFLoader();

	const [{ scene: gltfScene }, env] = await Promise.all([
		new Promise((res) => gltfLoader.load('../../../public/assets/dia.glb', res)),
		new Promise((res) => envLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rustig_koppie_puresky_1k.hdr', res)),
	]);

	scene.environment = env;
	scene.environment.mapping = THREE.EquirectangularReflectionMapping;

	scene.add(gltfScene);

	const diamond = gltfScene.getObjectByName('diamond');
	diamond.material = Object.assign(new MeshTransmissionMaterial(10), {
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		chromaticAberration: 0.07,
		anisotrophicBlur: 0.2,
		roughness: 0,
		thickness: 1.3,
		ior: 1.5,
		distortion: 1,
		distortionScale: 0.0008,
		temporalDistortion: 0.05,
		envMapIntensity: 0.15,
		backside: true,
		backsideThickness: 0.5,
	});
	diamond.scale.set(800, 800, 800);

	// px base camera
	const fov = 5;
	const fovRad = (fov / 2) * (Math.PI / 180);
	const dist = h / 2 / Math.tan(fovRad);
	const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 2);
	camera.position.z = dist;

	// const controls = new OrbitControls(camera, renderer.domElement);

	// TextMesh
	const Beatrice = '../../../assets/json/Beatrice_Headline_Italic.json';
	const Arial = '@/assets/json/Arial_Regular.json';
	const orange = new THREE.Color(0xff4b12);
	const white = new THREE.Color(0xffffff);
	const textPosZ = -1500;
	const fontLoader = new FontLoader();
	const txtData = [
		{
			font: Beatrice,
			text: 'SUGOI',
			size: '256',
			color: orange,
			pos: {
				x: 0,
				y: 208,
				z: textPosZ,
			},
		},
		{
			font: Beatrice,
			text: 'Portfolio',
			size: '256',
			color: orange,
			pos: {
				x: 0,
				y: -100,
				z: textPosZ,
			},
		},
	];

	// create all text
	txtData.forEach((e, i) => {
		createText(e.font, e.text, e.size, e.color, e.pos.x, e.pos.y, e.pos.z);
	});

	// create text function
	const txtGroup = new THREE.Group();
	function createText(font, text, size, color, posX, posY, posZ) {
		fontLoader.load(font, (font) => {
			const txtGeometry = new TextGeometry(text, {
				font: font,
				size: size,
				height: 0,
				curveSegments: 12,
			});
			txtGeometry.center();
			const txtMaterial = new THREE.MeshBasicMaterial({
				color: color,
			});
			const txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
			txtMesh.position.set(posX, posY, posZ);
			txtGroup.add(txtMesh);
			scene.add(txtGroup);
		});
	}

	// set Lights
	let pointLight;
	// Poin Light
	pointLight = new THREE.PointLight(0xffffff, 5000, 0, 0.01);
	pointLight.position.set(0, 0, -2000);
	scene.add(pointLight);

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
	function tick(t) {
		const sec = performance.now() / 1000;
		diamond.material.time = t / 1000;
		diamond.rotation.x = sec * (Math.PI / 10);
		diamond.rotation.y = sec * (Math.PI / 10);
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
};
</script>

<template>
	<div class="lcl-canvas" ref="container"></div>
</template>

<style scoped lang="scss"></style>
