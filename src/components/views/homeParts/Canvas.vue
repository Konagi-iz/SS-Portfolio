<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { MeshTransmissionMaterial } from '@/MeshTransmissionMaterial.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { media, isOpeningReady } from '@/store';

/*---------------------------------------------
fv 3D
---------------------------------------------*/
let w = window.innerWidth;
let h = window.innerHeight;
let canvasW;
let canvasH;
const viewport = media.value === 'PC' ? 1300 : 375;

let renderer;

const container = ref(null);

onUnmounted(() => {
	// コンテキストを破棄
	// renderer.dispose();
});

onMounted(() => {
	canvasW = container.value.clientWidth;
	canvasH = container.value.clientHeight;
	initThreeJS();
});

const initThreeJS = async () => {
	// レンダラー
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});
	renderer.gammaOutput = true;
	renderer.setClearColor(0x101010, 0);
	renderer.autoClear = false;
	container.value.appendChild(renderer.domElement);

	// カメラ
	const fov = 5;
	const fovRad = (fov / 2) * (Math.PI / 180);
	const dist = canvasH / 2 / Math.tan(fovRad);
	const camera = new THREE.PerspectiveCamera(fov, canvasW / canvasH, 1, dist * 2);
	camera.position.z = dist;

	// const controls = new OrbitControls(camera, renderer.domElement);

	// マスク用のシーンと通常のシーン
	const sceneMask = new THREE.Scene();
	const scene = new THREE.Scene();

	// モデルと環境マップの読み込み
	const envLoader = new RGBELoader();
	const gltfLoader = new GLTFLoader();

	const [{ scene: gltfScene }, env] = await Promise.all([
		new Promise((res) => gltfLoader.load('/assets/three/crystal_02.glb', res)),
		new Promise((res) => envLoader.load('/assets/three/rustig_koppie_puresky_1k_edit.hdr', res)),
	]);

	scene.environment = env;
	scene.environment.mapping = THREE.EquirectangularReflectionMapping;

	// モデルの設定
	const crystal = gltfScene.getObjectByName('crystal');
	crystal.material = Object.assign(new MeshTransmissionMaterial(10), {
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		chromaticAberration: 0.02,
		anisotrophicBlur: 0.1,
		roughness: 0,
		thickness: 100,
		ior: 1.4,
		distortion: 1,
		distortionScale: (0.0012 * viewport) / w,
		temporalDistortion: 0.05,
		envMapIntensity: 0.35,
		backside: true,
		backsideThickness: 1,
	});

	const visibleWrap = new THREE.Group();
	const maskWrap = new THREE.Group();

	visibleWrap.add(crystal);
	const mask = crystal.clone();
	maskWrap.add(mask);

	scene.add(visibleWrap);
	sceneMask.add(maskWrap);

	/* オープニング ------------ */

	const texture = new THREE.TextureLoader().load(`/assets/img/home/hero/${media.value}/img_hero.jpg`, (tex) => {
		// 縦横比を保って適当にリサイズ
		const imgW = w * 1.05;
		const imgH = tex.image.height / (tex.image.width / imgW);

		// 平面
		const planeGeometry = new THREE.PlaneGeometry(1, 1);
		const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.scale.set(imgW, imgH, 1);
		plane.position.set(0, 0, -300);
		scene.add(plane);
	});

	// ポイントライト
	// prettier-ignore
	const pointLightIntensity = [
		media.value === 'PC' ? 10000 : 20, 
		media.value === 'PC' ? 100 : 100, 
		media.value === 'PC' ? 20000 : 2000
	];
	const [keyPointLight, frontPointLight, rearPointLight] = [
		new THREE.PointLight(0xff7e57, pointLightIntensity[0], 0, 0.1),
		new THREE.PointLight(0xff7e57, pointLightIntensity[1], 0, 0.01),
		new THREE.PointLight(0xff4b12, pointLightIntensity[2], 0, 0.01),
	];
	keyPointLight.position.set(0, 700, 500);
	frontPointLight.position.set(200, -400, 1000);
	rearPointLight.position.set(-400, 400, -500);
	scene.add(keyPointLight, frontPointLight, rearPointLight);

	// const [keyPointLightHelper, frontPointLightHelper, rearPointLightHelper] = [
	// 	new THREE.PointLightHelper(keyPointLight, 100),
	// 	new THREE.PointLightHelper(frontPointLight, 100),
	// 	new THREE.PointLightHelper(rearPointLight, 200),
	// ];
	// scene.add(keyPointLightHelper, frontPointLightHelper, rearPointLightHelper);

	// ライトをカーソルに追従させるカーソル
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
	// multiplierを小さくするほど補間が強くなる
	function lerp(start, end, multiplier) {
		return start * (1 - multiplier) + end * multiplier;
	}
	function onRaf() {
		mouse.x = lerp(mouse.x, mouse.currentX, 0.015);
		mouse.y = lerp(mouse.y, mouse.currentY, 0.015);
		// pointLightの位置をカーソルに応じて移動
		gsap.set(frontPointLight.position, {
			x: mouse.x,
			y: mouse.y,
		});
		gsap.set(rearPointLight.position, {
			x: -mouse.x * 3,
			y: -mouse.y * 3,
		});
		// モデルの位置をカーソルに応じて移動
		gsap.set([crystal.position, mask.position], {
			x: mouse.x * 0.04,
			y: mouse.y * 0.04,
		});
	}
	container.value.parentElement.addEventListener('mousemove', (e) => {
		onMove(e.clientX, e.clientY);
	});

	// マスク
	const clearPass = new ClearPass();
	const maskPass = new MaskPass(sceneMask, camera);
	const renderPass = new RenderPass(scene, camera);
	renderPass.clear = false;
	const clearMaskPass = new ClearMaskPass();
	const outputPass = new ShaderPass(CopyShader);
	outputPass.renderToScreen = true;

	const parameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: true,
	};

	const renderTarget = new THREE.WebGLRenderTarget(w, h, parameters);

	const composer = new EffectComposer(renderer, renderTarget);
	composer.addPass(clearPass);
	composer.addPass(maskPass);
	composer.addPass(renderPass);
	composer.addPass(clearMaskPass);
	composer.addPass(outputPass);

	// Loop
	tick();
	function tick(t) {
		const sec = performance.now() / 1000;

		crystal.material.time = t / 1000;
		[crystal, mask].forEach((obj) => {
			// obj.rotation.z = sec * (Math.PI / 20);
			obj.rotation.y = sec * (Math.PI / 10);
		});

		if (media.value === 'PC') {
			onRaf();
		}
		// renderer.render(scene, camera);
		renderer.clear();
		composer.render();
		requestAnimationFrame(tick);
	}

	// Resize
	onResize();
	window.addEventListener('resize', onResize);
	function onResize() {
		w = window.innerWidth;
		h = window.innerHeight;
		canvasW = container.value.clientWidth;
		canvasH = container.value.clientHeight;

		// crystalのサイズ設定
		const crystalScale = ((media.value === 'PC' ? 8 : 5) / viewport) * w;
		[crystal, mask].forEach((obj) => {
			obj.scale.set(crystalScale, crystalScale, crystalScale);
		});

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvasW, canvasH);
		camera.aspect = canvasW / canvasH;
		camera.updateProjectionMatrix();
	}
};
</script>

<template>
	<div class="lcl-canvas" ref="container"></div>
</template>

<style scoped lang="scss">
.lcl-canvas {
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	// filter: saturate(0.5);
	width: 100%;
	height: 100%;
	pointer-events: none;
}
</style>
