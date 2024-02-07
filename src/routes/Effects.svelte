<script lang="ts">
	import { T, useLoader, extend } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { Vector2 } from 'three';
	import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js';
	import * as cube from '$lib/F-6800-STD.cube';
	import { onMount } from 'svelte';

	extend({
		Pass
	});

	// LUT
	const lutloader = useLoader(LUTCubeLoader, () => new LUTCubeLoader());
	let lutTexture: any;
	lutloader.load('/src/lib/F-6800-STD.cube', (obj) => {
		console.log('LUT CUBE', obj);
		lutTexture = obj;
	});
</script>

<!-- {#if lutTexture}
    <Pass pass={new LUTPass({
        lut: lutTexture.texture,
        intensity: 1
    })} />
{/if} -->

<Pass pass={new UnrealBloomPass(new Vector2(1024, 1024), 0.1, 0.125, 0.1)} />
