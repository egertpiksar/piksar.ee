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
    import warehouse from "$lib/models/warehouse/kuuelambigawarehouse.glb";	
    import warehousejpg from "$lib/models/warehouse/kuuelambigawarehouse.jpg";
    
    const { gltf } = useGltf(warehouse, {
        useDraco: true
    })

    const tex = useTexture(warehousejpg);
    tex.flipY = false;

    $: console.log("warehosue", $gltf)
    //$: console.log("tex", tex)

</script>


<!-- <GLTF castShadow receiveShadow useDraco url={warehouse} position={{ y: 0 }} scale={3} materials={$gltf.materials}/> -->

{#if $gltf && tex}
    <Group scale={0.15}>
        <T.Mesh
            rotation.x={Math.PI / 2}
            rotation.z={-Math.PI / 2}
            geometry={$gltf.nodes.WareHouse.geometry}>
                <T.MeshBasicMaterial map={tex} />
        </T.Mesh>

        <!-- <T.Mesh
            geometry={$gltf.nodes.poleLightA.geometry}
            position={[$gltf.nodes.poleLightA.position.x, $gltf.nodes.poleLightA.position.y, $gltf.nodes.poleLightA.position.z]}>
                <T.MeshBasicMaterial color={"#ffffe5"} />

        </T.Mesh> -->
    </Group>
{/if}

