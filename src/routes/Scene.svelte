<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import office4 from "$lib/models/Room/office4.glb";	
    import computersGlb from "$lib/models/computers_1-transformed.glb";	
    import normalMap from "$lib/models/Room/floorNormal.jpg";	
    import roughnessMap from "$lib/models/Room/floorRoughness.jpg";		
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
    import { 
        MeshStandardMaterial, 
        RepeatWrapping, 
        LinearMipmapLinearFilter,
        PCFSoftShadowMap,
		Vector2, 
        Vector3,
        PlaneGeometry,
        MathUtils,
		Mesh
    } from 'three'
    import { Reflector } from "three/examples/jsm/objects/Reflector.js"
    import Screen2 from "./Screen2.svelte"
    import GUI from 'lil-gui';
    import { Fog } from '@threlte/core'
    import { Editable } from '@threlte/theatre'
    import Effects from "./Effects.svelte";
    import { writable } from 'svelte/store';
    import Computers from "./Computers.svelte";    
    import Drone from "./Drone.svelte";

    export let isPageLoaded: boolean;

    //const gui = new GUI();

    let dude: any;
    let light1: any;
    let light2: any;
    let helper: any;    
    let mainCamera: any;
    let asphalt: any;
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

    onMount(() =>{
        loadStats();     
    })

    useFrame(({renderer, scene}) => {
        //console.log("renderer", renderer);
        //console.log("scene", scene)
        //renderer.shadowMap.type = PCFSoftShadowMap;
        listenStats();
    })

    const { gltf } = useGltf(office4, {
        useDraco: true
    })


    function loadStats(){
        stats1.showPanel(0); // Panel 0 = fps
        stats1.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
        document.body.appendChild(stats1.domElement);

        stats2.showPanel(1); // Panel 1 = ms
        stats2.domElement.style.cssText = 'position:absolute;top:0px;left:80px;';
        document.body.appendChild(stats2.domElement);

        stats3.showPanel(2); // Panel 1 = ms
        stats3.domElement.style.cssText = 'position:absolute;top:0px;left:160px;';
        document.body.appendChild(stats3.domElement);
    }

    function listenStats(){
        stats1.begin();
        stats2.begin();
        stats3.begin();
        stats1.end();
        stats2.end();
        stats3.end();
    }

    const asphaltTextures = useTexture({ normalMap: normalMap, roughnessMap: roughnessMap})
   
    // sharp/teravam
    asphaltTextures.normalMap.minFilter = LinearMipmapLinearFilter
    asphaltTextures.normalMap.magFilter = LinearMipmapLinearFilter; 

    asphaltTextures.normalMap.generateMipmaps = false;
    asphaltTextures.normalMap.wrapS = RepeatWrapping;
    asphaltTextures.normalMap.wrapT = RepeatWrapping;
    asphaltTextures.normalMap.repeat.set(1, 1)
   
    asphaltTextures.roughnessMap.generateMipmaps = false;
    asphaltTextures.roughnessMap.wrapS = RepeatWrapping;
    asphaltTextures.roughnessMap.wrapT = RepeatWrapping;
    asphaltTextures.roughnessMap.repeat.set(1, 1)

    let geometry = new PlaneGeometry(16, 15);

	let groundMirror = new Reflector(geometry, {
		clipBias: 0.003,
		textureWidth: window.innerWidth * window.devicePixelRatio,
		textureHeight: window.innerHeight * window.devicePixelRatio,
		color: 0xa0a0a0,
	});	

    const asphaltMaterial = new MeshStandardMaterial({
        ...asphaltTextures,
        color: "#141414", 
        metalness: 1,
        opacity: 0.9,
        transparent: true,
		roughness: 1,
        normalScale: new Vector2(2,2)
    })

    const panelMaterial = new MeshStandardMaterial({
        metalness: 0.42,
		roughness: 0.86,
        color: "black",        
    })

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
       
        autoRotate={false} 
        enableDamping
        autoRotateSpeed={0.2} 
        enableZoom={true}
       
        maxDistance={20} 
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


<T.Mesh bind:ref={squareLight} scale={6.5} position={[0, 5.8, 2]} rotation={[-Math.PI / 2, 0, degToRad(45)]}>
    <Editable name="Ceiling / Lamp" 
        position.y
        position.x
        position.z
        receiveShadow
        castShadow
        rotation.x
        rotation.y    
        rotation.z
        scale
    />

    <T.RingGeometry args={[0.9, 1, 4, 1]}>   
    </T.RingGeometry>

    <T.MeshStandardMaterial color={"white"} roughness={0.75} side={2}>
       <!--  <Editable name="Lamp / Material" 
           color
           roughness
           side
        /> -->
    </T.MeshStandardMaterial>
</T.Mesh>

{#if $gltf}
  <Group>
    <T.Mesh
        bind:ref={asphalt}
        position.y={0} 
        position.x={0}
        position.z={0}
        receiveShadow 
        geometry={$gltf.nodes['bottom'].geometry}
        rotation.x={(-Math.PI)}
        rotation.y={0}
    >

        <!-- <Editable name="Asphalt / Floor" 
            position.y
            position.x
            position.z
            receiveShadow
            castShadow
            rotation.x
            rotation.y    
        /> -->

        <!-- normalMap={asphaltTextures.normalMap} 
            roughnessMap={asphaltTextures.roughnessMap} 
                -->
       <!--  <MeshReflectorMaterial /> -->
        <!-- <T is={MeshReflectorMaterial}
            blur={[300, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          /> -->
        <T.MeshStandardMaterial 
            fog={true}             
            color={"#181818"}
            transparent={false} 
            metalness={1} 
            roughness={1} 
            opacity={1}
            normalScale.x={2} 
            normalScale.y={2}
        >
            <!-- <Editable name="Floor / Material" 
                color roughness metalness flatShading opacity transparent
                normalScale                 
                fog
            /> -->
        </T.MeshStandardMaterial>
    </T.Mesh>

    <!--<T.Mesh bind:ref={groundMirror} rotation.x={( - Math.PI / 2 )}></T.Mesh>-->

    <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['panel'].geometry}
        material={panelMaterial} 
        rotation={[-Math.PI, 0, 0]} 
    />

    <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['walls'].geometry}
        rotation={[-Math.PI, 0, 0]} 
    >
        <T.MeshStandardMaterial fog={true} color={"#181818"} 
            metalness={0} roughness={1}
            normalScale.x={2} normalScale.y={2}
        >
           <!--  <Editable name="Walls / Material" 
                color roughness metalness flatShading
                normalScale                 
                fog
            /> -->
        </T.MeshStandardMaterial>
    </T.Mesh>
  </Group>
{/if}

<!-- <Computers /> -->

<!-- {#if $computers}
  <Group>
    <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$computers.nodes['walls'].geometry}
        rotation={[-Math.PI, 0, 0]} 
    >
        <T.MeshStandardMaterial fog={true} color={"#181818"} 
            metalness={0} roughness={1}
            normalScale.x={2} normalScale.y={2}
        >
        </T.MeshStandardMaterial>
    </T.Mesh>
  </Group>
{/if}
 -->
<!-- <GLTF url={computersGlb} /> -->

<Drone bind:mainCamera={mainCamera} />

<Screen2 bind:offsetX={$offsetX} bind:offsetY={$offsetY} bind:offsetZ={$offsetZ}/>

<Character isPageLoaded={isPageLoaded} camera={mainCamera} /> 

<Fog bind:fog={fog} color={'#2A2A2A'} near={5} far={30}/>