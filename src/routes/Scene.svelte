<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import { 
		OrbitControls, 
		T,
        useFrame, 
        Group,
        useTexture,
        useThrelte 
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
	import { degToRad } from 'three/src/math/MathUtils'
	import { 
        useGltf,
        GLTF 
    } from '@threlte/extras'
    import { onMount } from 'svelte';
    import Screen2 from "./Screen2.svelte"
    import GUI from 'lil-gui';
    import { Fog } from '@threlte/core'
    import { Editable } from '@threlte/theatre'
    import Effects from "./Effects.svelte";
    import Computers from "./Computers.svelte";    
    import Drone from "./Drone.svelte";
    import Room from "./Room.svelte";
    import scifiRoom from "$lib/models/scifi_scene.gltf";	
    import Trophy from "./Trophy.svelte";
    import Portal from "./Portal.svelte";

    export let isPageLoaded: boolean;

    //const gui = new GUI();

    let dude: any;
    let light1: any;
    let light2: any;
    let helper: any;    
    let mainCamera: any;
    let fog: any;
    let squareLight: any;

    let stats1 = new Stats();
    let stats2 = new Stats();
    let stats3 = new Stats();

    let cameraPosition = [10,1,10]; 

    // TODO pointerOverCanvas kui nt tabi vahetada, siis kõik animatsioonid pausile

    const { pointer } = useThrelte();

    //const cameraOffsetY = writable(1) //spring($pointer.y * 10)
	//$: cameraOffsetY.set(1)
    //$: cameraOffsetY.set(spring($pointer.y))

	//const cameraOffsetZ = writable(10);
	//$: cameraOffsetZ.set(10)	


    const offsetX = spring(10, {
        stiffness: 0.003,
        damping: 0.5
    })

    //$: offsetX.set($pointer.x * 10)

	//$: offsetX.set($pointer.x * 1)
	const offsetY = spring(1, {
        stiffness: 0.003,
        damping: 0.5
    })

    //$: offsetY.set($pointer.y * 10)

    const offsetZ = spring(10, {
        stiffness: 0.003,
        damping: 0.5
    })
	//$: offsetY.set($pointer.y * 1)

    onMount(() => {
        loadStats();     
    })

    useFrame(() => {
        //console.log("renderer", renderer);
        //console.log("scene", scene)
        //renderer.shadowMap.type = PCFSoftShadowMap;
        listenStats();
    })

    function loadStats(){
        stats1.showPanel(0); // Panel 0 = fps
        stats1.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
        document.body.appendChild(stats1.domElement);
    }

    function listenStats(){
        stats1.begin();
        stats1.end();
    }


    $: console.log("isLoaded", isPageLoaded)

</script>


<!-- <Effects /> -->

<T.PerspectiveCamera bind:ref={mainCamera} makeDefault position={[$offsetX, $offsetY, $offsetZ]} fov={25}>
    <!--  maxPolarAngle={degToRad(90)} 
        minPolarAngle={degToRad(90)}
        minAzimuthAngle={degToRad(-50)}
        maxAzimuthAngle={degToRad(50)}
        maxDistance={20}
        enableDamping
    -->
    <OrbitControls        
        autoRotate={true}         
        autoRotateSpeed={0.2} 
        enableZoom={true}      
        target={{ y: 2 }} 
    />
</T.PerspectiveCamera>

<T.DirectionalLight bind:ref={light1} 
    castShadow 
    intensity={0.2} 
    position={[2, 10, 12]} 
    shadow.mapSize.width = {1024} 
    shadow.mapSize.height = {1024}>
        {#if light1}
            <T.DirectionalLightHelper bind:ref={helper} args={[light1, 0.5, "red"]} />
        {/if}
</T.DirectionalLight>

<T.PointLight bind:ref={light2}
    shadow.mapSize.width = {1024} 
    shadow.mapSize.height = {1024} 
    shadow.camera.near = {5}
    shadow.camera.far = {20}
    position={[2, 2.5, -1]} 
    intensity={1}> 
        <Editable name="Lights / Fill" color intensity transform/>
        {#if light2}
            <T.PointLightHelper args={[light2, 0.5, "green"]} />
        {/if}
</T.PointLight>

<!-- <T.AmbientLight intensity={0.5} /> -->
<T.SpotLight castShadow position={[0, 1, 0]} intensity={0.3} />

<!-- <Room /> -->

<Portal />
<!-- <GLTF     
    url={scifiRoom}
    useDraco
    castShadow
    receiveShadow
    rotation={{y: -(Math.PI)}}
/> -->

<!-- <Computers /> -->

<Drone />

<Screen2 bind:offsetX={$offsetX} bind:offsetY={$offsetY} bind:offsetZ={$offsetZ}/>

<Character isPageLoaded={isPageLoaded} camera={mainCamera} /> 

<Trophy />

<!-- <Fog bind:fog={fog} color={'#2A2A2A'} near={5} far={30}/> -->