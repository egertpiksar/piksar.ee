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
    import { useLoader } from '@threlte/core';
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
        PlaneGeometry
    } from 'three'
    import { Reflector } from "three/examples/jsm/objects/Reflector.js"
    import Screen2 from "./Screen2.svelte"
    import GUI from 'lil-gui';

    const gui = new GUI();

    let dude;
    let light1;
    let light2;
    let helper;    
    let globalRenderer;

    let stats1 = new Stats();
    let stats2 = new Stats();
    let stats3 = new Stats();

    onMount(() =>{
        loadStats();

        const rendererFolder = gui.addFolder("Renderer");
        //rendererFolder.add(globalRenderer, "");

        const outsideDirLight = gui.addFolder("OutsideLight");
        outsideDirLight.add(light1, "castShadow");
        outsideDirLight.add(light1, "intensity").min(0).max(1).step(0.1);

        const PLfolder = gui.addFolder('PointLight');
        PLfolder.add(light2.position, 'x').min(-10).max(10).step(0.25);
        PLfolder.add(light2.position, 'y').min(-10).max(10).step(0.25);
        PLfolder.add(light2.position, 'z').min(-10).max(10).step(0.25);
        PLfolder.addColor(light2, "color")
        PLfolder.add(light2, 'intensity').min(0).max(1).step(0.1);
        PLfolder.add(light2, 'castShadow');

        const floorFolder = gui.addFolder("Floor");
        floorFolder.add(asphaltMaterial, "metalness").min(0).max(1).step(0.1);
        floorFolder.add(asphaltMaterial, "roughness").min(0).max(1).step(0.01);      
        floorFolder.addColor(asphaltMaterial, "color")

        
    })

    useFrame(({renderer, scene}) => {
        //console.log("renderer", renderer);
        //console.log("scene", scene)
        globalRenderer = renderer
        renderer.shadowMap.type = PCFSoftShadowMap;
        listenStats()
    })

    const { gltf } = useGltf(office4)

    //$: console.log("gltf", $gltf)

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
        //flatShading: true,
        //displacementScale: 0.05,
        metalness: 1,
        opacity: 0.9,
        transparent: true,
		roughness: 1,
                                // kõrgus?
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
        {#if light2}
            <T.PointLightHelper args={[light2, 0.5, "green"]} />
        {/if}
</T.PointLight>

<!-- <T.AmbientLight intensity={0.5} />
<T.SpotLight castShadow position={[0, 10, 0]} intensity={0.3} /> -->


<!-- <GLTF bind:gltf={office} castShadow receiveShadow interactive url={office4} /> -->

{#if $gltf}
  <Group>
    <!-- <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['bottom'].geometry}
        material={asphaltMaterial} 
        rotation={[-Math.PI, 0, 0]} 
    /> -->

    <T.Mesh 
        position.y={0.01} 
        receiveShadow 
        geometry={$gltf.nodes['bottom'].geometry}
        material={asphaltMaterial} 
        rotation={[-Math.PI, 0, 0]} 
    />

    <T.Mesh bind:ref={groundMirror} rotation.x={( - Math.PI / 2 )}>
        <!-- <T.MeshStandardMaterial 
            opacity={0.9}
            transparent={true}
            color="#a0a0a0" 
            metalness={0.4} 
            roughnessMap={asphaltTextures.roughnessMap} 
            normalMap={asphaltTextures.normalMap} 
            normalScale={[2, 2]}
        >
        
        </T.MeshStandardMaterial> -->
    </T.Mesh>
   

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
    />

  </Group>
{/if}

<Character />

<Screen2 />

<T.Fog args={['#2A2A2A', 5, 30]}/>