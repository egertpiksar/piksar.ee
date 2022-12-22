<script lang="ts">
    import { Editable } from '@threlte/theatre'
    import { Pass, T, useTexture, useLoader  } from '@threlte/core'
    import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
    import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
    import { Vector2 } from 'three';
	import { radToDeg } from 'three/src/math/MathUtils';
    import { useControls } from 'leva'
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
    import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js'
    import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js'
    import * as cube from "$lib/F-6800-STD.cube";
	import { onMount } from 'svelte';

    // LUT
    const lutloader = useLoader(LUTCubeLoader, () => new LUTCubeLoader())
    let lutTexture: any;
    lutloader.load("/src/lib/F-6800-STD.cube", (obj)  => {
        console.log("LUT CUBE", obj)
        lutTexture = obj;
    })

    // BLOOM?
   
    /*const { enabled, ...props } = useControls({
        enabled: true,
        temporalResolve: true,
        STRETCH_MISSED_RAYS: true,
        USE_MRT: true,
        USE_NORMALMAP: true,
        USE_ROUGHNESSMAP: true,
        ENABLE_JITTERING: true,
        ENABLE_BLUR: true,
        DITHERING: false,
        temporalResolveMix: { value: 0.9, min: 0, max: 1 },
        temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
        maxSamples: { value: 0, min: 0, max: 1 },
        resolutionScale: { value: 1, min: 0, max: 1 },
        blurMix: { value: 0.2, min: 0, max: 1 },
        blurKernelSize: { value: 8, min: 0, max: 8 },
        BLUR_EXPONENT: { value: 10, min: 0, max: 20 },
        rayStep: { value: 0.5, min: 0, max: 1 },
        intensity: { value: 2.5, min: 0, max: 5 },
        maxRoughness: { value: 1, min: 0, max: 1 },
        jitter: { value: 0.3, min: 0, max: 5 },
        jitterSpread: { value: 0.25, min: 0, max: 1 },
        jitterRough: { value: 0.1, min: 0, max: 1 },
        roughnessFadeOut: { value: 1, min: 0, max: 1 },
        rayFadeOut: { value: 0, min: 0, max: 1 },
        MAX_STEPS: { value: 20, min: 0, max: 20 },
        NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
        maxDepthDifference: { value: 5, min: 0, max: 10 },
        maxDepth: { value: 1, min: 0, max: 1 },
        thickness: { value: 3, min: 0, max: 10 },
        ior: { value: 1.45, min: 0, max: 2 }
    })*/

    /*$: if(texture){
        console.log("texture", texture)
    }*/

    const newPass = new UnrealBloomPass(
        new Vector2(window.innerWidth, window.innerHeight),
        //strenght
        1,
        // radius
        1,
        // thresh
        0
    )

</script>

{#if lutTexture}
    <Pass pass={new LUTPass({
        lut: lutTexture.texture3D,
        intensity: 1
    })} />
{/if}

<!-- <Pass pass={newPass} /> -->

