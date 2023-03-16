<script lang="ts">
	import egert from "$lib/models/crouchiv_egert_glb.glb";	
	import {  
		InteractiveObject, 
		OrbitControls, 
		T,
		Object3DInstance,
        useFrame, 
		Three,
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
    import { useLoader } from '@threlte/core'
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

    export let isPageLoaded: boolean;
    export let camera:any;

    // const loader = useLoader(OBJLoader, () => new OBJLoader())

    // loader.load(egert, (obj) => {
    //     console.log("egert laetud")
    // })

    onMount(() =>{
        
    })

    useFrame(() => {
       
    })

    // TODO animatioone juurde
    const { gltf, actions, mixer } = useGltfAnimations(({ actions, mixer }) => {
        console.log("gltf", $gltf) 
        console.log("actions", actions) 
        console.log("mixer", mixer) 
	})

    $: if(isPageLoaded){
        firstStandUp();
    }

    // wrapperi out fade aeg maha
    function firstStandUp(){
        setTimeout(() => {
            standUp();
        }, 2000);
    }

    function standUp(){
        if ($mixer) $mixer.timeScale = 0.75;
        $actions['crouch']?.play();
        $actions['crouch'].clampWhenFinished = true;
        $actions['crouch'].repetitions = 1; 
    }
    

    function doCrouch(){
        console.log("crouch", $actions.crouch)
        console.log("mixeer", $mixer)
        if($actions.crouch){    
            if ($mixer) $mixer.timeScale = -1
            $actions.crouch.enabled = true;        
            $actions.crouch.play();
            
            //$actions.crouch.setLoop(Three.LoopPingPong, 5);
            //if ($mixer) $mixer.timeScale = -1
            //$actions.crouch.play();
            //$actions.crouch.reset();
            
            //$actions.crouch.clampWhenFinished = true;
            //$actions.crouch.repetitions = 0; 
        }        
    }

    function moveCameraToCenter(e){
        //console.log(camera)
    }

</script>

<!-- <HTML position={{ y: 1.25, z: 1 }} transform>
    <button on:click={doCrouch}
      class="bg-brand rounded-full px-3 text-white hover:opacity-90 active:opacity-70"
    >
      stand to crouch
    </button>
</HTML> -->

<!-- <HTML position={{ x: 0, y: 1, z: -1.01 }} occlude transform scale={0.3}>
    <div style="color: white">testtesttesttesttesttesttesttesttesttesttest</div>
</HTML>  -->

<GLTF 
    bind:gltf={$gltf} 
    url={egert}
    useDraco
    castShadow
    receiveShadow
    rotation={{y: -(Math.PI)}}
    viewportAware
    interactive
    on:pointerenter={(e) => moveCameraToCenter(e)}
/>

