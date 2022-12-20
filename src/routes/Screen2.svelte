<script>
    import { onMount } from "svelte";
    import { Environment, Float, HTML, useGltf } from '@threlte/extras'
    import { T } from '@threlte/core'
    import {VideoTexture, BoxBufferGeometry, sRGBEncoding, NearestFilter} from 'three';
    import * as THREE from 'three'
    import sintel from "$lib/sintel.ogv";	
    import GUI from 'lil-gui';

    let videoEl;
    let videoTexture;

    //const gui = new GUI();

    //gui.add(document, 'title');

    onMount(() => {
        videoEl = document.getElementById("video");   
        console.log("video", videoEl)
        
        video.play();
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
            {#if videoEl}
                <T.VideoTexture 
                    args={[videoEl]} 
                    magFilter={NearestFilter} 
                    minFilter={NearestFilter} 
                    attach="map" 
                    encoding={sRGBEncoding}
                />
            {/if}
        </T.MeshStandardMaterial>
</T.Mesh>

<HTML>
    <video id="video" loop crossOrigin="anonymous" playsinline style="display: none" muted>
        <source src={sintel} type='video/ogg; codecs="theora, vorbis"'>
    </video>
</HTML>


<style>

</style>