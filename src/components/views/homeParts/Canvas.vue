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
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { ACESFilmicToneMappingShader } from 'three/examples/jsm/shaders/ACESFilmicToneMappingShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

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
	// レンダラー
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 0.8;
	renderer.gammaOutput = true;
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.setClearColor(0x101010, 1);
	renderer.autoClear = false;
	container.value.appendChild(renderer.domElement);

	// カメラ
	const fov = 5;
	const fovRad = (fov / 2) * (Math.PI / 180);
	const dist = h / 2 / Math.tan(fovRad);
	const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 2);
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
	diamond.material = Object.assign(new MeshTransmissionMaterial(10), {
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		chromaticAberration: 0.07,
		anisotrophicBlur: 0.1,
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

	const mask = diamond.clone();

	sceneMask.add(mask);
	scene.add(diamond);

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
			txtMesh.layers.set(0);
			txtGroup.add(txtMesh);
		});
	}
	scene.add(txtGroup);

	// ポイントライト
	const [keyPointLight, frontPointLight, rearPointLight] = [
		new THREE.PointLight(0xff7e57, 10000, 0, 0.1),
		new THREE.PointLight(0xff7e57, 1000, 0, 0.01),
		new THREE.PointLight(0xff4b12, 20000, 0, 0.01),
	];
	keyPointLight.position.set(0, 2000, 0);
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
		gsap.set(frontPointLight.position, {
			x: mouse.x,
			y: mouse.y,
		});
		gsap.set(rearPointLight.position, {
			x: -mouse.x,
			y: -mouse.y,
		});
	}
	window.addEventListener('mousemove', (e) => {
		onMove(e.clientX, e.clientY);
	});

	// マスク
	const clearPass = new ClearPass();
	const maskPass = new MaskPass(sceneMask, camera);
	const renderPass = new RenderPass(scene, camera);
	renderPass.clear = false;
	const clearMaskPass = new ClearMaskPass();
	const tonePass = new OutputPass();
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
	composer.addPass(tonePass);
	composer.addPass(clearMaskPass);
	composer.addPass(outputPass);

	// Loop
	tick();
	function tick(t) {
		const sec = performance.now() / 1000;
		diamond.material.time = t / 1000;
		[diamond, mask].forEach((object) => {
			object.rotation.x = sec * (Math.PI / 10);
			object.rotation.y = sec * (Math.PI / 10);
		});
		onRaf();
		// renderer.clear();
		composer.render();
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

<style scoped lang="scss">
.lcl-canvas {
	// filter: saturate(.5);
}
</style>
