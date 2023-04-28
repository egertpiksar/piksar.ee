<script lang="ts">
	import { useGltf, GLTF, Text, useTexture } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import warehouse from '$lib/models/warehouse/warehouse_blend.glb';
	import warehousejpg from '$lib/models/warehouse/flooriga.jpg';

	const gltf = useGltf(warehouse, {
		useDraco: true
	});

	const texture = useTexture(warehousejpg);
	//$texture.flipY = false;

	$: console.log('warehosue', $gltf);

	$: if ($texture) {
		$texture.flipY = false;
	}

	$: console.log('texture', $texture);
</script>

<!-- <GLTF castShadow receiveShadow useDraco url={warehouse} position={{ y: 0 }} scale={3} materials={$gltf.materials}/> -->

{#if $gltf && $texture}
	<T.Group scale={4}>
		<T.Mesh rotation.y={Math.PI / 2} geometry={$gltf.nodes.house.geometry}>
			<T.MeshBasicMaterial map={$texture} />
		</T.Mesh>

		<T.Mesh
			scale={1}
			rotation.y={Math.PI / 2}
			geometry={$gltf.nodes.screen.geometry}
			position={[0, 0, 0]}
		>
			<T.MeshBasicMaterial map={$texture} />
		</T.Mesh>
	</T.Group>
{/if}
