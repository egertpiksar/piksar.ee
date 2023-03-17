<script lang="ts">
    import {onMount} from "svelte"
    import drone from "$lib/models/Drone/drone.glb";	
    import drone_m from "$lib/models/Drone/drone_m.png";
    import drone_n from "$lib/models/Drone/drone_n.png";
    import drone_ao from "$lib/models/Drone/drone_ao.png";
    import drone_d from "$lib/models/Drone/drone_d.png";
    import drone_e from "$lib/models/Drone/drone_e.png";
    import drone_r from "$lib/models/Drone/drone_r.png";
	import { 
        useThrelte,
        Object3DInstance,
		useThrelteRoot,
        T,
        useTexture,
        Group 
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
    import { 
		Vector2, 
        Vector3,
        Plane,
        MeshBasicMaterial
    } from 'three'
	import { 
        useGltf,
        GLTF 
    } from '@threlte/extras';

    const { pointer, camera } = useThrelte();
    const { raycaster } = useThrelteRoot();

    const { gltf } = useGltf(drone, {
        useDraco: true
    })

    const textures = useTexture(drone_d);
    textures.flipY = false

    let pointOfIntersection = new Vector3();
   
    const offsetX = spring(0, {
        stiffness: 0.005,
        damping: 0.5
    })

    $: if($pointer.x){
        offsetX.set($pointer.x * 6)
    }

    const offsetY = spring(0.5, {
        stiffness: 0.003,
        damping: 0.5
    })    
    
    // kui liigutada drooni Z, siis seda ka timmida
    let cubePosition = new Vector3(0, 0, -12);   

    $: {
        console.log("pointer", $pointer, cubePosition)

        if($pointer.y > 0 && $pointer.y < 0.5){
            offsetY.set($pointer.y * 10)
            //$droneOffset.y = $pointer.y * 10;
        }

        raycaster.setFromCamera($pointer, $camera);

        const direction = new Vector3().subVectors($camera.position, cubePosition).normalize();
        const point = cubePosition.clone().add(direction.clone().multiplyScalar(3));

        const plane = new Plane().setFromNormalAndCoplanarPoint(direction, point);

        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        pointOfIntersection = pointOfIntersection;
    }

</script>

{#if $gltf && textures}
    <Group lookAt={pointOfIntersection} position={{x: $offsetX, y: $offsetY, z: -13.5}}>
        <T.Mesh
            receiveShadow
            scale={0.002}
            geometry={$gltf.nodes.Box001.geometry}
            rotation.x={Math.PI / 2}
            rotation.z={-Math.PI / 2}>
                <T.MeshBasicMaterial map={textures} />
        </T.Mesh>

        <T.Mesh
            scale={0.002}
            geometry={$gltf.nodes.Object002.geometry}
            rotation.x={Math.PI / 2}
            rotation.z={-Math.PI / 2}>
                <T.MeshBasicMaterial map={textures} />
        </T.Mesh>
    </Group>   
{/if}
