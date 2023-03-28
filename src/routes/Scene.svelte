<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import {  
		T,
        useFrame, 
        useThrelte
	} from '@threlte/core';
    import {
        useInteractivity,
        OrbitControls,
        interactivity 
    } from "@threlte/extras";
	import { spring } from 'svelte/motion';
    import { onMount } from 'svelte';
    import Screen2 from "./Screen2.svelte";
    import GUI from 'lil-gui';
    //import { Fog } from '@threlte/core'
    //import { Editable } from '@threlte/theatre'
    import Effects from "./Effects.svelte";  
    import Drone from "./Drone.svelte";	
    import Trophy from "./Trophy.svelte";
    import Portal from "./Portal.svelte";
    import Warehouse from "./Warehouse.svelte";
    import { degToRad } from 'three/src/math/MathUtils';

    export let isPageLoaded: boolean;

    const gui = new GUI();

    let dude: any;
    let light1: any;
    let light2: any;
    let helper: any;    
    let mainCamera: any;
    let fog: any;
    let squareLight: any;   

    let stats1 = new Stats();

    interactivity();

    const { toneMapping } = useThrelte();
	const { renderer, camera } = useThrelte()
	console.log(renderer, $camera)

	$: console.log("tonemapping", $toneMapping)

    // TODO pointerOverCanvas kui nt tabi vahetada, siis kõik animatsioonid pausile
    const { pointer, pointerOverTarget } = useInteractivity() 

    const cameraOffset = spring({x: 3.7, y: 1, z: 0}, {
        stiffness: 0.003,
        damping: 0.5
    })

    const cameraTarget = spring({x: 1, y: 1.9, z: -8 }, {
        stiffness: 0.005,
        damping: 0.5
    })

    $: if(mainCamera && ($pointer && ($pointer.x || $pointer.y) && $pointerOverTarget)){
        cameraTarget.set({
            x: $pointer.x * 1.1, 
            y: $pointer.y * 0.1 + 2,
            z: -8
        });

        cameraOffset.set({
            x: 5 - ($pointer.x * 1.5),
            y: 1,
            z: 0
        })

        //console.log("cameraTarget", $cameraTarget)
        //console.log("cameraOffset", $cameraOffset)
    } 

    let obj  = {tonemap: 0};

    onMount(() => {
        console.log("cameraOffset", $cameraOffset)
        console.log("cameraTarget", $cameraTarget)
        loadStats();   
        loadGUI(); 
    })

    useFrame(() => {
        listenStats();
    })   

    function loadGUI(){
        gui.add( document, 'title' );

        const folder = gui.addFolder('camera');

        const toneMapping = gui.addFolder("toneMapping");
        toneMapping.add(obj , 'tonemap', {noToneMapping: 0, linear:1, reinhard:2, cineon:3, filmic:4, custom:5}).onChange(selectedValue => {
            $toneMapping = selectedValue;
        });
        
        if(mainCamera){
            console.log("mainCamera", mainCamera)
            folder.add(mainCamera.position , 'x', -20, 20 ).step(1)  
            folder.add(mainCamera.position , 'y', -20, 20 ).step(1) 
            folder.add(mainCamera.position , 'z', -20, 20 ).step(1)       
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

        if(light2){
            const dirlight = gui.addFolder("dirlight2");
            dirlight.add(light2.position, "x", -20, 20).step(1);
            dirlight.add(light2.position, "y", -10, 10).step(1);
            dirlight.add(light2.position, "z", -20, 20).step(1);

            dirlight.add(light2.rotation, "x", -3.14, 3.14).step(0.1);
            dirlight.add(light2.rotation, "y", -3.14, 3.14).step(0.1);
            dirlight.add(light2.rotation, "z", -3.14, 3.14).step(0.1);
            dirlight.add(light2, "intensity")
            dirlight.addColor(light2, "color")
        }  

        if(fog){
            const fogF = gui.addFolder("fog");
            fogF.add(fog, "near", -50, 50).step(1);
            fogF.add(fog, "far", -50, 50).step(1);
            fogF.addColor(fog, "color")
        }     
    }

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
    on:create={({ ref }) => {
        ref.lookAt($cameraTarget)
    }}
    fov={40}>
    <!--  maxPolarAngle={degToRad(90)} 
        minPolarAngle={degToRad(90)}
        minAzimuthAngle={degToRad(-50)}
        maxAzimuthAngle={degToRad(50)}
        maxDistance={20}
        enableDamping
    -->
    <OrbitControls        
        enableDamping={true}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
        target={[$cameraTarget.x, $cameraTarget.y, $cameraTarget.z]} 
    /> 
</T.PerspectiveCamera>

<T.DirectionalLight bind:ref={light1} 
    castShadow 
    intensity={1} 
    position={[2, -2, 0]}
    rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
    color={"#2d3b4e"}
    shadow.mapSize.width = {1024} 
    shadow.mapSize.height = {1024}>
        {#if light1}
            <T.DirectionalLightHelper bind:ref={helper} args={[light1, 0.5, "red"]} />
        {/if}
</T.DirectionalLight>

<T.DirectionalLight bind:ref={light2} 
    castShadow 
    intensity={1} 
    position={[-2, -2, 0]}
    rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
    color={"#2d3b4e"}
    shadow.mapSize.width = {1024} 
    shadow.mapSize.height = {1024}>
        {#if light1}
            <T.DirectionalLightHelper bind:ref={helper} args={[light2, 0.5, "red"]} />
        {/if}
</T.DirectionalLight>

<!-- <Portal /> -->

<Warehouse />

<Drone />

<Screen2 bind:cameraOffset={$cameraOffset}/>

<Character isPageLoaded={isPageLoaded} camera={mainCamera} />

<Trophy />

<T.Fog bind:fog={fog} color={'#070709'} near={10} far={19} />