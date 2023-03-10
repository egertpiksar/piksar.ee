<script lang="ts">
    import { onMount } from "svelte";
    import { HTML, Text} from '@threlte/extras';
    import { T, InteractiveObject } from '@threlte/core';
    import * as THREE from 'three';
    import { preloadFonts } from './utils';
    import { TypeShuffle } from './typeShuffle';
    //import sintel from "$lib/sintel.ogv";	
    import { Editable } from '@threlte/theatre'

    let rectLight: any;
    let helper: any;

    onMount(() => {
        preloadFonts('biu0hfr').then(() => {
            const textElement = document.querySelector('.content');
            
            const ts = new TypeShuffle(textElement);
            ts.trigger('fx1');

            [...document.querySelectorAll('.effects > button')].forEach(button => {
                button.addEventListener('click', () => {
                    ts.trigger(`fx${button.dataset.fx}`);
                });
            });

        });
    })

    function moveCamera(){
        console.log("move camera")
    }
</script>


<T.Mesh position.x={0} position.y={2.25} position.z={-3.97} 
    interactive 
    on:click={(e) => console.log("screenclick", e)} >
        <T.PlaneGeometry args={[8.5, 3.1, 1, 1]} />
        <!-- TODO mingi led screeni map lisada -->
        <T.MeshStandardMaterial 
            toneMapped={false}
            wireframe={false}
            metalness={0.5}
            roughness={0}
            side={THREE.FrontSide}
            flatShading={true}
        />

        <HTML position={{ x: 0, y: 0, z: 0.01 }} transform scale={0.3}>
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
                <dd>23 websites, 5 e-shops</dd>
        
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
        </HTML>
</T.Mesh>



<!-- <Text text="Egert Piksar" 
    color={"#000"}
    font={"/fonts/Unbounded-Regular.ttf"}
    fontSize={0.3}
    textAlign="left"
    position={{x: -4.2, y: 3.8, z:-3.96}} />

<Text text="creative developer" 
    color={"#000"}
    font={"/fonts/Unbounded-Regular.ttf"}
    fontSize={0.15}
    textAlign="left"
    position={{x: -4.2, y: 3.47, z:-3.96}} /> -->

<Text text="info@piksar.ee" 
    color={"#000"}
    font={"/fonts/Unbounded-Regular.ttf"}
    fontSize={0.15}
    textAlign="right"
    position={{ x: 2.8, y: 1, z:-3.96 }} />

<!-- DirectionalLight -->
<T.RectAreaLight bind:ref={rectLight} 
    position.x={0} position.y={2} position.z={-0.7}
    width={8.5}
    height={3}
    intensity={45}
    color={'#2b2b2b'}
    rotation={[0,0,0]}>
        <!-- {#if rectLight}
            <T.DirectionalLightHelper bind:ref={helper} args={[rectLight, 0.5, "red"]} />
        {/if} -->
        <Editable name="ScreenLight" color intensity transform/>
</T.RectAreaLight>


<style>
 
 
</style>

