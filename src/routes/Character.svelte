<script lang="ts">
	import egert from '$lib/models/Character/char.glb';
	import egertAnimatsioonidega from '$lib/models/Character/egertviieanimatsiooniga.glb';
	import { T } from '@threlte/core';
	import { GLTF, useGltfAnimations, HTML, useCursor } from '@threlte/extras';
	import { Editable } from '@threlte/theatre';

	export let isPageLoaded: boolean;
	export let camera: any;

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

<!-- <HTML position.y={0.25} position.z={-5} transform>
	<button
		on:click={() => doCrouch()}
		class="bg-brand rounded-full px-3 text-white hover:opacity-90 active:opacity-70"
	>
		crouch
	</button>
</HTML>

<HTML position.y={0} position.z={-5} transform>
	<button
		on:click={() => standUp()}
		class="bg-brand rounded-full px-3 text-white hover:opacity-90 active:opacity-70"
	>
		stand
	</button>
</HTML>
 -->
<GLTF
	url={egertAnimatsioonidega}
	bind:gltf={$gltf}
	useDraco
	position={[0, -0.06, 1]}
	scale={1}
	interactive
	rotation.y={-Math.PI}
	on:pointerenter={moveCameraToCenter}
	on:pointerleave={moveCameraBack}
>
	<Editable name="Char" transform />
</GLTF>
