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

    let asphalt: any;

    const { gltf } = useGltf(office4, {
        useDraco: true
    })

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

</script>


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