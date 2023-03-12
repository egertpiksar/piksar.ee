<script lang="ts">
    import drone from "$lib/models/drone.glb";	
	import { 
		OrbitControls, 
		T,
        useFrame, 
        Group,
        useTexture,
        useThrelte,
        Object3DInstance,
		useThrelteRoot
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
    import { 
        MeshStandardMaterial, 
        RepeatWrapping, 
        LinearMipmapLinearFilter,
        PCFSoftShadowMap,
		Vector2, 
        Vector3,
        PlaneGeometry,
        MathUtils,
		Mesh,
        Plane
    } from 'three'

	import { 
        useGltf,
        GLTF 
    } from '@threlte/extras';

    export let mainCamera: any;

    const { gltf } = useGltf(drone, {
        useDraco: true
    })

    const { pointer, camera } = useThrelte();
    const { raycaster } = useThrelteRoot();

    const offsetX = spring(0, {
        stiffness: 0.01,
        damping: 0.5
    })

    $: offsetX.set($pointer.x * 7)

	const offsetY = spring(0, {
        stiffness: 0.01,
        damping: 0.5
    })

    $: offsetY.set($pointer.y * 3)

    //$: console.log("x", $pointer.x)
    //$: console.log("y", $pointer.y)



    //let plane = new Plane(new Vector3(0, 0, 1), -2);
    let pointOfIntersection = new Vector3(0,0, 0);

    // var plane = new Plane(new Vector3(0, 0, 1), -2);
    // raycaster.ray.intersectPlane(plane, pointOfIntersection);

    //$: mousePos = new Vector3($pointer.x * 100, $pointer.y * 100, -2)

    $: {
        // vaatab kaamerasse
        raycaster.setFromCamera($pointer, $camera);
        pointOfIntersection = raycaster.ray.origin;

        

        console.log("asd", pointOfIntersection)
        // this is the starting point of the ray at the camera plane;
        // alternatively you can define your own intersection plane as it is in the linked code:
        // var plane = new Plane(new Vector3(0, 0, 1), -2);
        // raycaster.ray.intersectPlane(plane, pointOfIntersection);
        if($gltf){
            console.log("$gltf", $gltf)
        }       
    }   

</script>

<!-- position={{x: $offsetX, y: $offsetY, z: -2}} -->

{#if $gltf}
    <Object3DInstance 
        object={$gltf.scene} 
        castShadow 
        receiveShadow 
        position={{x: 0, y: 2, z: -2}}
        lookAt={pointOfIntersection}
        scale={0.2}
    />
{/if}


