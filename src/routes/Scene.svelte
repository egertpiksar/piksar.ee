<script lang="ts">
	import Character from './Character.svelte';
	import Stats from 'stats.js';
	import { T, useFrame, useThrelte } from '@threlte/core';
	import {
		useInteractivity,
		OrbitControls,
		interactivity,
		TransformControls,
		AudioListener,
		Audio
	} from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import Screen2 from './Screen2.svelte';
	import GUI from 'lil-gui';
	import Effects from './Effects.svelte';
	import Drone from './Drone.svelte';
	import Trophy from './Trophy.svelte';
	import Portal from './Portal.svelte';
	import Campsite from './Campsite.svelte';
	import { degToRad } from 'three/src/math/MathUtils';
	import { Editable } from '@threlte/theatre';
	import Laptop from './Laptop.svelte';
	import mp3 from '$lib/audios/track.mp3';

	export let isPageLoaded: boolean;

	const gui = new GUI();

	let dude: any;
	let light1: any;
	let light2: any;
	let fireLight: any;
	let helper1: any;
	let helper2: any;
	let mainCamera: any;
	let fog: any;
	let squareLight: any;
	let isHoveredLaptop: boolean;

	let stats1 = new Stats();

	interactivity();

	const { renderer, camera, scene, toneMapping, clock } = useThrelte();
	console.log(renderer, $camera);

	$: console.log('tonemapping', $toneMapping);

	// TODO pointerOverCanvas kui nt tabi vahetada, siis kõik animatsioonid pausile
	const { pointer, pointerOverTarget } = useInteractivity();

	const cameraOffset = spring(
		{ x: 3.7, y: 1, z: 0 },
		{
			stiffness: 0.005,
			damping: 0.5
		}
	);

	const cameraTarget = spring(
		{ x: 1, y: 1.9, z: -8 },
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
			cameraOffset.set({
				x: 5 - $pointer.x * 1.5,
				y: 1,
				z: 0
			});

			cameraTarget.set({
				x: $pointer.x * 1.1,
				y: $pointer.y * 0.1 + 2,
				z: -8
			});
		}

		//console.log('cameraTarget', $cameraTarget);
		//console.log('cameraOffset', $cameraOffset);
	}

	$: console.log('cameraOffset', $cameraOffset);
	$: console.log('cameraTarget', $cameraTarget);

	let obj = { tonemap: 0 };

	onMount(() => {
		//console.log('cameraOffset', $cameraOffset);
		//console.log('cameraTarget', $cameraTarget);
		loadStats();
		//loadGUI();
	});

	useFrame((ctx, delta) => {
		listenStats();

		let time = clock.elapsedTime;
		fireLight.intensity =
			0.5 + Math.sin(time * Math.PI * 2) * Math.cos(time * Math.PI * 1.5) * 0.25;
	});

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

		if (light1) {
			const dirlight = gui.addFolder('dirlight1');
			dirlight.add(light1.position, 'x', -20, 20).step(1);
			dirlight.add(light1.position, 'y', -10, 10).step(1);
			dirlight.add(light1.position, 'z', -20, 20).step(1);

			dirlight.add(light1.rotation, 'x', -3.14, 3.14).step(0.1);
			dirlight.add(light1.rotation, 'y', -3.14, 3.14).step(0.1);
			dirlight.add(light1.rotation, 'z', -3.14, 3.14).step(0.1);

			dirlight.add(light1, 'distance');
			dirlight.add(light1, 'angle');
			dirlight.add(light1, 'penumbra');
			dirlight.add(light1, 'decay');
			dirlight.add(light1, 'focus');
			dirlight.add(light1, 'intensity');
			dirlight.addColor(light1, 'color');
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

	let useFreeCamera = true;
</script>

<!-- <Effects /> -->

<!-- $cameraOffset.x, $cameraOffset.y, $cameraOffset.z -->

{#if !useFreeCamera}
	<T.PerspectiveCamera
		bind:ref={mainCamera}
		makeDefault
		position={[$cameraOffset.x, $cameraOffset.y, $cameraOffset.z]}
		on:create={({ ref }) => {
			ref.lookAt($cameraTarget);
		}}
		fov={40}
	>
		<Editable name="camera" position />
		<OrbitControls
			enableDamping={true}
			enablePan={false}
			enableRotate={false}
			enableZoom={false}
			maxDistance={20}
			target={[$cameraTarget.x, $cameraTarget.y, $cameraTarget.z]}
		>
			<Editable name="orbit" target />
		</OrbitControls>
		<!-- <AudioListener /> -->
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
	</T.PerspectiveCamera>
{/if}

<T.DirectionalLight
	bind:ref={light2}
	intensity={0.5}
	position={[0, 10, 10]}
	color={'#759bba'}
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
>
	<Editable name="DirectionalLight" color transform intensity />

	{#if light2}
		<T.DirectionalLightHelper bind:ref={helper1} args={[light2, 0.5, 'red']} />
	{/if}
</T.DirectionalLight>

<T.DirectionalLight
	bind:ref={fireLight}
	castShadow
	intensity={1}
	position={[0.75, 1.6, -2.5]}
	rotation={[degToRad(-56), degToRad(6), 0]}
	color={'#533d30'}
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
>
	<Editable name="FireLight" color transform intensity />

	{#if fireLight}
		<T.DirectionalLightHelper bind:ref={helper2} args={[fireLight, 0.5, 'red']} />
	{/if}
</T.DirectionalLight>

<!-- <Portal /> -->

<Campsite />

<!-- <Drone /> -->

<!-- <Screen2 bind:cameraOffset={$cameraOffset} /> -->

<Character {isPageLoaded} />

<Laptop bind:cameraOffset={$cameraOffset} bind:isHoveredLaptop />

<Trophy />

<!-- <T.Fog
	bind:ref={fog}
	color={'#060a06'}
	near={2}
	far={18}
	on:create={({ ref }) => {
		scene.fog = ref;
	}}
>
	<Editable name="Fog" color near far />
</T.Fog> -->

<!-- <Audio src={mp3} autoplay /> -->
