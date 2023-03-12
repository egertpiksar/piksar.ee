<script lang="ts">
    import drone from "$lib/models/drone.glb";	
	import { 
        useThrelte,
        Object3DInstance,
		useThrelteRoot
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
    import { 
		Vector2, 
        Vector3,
        Plane
    } from 'three'
	import { 
        useGltf,
        GLTF 
    } from '@threlte/extras';

    const { gltf } = useGltf(drone, {
        useDraco: true
    })

    const { pointer, camera } = useThrelte();
    const { raycaster } = useThrelteRoot();

    let pointOfIntersection = new Vector3(0,2,0)

    const offsetX = spring(0, {
        stiffness: 0.01,
        damping: 0.5
    })

    $: offsetX.set($pointer.x * 6)

	const offsetY = spring(0, {
        stiffness: 0.01,
        damping: 0.5
    })

    $: {
        if($pointer.y > 0.1){
            offsetY.set($pointer.y * 5)
        }
    }

    $: {
        pointOfIntersection = new Vector3($pointer.x * 10, $pointer.y * 10, 0);
        // FOR FUTURE see vaatab kaamerasse
        // raycaster.setFromCamera($pointer, $camera);
        // pointOfIntersection = raycaster.ray.origin; 
    }   

</script>

{#if $gltf}
    <Object3DInstance 
        object={$gltf.scene.children[0]} 
        castShadow 
        receiveShadow 
        position={{x: $offsetX, y: $offsetY, z: -2}}
        lookAt={pointOfIntersection}
        scale={0.2}
    />
{/if}
