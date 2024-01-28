<script lang="ts">
	import Character from './Character.svelte';
	import Stats from 'stats.js';
	import { T, useFrame, useThrelte } from '@threlte/core';
	import {
		useInteractivity,
		OrbitControls,
		interactivity,
		AudioListener,
		Audio
	} from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import GUI from 'lil-gui';
	import Effects from './Effects.svelte';
	//import Drone from './Drone.svelte';
	import Trophy from './Trophy.svelte';
	import Campsite from './Campsite.svelte';
	import { degToRad } from 'three/src/math/MathUtils';
	// import { Editable } from '@threlte/theatre';
	import Laptop from './Laptop.svelte';
	import fireplace from '$lib/audios/fireplace.mp3';
	import hallo from '$lib/audios/hallloo.mp3';

	export let isPageLoaded: boolean;
	export let halloAudio: any;
	export let fireplaceAudio: any;
	export let outerWidth: number;

	interactivity();

	//const gui = new GUI();

	let light2: any;
	let fireLight: any;
	let helper1: any;
	let helper2: any;
	let mainCamera: any;
	let fog: any;
	let isHoveredLaptop: boolean;
	let pixelRatio = 1;
	let hallooAudioCtx: any;
	let fireplaceAudioCtx: any;

	let stats1 = new Stats();

	const { renderer, camera, scene, toneMapping, clock } = useThrelte();

	console.log(renderer, $camera);

	// TODO pointerOverCanvas kui nt tabi vahetada, siis kõik animatsioonid pausile
	const { pointer, pointerOverTarget } = useInteractivity();

	// x: 3.7, y: 1, z: 0
	const cameraOffset = spring(
		{ x: 10, y: 4, z: 0 },
		{
			stiffness: 0.005,
			damping: 0.5
		}
	);

	const cameraTarget = spring(
		// chari ja lõkke keskele
		{ x: -1.3, y: 1.9, z: -8 },
		{
			stiffness: 0.005,
			damping: 0.5
		}
	);

	$: if (mainCamera && $pointer && ($pointer.x || $pointer.y) && $pointerOverTarget) {
		if (isHoveredLaptop) {
			cameraTarget.set({
				x: 0,
				y: 0.8,
				z: -8
			});
		} else {
			// kaamera pos xyz
			cameraOffset.set({
				x: 3.7 + $pointer.x / 1.5,
				y: 1 + $pointer.y / 1.5,
				z: 0
			});
			// kaamera lookAt
			/* cameraTarget.set({
				x: $pointer.x,
				y: $pointer.y,
				z: -8
			}); */
		}

		//console.log('cameraTarget', $cameraTarget);
		//console.log('cameraOffset', $cameraOffset);
	}

	let obj = { tonemap: 0 };

	onMount(() => {
		loadStats();
		loadGUI();
	});

	useFrame((ctx, delta) => {
		listenStats();

		let time = clock.elapsedTime;
		fireLight.intensity =
			0.5 + Math.sin(time * Math.PI * 2) * Math.cos(time * Math.PI * 1.5) * 0.25;
	});

	/*const defaultPixelRatio = renderer?.getPixelRatio();

	$: changePixelRatio(pixelRatio);*/

	$: if (isPageLoaded) {
		setTimeout(() => {
			moveCameraToCenter();
		}, 2100);
	}

	/*function changePixelRatio(num: number) {
		console.log('pixelRatio: ', num);
		if (num > 0) {
			renderer?.setPixelRatio(num);
		} else {
			renderer?.setPixelRatio(defaultPixelRatio ? defaultPixelRatio : 1);
		}
	}*/

	function moveCameraToCenter() {
		cameraOffset.set({
			x: 3.7,
			y: 1,
			z: 0
		});
	}

	function loadGUI() {
		gui.add(document, 'title');

		const folder = gui.addFolder('camera');

		const toneMap = gui.addFolder('toneMapping');
		toneMap
			.add(obj, 'tonemap', {
				noToneMapping: 0,
				linear: 1,
				reinhard: 2,
				cineon: 3,
				filmic: 4,
				custom: 5
			})
			.onChange((selectedValue: any) => {
				$toneMapping = selectedValue;
			});

		if (mainCamera) {
			console.log('mainCamera', mainCamera);
			folder.add(mainCamera.position, 'x', -20, 20).step(1);
			folder.add(mainCamera.position, 'y', -20, 20).step(1);
			folder.add(mainCamera.position, 'z', -20, 20).step(1);
		}

		if (fireLight) {
			const dirlight = gui.addFolder('fireLight');
			dirlight.add(fireLight.position, 'x', -20, 20).step(1);
			dirlight.add(fireLight.position, 'y', -10, 10).step(1);
			dirlight.add(fireLight.position, 'z', -20, 20).step(1);

			dirlight.add(fireLight.rotation, 'x', -3.14, 3.14).step(0.1);
			dirlight.add(fireLight.rotation, 'y', -3.14, 3.14).step(0.1);
			dirlight.add(fireLight.rotation, 'z', -3.14, 3.14).step(0.1);

			dirlight.add(fireLight, 'intensity');
			dirlight.addColor(fireLight, 'color');
		}

		if (light2) {
			const dirlight = gui.addFolder('dirlight2');
			dirlight.add(light2.position, 'x', -20, 20).step(1);
			dirlight.add(light2.position, 'y', -10, 10).step(1);
			dirlight.add(light2.position, 'z', -20, 20).step(1);

			dirlight.add(light2.rotation, 'x', -3.14, 3.14).step(0.1);
			dirlight.add(light2.rotation, 'y', -3.14, 3.14).step(0.1);
			dirlight.add(light2.rotation, 'z', -3.14, 3.14).step(0.1);
			dirlight.add(light2, 'intensity');
			dirlight.addColor(light2, 'color');
		}

		if (fog) {
			const fogF = gui.addFolder('fog');
			fogF.add(fog, 'near', -50, 50).step(1);
			fogF.add(fog, 'far', -50, 50).step(1);
			fogF.addColor(fog, 'color');
		}
	}

	function loadStats() {
		stats1.showPanel(0); // Panel 0 = fps
		stats1.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
		document.body.appendChild(stats1.domElement);
	}

	function listenStats() {
		stats1.begin();
		stats1.end();
	}

	$: console.log('isLoaded', isPageLoaded);
	$: console.log('screen width: ', outerWidth);

	let useFreeCamera = false;
