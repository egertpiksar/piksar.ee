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
        LinearMipmapLinearFilter
    } from 'three'
    import Screen from "./Screen.svelte"

    let dude;
    let stats1 = new Stats();
    let stats2 = new Stats();
    let stats3 = new Stats();

    onMount(() =>{
        //loadStats();
    })

    useFrame(() => {
        listenStats()
    })

    const { gltf } = useGltf(office4)

    $: console.log("gltf", $gltf)

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
   
    $: console.log("as", asphaltTextures)
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

    $: console.log("as2", asphaltTextures)

    const asphaltMaterial = new MeshStandardMaterial({
        ...asphaltTextures,
        //color: new Color('black'), 
        flatShading: true,
        displacementScale: 0.05,
    })

</script>

<T.PerspectiveCamera makeDefault position={[10, 1, 10]} fov={25}>
    <!--  maxPolarAngle={degToRad(90)} 
        minPolarAngle={degToRad(90)}
        minAzimuthAngle={degToRad(-50)}
        maxAzimuthAngle={degToRad(50)} -->
    <OrbitControls 
        enableDamping        
        maxDistance={20}        
        autoRotate 
        autoRotateSpeed={0.2} 
        enableZoom={true} 
        target={{ y: 2 }} 
    />
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]} color:{0xffffff} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.2} />

<!-- <GLTF bind:gltf={office} castShadow receiveShadow interactive url={office4} /> -->

<!-- Use an object node entirely -->
{#if $gltf}
  <Group  >
    <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['bottom'].geometry}
        material={asphaltMaterial} 
        rotation={[-Math.PI, 0, 0]} 
    />

    <T.Mesh 
        castShadow 
        receiveShadow 
        geometry={$gltf.nodes['panel'].geometry}
        material={$gltf.nodes['panel'].material} 
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

<!-- <Screen /> -->
<T.Fog color={'#2A2A2A'} near={0} far={30}/>