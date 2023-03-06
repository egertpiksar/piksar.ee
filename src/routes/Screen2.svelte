<script lang="ts">
    import { onMount } from "svelte";
    import { HTML, Text} from '@threlte/extras'
    import { T } from '@threlte/core'
    import {sRGBEncoding, NearestFilter, RectAreaLight} from 'three';
    import * as THREE from 'three'
    //import sintel from "$lib/sintel.ogv";	

    let rectLight: any;
    let helper: any;

    onMount(() => {
    })
</script>


<T.Mesh position.x={0} position.y={2.25} position.z={-3.97}>
        <T.PlaneGeometry args={[8.5, 3.1, 1, 1]} />
        <!-- TODO mingi led screeni map lisada -->
        <T.MeshStandardMaterial 
            toneMapped={false}
            wireframe={false}
            metalness={0.5}
            roughness={0}
            side={THREE.FrontSide}
            flatShading={true}
        >
        </T.MeshStandardMaterial>
</T.Mesh>

<!-- <HTML position={{ x: 0, y: 2.25, z:-3.96 }} transform occlude scale={0.5}>
    <div class="screen-wrapper">
        <p>Hello, I'm</p>      
        <p>Egert Piksar</p>    

        <div style="margin-top: 10px;">
            I'm creative developer based in Tallinn. I love minimalism and create stunning websites. Feel free to contact me for any projects you might have in mind.
        </div>

        <div class="portfolio">
            23 websites, 5 e-shops, 9 logo
        </div>

        <div class="contact">
            Let's talk!
            info@piksar.ee
        </div>
    </div>
</HTML> -->

<Text text="info@piksar.ee" 
    color={"#000"}
    font={"Inter"}
    fontSize={0.3}
    position={{ x: 2.1, y: 1.1, z:-3.96 }} />

<!-- DirectionalLight -->
<T.RectAreaLight bind:ref={rectLight} 
    position.x={0} position.y={1} position.z={-1.7}
    width={8.5}
    height={3}
    intensity={5}
    color={'#ff6900'}
    rotation={[0,0,0]}>
        <!-- {#if rectLight}
            <T.DirectionalLightHelper bind:ref={helper} args={[rectLight, 0.5, "red"]} />
        {/if} -->
</T.RectAreaLight>


<style>
    .screen-wrapper{
        height: 125px;
        width: 345px;
        overflow: auto;
    }

    p {
        color: white;    
    }

    div{
        color: white;
    }

    .portfolio{
        margin-top: 20px;
    }

    .contact{
        margin-top: 20px;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
        border-radius: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
        opacity: 0.5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>

