<script lang="ts">
	import { GLTF, useGltfAnimations } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import table from '$lib/models/Campsite/table.glb';
	import CampingBuscraftAmbience from './Camping_buscraft_ambience.svelte';

	const { gltf, actions, mixer } = useGltfAnimations<'Take 001'>();

	$: if ($actions) {
		$actions['Take 001']?.play();
	}

	// $: console.log('warehouse', $gltf);
</script>

<CampingBuscraftAmbience />

<T.Mesh position={[-12, 4, -18]} scale={[200, 55, 0.1]} rotation.y={degToRad(50)}>
	<!-- <Editable name="Sein vasak" transform controls /> -->
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#18220a">
		<!-- <Editable name="Box / Material" color roughness metalness /> -->
	</T.MeshStandardMaterial>
</T.Mesh>

<T.Mesh position={[-12, 4, -18]} scale={[200, 55, 0.1]} rotation.y={degToRad(0)}>
	<!-- <Editable name="Sein parem" transform controls /> -->
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#18220a">
		<!-- <Editable name="Box / Material" color roughness metalness /> -->
	</T.MeshStandardMaterial>
</T.Mesh>

<!-- laud -->
<GLTF
	receiveShadow
	castShadow
	useDraco
	url={table}
	rotation.y={degToRad(0)}
	position={[-0.04, -0.05, -4.27]}
	scale={1}
/>
