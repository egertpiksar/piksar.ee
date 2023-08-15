<script lang="ts">
	// import egert from '$lib/models/Character/char.glb';
	import egertAnimatsioonidega from '$lib/models/Character/egertviieanimatsiooniga.glb';
	import { T } from '@threlte/core';
	import { GLTF, useGltfAnimations } from '@threlte/extras';

	export let isPageLoaded: boolean;

	// TODO animatioone juurde
	const { gltf, actions, mixer } = useGltfAnimations<'layer'>();

	$: if (isPageLoaded && $actions) {
		startAnimation();
	}

	$: if ($gltf) {
		console.log('char', $gltf);
	}

	function startAnimation() {
		console.log('startAnimation');
		console.log('actions', $actions);
		$actions.layer?.play();
	}

	function moveCameraToCenter(e: any) {
		console.log('char mouse enter');
	}

	function moveCameraBack(e: any) {
		console.log('char mouse leave');
	}
</script>

<GLTF
	url={egertAnimatsioonidega}
	bind:gltf={$gltf}
	useDraco
	occlude
	position={[0, -0.06, 1]}
	scale={1}
	transform
	interactive
	dispose={false}
	rotation.y={-Math.PI}
	on:pointerenter={moveCameraToCenter}
	on:pointerleave={moveCameraBack}
/>

