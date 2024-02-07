<script lang="ts">
	import Character from './Character.svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import {
		useInteractivity,
		OrbitControls,
		interactivity,
		AudioListener,
		Audio,
		Grid
	} from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { Folder, FpsGraph, Pane, Slider, Button } from 'svelte-tweakpane-ui';
	import RenderIndicator from './RenderIndicator.svelte';
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

	let light2: any;
	let fireLight: any;
	let helper1: any;
	let mainCamera: any;
	let fog: any;
	let isHoveredLaptop: boolean;
	let hallooAudioCtx: any;
	let fireplaceAudioCtx: any;

	let showGrid = true;
	let useFreeCamera = false;
	let elapsedTime = 0;

	const { scene } = useThrelte();
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

	onMount(() => {});

	useTask((delta) => {
		elapsedTime += delta;
		fireLight.intensity =
			0.5 + Math.sin(elapsedTime * Math.PI * 2) * Math.cos(elapsedTime * Math.PI * 1.5) * 0.25;
	});

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

	$: if (isPageLoaded) {
		setTimeout(() => {
			moveCameraToCenter();
		}, 2100);
	}

	$: console.log('isLoaded', isPageLoaded);
	$: console.log('screen width: ', outerWidth);

	function moveCameraToCenter() {
		cameraOffset.set({
			x: 3.7,
			y: 1,
			z: 0
		});
	}
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

<!-- TWEAKPANE -->
<Pane position="fixed" title="debug" expanded={true}>
	<Folder userExpandable={true} expanded title="kaamera">
		<Slider bind:value={$cameraOffset.x} label="pos x" min={-10} max={20} step={0.1} />
		<Slider bind:value={$cameraOffset.y} label="pos y" min={-10} max={20} step={0.1} />
		<Slider bind:value={$cameraOffset.z} label="pos z" min={-10} max={20} step={0.1} />
		<Slider bind:value={$cameraTarget.x} label="lookat x" min={-10} max={20} step={0.1} />
		<Slider bind:value={$cameraTarget.y} label="lookat y" min={-10} max={20} step={0.1} />
		<Slider bind:value={$cameraTarget.z} label="lookat z" min={-10} max={20} step={0.1} />
	</Folder>

	<Folder title="rendering">
		<Button
			on:click={() => (showGrid = !showGrid)}
			label="show grid"
			title={showGrid ? 'true' : 'false'}
		/>
		<RenderIndicator />
		<FpsGraph />
	</Folder>
</Pane>

{#if showGrid}
	<Grid
		position.y={0}
		sectionThickness={1}
		infiniteGrid
		cellColor="#dddddd"
		sectionColor="#ffffff"
		sectionSize={1}
		cellSize={1}
	/>
{/if}
