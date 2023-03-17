<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import { 
		OrbitControls, 
		T,
        useFrame, 
        useThrelte
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
    import { onMount } from 'svelte';
    import Screen2 from "./Screen2.svelte"
    import GUI from 'lil-gui';
    import { Fog } from '@threlte/core'
    //import { Editable } from '@threlte/theatre'
    import Effects from "./Effects.svelte";
    import Computers from "./Computers.svelte";    
    import Drone from "./Drone.svelte";
    import Room from "./Room.svelte";	
    import Trophy from "./Trophy.svelte";
    import Portal from "./Portal.svelte";
    import Warehouse from "./Warehouse.svelte";
    import { DEG2RAD } from 'three/src/math/MathUtils'

    export let isPageLoaded: boolean;

    const gui = new GUI();

    let dude: any;
    let light1: any;
    let helper: any;    
    let mainCamera: any;
    let fog: any;
    let squareLight: any;

    

    let stats1 = new Stats();

    // TODO pointerOverCanvas kui nt tabi vahetada, siis kõik animatsioonid pausile

    const { pointer } = useThrelte();

    const cameraOffset = spring({x:7, y: 1, z: -9}, {
        stiffness: 0.003,
        damping: 0.5
    })

    //$: offsetX.set($pointer.x * 10)
    //$: offsetY.set($pointer.y * 10)

    onMount(() => {
        loadStats();     

        const folder = gui.addFolder('camera');
        if(mainCamera){
            console.log("mainCamera", mainCamera)
           folder.add(mainCamera.position , 'x', -20, 20 ).step(1)  
           folder.add(mainCamera.position , 'y', -20, 20 ).step(1) 
           folder.add(mainCamera.position , 'z', -20, 20 ).step(1)  
           folder.add(mainCamera, "autoRotate")        
        }

        if(light1){
            const dirlight = gui.addFolder("dirlight1");
            dirlight.add(light1.position, "x", -20, 20).step(1);
            dirlight.add(light1.position, "y", -10, 10).step(1);
            dirlight.add(light1.position, "z", -20, 20).step(1);

            dirlight.add(light1.rotation, "x", -3.14, 3.14).step(0.1);
            dirlight.add(light1.rotation, "y", -3.14, 3.14).step(0.1);
            dirlight.add(light1.rotation, "z", -3.14, 3.14).step(0.1);
            dirlight.add(light1, "intensity")
            dirlight.addColor(light1, "color")
        }  

        if(fog){
            const fogF = gui.addFolder("fog");
            fogF.add(fog, "near", -50, 50).step(1);
            fogF.add(fog, "far", -50, 50).step(1);
            fogF.addColor(fog, "color")
        }     
    })

    useFrame(() => {
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

<T.PerspectiveCamera bind:ref={mainCamera} makeDefault 
    position={[$cameraOffset.x, $cameraOffset.y, $cameraOffset.z]} 
    rotation={[0, Math.PI, 0]}
    fov={40}>
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
        target={{x: 0, y: 2, z: -14 }} 
    />
</T.PerspectiveCamera>

<T.DirectionalLight bind:ref={light1} 
    castShadow 
    intensity={1} 
    position={[2, -2, 0]}
    rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
    color={"#6e93c4"}
    shadow.mapSize.width = {1024} 
    shadow.mapSize.height = {1024}>
        {#if light1}
            <T.DirectionalLightHelper bind:ref={helper} args={[light1, 0.5, "red"]} />
        {/if}
</T.DirectionalLight>

<!-- <T.PointLight bind:ref={light2}
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
</T.PointLight> -->

<!-- <T.AmbientLight intensity={0.5} /> -->
<!-- <T.SpotLight castShadow position={[0, 1, 0]} intensity={0.3} /> -->

<!-- <Room /> -->

<!-- <Portal /> -->

<Warehouse />

<!-- <Computers /> -->

<Drone />

<Screen2 bind:offsetX={$cameraOffset.x} bind:offsetY={$cameraOffset.y} bind:offsetZ={$cameraOffset.z}/>

<Character isPageLoaded={isPageLoaded} camera={mainCamera} />

<Trophy />

<Fog bind:fog={fog} color={'#070709'} near={6} far={19}/>