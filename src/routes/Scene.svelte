<script lang="ts">
    import Character from './Character.svelte';
    import Stats from 'stats.js';
	import office4 from "$lib/models/Room/office4.glb";	
	import { 
		OrbitControls, 
		T,
        useFrame, 
	} from '@threlte/core'
	import { spring } from 'svelte/motion'
	import { degToRad } from 'three/src/math/MathUtils'
	import { 
        Environment,
        GLTF, 
        useGltfAnimations, 
        useGltf,
        HTML,
     } from '@threlte/extras'
    import { onMount } from 'svelte';
    import { useLoader } from '@threlte/core';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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

</script>

<T.PerspectiveCamera makeDefault position={[10, 1, 10]} fov={25}>
    <OrbitControls 
        enableDamping 
        maxPolarAngle={degToRad(90)} 
        minPolarAngle={degToRad(90)}
        minAzimuthAngle={degToRad(-50)}
        maxAzimuthAngle={degToRad(50)}
        maxDistance={20}        
        autoRotate 
        autoRotateSpeed={0.2} 
        enableZoom={true} 
        target={{ y: 2 }} 
    />
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.2} />

<GLTF castShadow receiveShadow interactive url={office4} />

<Character />

<!-- <Screen /> -->
<T.Fog color={'#2A2A2A'} near={0} far={30}/>