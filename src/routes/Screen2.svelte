<script lang="ts">
    import { onMount } from "svelte";
    import { HTML, Text} from '@threlte/extras';
    //import { T, InteractiveObject, ViewportAwareObject} from '@threlte/core';
    import { T } from '@threlte/core';
    import * as THREE from 'three';
    //import sintel from "$lib/sintel.ogv";	
    import { Editable } from '@threlte/theatre'

    //export let cameraPosition;
    export let cameraOffset;


    let rectLight: any;
    let helper: any;

    onMount(() => {
       
    })

    /*function zoomCameraIn(e){
         console.log("move camera in", cameraOffset)
        cameraOffset[ 0;
    } */

    /* function zoomCameraOut(e){
        console.log("move camera out", cameraOffset)
        cameraOffset[ 7; 
    }*/

  
</script>

<T.Group position.x={0} position.y={-0.25} position.z={-9.4}>
    <T.Mesh let:ref position.x={-0.125} position.y={2.215} position.z={0} >
            <!-- <InteractiveObject
                object={ref}
                interactive
                on:pointerenter={zoomCameraIn}
                on:pointerleave={zoomCameraOut}
            />

            <ViewportAwareObject
                object={ref}
                viewportAware
                
            /> -->
            <T.PlaneGeometry args={[8.25, 3.1, 1, 1]} />
            <!-- TODO mingi led screeni map lisada -->
            <T.MeshStandardMaterial 
                toneMapped={false}
                wireframe={false}
                metalness={1}
                roughness={0}
                side={THREE.FrontSide}
                flatShading={true}
            />

        <!--  <HTML position={{[0, y: 0.25, z: 0.01 }} transform scale={0.3}>            
                <dl class="content">
                    <dt>Name</dt>
                    <dd>Egert Piksar</dd>
            
                    <dt>Profession</dt>
                    <dd>Creative Developer</dd>
            
                    <dt>Bio</dt>
                    <dd>5 years job experience and +3 years freelance experience. 
                        Passion for creativity in the digital space. 
                        Constantly seeking new challenges, growth opportunities. 
                        Bringing imaginative ideas to life. 
                        Skilled in modern web development frameworks such as Svelte, 3d visualizations with Blender and
                        implementation with ThreeJS, photo editing, video processing and illustration with Adobe softwares. 
                        Strong understanding of UI/UX design principles and ability to create visually appealing and usable websites.
                    </dd>
            
                    <dt>Education</dt>
                    <dd>Bachelor of science in Engineering</dd>
                    
                    <dt>Projects</dt>
                    <dd>23 customer websites and 5 e-shops</dd>
            
                    <dt>Confs</dt>
                    <dd>awwwards Digital Thinkers Conf 2020 && 2023, JSWorld 2022</dd>
                </dl>
            
                <div class="effects">
                    <button data-fx="1">Effect 1</button>
                    <button data-fx="2">Effect 2</button>
                    <button data-fx="3">Effect 3</button>
                    <button data-fx="4">Effect 4</button>
                    <button data-fx="5">Effect 5</button>
                    <button data-fx="6">Effect 6</button>
                </div>
            </HTML> -->
    </T.Mesh>

    <Text text="
        NAME" 
        color={"#fff"}
        font={"https://use.typekit.net/af/c677d6/00000000000000007735c6a1/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"}
        fontSize={0.1}
        textAlign="left"
        position.x={-3}
        position.y={3.3}
        position.z={0.01}
        />

    <Text text="
        EGERT PIKSAR" 
        color={"#fff"}
        font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-2.3, 3.3, 0.01]} />

    <Text text="
        BIO" 
        color={"#fff"}
        font={"https://use.typekit.net/af/c677d6/00000000000000007735c6a1/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-3, 3.1, 0.01]} />

    <Text text="
        CREATIVE DEVELOPER. 5 YEARS JOB EXPERIENCE AND +3 YEARS FREELANCE EXPERIENCE. 
        PASSION FOR CREATIVITY IN THE DIGITAL SPACE. CONSTANTLY SEEKING NEW CHALLENGES, 
        GROWTH OPPORTUNITIES. BRINGING IMAGINATIVE IDEAS TO LIFE. SKILLED IN MODERN WEB 
        DEVELOPMENT FRAMEWORKS SUCH AS SVELTE, 3D VISUALIZATIONS WITH BLENDER AND 
        IMPLEMENTATION WITH THREEJS. PHOTO EDITING, VIDEO PROCESSING AND ILLUSTRATIONS 
        WITH ADOBE SOFTWARES. STRONG UNDERSTANDING OF UI/UX DESIGN PRINCIPLES AND 
        ABILITY TO CREATE VISUALLY APPEALING AND USABLE WEBSITES." 
        color={"#fff"}
        font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-2.3, 3.1, 0.01]} />

    <Text text="
        EDUCATION" 
        color={"#fff"}
        font={"https://use.typekit.net/af/c677d6/00000000000000007735c6a1/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-3, 2.1, 0.01]} />

    <Text text="
        BACHELOR OF SCIENCE IN ENGINEERING (BSc)" 
        color={"#fff"}
        font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-2.3, 2.1, 0.01]} />

    <Text text="
        PROJECTS" 
        color={"#fff"}
        font={"https://use.typekit.net/af/c677d6/00000000000000007735c6a1/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-3, 1.9, 0.01]} />

    <Text text="
        23 CUSTOMER WEBSITES AND 5 E-SHOPS" 
        color={"#fff"}
        font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-2.3, 1.9, 0.01]} />

    <Text text="
        CONFS" 
        color={"#fff"}
        font={"https://use.typekit.net/af/c677d6/00000000000000007735c6a1/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-3, 1.7, 0.01]} />

    <Text text="
        AWWWARDS DIGITAL THINKERS CONF 2020 AMSTERDAM & 2023 TORONTO, JSWORLD 2022 AMSTERDAM" 
        color={"#fff"}
        font={"https://use.typekit.net/af/612d42/00000000000000007735c696/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"}
        fontSize={0.1}
        textAlign="left"
        position={[-2.3, 1.7, 0.01]} />        
</T.Group>


