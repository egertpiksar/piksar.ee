<script lang="ts">
    import { 
        useGltf,
        GLTF,
        Text
    } from '@threlte/extras';
    import { 
        useThrelte,
        Object3DInstance,
		useThrelteRoot,
        Group,
        useTexture,
        T
	} from '@threlte/core';
    import { DEG2RAD } from 'three/src/math/MathUtils';
    import warehouse from "$lib/models/warehouse/warehouse_screeniga2.glb";		
    import warehousejpg from "$lib/models/warehouse/screenigavol4.jpg";
    
    const { gltf } = useGltf(warehouse, {
        useDraco: true
    })

    const texture = useTexture(warehousejpg);
    texture.flipY = false;

    $: console.log("warehosue", $gltf)

    //$: console.log("tex", tex)

</script>


<!-- <GLTF castShadow receiveShadow useDraco url={warehouse} position={{ y: 0 }} scale={3} materials={$gltf.materials}/> -->

{#if $gltf && texture}
    <Group scale={4}>
        <T.Mesh           
            rotation.y={Math.PI / 2}
            geometry={$gltf.nodes.house.geometry}>
                <T.MeshBasicMaterial map={texture} />
        </T.Mesh>

        <T.Mesh
            scale={1}
            rotation.y={Math.PI / 2}
            geometry={$gltf.nodes.screen.geometry}            
            position={[0, 0, 0]}>
                <T.MeshBasicMaterial map={texture} />
        </T.Mesh>
       
    </Group>
{/if}

