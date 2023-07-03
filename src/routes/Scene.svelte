<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import {		
		OrbitControls,
		interactivity		
	} from '@threlte/extras';

	import Campsite from './Campsite.svelte';
	import { Editable } from '@threlte/theatre';
	
	export let isPageLoaded: boolean;
	
	let mainCamera: any;
	
	interactivity();
	
</script>


<T.PerspectiveCamera 
	bind:ref={mainCamera} 
	makeDefault 
	position={[0, 3, 0]} 
	fov={40}	
>
		<OrbitControls
			enableDamping={true}
			enablePan={true}
			enableRotate={true}
			enableZoom={true}
			maxDistance={20}
			target={[1, 1.8, -8]}
		>
			<Editable name="orbit" target />
		</OrbitControls>
</T.PerspectiveCamera>

<Campsite />

