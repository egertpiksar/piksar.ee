<script lang="ts">
    //import trophy from "$lib/models/trophy2.glb";
    import { 
        useGltf,
        GLTF,
        Text
    } from '@threlte/extras';
    import { 
        T,
        useThrelte,
        Object3DInstance,
	} from '@threlte/core';
    import { DEG2RAD } from 'three/src/math/MathUtils'

    const gltf = useGltf("$lib/models/trophy2.glb", {
        useDraco: true
    })

    $: console.log("trohpy", $gltf)
</script>


{#if $gltf}
    <T.Group position={[-5,0,-9]} rotation.y={DEG2RAD * 35}>
        <Object3DInstance 
            object={$gltf.scene} 
            castShadow 
            receiveShadow 
            scale={0.2}
        />

        <Text text="EGERT P" 
            color={"#fff"}
            font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
            fontSize={0.05}
            textAlign="center"
            position={[-0.1, 0.13, 0.155]} />
  </T.Group>    
{/if}