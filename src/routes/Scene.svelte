<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import office4 from "$lib/models/Room/office4.glb";	
    import normalMap from "$lib/models/Room/floorNormal.jpg";	
    import roughnessMap from "$lib/models/Room/floorRoughness.jpg";		
	import { 
		OrbitControls, 
		T,
        useFrame, 
        Object3DInstance,
        Group,
        useTexture
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
	import { degToRad } from 'three/src/math/MathUtils'
	import { 
        Environment,
        GLTF, 
        useGltfAnimations, 
        useGltf,
        HTML
     } from '@threlte/extras'
    import { onMount } from 'svelte';
    import { useLoader} from '@threlte/core';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
    import { MeshBasicMaterial, 
        MeshStandardMaterial, 
        Color, 
        NearestFilter, 
        MirroredRepeatWrapping, 
        RepeatWrapping, 
        LinearFilter,
        LinearMipmapLinearFilter,
        PCFSoftShadowMap,
		Vector2, 
        PlaneGeometry,
		RingGeometry
    } from 'three'
    import { Reflector } from "three/examples/jsm/objects/Reflector.js"
    import Screen2 from "./Screen2.svelte"
    import GUI from 'lil-gui';
    import { Pass, Fog } from '@threlte/core'
  	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
    import { Editable } from '@threlte/theatre'
    import { DEG2RAD } from 'three/src/math/MathUtils'
    import Effects from "./Effects.svelte";

    const gui = new GUI();

    let dude: any;
    let light1: any;
    let light2: any;
    let helper: any;    
    let asphalt: any;
    let pass: any;
    let fog: any;
    let squareLight: any;

    let stats1 = new Stats();
    let stats2 = new Stats();
    let stats3 = new Stats();

    onMount(() =>{
        loadStats();     
    })

    useFrame(({renderer, scene}) => {
        //console.log("renderer", renderer);
        //console.log("scene", scene)
        renderer.shadowMap.type = PCFSoftShadowMap;
        listenStats();
    })

    const { gltf } = useGltf(office4)

 

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
 // alphaMap: alphaMap, roughnessMap: roughnessMap
    const asphaltTextures = useTexture({ normalMap: normalMap, roughnessMap: roughnessMap})
   
    //$: console.log("as", asphaltTextures)
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

    //$: console.log("as2", asphaltTextures)

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
        //flatShading: true,
        //displacementScale: 0.05,
        metalness: 0.9,
		roughness: 0.05,
        color: "black",        
    })

</script>

<!-- <Pass pass={new UnrealBloomPass(new Vector2( 512,512 ), 0, 0, 0)}></Pass> -->

<Effects />

<T.PerspectiveCamera makeDefault position={[10, 1, 10]} fov={25}>
    <!--  maxPolarAngle={degToRad(90)} 
        minPolarAngle={degToRad(90)}
        minAzimuthAngle={degToRad(-50)}
        maxAzimuthAngle={degToRad(50)}
        maxDistance={20}
    -->
    <OrbitControls 
        enableDamping               
        autoRotate 
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
    intensity={0.1}> 
        <Editable name="Lights / Fill" color intensity transform/>
        {#if light2}
            <T.PointLightHelper args={[light2, 0.5, "green"]} />
        {/if}
</T.PointLight>

<!-- <T.AmbientLight intensity={0.5} />
<T.SpotLight castShadow position={[0, 10, 0]} intensity={0.3} /> -->


<!-- <GLTF bind:gltf={office} castShadow receiveShadow interactive url={office4} /> -->



<!-- <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
    <ringGeometry args={[0.9, 1, 4, 1]} />
    <meshStandardMaterial color="white" roughness={0.75} />
  </mesh> -->

<T.Mesh bind:ref={squareLight} scale={4} position={[0, 5.8, 0]} rotation={[-Math.PI / 2, 0, 0.8]}>
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
        <Editable name="Lamp / Material" 
           color
           roughness
           side
        />
    </T.MeshStandardMaterial>
</T.Mesh>

{#if $gltf}
  <Group>
    <!-- <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['bottom'].geometry}
        material={asphaltMaterial} 
        rotation={[-Math.PI, 0, 0]} 
    /> -->
  <!--  material={asphaltMaterial}  -->
    <T.Mesh 
        bind:ref={asphalt}
        position.y={0.01} 
        position.x={-2.5}
        position.z={2}
        receiveShadow 
        castShadow
        geometry={$gltf.nodes['bottom'].geometry}
        rotation.x={(-Math.PI)}
        rotation.y={(-Math.PI / 2)}
    >

        <Editable name="Asphalt / Floor" 
            position.y
            position.x
            position.z
            receiveShadow
            castShadow
            rotation.x
            rotation.y    
        />

        <T.MeshStandardMaterial fog={true} normalMap={asphaltTextures.normalMap} 
            roughnessMap={asphaltTextures.roughnessMap} color={"#141414"} 
            transparent={true} metalness={0.4} roughness={1} opacity={0.87}
            normalScale.x={2} normalScale.y={2}
        >
            <Editable name="Floor / Material" 
                color roughness metalness flatShading opacity transparent
                normalScale                 
                fog
            />
        </T.MeshStandardMaterial>
    </T.Mesh>

    <T.Mesh bind:ref={groundMirror} rotation.x={( - Math.PI / 2 )}></T.Mesh>
   

    <!-- const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
       
    <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector> -->

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
        material={$gltf.nodes['walls'].material} 
        rotation={[-Math.PI, 0, 0]} 
    >
        <T.MeshStandardMaterial fog={true} normalMap={asphaltTextures.normalMap}>
        
        </T.MeshStandardMaterial>
    </T.Mesh>

  </Group>
{/if}

<Character />

<Screen2 />

<Fog bind:fog={fog} color={'#2A2A2A'} near={5} far={30}/>