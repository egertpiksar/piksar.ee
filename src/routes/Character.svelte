<script lang="ts">
	import egert from '$lib/models/Character/char.glb';
	import egertAnimatsioonidega from '$lib/models/Character/egertviieanimatsiooniga.glb';
	import { T } from '@threlte/core';
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { Editable } from '@threlte/theatre';

	export let isPageLoaded: boolean;
	export let camera: any;

	// TODO animatioone juurde
	const { gltf, actions, mixer } = useGltfAnimations<'layer'>();

	$: if (isPageLoaded) {
		//doCrouch();
		firstStandUp();
	}

	$: if ($gltf) {
		console.log('TULI', $gltf);
		//doCrouch();
	}

	// wrapperi out fade aeg maha
	function firstStandUp() {
		setTimeout(() => {
			standUp();
		}, 0);
	}

	function standUp() {
		console.log('stand up');
		console.log('mixer', mixer);
		console.log('actions', $actions);
		/*$actions.crouch.enabled = true;
		$actions.crouch.clampWhenFinished = false;
		$actions.crouch.repetitions = 10;
		$actions.paused = false;*/

		//mixer.timeScale = 0.75;
		$actions.layer?.play();
		/*$actions.crouch.clampWhenFinished = true;
		$actions.crouch.repetitions = 1;*/
	}

	function doCrouch() {
		console.log('crouch');
		//console.log('mixeer', $mixer);
		/*if ($actions.crouch) {
			if (mixer) mixer.timeScale = -1;
			$actions['crouch']?.play();*/

		//$actions.crouch.setLoop(Three.LoopPingPong, 5);
		//if ($mixer) $mixer.timeScale = -1
		//$actions.crouch.play();
		//$actions.crouch.reset();

		/*$actions.crouch.clampWhenFinished = true;
			$actions.crouch.repetitions = 1;
		}*/
	}

	function moveCameraToCenter(e) {}

	$: console.log('character', $gltf);
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
	castShadow
	receiveShadow
	position={[0, -0.06, 1]}
	scale={1}
	rotation.y={-Math.PI}
	interactive
	on:pointerenter={(e) => moveCameraToCenter(e)}
>
	<Editable name="Char" transform />
</GLTF>
