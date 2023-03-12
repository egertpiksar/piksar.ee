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

    const { pointer } = useThrelte();
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

    let plane = new Plane(new Vector3($pointer.x * 10,$pointer.y * 10, 0), -2);
    let pointOfIntersection: any; // = new Vector3(0,0, 0);

    //$: mousePos = new Vector3($pointer.x * 100, $pointer.y * 100, -2)

    $: if($pointer){
        pointOfIntersection = new Vector3($pointer.x * 10,$pointer.y * 10, 0);
        console.log("asd", pointOfIntersection)
        if(mainCamera !== undefined){
            //raycaster.setFromCamera($pointer.x, $pointer.y, mainCamera);
            //raycaster.ray.intersectPlane(plane, pointOfIntersection)
        }
    }

    useFrame(({renderer, scene}) => {
        //console.log("renderer", renderer);
        //console.log("scene", scene)
    })

    const { gltf } = useGltf(drone, {
        useDraco: true
    })

</script>


{#if $gltf}
    <Object3DInstance 
        object={$gltf.scene} 
        castShadow 
        receiveShadow 
        position={{x: $offsetX, y: $offsetY, z: -2}}
        lookAt={pointOfIntersection}
        scale={0.2}
    />
{/if}


