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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
// import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

/*---------------------------------------------
fv 3D
---------------------------------------------*/
let w = window.innerWidth;
let h = window.innerHeight;

const container = ref(null);

let canvasW;
let canvasH;

/* マウントされた時 ------------ */
onMounted(() => {
	canvasW = container.value.clientWidth;
	canvasH = container.value.clientHeight;
	initThreeJS();
});

const initThreeJS = async () => {
	// レンダラー
	const renderer = new THREE.WebGLRenderer({
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
		new Promise((res) => gltfLoader.load('/assets/three/dia.glb', res)),
		new Promise((res) => envLoader.load('/assets/three/rustig_koppie_puresky_1k_edit.hdr', res)),
	]);

	scene.environment = env;
	scene.environment.mapping = THREE.EquirectangularReflectionMapping;

	// モデルの設定
	const diamond = gltfScene.getObjectByName('diamond');
	// const box = new THREE.TorusGeometry(0.3, 0.2);
	// const diamond = new THREE.Mesh(box);
	diamond.material = Object.assign(new MeshTransmissionMaterial(10), {
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		chromaticAberration: 0.02,
		anisotrophicBlur: 0.1,
		roughness: 0,
		thickness: 1.5,
		ior: 1.5,
		distortion: 0.3,
		distortionScale: 0.002,
		temporalDistortion: 0.05,
		envMapIntensity: 0.35,
		backside: true,
		backsideThickness: 0.5,
	});
	// diamond.material = Object.assign(new THREE.MeshPhysicalMaterial(10), {
	// 	transmission: 1,
	// 	roughness: 0,
	// 	thickness: 1.5,
	// 	ior: 1.9,
	// 	envMapIntensity: 0.15,
	// });
	diamond.scale.set(600, 600, 600);

	const mask = diamond.clone();

	sceneMask.add(mask);
	scene.add(diamond);

	// TextMesh
	// const Beatrice = '../../../assets/json/Beatrice_Headline_Italic.json';
	// const Arial = '@/assets/json/Arial_Regular.json';
	// const orange = new THREE.Color(0xff4b12);
	// const white = new THREE.Color(0xffffff);
	// const textPosZ = -1500;
	// const fontLoader = new FontLoader();
	// const txtData = [
	// 	{
	// 		font: Beatrice,
	// 		text: 'SUGOI',
	// 		size: '256',
	// 		color: orange,
	// 		pos: {
	// 			x: 0,
	// 			y: 208,
	// 			z: textPosZ,
	// 		},
	// 	},
	// 	{
	// 		font: Beatrice,
	// 		text: 'Portfolio',
	// 		size: '256',
	// 		color: orange,
	// 		pos: {
	// 			x: 0,
	// 			y: -100,
	// 			z: textPosZ,
	// 		},
	// 	},
	// ];

	// create all text
	// txtData.forEach((e, i) => {
	// 	createText(e.font, e.text, e.size, e.color, e.pos.x, e.pos.y, e.pos.z);
	// });

	// create text function
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
	// 		txtMesh.layers.set(0);
	// 		txtGroup.add(txtMesh);
	// 	});
	// }
	// scene.add(txtGroup);

	const texture = new THREE.TextureLoader().load('/assets/img/home/hero/PC/img_hero.jpg', (tex) => {
		// 読み込み完了時
		// 縦横比を保って適当にリサイズ
		const imgW = 1300 * 1.05;
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
	const [keyPointLight, frontPointLight, rearPointLight] = [
		new THREE.PointLight(0xff7e57, 1000, 0, 0.1),
		new THREE.PointLight(0xff7e57, 100, 0, 0.01),
		new THREE.PointLight(0xff4b12, 20000, 0, 0.01),
	];
	keyPointLight.position.set(0, 200, 0);
	frontPointLight.position.set(0, 0, 2000);
	rearPointLight.position.set(0, 0, -2000);
	scene.add(keyPointLight, frontPointLight, rearPointLight);

	const [frontPointLightHelper, rearPointLightHelper] = [
		new THREE.PointLightHelper(frontPointLight, 100),
		new THREE.PointLightHelper(rearPointLight, 200),
	];
	// scene.add(frontPointLightHelper, rearPointLightHelper);

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
	function lerp(start, end, multiplier) {
		return start * (1 - multiplier) + end * multiplier;
	}
	function onRaf() {
		mouse.x = lerp(mouse.x, mouse.currentX, 0.04);
		mouse.y = lerp(mouse.y, mouse.currentY, 0.04);
		// pointLightの位置を移動
		gsap.set(frontPointLight.position, {
			x: mouse.x,
			y: mouse.y,
		});
		gsap.set(rearPointLight.position, {
			x: -mouse.x,
			y: -mouse.y,
		});
		// モデルの位置を移動
		gsap.set([diamond.position, mask.position], {
			x: mouse.x * 0.02,
			y: mouse.y * 0.02,
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
	// const tonePass = new OutputPass();
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
	// composer.addPass(tonePass);
	composer.addPass(clearMaskPass);
	composer.addPass(outputPass);

	// Loop
	tick();
	function tick(t) {
		const sec = performance.now() / 1000;

		diamond.material.time = t / 1000;
		[diamond, mask].forEach((obj) => {
			obj.rotation.x = sec * (Math.PI / 10);
			obj.rotation.y = sec * (Math.PI / 10);
		});

		onRaf();
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
