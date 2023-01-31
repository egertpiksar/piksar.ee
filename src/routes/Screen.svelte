<script>
    import { onMount } from "svelte";
    import { Environment, Float, HTML, useGltf } from '@threlte/extras'
    import { T } from '@threlte/core'
    import {VideoTexture, BoxBufferGeometry} from 'three';
    import * as THREE from 'three'

    let videoEl;

    onMount(() => {
        videoEl = document.getElementById("video");   
        console.log("video", videoEl)

         // video texture:
        const texture = new VideoTexture(videoEl);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        //texture.needsUpdate = true;
        
        video.play();

        let meshes = [];
    
        //screeni suurus
        let xgrid = 6;
        let ygrid = 4;
    
        let i, j, ox, oy;
    
        let ux = 1 / xgrid;
        let uy = 1 / ygrid;
    
        //ühe kasti suurus
        let xsize = 3 / xgrid;
        let ysize = 1 / ygrid;
    
        // TODO mingi led screeni normalMap
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: false,
            metalness: 0.5,
            roughness: 0,
            side: THREE.FrontSide,
            map: texture,
            flatShading: true
        });

         //const screenFolder = gui.addFolder("Screen")
        //screenFolder.add(material, "metalness").min(-1).max(1).step(0.1).name("Screen metalness")
        //screenFolder.add(material, "roughness").min(-1).max(1).step(0.1).name("Screen roughness")
    
        let cube_count = 0;
        const groupMesh = new THREE.Object3D();
    
        for (i = 0; i < xgrid; i++){
            for (j = 0; j < ygrid; j++) {
                ox = i;
                oy = j;
    
                const geometry = new BoxBufferGeometry(xsize, ysize, 0.05, 1, 1, 1);
                change_uvs(geometry, ux, uy, ox, oy);
          
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (i - xgrid / 2.40) * (xsize + 0.005);
                mesh.position.y = (j - ygrid / -5) * (ysize + 0.005);
                mesh.position.z = 0;
            
                mesh.dx = 0.01 * (0.5 - Math.random());
                mesh.dy = 0.01 * (0.5 - Math.random());
            
                meshes[cube_count] = mesh;
                groupMesh.add(mesh);
                cube_count += 1;        
            }        
        }  
          
        //teeb video tükkideks
        /*function change_uvs(geometry, unitx, unity, offsetx, offsety) {
            var uvs = geometry.attributes.uv.array;
                for (var i = 0; i < uvs.length; i += 2) {
                    uvs[i] = (uvs[i] + offsetx) * unitx;
                    uvs[i + 1] = (uvs[i + 1] + offsety) * unity;
                }              
        } */ 

        console.log("screen", groupMesh)
        groupMesh.scale.set(10, 10, 10)
        groupMesh.position.set(0, 0, 0)

        //this.scene.add(groupMesh);
    
        //const tv = gui.addFolder("tv");
    })
</script>

<!-- <HTML transform>
    <video id="video" loop crossOrigin="anonymous" playsinline muted style="display: block">
        <source src="../../public/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
    </video>
</HTML> -->

<T.Mesh>
    <T.PlaneGeometry />
    <T.MeshStandardMaterial>
        {#if videoEl}
            <T.VideoTexture args={[videoEl]} attach="map" />
        {/if}
    </T.MeshStandardMaterial>
</T.Mesh>


<style>

</style>