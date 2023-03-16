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
    import portal from "$lib/models/Portal/portal.glb";	
    import baked from "$lib/models/Portal/baked.jpg";
    
    const { gltf } = useGltf(portal, {
        useDraco: true
    })

    const tex = useTexture(baked);
    tex.flipY = false;

    $: console.log("portal", $gltf)
    $: console.log("tex", tex)

</script>

{#if $gltf && tex}
    <Group scale={2}>
        <T.Mesh
            geometry={$gltf.nodes.baked.geometry}>
                <T.MeshBasicMaterial map={tex} />
        </T.Mesh>

        <T.Mesh
            geometry={$gltf.nodes.poleLightA.geometry}
            position={[$gltf.nodes.poleLightA.position.x, $gltf.nodes.poleLightA.position.y, $gltf.nodes.poleLightA.position.z]}>
                <T.MeshBasicMaterial color={"#ffffe5"} />

        </T.Mesh>

        <T.Mesh
            geometry={$gltf.nodes.poleLightB.geometry}
            position={[$gltf.nodes.poleLightB.position.x, $gltf.nodes.poleLightB.position.y, $gltf.nodes.poleLightB.position.z]}>
                <T.MeshBasicMaterial color={"#ffffe5"} />
        </T.Mesh>

        <T.Mesh
            geometry={$gltf.nodes.portalLight.geometry}
            position={[$gltf.nodes.portalLight.position.x, $gltf.nodes.portalLight.position.y, $gltf.nodes.portalLight.position.z]}
            rotation={[$gltf.nodes.portalLight.rotation.x, $gltf.nodes.portalLight.rotation.y, $gltf.nodes.portalLight.rotation.z]}
            >
                <T.MeshBasicMaterial color={"#ffffe5"} />
        </T.Mesh>
    </Group>
{/if}

