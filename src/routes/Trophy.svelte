<script lang="ts">
    import trophy from "$lib/models/trophy2.glb";
    import { 
        useGltf,
        GLTF,
        Text
    } from '@threlte/extras';
    import { 
        useThrelte,
        Object3DInstance,
		useThrelteRoot,
        Group
	} from '@threlte/core';
    import { DEG2RAD } from 'three/src/math/MathUtils'

    const { gltf } = useGltf(trophy, {
        useDraco: true
    })

    $: console.log("trohpy", $gltf)

</script>


{#if $gltf}
    <Group position={{x: 5, y: 0, z: -13}} rotation={{y: DEG2RAD * -25}}>
        <Object3DInstance 
            object={$gltf.scene} 
            castShadow 
            receiveShadow 
            scale={0.3}
        />

        <Text text="EGERT P" 
            color={"#fff"}
            font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
            fontSize={0.1}
            textAlign="center"
            position={{x: -0.22, y: 0.215, z: 0.23}} />
  </Group>
    
{/if}