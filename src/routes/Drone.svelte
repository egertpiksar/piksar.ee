<script lang="ts">
    import {onMount} from "svelte"
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

    let pointOfIntersection = new Vector3();
   
    const offsetX = spring(0, {
        stiffness: 0.01,
        damping: 0.5
    }) 

    $: offsetX.set($pointer.x * 6)

    const offsetY = spring(0.5, {
        stiffness: 0.01,
        damping: 0.5
    })
    
    let cubePosition = new Vector3($offsetX, $offsetY, 0);   

    $: {
        if($pointer.y > 0 && $pointer.y < 0.5){
            offsetY.set($pointer.y * 10)
        }

        //pointOfIntersection = new Vector3($pointer.x * 6, $pointer.y * 10, 0);
        // FOR FUTURE see vaatab kaamerasse
        // raycaster.setFromCamera($pointer, $camera);
        // pointOfIntersection = raycaster.ray.origin; 

        //console.log("x;", $offsetX, "y;", $offsetY)
        //console.log("pointer x", $pointer.x, "pointer y", $pointer.y)

        raycaster.setFromCamera($pointer, $camera);

        const direction = new Vector3().subVectors($camera.position, cubePosition).normalize();
        const point = cubePosition.clone().add(direction.clone().multiplyScalar(3));

        const plane = new Plane().setFromNormalAndCoplanarPoint(direction, point);

        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        pointOfIntersection = pointOfIntersection;
    }

</script>

{#if $gltf}
    <Object3DInstance 
        object={$gltf.nodes.whiteDrone} 
        castShadow 
        receiveShadow 
        position={{x: $offsetX, y: $offsetY, z: -2}}
        lookAt={pointOfIntersection}
        scale={0.5}
    />
{/if}