</script>

<!-- <Effects /> -->

{#if useFreeCamera === false}
	<T.PerspectiveCamera
		bind:ref={mainCamera}
		makeDefault
		position={[$cameraOffset.x, $cameraOffset.y, $cameraOffset.z]}
		on:create={({ ref }) => {
			ref.lookAt($cameraTarget.x, $cameraTarget.y, $cameraTarget.z);
		}}
		zoom={outerWidth >= 640 ? 1 : 0.7}
		fov={outerWidth >= 640 ? 40 : 50}
	>
		<OrbitControls
			enableDamping={true}
			enablePan={false}
			enableRotate={false}
			enableZoom={false}
			maxDistance={20}
			target={[$cameraTarget.x, $cameraTarget.y, $cameraTarget.z]}
		/>

		<AudioListener
			bind:ref={fireplaceAudioCtx}
			id="fireplace"
			position={[0, 0, 0]}
			rotation.y={0}
		/>
		<AudioListener bind:ref={hallooAudioCtx} id="halloo" position={[0, 0, 0]} rotation.y={0} />
	</T.PerspectiveCamera>
{:else}
	<T.PerspectiveCamera bind:ref={mainCamera} makeDefault position={[0, 1, 0]} fov={40}>
		<OrbitControls
			enableDamping={true}
			enablePan={true}
			enableRotate={true}
			enableZoom={true}
			maxDistance={20}
			target={[1, 1.9, -8]}
		/>

		<AudioListener bind:ref={hallooAudioCtx} id="halloo" position={[0, 0, 0]} rotation.y={0} />
	</T.PerspectiveCamera>
{/if}

<T.DirectionalLight
	bind:ref={light2}
	intensity={2}
	position={[4, 10, 0]}
	color={'#a6a6a6'}
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
>
	{#if light2}
		<T.DirectionalLightHelper bind:ref={helper1} args={[light2, 0.5, 'blue']} />
	{/if}
</T.DirectionalLight>

<!-- lõke -->
<T.DirectionalLight
	bind:ref={fireLight}
	castShadow
	intensity={1}
	position={[0.75, 1.6, -2.5]}
	rotation={[degToRad(-56), degToRad(6), 0]}
	color={'#f0ab5c'}
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
/>

<!-- <Portal /> -->

<Campsite />

<!-- <Drone /> -->

<!-- <Screen2 bind:cameraOffset={$cameraOffset} /> -->

<Character {isPageLoaded} />

<Laptop bind:cameraOffset={$cameraOffset} bind:isHoveredLaptop />

<Trophy />

<T.Fog
	bind:ref={fog}
	color={'#060a06'}
	near={6}
	far={18}
	on:create={({ ref }) => {
		scene.fog = ref;
	}}
/>

<!-- kui ei mängi, vaata cssist pointer eventse -->
<Audio src={fireplace} bind:ref={fireplaceAudio} id="fireplace" autoplay={true} loop volume={1} />
<Audio src={hallo} bind:ref={halloAudio} id="halloo" autoplay={false} loop={false} volume={0.8} />
