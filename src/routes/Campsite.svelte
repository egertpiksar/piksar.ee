<script lang="ts">
	import { useGltf, GLTF, Text, useTexture, useGltfAnimations } from '@threlte/extras';
	import { T, Object3DInstance } from '@threlte/core';
	import { DEG2RAD, degToRad } from 'three/src/math/MathUtils';
	import warehousejpg from '$lib/models/warehouse/textures/lambert4_diffuse.jpeg';
	import scene from '$lib/models/Campsite/camping_buscraft_ambience.glb';
	import { Editable } from '@threlte/theatre';

	const { gltf, actions, mixer } = useGltfAnimations<'Take 001'>();
	/* const gltf = useGltf(scene, {
		useDraco: true
	}); */

	$: if ($actions) {
		$actions['Take 001']?.play();
	}

	/* const texture = useTexture(warehousejpg); */
	//$texture.flipY = false;

	$: console.log('warehouse', $gltf);

	/* $: if ($texture) {
		$texture.flipY = false;
	}

	$: console.log('texture', $texture); */
</script>

<!-- {#if $gltf} -->
<GLTF
	bind:gltf={$gltf}
	receiveShadow
	castShadow
	viewportAware={false}
	useDraco
	url={scene}
	rotation.y={degToRad(325)}
	position={[0, 0, -8]}
	scale={0.9}
>
	<Editable name="Mets" transform />
</GLTF>

<T.Mesh position={[-12, 4, -18]} scale={[200, 55, 0.1]} rotation.y={degToRad(50)}>
	<Editable name="Sein vasak" transform controls />
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#18220a">
		<Editable name="Box / Material" color roughness metalness />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.Mesh position={[-12, 4, -18]} scale={[200, 55, 0.1]} rotation.y={degToRad(0)}>
	<Editable name="Sein parem" transform controls />
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#18220a">
		<Editable name="Box / Material" color roughness metalness />
	</T.MeshStandardMaterial>
</T.Mesh>



